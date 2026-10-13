# 单侧目录与阅读排版修订

日期：2026-10-13。针对用户反馈的双目录拥挤、100% 显示过小及视觉层级不足，实际修改网站并重新构建；未更改 71 篇正文或引入依赖。

本文记录第一轮字号与单栏调整。后续目录改为“章节 / 本页”视图，并删除阅读页噪声说明，当前状态见 [NAVIGATION.md](NAVIGATION.md)。

## 当前设计

- 删除右侧目录，当前文章的小节嵌入左侧当前章节下，可折叠。桌面与手机抽屉复用 `ArticleOutline.astro`。
- 侧栏宽 300px，标题和阅读指南固定，章节区滚动；正文采用单列，上限 880px。
- 正文 18px、代码 16px、章节文字 16px；页内小节 15px / 14px。手机端不缩小正文与代码。
- 增加标题字重与留白，调整速查边框、文字对比度、首页和分区卡片字号；保留白底紫色，没有加载新字体或动画插件。
- 900px 以下使用单个目录抽屉，同时包含章节与本页小节。点击小节后关闭抽屉并聚焦目标，Escape 回到菜单按钮。

## 实际测量

同一内置浏览器窗口、1284×836 视口，`visualViewport.scale=1`：

| 项目 | 修改前 | 修改后 |
| --- | ---: | ---: |
| 正文 | 15px | 18px |
| 代码 | 13px | 16px |
| 章节文字 | 12.5px | 16px |
| 正文可用宽度 | 688px | 857px |
| 独立右栏 | 有 | 无 |

390×844 手机视口实测正文 18px、代码 16px。检查泛型、package.json、any/unknown/never 长标题及首页，整页没有横向溢出；长代码和表格在自身容器滚动。表格容器宽 329px，内容宽 621px，右方向键使 `scrollLeft` 到 40px。

## 验证结果

- `npm run check`：10 files，0 errors / warnings / hints。
- `npm run build`：77 个静态页面成功。
- `npm run site:check`：71 篇正文、8,067 个来源内容块、15,214 个站内链接引用、2,780 个锚点引用、154 个本地资源引用通过。
- `npm run http:check`：77 页响应内容正确，未知 URL 返回 404。
- 桌面小节点击与高亮一致；刷新后锚点仍保留，标题位于页头下方约 102px。
- 手机抽屉点击小节后关闭并聚焦目标，标题位于约 146px；Escape 关闭时焦点返回目录按钮。
- 修复了分区箭头非正方形盒子旋转导致约 11px 溢出的问题；当前侧栏导航 `clientWidth=scrollWidth=251px`。
- 修复了滚动高亮判断线高于锚点落点约 2px 的问题；点击后不再高亮上一小节。
- 复制按钮点击后 Clipboard 写入成功并显示状态；本次通过 CDP 独立读回时工具超时，未把它记为新的完整剪贴板回读验证。首次交付的完整回读证据保留在原验证记录。
- 本次代表页浏览未记录 console error / warning；未进行跨浏览器或完整辅助设备审计。

## 截图

- [修改前](verification/readability-before.jpg) / [当前文章](verification/readability-desktop.jpg)
- [桌面代码正文](verification/readability-code-desktop.jpg) / [手机代码正文](verification/readability-code-mobile.jpg)
- [桌面表格](verification/readability-table-desktop.jpg) / [手机表格](verification/readability-table-mobile.jpg)
- [手机长标题](verification/readability-long-title-mobile.jpg)
- [桌面首页](verification/readability-home-desktop.jpg) / [手机首页](verification/readability-home-mobile.jpg)

当前预览：<http://127.0.0.1:4323/>。参考站仍单独运行在 4322，未修改其源码。本次没有提交、推送或部署。
