# 首页设计迁移

参考：https://chrichuang218.github.io/awesome-ui-design/

2026-10-15：用户确认本地版本，并明确授权提交、发布及部署 v0.1.3。

取证来源：参考页 HTML 的 `.hero` / `.featured` / `.collections`，`assets/index-DHztF7jg.css` 的首屏、圆点与卡片样式，以及 `assets/index-BYZZECwh.js` 的圆点动画与精选资源结构。

## 最终实现

- 保留本站侧栏、搜索、主题切换和文章页，首页样式局部生效。
- 主标题为“打好基础，驾驭 Agent。”，副标题为“从语言、框架到工程实践，积累 Agent 开发所需的基础知识。”
- 首屏右侧使用 A 标记及技术图标组成错位圆点，轻微 CSS 浮动；减少动态效果时停止动画，小屏隐藏。
- 八张卡片保留图标、分类标签、编号及简短内容介绍。删除篇数、重复导航文案、主题推荐区、常用链接和页尾口号。
- HTML、JavaScript、ES6、TypeScript 指向现有目录。React 指向 https://zh-hans.react.dev/learn。
- 2026-10-20（v0.1.7）：Next.js、Node.js、Python 改为外部入口，分别指向 https://nextjscn.org/docs 、https://nodejs.cn/learn 、https://docs.python.org/zh-cn/3/tutorial/ 。前两者是社区翻译站，与官方无关；没有开放许可，因此只做外链，不收录正文。此前三张卡片为无链接容器，淡色灰度显示；该样式仍保留给今后没有链接的卡片。
- 未新增本地教程、路由或侧栏分区，125 篇正文保持不变。
- 桌面首页顶部留白 40px，标题最大 46px，标题区最小高度 190px；卡片尺寸不变。当前约 1920×919 窗口可容纳两行卡片，较矮窗口自然滚动。
- 1200px 以下卡片两列，359px 以下单列；手机保留独立顶部留白。
- 技术图标来源与许可见 `licenses/language-logos-NOTICE.md`，署名集中在“关于本站”。

## 有意差异

资源截图改为对应技术图标；内容按本站用途替换。未复制参考页图片资产，鼠标距离驱动的逐帧动画改为 CSS 浮动。本次是设计迁移，不宣称整站或动效像素一致。

## 侧栏稳定性

`.sidebar { scrollbar-gutter: stable; }` 固定滚动条占位。修复前展开/收起时内容宽从 289px 变为 299px，品牌横坐标从 65.96875px 变为 70.96875px；修复后三次切换均为 65.96875px，纵坐标均为 27px。
