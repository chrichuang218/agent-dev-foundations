# HTML / ES6 全量收录验证

日期：2026-10-13。预览：<http://127.0.0.1:4323/>。本轮只扩充内容和必要的 Markdown 适配，沿用现有阅读界面；未添加精简目录按钮，未恢复速查或阅读提示。

## 覆盖与来源

- HTML：17/17 篇，包含上游目录遗漏的 `mobile.md`。
- ES6：37/37 篇，包含上游目录遗漏的 `acknowledgment`、`fp`、`mixin`、`simd`、`temporal`。
- 新增 54 篇，未排除这两份教程中的任何正文章节。两个 README 是仓库介绍/购书说明，仅作为来源证据登记；不是空白占位文章。
- 全站 125 篇：HTML 17、JavaScript 38、ES6 37、TypeScript 27、项目配置 6。共 133 个静态 HTML 页面。
- 四个来源的 167 个文档全部登记，纳入 122，旧范围排除 45，另有 3 篇本站配置补充。[逐章覆盖清单](COVERAGE.md) 记录每个文件与页面。
- 固定版本、许可差异与图片署名分别见 [HTML 来源](HTML-SOURCE.md)、[ES6 来源](ES6-SOURCE.md)；文件哈希唯一账本为 `sources.lock.json`。

## 实际执行的检查

执行 `npm run verify` 与 `npm run http:check`，均以退出码 0 完成：

| 检查 | 结果 |
| --- | --- |
| 离线导入和源文件校验 | 122 个来源文章、171 个 Markdown 文件全部登记；快照哈希及生成目录一致；公共图片与锁定字节一致 |
| Astro / TypeScript | 15 个文件，0 errors、0 warnings、0 hints |
| 生产构建 | 133 页成功 |
| 正文完整性 | 16,238 个原文内容块逐段核对通过 |
| 站内目标 | 13,579 个链接引用、3,339 个锚点引用、1,066 个本地资源引用，无缺失 |
| 搜索 | 125 篇、1,636 条入口、1,511 个小节锚点；14,917 个正文块一致；排除 4,192 个复制控件；索引 2,044,432 bytes |
| HTTP | 133 个页面状态和标题正确，未知路径返回 404 |
| 既有配置示例 | 8 个 JSON 示例解析通过、1 个 NodeNext 示例内存编译通过；没有执行输出代码 |

机器证据：[页面检查](verification/site-check.json)、[搜索检查](verification/search-section-check.json)、[HTTP 检查](verification/http-check.json)、[配置示例](verification/example-check.json)。

工具版本：Node.js 24.15.0、npm 11.12.1、Astro 7.3.8、TypeScript 6.0.3、markdown-it 15.0.2、Shiki 4.5.0。未新增 npm 依赖。

## 浏览器实际验证

使用 Codex 内置浏览器，桌面默认视口与 390×844 窄屏。临时视口最后已恢复。

- 首页展示五分区及正确篇数；HTML 全部 17 篇、ES6 全部 37 篇显示在各自顶层目录下。
- HTML 原始表格的跨行/跨列结构实际渲染正确，窄屏无整页横向溢出。
- HTML 两张图片均从本站加载成功，固有尺寸为 700×554、270×600。补充替代文字与尺寸；窄屏缩放保持比例。
- HTML `<script>，<noscript>` 标题显示为字面文本，正文中的 6 个代码块正常；没有执行其中的 script/iframe/form 示例。渲染器仅允许经过元素与属性校验的原始表格，以及 `<sup>`；其他原始 HTML 转义。
- ES6 数值文章的 7 处上标正常显示。代码块、长正文与标题沿用现有样式。
- 窄屏打开 ES6 目录，完整显示 37 篇；搜索“异步遍历器”，点击 `for await...of` 结果后到达正确标题，目录关闭。刷新仍保持同一 URL 与锚点，标题距视口顶部约 20px。
- 从 ES6 最后一篇 Temporal 点击下一篇进入 TypeScript 简介，再点击上一篇返回 Temporal；正文回顶部、左侧分区切换正确。
- 代表页浏览器控制台未记录 error。HTML 和 ES6 以独立静态 URL 提供，刷新正常。

截图：

- [HTML 桌面表格](verification/html-table-desktop.jpg) / [手机表格](verification/html-table-mobile.jpg)
- [HTML 桌面图片](verification/html-image-desktop.jpg) / [手机图片](verification/html-image-mobile.jpg)
- [ES6 桌面正文](verification/es6-async-desktop.jpg) / [手机正文](verification/es6-async-mobile.jpg)
- [ES6 手机目录](verification/es6-navigation-mobile.jpg) / [搜索锚点](verification/es6-search-mobile.jpg)

## 验证边界

正文检查证明章节与内容完整，不等于全面语义审计。没有逐个执行 HTML / ES6 教程示例，没有核对全部历史外链，也不宣称历史提案和旧工具写法在所有当前环境可用。6 个未列上游菜单的在线地址实际返回首页，来源链接已改为固定 GitHub 文件，本站正文正常提供。

没有执行来源仓库安装/部署脚本，没有 commit、push、PR、发布或部署。生产预览 4323 与参考服务 4322 保留运行，来源检出在忽略的 `.upstream/` 中，正常阅读和离线导入不依赖该目录。
