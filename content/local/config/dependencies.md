# 依赖版本与锁文件

读项目时，`package.json` 回答“接受哪些依赖版本”，锁文件回答“这次解析得到哪棵依赖树”，`node_modules` 则是当前机器上的安装结果。三个对象有关联，但不能互相替代。只看 `package.json` 中的一行版本范围，通常不足以判断机器上实际使用哪个版本。

## 版本范围怎样读

下面讨论普通、稳定发布版本的常见写法。预发布版本有额外匹配规则；读取时应保留完整版本号，而不是自行丢掉 `-beta`、`-rc` 等后缀。

| 写法 | 对普通稳定版本的含义 |
| --- | --- |
| `1.2.3` | 固定这个版本 |
| `~1.2.3` | 至少 `1.2.3`，小于 `1.3.0` |
| `^1.2.3` | 至少 `1.2.3`，小于 `2.0.0` |
| `^0.2.3` | 至少 `0.2.3`，小于 `0.3.0` |
| `^0.0.3` | 至少 `0.0.3`，小于 `0.0.4` |
| `>=1.2.3 <2.0.0` | 由比较符直接表达范围 |

`^` 不是无条件允许更新“所有次版本”：主版本为零时要看最左侧非零位。范围内的更新也不保证没有实际兼容性问题，因此阅读旧项目时应同时看锁文件与项目验证结果。[依据：node-semver 的范围定义](https://github.com/npm/node-semver#ranges)

依赖值还可能是标签、Git 地址、本地目录或别名，例如 `file:../shared`。这些值不是普通的语义化版本范围；应先识别来源，再追踪目标。`latest` 是发布者可移动的标签，不是永久固定版本。[依据：npm Package spec](https://docs.npmjs.com/cli/v11/using-npm/package-spec/)

## 直接依赖、间接依赖和依赖类别

你在 `package.json` 中列出的包是直接依赖。它们再依赖的包构成间接依赖，锁文件通常会包含整棵树。因此，锁文件的包数量远大于根配置里的数量是正常现象。

~~~json
{
  "dependencies": {
    "picocolors": "^1.1.0"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  }
}
~~~

上例仅用来区分依赖类别：业务代码使用的库和检查代码的工具可以分开声明。对于发布的库，`peerDependencies` 还可以表达与使用方共同使用某个依赖的兼容关系；不要只靠将它移动到 `devDependencies` 来消除安装冲突。[依据：npm package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)

项目可以用 `npm ls --depth=0` 查看已安装的顶层包，用 `npm explain 包名` 追踪一个包为何进入依赖树。这些命令检查的是当前安装结果，不能替代阅读版本控制中的锁文件。[依据：npm ls](https://docs.npmjs.com/cli/v11/commands/npm-ls/)；[npm explain](https://docs.npmjs.com/cli/v11/commands/npm-explain/)

## package-lock.json 记录什么

`package-lock.json` 由 npm 维护，用来记录已经解析的依赖树。常见字段包括锁文件格式版本、包路径、具体版本，以及适用时的下载位置和完整性信息。`lockfileVersion` 是锁文件结构的版本，不是应用版本，也不是某个依赖版本。

对使用 npm 的项目，应将根目录锁文件与 `package.json` 一起维护。不要仅为消除安装差异而删除锁文件；那可能重新解析允许范围内的版本，扩大本次变更。也不应手动修改 `integrity` 值来“修好”安装。[依据：npm package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)

锁文件不会记录一切：Node.js 版本、操作系统、环境变量和外部服务仍可能改变构建或运行结果。它让依赖解析更可复现，不意味着整个项目在任何环境下都必然产生完全相同的行为。

## npm install 与 npm ci

| 命令 | 使用场景 | 对配置与安装目录的影响 |
| --- | --- | --- |
| `npm install` | 初次解析或有意调整依赖 | 按配置及可用锁文件安装，必要时更新锁文件；带包参数时还可能更新声明 |
| `npm ci` | 根据已有锁文件进行干净安装 | 要求锁文件；声明与锁文件不一致时报错；先移除现有 `node_modules`；不修改包声明和锁文件 |

~~~bash
# 在已经使用 npm 且存在匹配锁文件的项目中
npm ci
npm run check
npm run build
~~~

这是一种典型的项目验证顺序，具体脚本以项目实际定义为准。`npm ci` 会重建安装目录，不是只读检查，也不是用于添加单个新依赖的命令。生成锁文件时影响依赖树的安装选项，后续 `ci` 也可能需要保持一致。[依据：npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

两种安装方式都可能涉及生命周期脚本。脚本是否执行还受 npm 版本和相关配置影响；安装成功与项目检查通过是两件事。[依据：npm Scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts/)

## 看到其他锁文件时

`pnpm-lock.yaml`、`yarn.lock` 等通常表示项目采用了对应工具。先按 README、持续集成配置和项目声明确认工具，不要因自己习惯 npm 就直接再生成一份 `package-lock.json`。多种锁文件同时存在时，先查清它们是否服务于不同子项目。

本文使用 npm 解释依赖与锁文件的基本关系。不同包管理器对工作区、安装布局、锁文件和命令参数有各自规则，不能把 `npm ci` 的行为逐字套用到其他命令上。

## 与 TypeScript 类型包的关系

`@types/某包` 提供类型声明，通常不包含原包的运行实现。安装了类型包不代表运行时已经安装了对应 JavaScript 包。反过来，一个依赖也可能自带类型声明，无需额外安装 `@types`。[依据：TypeScript 的声明文件来源](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html)

若项目出现“编辑器认识这个类型，运行时却找不到模块”，应分别检查类型声明的来源、实际依赖安装和运行入口。接着看 [TypeScript 项目使用 npm 模块](/config/npm/) 与 [模块解析与构建分工](/config/module-resolution/)。

## 来源与适用范围

本站依据 npm 与 TypeScript 官方材料独立整理，示例为本站编写。核查日期：2026-10-13；命令行为以所链接 npm v11 文档为依据。这里只覆盖阅读已有项目所需的依赖知识，不展开发布、私有仓库和包管理器迁移。

- [npm：package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)
- [npm：npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/)
- [npm：npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
- [npm：Package spec](https://docs.npmjs.com/cli/v11/using-npm/package-spec/)
- [npm：node-semver](https://github.com/npm/node-semver#ranges)
- [TypeScript：Type Declarations](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html)

