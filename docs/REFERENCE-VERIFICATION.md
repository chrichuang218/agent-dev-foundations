# 原版布局实现验证

2026-10-13。本记录取代之前双栏、嵌套长树和标签目录的 UI 验证结论；教程正文与来源核查继续沿用原记录。

最新的翻页、搜索小节、复制反馈、返回顶部和目录跟随对照见 [READING-INTERACTIONS.md](READING-INTERACTIONS.md)。以下保留此前各轮证据，当前自动检查结果以 verification 内 JSON 为准。

后续三项修正已验证：顶部进度条及页尾“关于”入口删除；三分区各自包含所属章节，分别为 38/27/6 篇，编号各自从 1 开始。顶层折叠与当前文章 H2 折叠独立，手机跨分区跳转正常，控制台无错误。全站 HTML 检查增加当前章父分区归属与已删除元素检查。截图：[正确的 TypeScript 目录层级](verification/section-hierarchy-desktop.jpg)。

搜索与定位修正（同日）：浏览器比对原站和本站聚焦输入框，二者均为无 outline、offset 0、`rgb(124,92,252) 0 0 5px` 光晕；补齐满宽布局。包装对象页顶部只有章边线，进入“实例方法”后章边线透明、只有 H2 边线，折叠后回到章边线。模块直开时侧栏 scrollTop=491，切 namespace 后为1093，刷新保持1093，正文始终 scrollY=0；手机模块483，Escape重开仍483，切章后1085且当前章可见。14文件类型检查、77页构建/站内目标/HTTP检查通过，浏览器无 console error/warning。截图：[搜索聚焦](verification/search-focus-aligned.jpg)、[单一定位条](verification/single-position-marker.jpg)、[模块侧栏恢复](verification/module-sidebar-restored.jpg)。

## 依据与保留差异

- 直接读取并浏览用户指定的 `http://127.0.0.1:4322/#/docs/17-autonomy-goal-loop`，核查实际 DOM 与样式。
- `public/styles/reference-theme.css` 原样使用 docsify-themeable 0.9.0；与固定版本 CDN 和核查副本的 SHA-256 相同。
- `reference-shell.css` 从固定参考 commit 的 `index.html` 内嵌 style 提取，保留参考站配色和深色变量。
- 页面采用 `.sidebar`、`.sidebar-nav`、`.app-sub-sidebar`、`.content`、`.markdown-section` 结构；分组平铺，只有当前章展开 H2，点击当前章可折叠。
- 原静态教程内容替换为 JS/TS/配置；保留用户指定正文 18px、代码 16px、章节 16px 和侧栏 300px。参考站原正文为 15px、侧栏 260px，因此不宣称像素等价。
- 省略无关品牌、GitHub 角标和中英切换；保留明暗模式与真实本地搜索。手机目录采用原生对话框以保留 Escape 和焦点约束，未照搬原站移动端推移正文的机制。
- 上游正文仍由 Astro 预渲染，不引入 Docsify/CDN 的运行依赖。源码来源与许可证见 `docs/reference/theme-notes.md`。

## 检查

| 检查 | 结果 |
| --- | --- |
| Astro/TypeScript | 14 files；0 errors/warnings/hints |
| 构建 | 77 HTML 页、1 个静态搜索索引 |
| 正文保留 | 71 篇、8,067 个原文段落/代码等内容块 |
| 站内目标 | 7,373 链接引用、1,744 锚点引用、385 本地资源引用；0 错误 |
| HTTP | 77 个页面正确，未知路由 404 |
| 搜索数据 | 71 篇、885,241 bytes；首次非空查询时读取本地索引 |

## 浏览器实测

- 桌面：没有顶部通栏、目录标签或卡片侧栏；原主题文字缩进、右侧选中边线、标题线和引用块生效。
- 搜索“泛型”返回文章并实际跳转，标题优先；未请求外部搜索服务。
- 点击当前章折叠/展开 H2，H3 不塞进目录；章节标题链接保持独立 URL。
- 锚点定位约 20px，无固定顶栏遮挡；刷新仍保留锚点。
- 桌面侧栏收起后正文左边距变为 0，可重新展开。
- 明暗切换和刷新保留生效；Shiki 的多行、缩进和深色 token 颜色已核查。
- 390×844 手机：正文 18px、代码 16px，没有整页横向溢出；目录能打开、锚点关闭后聚焦目标，Escape 返回菜单按钮。
- 已浏览页面没有 console error/warning。没有作全浏览器或逐像素等价声明，也没有新增教程全文语义验证。

## 截图

- [原站，同尺寸](verification/reference-layout-comparison.jpg)
- [本站，同尺寸](verification/replica-layout-comparison.jpg)
- [深色](verification/reference-style-dark.jpg)
- [手机正文](verification/reference-style-mobile-article.jpg)
- [手机目录](verification/reference-style-mobile-sidebar.jpg)

之前的截图保留为历史证据，不代表当前界面。未提交、推送或部署。
