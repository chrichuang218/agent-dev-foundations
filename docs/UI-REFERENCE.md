# UI 参考与有意适配

更新日期：2026-10-13。当前实现按用户指定参考站的整体布局、样式与阅读交互复刻。此前自行设计的双侧目录、目录标签、顶部通栏和卡片方案均已替代，不作为当前设计依据。

## 参考与可复核资产

- 在线参考：<https://diwang.info/how-claude-code-works/#/>。
- 源码：<https://github.com/Windy3f3f3f3f/how-claude-code-works>。
- 实际采用 commit：`f4d6505ed9162a0ee6be089190f74c419ecacb19`。
- 核心页面原样保存于 [`reference/index.html.txt`](reference/index.html.txt)，SHA-256：`bec0ecb444b96fe12761e313b92bc10b6c71b73fbfece778eecc2aad70078cc1`。
- 初次在线取证遇到 TLS / `net::ERR_SSL_PROTOCOL_ERROR` 后，按用户指定备用方式从审阅过的源码启动本地参考站 `http://127.0.0.1:4322/#/`。没有执行仓库安装或部署脚本；交付站不依赖该辅助服务。

本站使用下列本地样式，按表中顺序加载：

| 文件 | 来源与处理 |
| --- | --- |
| `public/styles/reference-theme.css` | 固定 `docsify-themeable@0.9.0` 原版 CSS，65,697 bytes。与固定版本 CDN 和本地取证文件字节一致，未修改或格式化。 |
| `public/styles/reference-shell.css` | 从参考 `index.html` 的 `<style>` 提取。仅统一换行和首尾空白，CSS 声明保留。 |
| `src/styles/global.css` | 字号、静态 HTML、代码高亮、键盘焦点与移动对话框的兼容层。 |

主题 SHA-256 为 `3002232108E34A975B9713CD45FC242C8DE71DB3DE57FCEF003E8F6D0A39FAC2`；提取样式 SHA-256 为 `BCAA5B78D3A838C44941D46D04AE0029280DFBD2FBA251E03A118EEEEB75D43E`。主题许可、固定 URL、拆行样式及 Docsify 源码行号见 [theme-notes.md](reference/theme-notes.md)。

主题静态扫描发现 4 个内嵌 SVG `data:` URI、0 个外部资源 URL、0 个 `@import` 和 `@font-face`。渲染不需要远程字体或 CDN；全站网络行为仍以浏览器验证记录为准。

## 当前布局与交互

参考站的名称、搜索和章节目录属于同一个全高侧栏，随侧栏一起滚动。本站使用 `.sidebar`、`.app-name`、`.search`、`.sidebar-nav` 和 `main.content > article.markdown-section` 对应这一结构；页面没有顶部通栏、面包屑或独立右目录。

侧栏以普通链接提供首页与三个分区入口。当前分区下按主题平铺分组，分组标题为普通粗体文本；章名使用连续序号和简短显示标签，完整标题保留在链接提示与文章 H1 中。仅当前文章下追加 `.app-sub-sidebar`，列出正文 H2；点击当前章节链接折叠或展开这些小节。章节选中边线沿用原主题的右侧边线。详见 [目录实现](NAVIGATION.md)。

正文沿用原主题的系统字体、紫色强调、标题层次、代码区、表格和列表样式。首页及分区页同样使用文档标题、表格与列表。速查放入文档引用区，具体勘误保留；来源、许可与逐篇登记集中到 `/about/`。按后续要求移除顶部进度条及页尾“关于”入口，前后篇链接保留。

浅色/深色按钮使用原站圆形样式，以 `data-theme` 和浏览器 `localStorage.theme` 切换并保留偏好。全文搜索使用本地静态 `/search.json`，覆盖 71 篇；每次页面加载后首次非空查询才读取索引，本页后续查询复用。没有引入新的 npm 依赖或外部搜索服务。

## 有意差异

