# 阅读交互对照与验收

2026-10-13。按用户要求对照参考站的真实插件、DOM、样式和操作，补齐适用于本知识站的阅读功能。不是只比较静态首页。

| 阅读交互 | 已落实与实际验证 |
| --- | --- |
| 上一篇 / 下一篇 | 采用 docsify-pagination 2.10.1 的原 DOM、SVG、标签、标题、分组副标题及提取 CSS。普通状态前项标题 opacity=0.3，悬停为 1 且仅标题加下划线，与原插件一致；整个链接区域可点。 |
| 翻页与历史 | 普通翻页回正文顶部，浏览器后退保留原阅读位置。实测编程风格 → debugger 为 scrollY=0；后退恢复到 14526。全部 71 篇连续排序，JavaScript Promise → TypeScript 语言简介的跨分区翻页通过。 |
| 搜索 | 保留原站显式清空按钮、结果摘要命中高亮、多关键词匹配、搜索期间保留目录。实测两个关键词出现 10 个结果和 31 个高亮，清空后焦点回搜索框。 |
| 搜索小节 | 索引使用实际渲染 ID，包含 71 篇入口与 791 个 H2/H3 锚点，共 862 条；正文不重复混入复制控件。搜索“类型参数的默认值”实际落在该小节，桌面 top=19.86px，390px 手机 top=19.67px。 |
| 代码复制 | 采用 docsify-copy-code 3.0.2 的原按钮/提示 DOM 与 CSS，中文文案。真实复制成功出现 success；受控拒绝探针出现 error；两者 1 秒复位并清空播报文字。探针已随重新加载移除，未更改浏览器权限。 |
| 返回顶部 | 沿用参考按钮外观、300px 阈值和平滑滚动，按本站实际 window 滚动绑定，尊重减少动态效果。实测回到 scrollY=0 并聚焦正文；没有恢复阅读进度条。 |
| 标题锚点 | 整个正文标题可点击，内联代码保留，原有标题 ID 不变。原标题已含链接时避免再嵌套链接。 |
| 目录跟随 | 当前小节变化且离开侧栏视口时，最小滚动使其可见；鼠标或键盘正在操作目录、或输入搜索时不争抢滚动。实测“参考链接”当前项位于侧栏 y=241–274px。正文到底时正确选中最后小节。 |
| 手机与键盘 | 390px 翻页自然换行，不撑宽页面；手机搜索可跳到小节并关闭目录。复制保留键盘焦点，不照搬原插件强制 blur；现有 Escape、跳到正文和单一定位条保留。 |

## 自动检查

- Astro/TypeScript：15 files，0 errors / warnings / hints。
- 生产构建：77 个静态 HTML 页面及本地搜索 JSON。
- 原文保留检查：8,067 个原文内容块。
- 搜索完整性检查：71 篇、862 条索引、791 个唯一有效锚点、7,616 个正文块，2,088 个复制按钮与反馈文本全部排除，errors=[]。
- 全站站内目标和 HTTP 检查通过；浏览过的生产页面无 console error / warning。
- 本次没有新增 npm 依赖，没有执行全部教程示例，没有进行跨浏览器或整站逐像素等价声明。

## 来源及保留边界

插件来源、CSS 哈希及 MIT 文本见 [分页证据](reference/pagination-notes.md)、[复制证据](reference/copy-notes.md) 与 `licenses/`。搜索和目录行为依据 Docsify 4.13.1 源码。

保留用户明确要求：不恢复顶部进度条、页尾关于、来源卡片或无关品牌/语言切换；保持正文 18px、代码 16px。原插件的废弃复制 API、静默失败和强制失焦不照搬。本站静态 URL、中文内容、原生手机对话框与跨分区内容组织是已登记适配。

## 证据

- [翻页悬停](verification/pagination-hover-restored.jpg) / [手机翻页](verification/pagination-mobile.jpg)
- [搜索高亮](verification/search-section-highlights.jpg) / [手机小节定位](verification/search-anchor-mobile.jpg)
- [复制提示](verification/copy-feedback.jpg) / [目录跟随](verification/reading-follow-and-top.jpg)
- [全站检查](verification/site-check.json) / [搜索检查](verification/search-section-check.json) / [HTTP 检查](verification/http-check.json)
