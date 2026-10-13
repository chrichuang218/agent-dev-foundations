# 参考站主题与目录机制核查

核查日期：2026-10-13。只读取 npm/CDN 元数据、CSS、LICENSE 与 JavaScript 源码；未执行第三方安装或部署脚本。

## 固定版本、许可与字节校验

参考站 `.upstream/reference-ui/index.html:11` 引入 `https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css`。本站将实际采用版本固定为 **docsify-themeable 0.9.0**，使用本地静态 CSS，不在阅读时请求 CDN。

| 项目 | 记录 |
| --- | --- |
| npm 版本元数据 | <https://registry.npmjs.org/docsify-themeable/0.9.0> |
| 上游项目 | <https://github.com/jhildenbiddle/docsify-themeable> |
| 固定版本 CSS | <https://cdn.jsdelivr.net/npm/docsify-themeable@0.9.0/dist/css/theme-simple.css> |
| 固定版本 LICENSE | <https://cdn.jsdelivr.net/npm/docsify-themeable@0.9.0/LICENSE> |
| 元数据声明 | `license: MIT` |
| 版权声明 | `Copyright (c) 2018 John Hildenbiddle` |
| 本地 CSS | `public/styles/reference-theme.css` |
| 本地许可证 | `licenses/docsify-themeable-MIT.txt` |
| CSS 字节数 | 65,697 |
| CSS SHA-256 | `3002232108E34A975B9713CD45FC242C8DE71DB3DE57FCEF003E8F6D0A39FAC2` |
| LICENSE SHA-256 | `DBF52617A6DA37E56CD592924261137612B7AD5FA3F0E268E2392FC82E7F2EDE` |

`.upstream/reference-evidence/theme-simple.css`、交付的 `public/styles/reference-theme.css`、固定版本 CDN 返回的 CSS 三方 SHA-256 一致。交付文件未格式化、未重写；本页仅把关键规则拆行用于阅读。MIT 要求保留版权和许可全文，已将原版 LICENSE 保存到上述路径。该主题许可与 WangDoc 教程内容许可分别记录，不能据此改变其他内容的许可。

## 网络与资产边界

对实际 CSS 进行静态扫描：4 个 `url(...)` 全部为内嵌 SVG `data:` URI；0 个外部 URL；0 个 `@import`；0 个 `@font-face`。字体声明是本地字体候选列表，不触发字体下载。

CSS 末尾保留原始 `sourceMappingURL=theme-simple.css.map` 注释。它指向同目录的调试 source map，并非渲染所需的远程资产；本站未引入 source map。CSS 自身不要求读取外部字体、图标或图片。此结论仅针对主题 CSS 的静态引用，不代替页面全站网络验证。

## 关键几何与规则

原主题变量与参考站覆写共同决定布局：主题默认 `--sidebar-width:17rem`、`--content-max-width:55em`、`--sidebar-padding:0 25px`；参考站覆写 `--base-font-size:15px`、`--sidebar-width:260px`、`--theme-color:#7c5cfc`。因此参考正文容器最大宽度为 `55 × 15 = 825px`，包含左右各 45px 的内边距。提升字号时若需要保留参考正文几何，应独立固定正文最大宽度，不能让 `55em` 随字号变成更宽正文。

以下摘录保留原规则的选择器和声明，仅添加空白。媒体查询上下文不可省略。

```css
.markdown-section {
  position: relative;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 2rem 45px;
}
.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10;
  top: 0;
  right: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  width: var(--sidebar-width);
  padding: var(--sidebar-padding);
  border-width: var(--sidebar-border-width);
  border-style: solid;
  border-color: var(--sidebar-border-color);
  background: var(--sidebar-background);
}
@media (min-width: 48em) {
  .sidebar + .content { margin-left: var(--sidebar-width); }
  .sidebar {
    position: absolute;
    transform: translateX(var(--sidebar-width));
  }
  body.sticky .sidebar, body.sticky .sidebar-toggle { position: fixed; }
}
.sidebar-nav, .sidebar nav {
  order: 1;
  margin: var(--sidebar-nav-margin);
  padding: var(--sidebar-nav-padding);
  background: var(--sidebar-nav-background);
}
.sidebar-nav ul, .sidebar nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.sidebar-nav ul ul, .sidebar nav ul ul {
  margin-left: var(--sidebar-nav-indent);
}
.sidebar-nav ul > li > span + ul,
.sidebar-nav ul > li > strong + ul,
.sidebar nav ul > li > span + ul,
.sidebar nav ul > li > strong + ul {
  margin-left: 0;
}
.sidebar-nav li.collapse .app-sub-sidebar { display: none; }
```

