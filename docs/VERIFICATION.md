# 验证记录

日期：2026-10-13（Asia/Shanghai）。本记录区分正文完整性、网站功能和示例检查，不把构建通过等同于教程全部语义正确。

## v0.1.6 发布前验收 — 2026-10-18

用户明确授权提交 PR、合并、发布与部署。v0.1.5 上线后用户在 iPhone 上发现目录按钮仍不可见：v0.1.4 新增的手机顶栏在 `<main>` 外，目录按钮在 `<main>` 内，WebKit 中顶栏会盖住按钮。按用户要求将手机端恢复为 v0.1.3 样式（去掉顶栏，恢复目录按钮、260px 侧栏、GitHub 角标、正文边距和首页两列卡片），桌面端改动保留。使用 `SITE_BASE=/agent-dev-foundations/` 执行 `npm run verify` 全部通过：类型检查零诊断，站点与搜索检查无错误，8 个 JSON 示例和 1 个选定 TypeScript 示例通过。

浏览器验证（本地开发服务器，Chromium）：
- 375 宽度：外观与 v0.1.3 一致；页面中部打开目录正常，点击章节可跳转。
- 1600 宽度：820px 正文与右侧本页目录不变。

未做真实手机测试；上述问题仅在 iPhone（WebKit）出现，Chromium 无法复现。

## v0.1.5 发布前验收 — 2026-10-18

用户明确授权提交 PR、合并、发布与部署。修复手机下滑后顶栏连同目录按钮被收起、目录无法打开的问题（用户在 iPhone Chrome 上发现）：顶栏改为固定显示，移除滚动收起逻辑。使用 `SITE_BASE=/agent-dev-foundations/` 执行 `npm run verify` 全部通过：类型检查零诊断；37,563 个内部链接、32,063 个锚点引用无错误；搜索 1,511 个锚点无错误；8 个 JSON 示例和 1 个选定 TypeScript 示例通过。

浏览器验证（本地开发服务器，375 宽度）：
- 下滑约 1200px 后顶栏仍在顶部，目录按钮可点击。
- 页面中部打开目录正常；点击小节后侧栏收起，跳转到对应标题，顶栏与目录按钮保持可见。

未做真实手机测试。

## v0.1.4 发布前验收 — 2026-10-17

用户明确授权提交 PR、合并与发布。使用 `SITE_BASE=/agent-dev-foundations/` 执行 `npm run verify` 全部通过：类型检查零诊断；133 个 HTML、125 篇正文、16,238 个原文块；37,563 个内部链接、1,073 个本地资源和 32,063 个锚点引用无错误。搜索覆盖 1,636 条入口、1,511 个锚点；8 个 JSON 示例和 1 个选定 TypeScript 示例通过，未执行全部教程示例。前缀预览 `http://127.0.0.1:4339/agent-dev-foundations/` 的 133 页 HTTP 检查通过，未知路径返回 404。

浏览器验证（本地开发服务器）：
- 1600、1100、800、375 宽度均无横向溢出；本页目录仅在 1360px 以上显示并随滚动高亮，正文每行约 40 字。
- 375 宽度顶栏高 52px，目录按钮点击区域 52×52；下滑隐藏、上滑恢复；侧栏宽 319px，推移正文正常；小节跳转后标题距顶 68px。
- 浅色、深色及跟随系统主题；搜索时输入框保持固定，结果面板内滚动。
- 章节切换后被点击章节在侧栏中的位置不变；再次点击当前章节可展开或收起，不刷新页面。

未做真实手机测试。

## v0.1.3 发布前验收 — 2026-10-15

用户明确授权提交、发布与部署。使用 `SITE_BASE=/agent-dev-foundations/` 执行 `npm run verify` 全部通过：17 个类型检查文件零诊断；133 个 HTML、125 篇正文、16,238 个原文块；36,722 个内部链接、1,073 个本地资源和 31,222 个锚点引用无错误。搜索覆盖 1,636 条入口、1,511 个锚点；8 个 JSON 示例和 1 个选定 TypeScript 示例通过，未执行全部教程示例。

