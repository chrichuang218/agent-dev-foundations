# 右上角控件

2026-10-13：按用户要求还原参考站的主题按钮与 GitHub 角标。范围限这两个控件，不恢复语言切换、进度条或页尾入口。

- 主题按钮：参考 `index.html` 146–154、188–213、340–354 行。使用已保存的原站 CSS，按钮 34×34、圆形 1.5px 边框，外层固定 `top:12px; right:100px`；浅色显示 🌙，深色显示 ☀️，保留原版 hover/active 过渡与主题持久化。
- GitHub 角标：实际运行的 Docsify 页面 `.github-corner`，原始 DOM 见 [github-corner.html.txt](github-corner.html.txt)。SVG 三条路径原样复用，原版主题 CSS 提供 70×70 SVG、右上定位与 octocat-wave 悬停动画。
- 适配：GitHub 地址指向本站仓库；补中文可访问名称、noopener/noreferrer；保留键盘焦点、读屏状态与减少动态效果支持。
- Docsify 的 MIT 许可证见 `licenses/docsify-MIT.txt`；原站样式与 docsify-themeable 许可证沿用现有记录。这是参考界面的非官方复刻，未使用原站教程正文。

GitHub Pages 的文章、图片、样式和搜索路径使用 Astro `base` 与显式 `sitePath`，本地默认 `/`，发布为 `/agent-dev-foundations/`；文章逻辑 ID 保持不变。
