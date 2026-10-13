# 参考站分页取证与静态还原

核查日期：2026-10-13。仅读取插件元数据、许可、源码和构建文件；未执行插件或安装脚本，未新增 npm 依赖。

## 版本与来源

参考站 `index.html:270–275` 设置 `previousText:'上一篇'`、`nextText:'下一篇'`、`crossChapter:true`、`crossChapterText:true`，在第 292 行加载未固定版本的 `docsify-pagination/dist/docsify-pagination.min.js`。本次 CDN 与 npm 核查实际版本为 **2.10.1**，本站将证据和静态资产固定到该版本。

| 证据 | 固定地址或记录 |
| --- | --- |
| npm 元数据 | <https://registry.npmjs.org/docsify-pagination/2.10.1> |
| 源码项目 | <https://github.com/imyelo/docsify-pagination> |
| 原始渲染源码 | <https://cdn.jsdelivr.net/npm/docsify-pagination@2.10.1/src/pagination.js> |
| 可读 CSS 源文件 | <https://cdn.jsdelivr.net/npm/docsify-pagination@2.10.1/src/stylesheet.css> |
| 实际浏览器插件 | <https://cdn.jsdelivr.net/npm/docsify-pagination@2.10.1/dist/docsify-pagination.min.js> |
| 可读构建文件 | <https://cdn.jsdelivr.net/npm/docsify-pagination@2.10.1/dist/docsify-pagination.js> |
| 许可原文 | <https://cdn.jsdelivr.net/npm/docsify-pagination@2.10.1/license> |
| 许可 | MIT；`Copyright (c) 2017 - present, yelo <zhihuzeye@gmail.com>` |
| 本地完整许可 | `licenses/docsify-pagination-MIT.txt`，1,104 bytes |

发布包中的许可文件名为小写 `license`。大写 `LICENSE` 返回 404 不表示无许可；已依据发布包目录找到并保存实际全文。

## CSS 提取与哈希

插件在构建文件中声明 `var css = "..."`，随后 `styleInject(css)` 将其注入页面 `<head>`。本站只把该字符串按 JSON 字符串解码，原样保存为 `public/styles/reference-pagination.css`；没有运行 `styleInject` 或插件脚本，没有格式化提取后的 CSS，也没有添加换行。

交付 CSS 共 **1,261 bytes**，已核对其内容作为同一字符串出现在固定版本的压缩 CDN 插件内。它与可读 `src/stylesheet.css` 的排版字节不同，使用的是原插件实际注入的压缩 CSS。

| 文件 | SHA-256 |
| --- | --- |
| `dist/docsify-pagination.js` | `2173BADFBDBBE33AD03A2C436C51F285E2E9FAF6F72F7947ACB8B44246BAF967` |
| `dist/docsify-pagination.min.js` | `175F5C8BA6F0EBCFF545B24C80C33C789BFAB81A5954C7A9D0E6AFD34C922585` |
| `public/styles/reference-pagination.css` | `70543C188F745A060BEB7E1C0CC939259E68E7DB4D43F34B8CFFC3584BCC0F1E` |
| `licenses/docsify-pagination-MIT.txt` | `0048F56D3817BE66917485BDE0AA28EB6EE3C9E7F4B7F48357ADB57C5A7867E3` |

分页 CSS 在原主题和参考站样式之后、本站兼容层之前加载。它不包含远程资源引用。

## 原始 DOM 与悬停行为

原插件 `template`（`src/pagination.js:96–137`）生成以下结构。本站 `Pagination.astro` 保留这些层级、类名和 SVG 折线，使用 Astro 转义文章文字；额外添加导航语义、`rel` 以及 SVG 无障碍属性。

```html
<div class="docsify-pagination-container">
  <div class="pagination-item pagination-item--previous">
    <a href="上一页">
      <div class="pagination-item-label">
        <svg width="10" height="16" viewBox="0 0 10 16">
          <polyline fill="none" vector-effect="non-scaling-stroke" points="8,2 2,8 8,14" />
        </svg>
        <span>上一篇</span>
      </div>
      <div class="pagination-item-title">序号. 章节名</div>
      <div class="pagination-item-subtitle">所属主题组</div>
    </a>
  </div>
  <div class="pagination-item pagination-item--next">
    <a href="下一页">
      <div class="pagination-item-label">
        <span>下一篇</span>
        <svg width="10" height="16" viewBox="0 0 10 16">
          <polyline fill="none" vector-effect="non-scaling-stroke" points="2,2 8,8 2,14" />
        </svg>
      </div>
      <div class="pagination-item-title">序号. 章节名</div>
      <div class="pagination-item-subtitle">所属主题组</div>
    </a>
  </div>
</div>
```

关键规则来自实际注入 CSS：

- 容器使用 `display:flex; flex-wrap:wrap; justify-content:space-between; margin:5em 0 1em`，顶部细分隔线；每个分页项 `margin-top:2.5em`。不存在空白占位链接。
- 标题悬停时加下划线。非最后一个分页项的标签、标题、副标题默认 `opacity:.3`，过渡 `all .2s`；悬停后标签 `.6`、标题 `1`，副标题仍 `.3`。
- 最后一个分页项标签默认 `.6`；下一篇 `margin-left:auto; text-align:right`。
- 箭头是 SVG 折线，左右分别留 `.5em` 间距；原插件没有箭头平移或弹跳动画。
- `crossChapterText:true` 会为有目标的每个分页项生成副标题，不仅在真正跨组时生成。名称来自对应侧栏链接文本；分组名来自其所属分组。
- 原主题还用更具体的 `body .pagination-*` 规则覆盖部分字号与边线；原参考样式提供深色颜色。不能只复制插件某个字号，忽略这些已加载样式。

本站旧分页只有两个链接、字符箭头与两行文字，缺少 `.pagination-item` 外层、SVG、分组副标题和插件样式，因此旧外观及悬停效果不匹配；现已改为上述组件。

## 链接与回顶部机制

插件 `pagination()`（第 68–94 行）读取侧栏链接，排除 `.section-link`；`crossChapter:true` 时按全部剩余链接的 DOM 顺序取上一项和下一项。`Link.toJSON()`（第 55–65 行）读取链接名称、URL 与分组名。插件生成普通 `<a>`，没有自行拦截点击、改写滚动或实现异步路由。

参考站的回顶部来自 Docsify 本身的 `auto2top:true`。固定 [Docsify 4.13.1 源码](https://cdn.jsdelivr.net/npm/docsify@4.13.1/lib/docsify.js) 第 9857–9876 行区分导航来源：

- `source === 'history'` 时不强制滚动，依赖浏览器前进/后退恢复位置。
- 普通 `navigate` 且启用 `auto2top` 时调用 `scroll2Top`。
- 存在页内目标时由 Docsify 的标题定位逻辑处理。

本站仍为静态链接导航，由文章页按全部 71 篇的目录顺序传入上一/下一篇目标；组件不引入 Docsify 运行时，也不添加点击拦截。当前支持跨主题组与分区；跨分区时副标题显示目标分区和分组。首页、分区总览和关于不插入正文连续阅读顺序，这是与原插件扫描整棵侧栏 DOM 的必要内容组织适配。

## 检查边界

本分工已核查许可、静态 CSS 字符串与源码机制，并通过 Astro/TypeScript 检查。实际桌面、窄屏、悬停、分页点击和历史返回由主任务浏览器验证记录确认；源码取证不代替这些操作检查。此次没有恢复已删除的进度条、关于页尾入口或其他噪声组件。