发布前缀预览地址 `http://127.0.0.1:4339/agent-dev-foundations/` 的 133 页 HTTP 检查通过，未知路径返回 404。已有根路径服务不适用于带前缀构建，因此另启临时前缀预览服务完成检查。

浏览器验证：
- 桌面首屏 scrollY=0，窗口高度 919px，第二行底部约 897px；八张卡片与技术图标正常显示。
- 四个本地目录带正确前缀，React 为官方中文文档外链；Next.js、Node.js、Python 为无 href、不可聚焦的 DIV。
- 390×844 浅色/深色布局两列，documentWidth=375，不超过窗口宽度，图片均加载成功。此前对同版响应式规则检查 360px 两列及 320px 单列，无横向溢出；未做真实手机测试。
- TypeScript 侧栏展开/收起时，标志 x=65.96875、y=27 不变。

截图：[桌面首页](verification/home-redesign-desktop.jpg)、[手机深色](verification/home-redesign-mobile-dark.jpg)、[侧栏](verification/sidebar-brand-stable.jpg)。设计范围与来源见 [首页设计记录](reference/homepage-design.md)。部署结果以 v0.1.3 的 GitHub Actions 和 Release 为准。

## v0.1.1 发布验收

用户在本地预览后明确要求部署发布，解除下方手机侧栏阶段的仅本地限制。发布前在 `/agent-dev-foundations/` 路径执行 `npm run verify` 全部通过：16 个文件类型检查无诊断，133 个 HTML（含跳转页），125 篇正文及 16,238 个原文块，7,994 个内部链接引用与 2,494 个锚点引用；搜索 1,636 条入口及 1,511 个小节锚点完整。