补充关键规则：

- `.sidebar > h1` 使用 `--sidebar-name-*` 变量，主题为居中名称；这不是页面顶部通栏。
- `.sidebar-nav a` 是 `display:block; overflow:hidden; white-space:nowrap; text-overflow:ellipsis`；主题用 `--sidebar-nav-link-*` 管理颜色、边距与右侧选中边线。
- `.sidebar-nav ul > li > strong` 是不可折叠的分组标题。参考 `_sidebar.md` 使用粗体分组名加嵌套章节列表，没有 `<details>` 分组控件。
- 主题的 `--sidebar-nav-link-border-width:0 4px 0 0`、`--sidebar-nav-link-margin:0 -25px 0 0` 使选中边线贴侧栏右边。不要改成左边线卡片。
- `.sidebar-nav li.active > a` 与 `.sidebar-nav li.collapse > a` 应用选中颜色和边线；页面链接的展开、闭合箭头由 `--sidebar-nav-pagelink-background--active/--collapse/--loaded` 的 CSS 渐变绘制。
- `.sidebar .search` 使用 `--search-flex-order:1`；搜索输入图标是 CSS 内嵌 SVG。其输入外框用负左右边距与侧栏边界对齐。
- 桌面 `body.close` 使侧栏收起并移除正文左边距；窄屏 `body.close` 反而通过 `translateX(var(--sidebar-width))` 将侧栏推入屏幕。这来自原主题的桌面/移动两组媒体查询，不能把 `close` 在所有宽度下都理解为隐藏。

## 原版目录展开与 `subMaxLevel:2`

参考站 `index.html` 配置 `loadSidebar:true`、`subMaxLevel:2`、`coverpage:false`。其 `docsify@4` 在本次读取时解析为 **4.13.1**。以下代码证据固定到 <https://cdn.jsdelivr.net/npm/docsify@4.13.1/lib/docsify.js>，仅研究，未引入本站运行时。

| 源码位置 | 实际行为 |
| --- | --- |
| `965–982`, `collapse(el)` | 点击目标为 `A`，且其紧邻下一个节点是 `.app-sub-sidebar` 时，切换该链接父 `li` 的 `collapse` 类。不是折叠整个分组。 |
| `4167–4182`, `tree(toc)` | 子目录渲染为 `<ul class="app-sub-sidebar">`，链接为 `.section-link`。 |
| `4200–4222`, `genTree(toc,maxLevel)` | 使用实际标题级别；`level > maxLevel` 直接排除。这里的 2 指 H2 上限，不是“排除 H1 后再保留两层”。 |
| `8808–8830`, `subSidebar(level)` | 移除目录中的首个 H1；处理 `ignoreAllSubs` / `ignoreSubHeading`；再按 `level` 生成树。 |
| `9321–9325`, `_renderSidebar` | 先渲染 `_sidebar.md`，找到当前页面链接，只给该链接的父 `li` 追加本文子目录。 |
| `9883–9892`, `initEvent` | 绑定侧栏切换与章节子目录折叠；没有封面时添加 `body.sticky`。 |

对单个文章 H1 的正常页面，`subMaxLevel:2` 的结果是：全站分组平铺；各分组章节保留；仅当前文章下出现 H2 列表，H3 不显示。点击当前文章链接可以折叠/展开其 H2 子目录。若文章中还有额外 H1，源码会保留后续级别不大于 2 的标题，因此不能把规则描述为无条件 `depth === 2` 而忽略文档结构。

本任务要求以参考站实际视觉与交互为依据。本站上一轮的“章节 / 本页”标签、按组折叠和独立面板均不属于原版机制，不能在复刻结果中沿用为默认目录设计。
