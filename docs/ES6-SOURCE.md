# ES6 教程来源核查

核查日期：2026-10-13。

## 采用版本与收录范围

- 仓库：https://github.com/wangdoc/es6-tutorial
- 在线教程：https://wangdoc.com/es6/
- 固定 commit：`b8d5d88c643417ad4e231ef9267c44d16f733775`（2026-09-24，docs: add ES2026）。
- 作者：阮一峰（Ruan Yifeng）及原仓库贡献者。
- 正文共 **37 篇，全部纳入**：原 `chapters.yml` 的 32 篇，以及未列入该目录的 5 篇 `acknowledgment.md`、`fp.md`、`mixin.md`、`simd.md`、`temporal.md`。保留原目录顺序，未列入目录的正文归入“仓库附录”。这些附录的在线同名 URL 虽返回 HTTP 200，实际内容为网道首页，不是章节；来源链接应指向固定版本的 GitHub 文件。
- 根目录 `README.md` 是仓库/图书简介与购书链接，保存为来源证据，不另建知识页面；教程起点使用 `intro.md`。因此仓库 38 个 Markdown 文件均已登记，没有静默漏章。

## 许可证据与适用边界

仓库没有独立 LICENSE 文件。固定版本 `package.json` 的原始字段为 `"license": "ICC BY-SA 4.0"`，这是非标准许可标识，按原样保存，不能擅自替换成 MIT。

2026-10-13 实际读取在线教程首页与 `/es6/intro`，两个页面都明确写道：

> 本教程采用知识共享 署名-相同方式共享 3.0协议。

链接是 https://creativecommons.org/licenses/by-sa/3.0/deed.zh 。本次采用这一明确的 **CC BY-SA 3.0** 声明，并同时记录仓库字段的差异；没有将其推定为含 NC 的许可。原始声明、URL、请求状态与核查日期保存在 `licenses/es6-online-evidence.json`，协议正文复用 `licenses/CC-BY-SA-3.0.txt`。

保留作者署名、原站链接、固定来源版本与适配说明；本教程内容的改编继续遵守 CC BY-SA 3.0。本站程序代码许可独立处理。仓库 README 的两张书籍封面只归档用于追溯，不在正文展示，不将封面中出版社、商标或第三方视觉素材的权利自行扩大。

## 原始快照与维护

`content/upstream/es6/` 保存 43 个文件：37 篇正文、2 张封面、README、chapters.yml、package.json、loppo.yml。全部通过固定 commit 的 `git show <commit>:<path>` 以 Buffer 写入，绕过 Windows `core.autocrlf`；未修改上游正文。来源版本、许可与每个文件的 SHA-256 统一维护在 `sources.lock.json` 的 `sources.es6`，章节与资源清单维护在 `content/es6-source.json`。

没有执行源仓库的安装、构建或部署脚本，没有复制加密部署密钥与 CI 配置。

来源正文与本站补充应继续分离；后续更新先核对新的逐文件差异、许可及目录，再更新 manifest 和快照，不静默覆盖编辑数据。

## 格式与链接检查结果

- 37 篇正文中没有 Markdown 图片、HTML 原始块或外部嵌入资源。
- 代码围栏共 1814 个：JavaScript 1768、Bash 29、HTML 8、TypeScript 7、Python 1、C 1。后两种语言需要加载高亮语言或明确按纯文本展示。
- 仅有 5 个相对链接，均是 `arraybuffer.md` 页内锚点：`#canvas`、`#fetch-api`、`#file-api`、`#websocket`、`#ajax`。对应原文标题分别为 Canvas、Fetch API、File API、WebSocket、AJAX；按当前小写 slug 规则均可匹配，不需修改快照。
- 一些章节含标准提案、历史运行器和旧环境示例。Decorator 原文已带 2022 年草稿与新旧语法说明，完整保留。SIMD 与 Temporal 等未列入原目录的文件按仓库附录纳入，不据此宣称其 API 在当前 Node.js 或浏览器中全部可用；`proposals.md` 的“最新”指来源文本，未做全量现行标准审定。
- 本次仅完成来源、字节完整性、目录与格式盘点，不宣称执行了全部示例。页面、导航与站内链接验证由主流程统一执行。

