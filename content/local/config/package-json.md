# 读懂 package.json

打开一个 JavaScript 或 TypeScript 项目时，先看根目录的 `package.json`，通常就能找到启动命令、检查命令、依赖和运行条件。它是供工具读取的 JSON 文件，字段的作用取决于读取它的工具；它本身不会编译代码，也不会启动服务。

本文聚焦阅读已有项目。库的类型声明与发布示例见 [TypeScript 项目使用 npm 模块](/config/npm/)，具体版本范围和安装方式见 [依赖版本与锁文件](/config/dependencies/)。

## 从一个小项目开始

下面是自编的配置示例，版本号仅用于解释字段，不表示推荐使用的最新版本。

~~~json
{
  "name": "reading-example",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "check": "tsc --noEmit",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/index.js"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  },
  "engines": {
    "node": ">=20"
  }
}
~~~

这份文件表达了几个独立的意图：项目暂不发布到 npm；包作用域内的 `.js` 使用 ES 模块规则；检查与构建由 TypeScript 负责；运行入口是构建后的 `dist/index.js`。`build` 是否真的生成这个文件，还要看 `tsconfig.json` 的文件范围和输出设置。

## 先读 scripts：项目怎样工作

`scripts` 将名字映射到命令。`check`、`dev`、`build` 是项目自行约定的名字，不能只凭名称判断做了哪些检查。

~~~bash
npm run
npm run check
npm run build
npm run check -- --pretty false
~~~

`npm run` 不带脚本名时列出可用脚本；带脚本名时执行对应命令。最后一行把 `--pretty false` 传给 `check` 中的命令。npm 会把本地依赖提供的命令目录加入脚本的 `PATH`，所以安装了项目依赖后，脚本里的 `tsc` 可以使用本项目的版本。它不要求你先全局安装 TypeScript。[依据：npm run](https://docs.npmjs.com/cli/v11/commands/npm-run/)

阅读脚本时还要看是否存在 `prebuild`、`postbuild` 等前后钩子。安装流程也可能执行生命周期脚本，不能把 `npm install` 理解成纯粹下载文件。脚本最终由命令解释器执行，操作系统和 `script-shell` 设置会影响语法；例如，直接写 Unix 环境变量赋值的脚本未必能在默认 Windows shell 下工作。[依据：npm Scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts/)

## 再看依赖与运行条件

| 字段 | 阅读时要确认什么 |
| --- | --- |
| `dependencies` | 本包正常使用所依赖的包；结合实际运行和打包方式判断用途 |
| `devDependencies` | 本项目开发、检查、测试、构建所需的工具 |
| `peerDependencies` | 本包期望与使用方共享的依赖及其兼容范围 |
| `engines` | 作者声明适用的 Node.js、npm 等版本范围 |
| `private` | 为 `true` 时，npm 会拒绝发布这个包 |
| `workspaces` | 一个仓库包含多个本地包时，其所在目录 |

这些字段的定义来自 [npm package.json 文档](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)。`engines` 不会自动安装或切换 Node.js；是否严格拒绝不匹配的版本还取决于安装工具及其配置。`private` 也不会把 Git 仓库变成私有仓库，更不等同于内容许可。

看到 `workspaces` 时，继续读相关子目录的 `package.json`。根目录的脚本可能只负责调度，实际包的入口和依赖写在子包里。本文只需识别这一层结构，不要求掌握所有多包仓库工具。[依据：npm Workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/)

## 入口字段：给谁看的

| 字段 | 主要作用 |
| --- | --- |
| `main` | 包的传统主入口 |
| `exports` | 公开的包入口、子路径及条件入口 |
| `types` / `typings` | TypeScript 类型声明入口 |
| `type` | 在 Node.js 包作用域中解释 `.js` 的模块格式 |
| `bin` | 包提供的命令行入口 |
| `files` | 打包时纳入发布包的文件范围 |

`main` 和 `exports` 指向使用方加载的入口，不是“执行 `npm start` 的文件”。`npm start` 读取的是脚本规则。支持 `exports` 的 Node.js 会优先使用它；磁盘上存在某个内部文件，不代表使用方可以通过包子路径导入它。[依据：Node.js 包入口](https://nodejs.org/api/packages.html#package-entry-points)

`types` 指向类型声明，声明文件描述接口，不是可执行实现。不同模块解析模式以及 `exports` 中的条件会影响 TypeScript 的具体选择，不能只检查一个 `types` 字段就判定整个包的类型解析正确。[依据：TypeScript 发布声明文件](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

## 常见误区与阅读顺序

- `package.json` 必须是合法 JSON，不能直接写注释、单引号或尾随逗号。教程中带省略号的片段不应原样保存为配置。
- `build` 成功不自动证明类型检查执行过；先看它调用的是 `tsc`、某个打包器，还是自定义脚本。
- `devDependencies` 中的工具可能是生产构建必需的。应区分“构建环境需要安装”与“部署产物运行时需要安装”。
- `"type": "module"` 不会把 CommonJS 源码自动改写成 ES 模块，也不等于 TypeScript 的 `module` 选项。

实际阅读时，按“`scripts` → 脚本读取的配置 → 依赖与版本 → 入口文件”的顺序追踪一次。以示例为例，先确认 `tsc -p tsconfig.json` 的配置，再确认产物是 `dist/index.js`，最后查看 `start` 的运行环境。有关各工具分工，继续阅读 [模块解析与构建分工](/config/module-resolution/)。

## 来源与适用范围

本站依据 npm、Node.js 和 TypeScript 官方文档独立整理，示例为本站编写。核查日期：2026-10-13；npm 链接固定为 v11 文档系列。本文说明字段和阅读方法，不承诺示例适用于每个项目，也不宣称覆盖所有配置字段。

- [npm：package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [npm：npm run](https://docs.npmjs.com/cli/v11/commands/npm-run/)
- [npm：Scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts/)
- [npm：Workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/)
- [Node.js：Packages](https://nodejs.org/api/packages.html)
- [TypeScript：Publishing declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

