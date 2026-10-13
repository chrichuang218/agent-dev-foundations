# 来源、版本与内容维护

核查日期：2026-10-13。此站按锁定来源整理完整教程正文，没有宣称所有内容都已更新到最新语言或工具版本。

## 实际采用的教程版本

| 来源 | 仓库 commit | 作者 | 本地正文许可 |
| --- | --- | --- | --- |
| [HTML 教程](https://github.com/wangdoc/html-tutorial) | `37cd99758286dc6734d1d1a897c820eb8890b984` | 阮一峰（Ruan Yifeng）及原仓库贡献者 | CC BY-SA 4.0 International |
| [JavaScript 教程](https://github.com/wangdoc/javascript-tutorial) | `84d50bb63511427d8e3c15e642ba456917e9649e` | 阮一峰（Ruan Yifeng）及原仓库贡献者 | CC BY-SA 3.0 Unported |
| [ES6 教程](https://github.com/wangdoc/es6-tutorial) | `b8d5d88c643417ad4e231ef9267c44d16f733775` | 阮一峰（Ruan Yifeng）及原仓库贡献者 | CC BY-SA 3.0 Unported，依据本次在线明确声明 |
| [TypeScript 教程](https://github.com/wangdoc/typescript-tutorial) | `af3943a18219875aaef9af6b10ca756f2ab09841` | 阮一峰（Ruan Yifeng）及原仓库贡献者 | CC BY-SA 4.0 International |

原站分别为 <https://wangdoc.com/html/>、<https://wangdoc.com/javascript/>、<https://wangdoc.com/es6/> 和 <https://wangdoc.com/typescript/>。按用户后续精简要求，作者、许可、源版本和逐篇原文/固定版本链接集中在网站 `/about/`。页尾入口已移除，页面保留 HTML `rel="license"` 引用；本地来源与许可记录继续保存。

`sources.lock.json` 统一记录四个来源的版本、许可证据位置和本地快照文件 SHA-256。`content/upstream/` 保留来源的全部 `docs/**/*.md`、`README.md`、`chapters.yml`、`package.json` 及已登记的必要资源，不包含来源的发布脚本、CI、统计代码、加密部署文件或依赖。未执行任何来源安装、构建或部署脚本。HTML / ES6 新来源的逐项证据见 [HTML-SOURCE.md](HTML-SOURCE.md) 和 [ES6-SOURCE.md](ES6-SOURCE.md)。

## 许可核查与差异

核查使用 Git checkout 中的真实文件和在线原站的许可声明，不以 GitHub license API 是否识别作为判断依据。各来源声明存在版本或拼写差异，按下列依据分别处理。

- JavaScript 的 `package.json` 声明 `Creative Commons Attribution-ShareAlike License`，没有写版本；在线教程页面的许可区明确链接到 CC BY-SA 3.0。因此这份教程按 3.0 署名及相同方式共享。
- TypeScript 仓库的 `package.json` 明确声明 `CC-BY-SA-4.0`。在线站的通用页脚仍写 3.0，与仓库存在差异。本项目实际复用的是上述 Git commit 的仓库文档，按照该仓库明确声明的 4.0 处理，并保留这项差异供维护者复核，没有把所有内容改标为 MIT。
- HTML 仓库的 `package.json` 明确声明 `CC-BY-SA-4.0`，在线通用页脚标为 3.0。本站采用锁定仓库的 4.0 声明，保留在线差异；资源来源与核查细节见 [HTML-SOURCE.md](HTML-SOURCE.md)。
- ES6 锁定仓库 `package.json` 写作 `ICC BY-SA 4.0`，存在拼写异常；本次在线教程明确链接 CC BY-SA 3.0，本站据此采用 3.0。这里的 3.0 是 BY-SA，不含 NC 条件；不将这一结论扩展到该作品全部历史版本、旧站或纸质出版物。具体声明与证据见 [ES6-SOURCE.md](ES6-SOURCE.md)。
- 原站页脚声明的原始片段保存在 [`licenses/wangdoc-online-evidence.json`](../licenses/wangdoc-online-evidence.json)。Creative Commons 官方法律文本保存在 [`CC-BY-SA-3.0.txt`](../licenses/CC-BY-SA-3.0.txt) 与 [`CC-BY-SA-4.0.txt`](../licenses/CC-BY-SA-4.0.txt)。这些文本于核查日分别从对应官方 `legalcode.txt` 地址取得。
- 本站分组、元数据、说明、相关链接和正文呈现构成整理改编。JavaScript 与本次 ES6 来源的整理部分按 CC BY-SA 3.0，HTML 与 TypeScript 来源的整理部分按 CC BY-SA 4.0；第三方原始署名和参考链接继续保留。本站独立补充配置文章的许可见其来源元数据与根许可说明。
- 本站程序代码、设计实现和文档内容分别依据根目录的许可文件及第三方说明；教程正文不因被放进此仓库而获得程序代码许可。

## 范围与实际整理

范围依据 [`SCOPE.md`](SCOPE.md) 和本次用户要求。完整逐章记录由 [`COVERAGE.md`](COVERAGE.md) 提供。

- 四个来源 `docs` 共 167 篇：HTML 17、JavaScript 82、ES6 37、TypeScript 31。
- 纳入 122 个来源页面：HTML 17、JavaScript 38、ES6 37、TypeScript 30（其中 3 篇为配置）。纳入数量包含两个混合范围 JavaScript 来源文件的部分纳入页。另有 3 个原创配置条目，一并归入 TypeScript 最后一组“项目配置”；该分区共 33 篇，全站范围仍为 125 篇。目录归属调整不改变原文来源、许可或 `/config/*/` 文章 URL。
- 维持原 JavaScript / TypeScript 来源的 45 篇排除；HTML 与 ES6 的 `docs/**/*.md` 全部纳入，不新增排除。四个 README 作为来源证据登记，不计入教程章节总数。
- `features/console.md` 保留完整 `debugger` 语言语句一节；`bom/arraybuffer.md` 保留完整 `ArrayBuffer` 一节。其余 console/工具 API 和 Blob 浏览器应用被明确排除。两个原始文件仍完整保存在快照中。
- 未在上游 `chapters.yml` 登记但实际存在的 TypeScript `es6.md`、`npm.md`、`narrowing.md`、`type-operations.md`，HTML `mobile.md`，ES6 `acknowledgment.md`、`fp.md`、`mixin.md`、`simd.md`、`temporal.md` 均纳入，没有把目录清单误当作仓库文档全集。
- 原 JavaScript / TypeScript 的 DOM、浏览器 API、元素接口、宿主定时器独立章节与 React 主体仍排除。HTML / ES6 新来源完整保留表单、多媒体、浏览器上下文、历史提案、参考链接和致谢，不沿用旧范围删节。
- HTML 图像章的两张正文图片按来源资源清单本地保存，并在导入时复制至 `public/`、校验哈希；原始 Markdown 不修改。TypeScript / ES6 README 中的封面链接仅保留在来源记录中，不作为文章资源渲染。代码示例中的图片、媒体和 iframe URL 只作为代码显示，不实际加载。

未将整篇内容删成摘要。呈现变更包括去掉重复 H1、标题锚点、站内链接、本地图片映射、布局、代码高亮，以及原文表格和上标的受控渲染。文章标题后直接展示正文，不恢复“速查”和“阅读提示”；已有编辑资料继续保留在本地。

## 独立补充与已知历史边界

此前整理的速查及相关条目保存在 `content/editorial.json`，按篇根据对应原文编写。现代工具边界的勘误说明附有官方文档链接；根据用户最新界面要求，这些开篇注记不再展示。以下为原有 JS / TS 的有限核查记录，不代表 HTML / ES6 新来源已完成逐例语义验证：

- 原 JS 教程主体为 ES5，数据类型清单不覆盖 `symbol`、`bigint`；旧式 `var`、`with`、IIFE 模块等按历史背景阅读。
- Promise 章编辑记录补充 settled/resolved 的术语区别、executor 同步执行、微任务排序前提与 `then(f2())` 的实际含义；ArrayBuffer 章编辑记录说明了缓冲区与读写视图的区别。原文保留，这些注记现存于本地编辑层，不在文章开头展示。
- TypeScript 类型检查不等于运行时输入验证；断言和声明不会创建实际转换、验证或运行时实现。
- 显式向 `tsc` 传入输入文件会忽略整个 `tsconfig.json`；`paths` 不需要强制设置 `baseUrl`，也不负责改写输出的导入路径。
- `importsNotUsedAsValues`、classic/node 模块解析以及将 Node 与 CommonJS 直接等同的描述有版本背景；现代工程参照本站配置补充和官方文档。
- `narrowing.md` 的未声明属性缩小规则早于 TypeScript 4.9；`any` 与 `unknown` 的检查限制不能混为一谈。
- 装饰器的新旧方案有不同语法和编译选项；来源关于“2022 年成为标准”的措辞不可推断成所有引擎原生支持。
- `type-operations.md` 中包含类型代数示意，不能把所有代码框都当成可直接编译的程序。

原 TypeScript 教程 `es6.md` 的 `Set<T>` 与 `Promise<T>` 两节只有标题。本站以独立标注的短节补全了两节说明和示例，没有修改快照，也没有留下待补充占位。补充依据包括 [TypeScript 官方类型概览](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)、[对象与泛型类型](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-array-type)、[ECMAScript Set 标准](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-set-objects)、[Promise 标准](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects) 与 [迭代器和生成器](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)。这两节属于独立中文补充，与本轮完整收录的 ES6 教程分开维护。

以上是发现后明确处理的边界，不是全面语义审计的声明。没有对全部原文示例逐个执行；实际网站验证和有限语义验证范围见项目验证记录。

38 个 JavaScript 速查片段使用 Node.js `v24.15.0` 的 `node:vm.Script` 做了语法解析，没有执行；对应版本、片段哈希、条目清单与限制保存在 [`source-quickrefs.json`](verification/source-quickrefs.json)。该检查不能证明正文全部示例的运行行为。

本次有限勘误核查所访问的 8 份官方页面及命中的关键文字，保存于 [`source-official-references.json`](verification/source-official-references.json)。它证明这些补充实际查阅了相应资料，不代表所有外链或全部教程观点都已逐项核验。

## 重复整理与更新流程

1. 日常整理运行 `node scripts/import-content.mjs`。它离线读取锁定快照、`content/html-source.json`、`content/es6-source.json` 与 `content/editorial.json`，生成 `content/catalog.json`、`docs/COVERAGE.md`，按资源清单复制必要图片至 `public/` 并校验哈希；不会改写快照、来源映射、本地编辑或独立文章。
2. `node scripts/import-content.mjs --check` 检查文件清单、快照 SHA-256、必要章节元数据、资源映射和已生成清单是否一致。新章节不要求 `syntax`；新增或变化的来源文件不能被静默跳过。
3. 更新上游时先取得目标 commit 并复核许可及正文 diff。只替换相应的 `content/upstream/{source}` 快照；不要把 `.git`、安装/部署脚本、CI 或不需要的站点素材带入项目。
4. 维护者审阅完变化后，显式更新 `sources.lock.json` 的 commit、日期、许可证据和每文件 SHA-256。脚本故意不自动接受变化；这一步是变更记录，不需要联网启动站点。
5. 比对全部 `docs` 文件和 `chapters.yml`。HTML / ES6 新章节在各自来源映射的 `chapters` 中维护标题、摘要与分组，图片在 `assets` 中登记来源、本地目标及哈希；`content/editorial.json` 可覆盖单篇元数据，但不覆盖快照。原 JS / TS 的已有编辑资料继续保留，排除规则必须有具体理由；新的范围规则写在整理脚本与范围文档中。
6. 再生成清单、运行内容检查和生产构建，并抽查受影响的页面。遇到同主题更新时先合并已有 notes、headingSupplements 和本地补充，不删除本地编辑来迁就新的来源结构。

因此，原文快照、编辑层与独立补充各有明确存放位置；重复导入不会悄悄覆盖本站新增内容。

`.gitattributes` 对锁定快照设置 `-text`，避免 Git 在 Windows/Linux 检出时转换换行并破坏字节哈希；其他文本统一使用 LF。不要对 `content/upstream/` 批量格式化。