## 逐章清单

| 来源文件 | 标题 | 来源目录状态 | 站内路径 |
|---|---|---|---|
| `docs/intro.md` | ECMAScript 6 简介 | 原目录 | `/es6/intro/` |
| `docs/let.md` | let 和 const 命令 | 原目录 | `/es6/let/` |
| `docs/destructuring.md` | 变量的解构赋值 | 原目录 | `/es6/destructuring/` |
| `docs/string.md` | 字符串的扩展 | 原目录 | `/es6/string/` |
| `docs/string-methods.md` | 字符串的新增方法 | 原目录 | `/es6/string-methods/` |
| `docs/regex.md` | 正则的扩展 | 原目录 | `/es6/regex/` |
| `docs/number.md` | 数值的扩展 | 原目录 | `/es6/number/` |
| `docs/function.md` | 函数的扩展 | 原目录 | `/es6/function/` |
| `docs/array.md` | 数组的扩展 | 原目录 | `/es6/array/` |
| `docs/object.md` | 对象的扩展 | 原目录 | `/es6/object/` |
| `docs/object-methods.md` | 对象的新增方法 | 原目录 | `/es6/object-methods/` |
| `docs/operator.md` | 运算符的扩展 | 原目录 | `/es6/operator/` |
| `docs/symbol.md` | Symbol | 原目录 | `/es6/symbol/` |
| `docs/set-map.md` | Set 和 Map 数据结构 | 原目录 | `/es6/set-map/` |
| `docs/proxy.md` | Proxy | 原目录 | `/es6/proxy/` |
| `docs/reflect.md` | Reflect | 原目录 | `/es6/reflect/` |
| `docs/promise.md` | Promise 对象 | 原目录 | `/es6/promise/` |
| `docs/iterator.md` | Iterator 和 for...of 循环 | 原目录 | `/es6/iterator/` |
| `docs/generator.md` | Generator 函数的语法 | 原目录 | `/es6/generator/` |
| `docs/generator-async.md` | Generator 函数的异步应用 | 原目录 | `/es6/generator-async/` |
| `docs/async.md` | async 函数 | 原目录 | `/es6/async/` |
| `docs/class.md` | Class 的基本语法 | 原目录 | `/es6/class/` |
| `docs/class-extends.md` | Class 的继承 | 原目录 | `/es6/class-extends/` |
| `docs/module.md` | Module 的语法 | 原目录 | `/es6/module/` |
| `docs/module-loader.md` | Module 的加载实现 | 原目录 | `/es6/module-loader/` |
| `docs/style.md` | 编程风格 | 原目录 | `/es6/style/` |
| `docs/spec.md` | 读懂规格 | 原目录 | `/es6/spec/` |
| `docs/async-iterator.md` | 异步遍历器 | 原目录 | `/es6/async-iterator/` |
| `docs/arraybuffer.md` | ArrayBuffer | 原目录 | `/es6/arraybuffer/` |
| `docs/proposals.md` | 最新提案 | 原目录 | `/es6/proposals/` |
| `docs/decorator.md` | Decorator | 原目录 | `/es6/decorator/` |
| `docs/reference.md` | 参考链接 | 原目录 | `/es6/reference/` |
| `docs/acknowledgment.md` | 鸣谢 | 仓库附录 | `/es6/acknowledgment/` |
| `docs/fp.md` | 函数式编程 | 仓库附录 | `/es6/fp/` |
| `docs/mixin.md` | Mixin | 仓库附录 | `/es6/mixin/` |
| `docs/simd.md` | SIMD | 仓库附录 | `/es6/simd/` |
| `docs/temporal.md` | Temporal API | 仓库附录 | `/es6/temporal/` |

| 非章节 Markdown | 处理 | 理由 |
|---|---|---|
| `README.md` | 完整保存来源证据，不建独立页面 | 仓库/图书简介与购书链接；不重复教程 intro，不添加阅读噪声。 |
