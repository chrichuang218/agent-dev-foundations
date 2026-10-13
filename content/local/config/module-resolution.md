# 模块解析与构建分工

读到 `import { value } from "somewhere"` 时，需要分清两个问题：TypeScript 从哪里获得类型，最终执行代码的环境又从哪里加载实现。这两步应当互相匹配，但由不同工具完成。类型检查通过，不足以证明输出文件在实际运行环境中可以加载。

本篇补充上游模块与配置章节的阅读边界。模块语法见 [TypeScript 模块](/typescript/module/)，编译选项的完整讲解见 [tsconfig.json](/config/tsconfig/)。

## 先确认谁负责哪一步

| 阶段 | 常见负责者 | 阅读时检查什么 |
| --- | --- | --- |
| 类型检查 | TypeScript 编译器 | `strict`、文件范围、声明文件、模块解析方式 |
| 转换与输出 | `tsc` 或其他构建工具 | 是否移除类型、转换语法、生成输出文件 |
| 打包 | 打包器（若项目使用） | 如何处理导入、别名、依赖和资源 |
| 运行 | 浏览器、Node.js 等宿主 | 实际可用的语法、模块加载规则及运行时 API |

一种项目由 `tsc` 检查并输出 JavaScript；另一种项目设置 `noEmit`，让 TypeScript 只检查，再由其他工具处理输出。看到 `noEmit: true` 并不表示项目不能构建，而是要继续追踪构建脚本。其他转换工具也不一定完成 TypeScript 的类型检查。[依据：TypeScript noEmit](https://www.typescriptlang.org/tsconfig/noEmit.html)

## type、module 与 moduleResolution

这三个名字相似，但作用不同。

- `package.json` 的 `type`：Node.js 用它判断该包作用域内 `.js` 的模块格式。
- `tsconfig.json` 的 `module`：告诉 TypeScript 所采用的模块语义与输出方式；现代 Node 模式也影响文件格式判断和检查。
- `tsconfig.json` 的 `moduleResolution`：告诉 TypeScript 按哪种规则为导入定位文件与类型。

模块解析方式应对应最终处理导入的宿主。直接交给 Node.js 的输出，和交给打包器处理的源文件，可能允许不同的路径写法。不要为了消除一个找不到模块的错误，就随意在 `NodeNext`、`Bundler` 和旧式 `Node` 之间切换。[依据：TypeScript 模块理论](https://www.typescriptlang.org/docs/handbook/modules/theory.html)

## 一个输出到 Node.js 的小例子

假定项目通过 `tsc` 输出 JavaScript，再交给支持相应语法的 Node.js 运行。包文件明确声明模块格式：

~~~json
{
  "type": "module"
}
~~~

`tsconfig.json` 可以将输入、输出与检查方式放在一起表达：

~~~json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
~~~

~~~typescript
// src/message.ts
export const message: string = "你好，TypeScript";

// src/index.ts（另一个文件）
import { message } from "./message.js";
console.log(message);
~~~

这里源文件实际是 `message.ts`，导入却写 `./message.js`，因为运行的是编译后的 JavaScript。TypeScript 的扩展名替换规则允许它查找对应的 TypeScript 文件。普通 Node.js ES 模块的相对导入需要明确的扩展名，不能照搬某些打包器接受的无扩展名路径。[依据：TypeScript 模块参考](https://www.typescriptlang.org/docs/handbook/modules/reference.html#file-extension-substitution)

`NodeNext` 会随 TypeScript 所模拟的 Node.js 行为演进，不是永远固定的配置契约。读取真实项目时，要同时确认项目锁定的 TypeScript 版本和实际 Node.js 版本。本例用于说明输出链路，不是所有项目通用的配置模板。

## 使用打包器的配置如何理解

如果构建工具接手输出，常见的一组配置意图如下：

~~~json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "noEmit": true,
    "strict": true
  }
}
~~~

它表示按适合打包器的方式检查导入，TypeScript 不生成输出。`Bundler` 是 TypeScript 5.0 引入的模式；实际采用哪些选项仍需匹配项目使用的 TypeScript 和构建工具。这里没有配置具体打包器，因此这段配置本身不构成一个完整构建流程。[依据：TypeScript moduleResolution](https://www.typescriptlang.org/tsconfig/moduleResolution.html)

## 路径别名为什么会“检查通过，运行失败”

~~~json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
~~~

这段配置让 TypeScript 按映射理解 `@/message`，但 `paths` 不会自动重写输出 JavaScript 中的导入字符串。如果输出仍是 `import ... from "@/message"`，运行环境或构建工具也必须能够解释这个名字。否则，编辑器能找到类型，运行时仍然可能报找不到模块。

自 TypeScript 4.1 起，使用 `paths` 不再必须配置 `baseUrl`。未设置 `baseUrl` 时，相对映射值以相应配置文件为基准。旧文章中的“必须同时设置 baseUrl”不能作为现代项目的通用规则。[依据：TypeScript paths 与 baseUrl](https://www.typescriptlang.org/docs/handbook/modules/reference.html#paths)

## 包入口与模块格式的边界

在 Node.js 中，`.mjs` 明确表示 ES 模块，`.cjs` 明确表示 CommonJS；`.js` 会受包作用域的 `type` 等规则影响。现代 Node.js 同时支持两种模块体系，不能把“Node.js 项目”等同于“必须设置 `module: commonjs`”。`NodeNext` 也并非只会输出 ES 模块，它会结合文件扩展名和包配置判断。[依据：Node.js Packages](https://nodejs.org/api/packages.html)；[TypeScript Node 模式](https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-node18-node20-nodenext)

`exports` 可以限制包的公开子路径，并按条件选择入口。一个包即使在磁盘中包含 `internal.js`，也未必允许 `import "这个包/internal.js"`。TypeScript 在现代解析模式下也会考虑这些入口规则；遇到导入失败时，应先查包的公开入口，不能只看文件是否存在。

## target、lib 与真实运行环境

`target` 影响 TypeScript 输出的 JavaScript 语法；`lib` 影响检查时已知的内置 API 声明。把 `lib` 中加入某个库，只是让类型检查器知道这些声明，并不会为运行环境安装实现或 polyfill。例如，知道 `Promise` 的类型，不代表旧宿主已经实现了 `Promise`。[依据：TypeScript target](https://www.typescriptlang.org/tsconfig/target.html)；[TypeScript lib](https://www.typescriptlang.org/tsconfig/lib.html)

因此，看到“编译成功”时继续确认实际执行路径：输入哪些文件、谁生成产物、导入路径如何处理、产物交给哪个宿主。遇到 TypeScript 解析疑问，可使用项目本地编译器的 `--traceResolution` 查看查找过程；参数与其他命令选项见 [tsc 命令行编译器](/config/tsc/)。

## 来源与适用范围

本站依据 TypeScript 和 Node.js 官方文档独立整理，示例为本站编写。核查日期：2026-10-13。本篇解释工程配置之间的关系，不覆盖 Node.js API、打包器专项教程或全部模块互操作边界；真实项目仍须针对目标环境执行验证。

- [TypeScript：Modules — Theory](https://www.typescriptlang.org/docs/handbook/modules/theory.html)
- [TypeScript：Modules — Reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html)
- [TypeScript：moduleResolution](https://www.typescriptlang.org/tsconfig/moduleResolution.html)
- [TypeScript：noEmit](https://www.typescriptlang.org/tsconfig/noEmit.html)
- [TypeScript：target](https://www.typescriptlang.org/tsconfig/target.html)
- [TypeScript：lib](https://www.typescriptlang.org/tsconfig/lib.html)
- [Node.js：Packages](https://nodejs.org/api/packages.html)