手机交互沿用下方本次实测证据，教程正文未改；配置示例检查通过，不代表执行了全部教程示例。线上构建、部署与固定提交以 [GitHub Actions](https://github.com/chrichuang218/agent-dev-foundations/actions) 和 [v0.1.1 Release](https://github.com/chrichuang218/agent-dev-foundations/releases/tag/v0.1.1) 的最终记录为准。

## 最新本地预览：手机侧栏按参考推移

本轮用户要求先本地 review，未提交、推送或触发线上部署。`http://127.0.0.1:4323/` 已更新；线上 v0.1.0 保持不变。

- 删除手机 dialog、独立 X、遮罩与重复目录。恢复原站 `<main>` 内的按钮、单一侧栏及相邻正文结构，使用主题的 `body.close` 推移；手机 260px，桌面仍为 300px。按用户明确要求，展开时仍显示汉堡而非 X。
- 390×844 浏览器对照：两站侧栏宽 260px、展开后侧栏 x=0 / 正文 x=260；根内容宽均为 375px（其余为浏览器滚动条），没有新增横向页面滚动。见 [几何对照](verification/mobile-sidebar-push-comparison.json)。
- 实测打开菜单、点击露出的正文收起、Escape 及焦点回菜单、分区折叠保持展开、切换章节后收起；搜索输入保持展开，点击搜索结果进入对应章节并收起。
- 手机“模块定位”小节跳转后标题距顶部约 20px，正文回到 x=0，window 与 main 横向滚动均为 0。桌面收起/恢复 300px 侧栏正常；控制台无 error。
- `check`：16 个文件，0 errors / warnings / hints；`build`：132 个内容页面和 1 个跳转页；`site:check`、`search:check`、`http:check` 通过，125 篇及 16,238 个原文块保持完整。
- 截图：[本地展开](verification/mobile-sidebar-push-open.jpg)、[本地收起](verification/mobile-sidebar-push-closed.jpg)、[参考展开](verification/mobile-sidebar-reference-open.jpg)。临时视口已恢复；使用浏览器窄屏验证，没有声称进行了 iPhone 真机测试。

源码依据与适配边界见 [手机侧栏记录](reference/mobile-sidebar.md)。

## 最新：更名为 Agent Dev Foundations

- 项目与 npm 包名改为 `agent-dev-foundations`，网站标题、首页、侧栏、页面标题后缀与图标已更新；定位为面向后端程序员的 Agent 开发基础知识。
- 完整仓库迁至 `D:\Develop\github\agent-dev-foundations`，包括 `.git`、来源快照、`skills/` 和既有未跟踪文件。仍为 `main`，Git 身份不变，无提交或远程变更。
- Windows 因目录占用拒绝直接重命名；随后逐项迁移全部内容。旧 `D:\Develop\github\typescript-guide` 仅剩空 `.git` 目录。清理此空目录被自动审批返回 `blocked by policy`，已停止清理，没有换工具删除。
- 从新目录执行 `content:check`、`build`、`site:check`、`http:check` 全部成功：125 篇正文、16,238 个原文块、133 个 HTML（含 1 个跳转页）及原有链接保持有效。
- 生产预览从新目录重新启动于 `http://127.0.0.1:4323/`，参考服务恢复于 4322。浏览器实见首页、侧栏与标题为 Agent Dev Foundations；截图：[更名后的首页](verification/renamed-home.jpg)。
- 浏览器侧栏位置继续使用原存储键，以保留既有阅读位置；历史截图、历史路径及技能案例名称不追溯改写。后续项目操作使用新目录。

## 最新：项目配置归入 TypeScript

2026-10-13：顶层改为 HTML、JavaScript、ES6、TypeScript 四分区。TypeScript 共 33 篇，最后一组“项目配置”包含原来的 6 篇，编号 28–33；所有 `/config/*/` 文章 URL 保留，旧 `/config/` 总览通过 Astro 静态重定向到 `/typescript/#project-config`。文章总数仍为 125。

- 实际执行 `content:import`、`content:check`、`check`、`build`、`site:check`、`search:check`、`http:check`，全部成功。类型检查 0 errors / warnings / hints；构建 132 个内容页面和 1 个静态跳转页面。
- 16,238 个原文块完整保留；13,947 个站内链接引用、3,340 个锚点引用、1,059 个资源引用通过。搜索保留 1,636 条入口与 1,511 个锚点，配置文章的分区同步为 TypeScript。
- 133 个静态页面 HTTP 检查与未知路径 404 通过；自动检查同时验证四个顶层目录、文章所属分区及旧总览的跳转目标。
- 浏览器实际访问 `/config/`，到达 TypeScript 的项目配置组，6 个入口齐全且位于最后。打开旧 `/config/tsconfig/` 地址并刷新，TypeScript 分区展开且当前文章高亮；上一篇到注释指令，再下一篇返回 tsconfig，正文回顶部。
- 390×844 手机目录确认四个顶层分区及最后的 6 个配置入口，Escape 关闭正常；控制台无 error，临时视口已恢复。截图：[桌面配置文章](verification/typescript-config-desktop.jpg)、[手机配置目录](verification/typescript-config-mobile.jpg)。
- 本次仅调整目录归属，未改正文或重跑教程示例；没有新增依赖或 Git 提交。

**此前 HTML / ES6 收录的验证见 [HTML-ES6-VERIFICATION.md](HTML-ES6-VERIFICATION.md)。下文保留之前阶段的历史结果，五分区等旧描述已被上方最新目录结构替代。**

本文的浏览器截图和三栏布局记录来自初次交付。当前已采用原版主题和整体布局，最新验证与截图见 [REFERENCE-VERIFICATION.md](REFERENCE-VERIFICATION.md)。`site-check.json` 与 `http-check.json` 会由每次检查更新为当前构建结果。

## 2026-10-13：取消文章开头附加区块

按最新要求，全部 71 篇取消“速查”和“阅读提示”展示，标题后直接进入正文；同时移除人工速查目录项与专用样式，编辑数据保留。下方历史记录中的速查与注记展示不再代表当前页面。

- `npm run check`：15 个文件，0 errors、0 warnings、0 hints；`npm run build`：77 页成功。
- `npm run site:check`：71 篇、8,067 个原文内容块、7,300 个站内链接、1,744 个锚点引用、616 个本地资源引用通过，检查同时拒绝已移除区块回归。
- `npm run search:check`：862 条入口、791 个小节锚点、7,616 个正文块通过；`npm run http:check`：77 页与未知路径 404 通过。
- 浏览器实际打开 TypeScript 模块、JavaScript 编程风格、package.json 三篇，均确认标题后直接正文、两类区块数量为 0；控制台无 error。截图：[移除附加区块后的文章](verification/article-without-callouts.jpg)。本轮未改正文，未重新执行教程示例。
- 本轮检查时生产预览 `http://127.0.0.1:4323/` 与参考服务 `http://127.0.0.1:4322/` 均在本机监听并保留运行；下方停止服务的文字为早期记录。

## 环境与运行

| 项目 | 实际版本或结果 |
| --- | --- |
| 系统 | Windows，PowerShell 7 |
| Node.js / npm | 24.15.0 / 11.12.1 |
| Astro | 7.3.8 |
| TypeScript / @astrojs/check | 6.0.3 / 0.9.10 |
| Markdown / 高亮 | markdown-it 15.0.2 / Shiki 4.5.0 |
| 浏览器 | Codex 内置浏览器，Chrome 155.0.0.0 |
| 当前生产预览 | http://127.0.0.1:4323/ ，仅本机监听 |

真实执行 `npm ci` 成功，随后执行 `npm run verify` 全部通过。开发服务 `npm run dev` 已实际启动并打开文章；完成后停止开发服务，仅保留生产预览。参考站临时 4322 服务已经停止。没有提交、推送、创建 PR、远程仓库或部署。

首次选择 TypeScript 7 时，`@astrojs/check` 的 peer 范围不支持，已改为它支持的 6.0.3；未使用 force 或 legacy-peer-deps。初次渲染中 markdown-it 15 不再公开旧 Token 内部路径的问题已改用公开的 `MarkdownIt.Token`，最终构建及浏览器没有该错误。

## 内容完整性

- 两个来源的 113 个知识文档全部登记：JS 82、TS 31；另登记 2 个 README。
- 纳入 68 个来源页面（JS 38、TS 27、配置 3），排除 45 章。纳入数包含 ArrayBuffer 和 debugger 两个部分纳入页，按完整语言小节截取并登记理由。
- 增加 3 个独立配置条目，合计 71 篇文章；另有首页、3 个分区、关于和 404，共 77 个静态 HTML 文件。
- `content:check` 检查全部锁定快照文件及 SHA-256、重新生成结果、速查字段、正文文件和关联 ID，全部通过。
- `site:check` 逐段比较来源与构建正文：**8,067 个原文段落、标题或代码块**保留检查通过。不是只检查页面数量或文章长度。
- 构建产物检查 **15,290 个站内链接引用、2,856 个锚点引用、154 个本地资源引用**，无缺失目标；数字包含导航中重复出现的引用，不是独立目标数。
- 全部文章具有正文、速查、来源、相关条目，没有空节；上游 ES6 稿件中的 Set 与 Promise 空节已独立标记补齐。
- Git 默认 core.autocrlf=true，已用 `.gitattributes` 对快照禁用换行转换；实测直接 hash 与带 Git 路径过滤的 hash 相同，防止跨平台检出破坏锁定字节。

机器结果：[site-check.json](verification/site-check.json)、[逐章清单](COVERAGE.md)。

## 类型、构建与 HTTP

- `astro check`：9 个源码文件，0 errors、0 warnings、0 hints。
- `astro build`：77 个页面生成成功。
- `http:check`：77 个静态页面逐个 HTTP 请求成功，响应 H1 与对应构建文件一致；未知路径返回 404。
- 静态页面检查拒绝外部脚本、图片与样式依赖；代表页资源记录只有本站路径。页面不含追踪脚本或远程字体。

HTTP 结果：[http-check.json](verification/http-check.json)。运行预览后可复查：

```sh
npm run http:check -- http://127.0.0.1:4323
```

## 浏览器视觉与交互

生产产物的代表页在 **1280×720** 与 **390×844** 检查：

| 页面 | 内容与检查 |
| --- | --- |
| `/javascript/types/function/` | 长篇正文、多级标题、70 个正文代码块、当前章高亮、页内目录 |
| `/typescript/generics/` | 密集代码、44 个正文代码块、长代码的局部横向滚动 |
| `/config/package-json/` | 表格、配置代码、相关知识、来源与跨页链接 |

实际交互通过：

- 直接打开文章；点击中文锚点，刷新后保留锚点及位置。桌面目标位于约 94px，不被固定顶栏遮挡。
- 前后章节双向跳转；三分区目录实际显示 38 / 27 / 6 篇。
- 点击复制后通过浏览器 Clipboard API 读回泛型速查代码，内容准确；读回结果不是只依据按钮成功文案。
- 移动目录打开、选章跳转；Escape 关闭后焦点返回目录按钮；移动页内目录在选择后收起。
- Tab 首先到“跳到正文”；Enter 后焦点落在 main-content。
- 窄屏整页无横向溢出。配置表格容器宽 329px、内容宽 513px；右方向键滚动后 scrollLeft=40。泛型页有 8 个需局部横滚的长代码块，不撑宽页面。
- 浏览过的生产页面未记录 console error 或 warning。未做全部浏览器、辅助设备或正式 WCAG 审计。

结构化记录：[browser-check.json](verification/browser-check.json)。

截图：

- [参考站桌面](verification/reference-desktop.jpg)
- [首页](verification/home-desktop.jpg)
- [函数桌面](verification/function-desktop.jpg) / [函数窄屏](verification/function-mobile.jpg)
- [泛型桌面](verification/generics-desktop.jpg) / [代码正文桌面](verification/generics-code-desktop.jpg) / [代码正文窄屏](verification/generics-code-mobile.jpg)
- [表格桌面](verification/package-table-desktop.jpg) / [表格窄屏](verification/package-table-mobile.jpg)
- [窄屏目录](verification/mobile-navigation.jpg) / [来源与相关知识](verification/related-desktop.jpg)

## 示例检查与限制

- 68 条来源速查依据原文逐条整理，并由另一 Agent 独立核对；发现的原文错误以显式注记说明，包括类型断言、tsconfig 与 Promise 的边界。这不构成完整原文语义审计。
- 38 个 JavaScript 速查片段通过 Node.js `vm.Script` 语法解析，**没有执行这些片段**。见 [source-quickrefs.json](verification/source-quickrefs.json)。
- `examples:check` 从配置正文与速查中读取 8 个 JSON 示例，解析通过。
- 从模块解析文章中抽取一个 NodeNext 双文件示例，用 TypeScript 6.0.3 在内存编译：0 诊断，产生两个 JS 文件并保留 ESM 导入。**没有执行输出代码**。
- 见 [example-check.json](verification/example-check.json)；可重复运行 `npm run examples:check`。
- 没有逐个运行全部 JS/TS 正文示例，没有宣称原文全面更新至最新语言规范；也未遍历验证所有历史外部参考链接。

## 清理状态

开发服务与参考服务已停止，验证用的临时视口已恢复；构建产物、源码快照、来源证据和截图保留。

删除本次临时源码检出目录 `D:\Develop\github\typescript-guide\.upstream` 的操作被自动审批策略在 PowerShell 启动前拒绝，仅返回 `blocked by policy`。因此该目录仍存在，没有声称删除成功，也没有换工具绕过拒绝。目录已被 `.gitignore` 排除，安装、构建与正常阅读不依赖它。其余交付物与必要验证已完成。