| 原参考站 | 本站适配及原因 |
| --- | --- |
| 正文 15px、侧栏 260px | 按用户明确可读性反馈使用正文 18px、代码 16px、侧栏 300px；章节文字 16px、页内小节 15px。 |
| 正文最大宽度 `55em` | 保留此主题变量，随 18px 基础字号扩大；不额外重做行宽系统。 |
| Claude 品牌、语言切换、GitHub 角标与架构正文 | 使用 Agent Dev Foundations 和本站内容；去除无关品牌与语言切换；右上角主题按钮与 GitHub 角标按最新要求还原，角标指向本站仓库。原参考代码许可与署名保留。 |
| 一套文档目录 | 三个普通侧栏根链接切换 JavaScript、TypeScript 与项目配置，章名与分组适配各分区。 |
| `subMaxLevel:2` 下当前页 H2 | 保留正文 H2，速查不作为正文小节重复加入目录；不显示 H3。 |
| Docsify 浏览器渲染 Markdown 与 `#/` 路由 | Astro 生成完整静态 HTML 和独立文章 URL；保持直接访问与刷新。未引入 Docsify 运行时。 |
| 客户端插件搜索与代码高亮 | 静态全文索引及小型搜索脚本；Shiki 在构建时高亮，复制使用 Clipboard API。 |
| 移动侧栏推移页面 | 768px 以下使用原生 `dialog`，保持相近侧栏外观，并支持焦点约束、Escape 关闭和返回按钮焦点；不声称复现原版推移行为。 |
| 原站正文 | 保留本站完整教程、速查与必要勘误；署名、版本和来源集中到关于页。 |

这些差异与字体、内容长度都会影响几何，因此不宣称像素等价。除上述适配，不再沿用此前自创的导航与卡片组件。

## 许可与署名

参考仓库使用 MIT，`Copyright (c) 2025 Windy3f3f3f3f`，全文保存在 [`reference-ui-MIT.txt`](../licenses/reference-ui-MIT.txt)。本站分发从其页面提取的样式并适配结构，保留此版权和许可。

`docsify-themeable@0.9.0` 同为 MIT，`Copyright (c) 2018 John Hildenbiddle`，全文保存在 [`docsify-themeable-MIT.txt`](../licenses/docsify-themeable-MIT.txt)。教程正文继续使用其各自的 CC 许可；详见 [LICENSE.md](../LICENSE.md)。未引入原站第三方商标图、正文或图片，不据参考代码 MIT 推断这些素材的权利。

## 历史方案与验证边界

以下仅用于解释旧文件与截图，均非当前实现：

- 初版：顶部三分区导航、章节侧栏和右侧页内目录。
- 第一轮可读性调整：移除右栏，把 H2/H3 嵌入章节树，并使用固定侧栏头部、900px 抽屉断点。历史记录为 [READABILITY.md](READABILITY.md)。
- 第二轮目录调整：“章节 / 本页”标签、可折叠章节组和独立面板。`navigation-*.jpg` 历史截图对应这一阶段。
- 当前版本：直接采用原版主题与提取样式，回到参考站侧栏和正文结构。

旧方案的浏览器结果不能充当当前版本验收。当前版本已通过类型检查（14 files，0 diagnostics）、构建、站点检查与 HTTP 检查；77 个 HTML 页面及全文索引生成完成，8,067 个原文内容块保留检查通过。浏览器实际检查了搜索“泛型”并跳页、当前章 H2 折叠、锚点跳转、桌面侧栏隐藏、暗色模式及移动目录 Escape 关闭。

同为 1280×800 的 [原参考站](verification/reference-layout-comparison.jpg) 与 [本站](verification/replica-layout-comparison.jpg) 对照截图，以及 [手机目录](verification/reference-style-mobile-sidebar.jpg)、[手机正文](verification/reference-style-mobile-article.jpg) 对应当前实现；字号和内容差异仍按前表登记。完整验证范围见 [VERIFICATION.md](VERIFICATION.md)，不据这些检查宣称所有教程示例已执行。本次仍为本地实现，未提交、推送或部署。
