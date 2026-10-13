# Agent Dev Foundations

[在线阅读](https://chrichuang218.github.io/agent-dev-foundations/) · [GitHub](https://github.com/chrichuang218/agent-dev-foundations)

面向后端程序员的 Agent 开发基础知识参考站，按目录查阅 **HTML、JavaScript、ES6 和 TypeScript**，项目配置放在 TypeScript 的最后一组。保留阮一峰教程的完整讲解与必要示例，文章标题后直接展示正文，当前小节显示在侧栏目录；署名、版本、许可与逐篇来源集中在“关于”页。

项目名：`agent-dev-foundations`。本地目录：`D:\Develop\github\agent-dev-foundations`。原名为 TypeScript Guide，本次更名不改变文章 URL 或内容范围。

当前收录范围共 **125 篇**：HTML 17、JavaScript 38、ES6 37、TypeScript 33（27 篇语言知识与 6 篇项目配置）。HTML 和 ES6 两仓库的全部 `docs/**/*.md` 均纳入，包含上游目录未列出的章节。四个来源共 167 章，纳入 122 章（其中原 JavaScript 教程的 2 章按完整语言小节抽取），维持原有 45 章排除；另独立补充 3 篇工程配置文章。没有将完整教程改为摘要，本轮不加入精简目录按钮。

项目配置文章保留原有 `/config/*/` URL；旧 `/config/` 总览跳转到 `/typescript/#project-config`，不再作为独立顶层分区。

## 本地运行

需要 Node.js **22.12 或更高版本**（实际验证为 Node.js 24.15.0、npm 11.12.1）。

```sh
npm ci
npm run dev
```

打开终端显示的地址，默认 <http://127.0.0.1:4321/>。若端口已占用，Astro 会在终端显示新的端口。开发服务只绑定本机。

```sh
npm run build
npm run preview
```

`dist/` 是完整静态产物；`preview` 默认使用 4321 端口，可用 `npm run preview -- --port 4323` 指定端口。文章使用 `/typescript/generics/` 这样的独立 URL，可直接访问和刷新，无需 SPA 回退。没有后端、数据库、账户、统计代码或运行时 CDN 依赖。

## 检查

```sh
npm run verify
```

依次执行：锁定快照与逐章内容检查、Astro/TypeScript 类型检查、生产构建、正文保留及站内目标检查、搜索索引完整性检查，以及选定配置示例检查。搜索检查由 `scripts/check-search.mjs` 执行，核对文章覆盖、所有 H2/H3 锚点、正文分段和复制按钮文字排除；结果保存在 `docs/verification/`。

已启动生产预览时，可另运行 `npm run http:check -- http://127.0.0.1:4323`，按实际端口替换地址。它逐页验证 HTTP 状态和页面标题，并确认未知路径返回 404。

这些检查不等于全部示例都能独立执行。正文包含预期报错、伪代码和需要宿主环境的例子。实际浏览器验证、选定示例检查与工具版本见 [验证记录](docs/VERIFICATION.md)。

本轮 HTML / ES6 收录已通过 `npm run verify`、133 页 HTTP 检查与桌面/窄屏浏览器验证，详见 [本轮结果与截图](docs/HTML-ES6-VERIFICATION.md)。

## 阅读体验

- 采用指定参考站的单侧阅读布局；当前 H2 按需在目录内露出，鼠标或键盘正在操作侧栏时不抢滚动。顶部进度条与页尾“关于”入口保持移除。
- 首页和分区总览使用标题、表格与列表。文章完整展示正文，不再展示开头的“速查”和“阅读提示”；署名与逐篇来源集中在 `/about/`。
- 前后篇按全站文章顺序连续导航，可跨分区；采用原插件 SVG、标签、标题、分组副标题和悬停效果。普通跳篇从正文顶部开始，历史返回交给浏览器恢复位置。
- 正文 18px、代码 16px；桌面侧栏 300px，手机侧栏按参考站恢复为 260px，正文与代码字号保持不变。保留参考主题的 `55em` 正文宽度上限，不宣称像素一致。
- 浅色/深色切换；搜索可定位文章及 H2/H3 小节，支持多词匹配、摘要高亮和显式清空，目录保持可用。首次非空查询才请求同站索引，本页后续查询复用。
- 构建时 Shiki 高亮；复制通过 Clipboard API 显示原版弹出提示，成功或失败 1 秒后复位。正文小节标题可整段点击；返回顶部按钮在滚动超过 300px 时出现，并尊重减少动态效果偏好。
- 窄屏代码与表格独立横向滚动。
- 手机端复用同一个侧栏，展开时将正文向右推移，没有灰色遮罩或独立 X 关闭按钮；汉堡按钮保持三条横线。点击按钮、侧栏外正文或 Escape 收起，跳转文章、搜索结果或小节时也收起；搜索输入和目录折叠操作保持展开。保留可见键盘焦点、跳到正文和减少动态效果支持。

2026-10-13 本轮手机侧栏调整替代了原生 `dialog` 方案，仅供本地 review，不提交、推送、发布或部署。源码依据与有意差异见 [手机侧栏记录](docs/reference/mobile-sidebar.md)；此前版本的验证结果不代替这轮检查。

界面加载本地原版 `docsify-themeable@0.9.0` CSS、从 [指定参考站](https://github.com/Windy3f3f3f3f/how-claude-code-works) 提取的样式，以及分页 2.10.1、复制 3.0.2 插件的原始注入 CSS；使用静态组件和小型交互适配，未新增 npm 依赖。没有顶部通栏、面包屑或目录标签面板。来源、哈希和差异见 [UI 依据](docs/UI-REFERENCE.md)。

`dist/search.json` 包含全部文章及 H2/H3 小节入口，随内容重建，不依赖原教程在线服务。当前索引数量与检查结果见 [搜索检查](docs/verification/search-section-check.json)；完成本轮构建和检查后生成的结果才适用于新增内容。

## 目录结构

```text
content/
  upstream/          # 锁定的来源快照，保留原始字节，不直接编辑
  editorial.json     # 本地元数据覆盖、旧速查、注记、关联及空节补充
  html-source.json   # HTML 章节映射与必要资源清单
  es6-source.json    # ES6 章节映射与必要资源清单
  catalog.json       # 导入生成的来源章节目录
  local/             # 本站原创配置文章与独立目录
src/
  lib/content.ts     # Markdown、来源链接、标题与代码渲染
  components/        # 与参考站结构对应的侧栏和当前页目录
  layouts/           # 阅读布局
  pages/             # 静态首页、分区、文章和来源说明
  styles/            # 字号、静态结构及无障碍兼容层
  scripts/reader.ts  # 目录、主题、复制与阅读位置，无前端框架
  scripts/search.ts  # 按需加载本地全文索引
public/styles/       # 原版主题、分页/复制 CSS 与参考站样式
scripts/             # 可重复导入和验证
docs/                # 设计、来源、覆盖清单、验证记录及截图
licenses/            # 来源许可、原站声明证据
sources.lock.json    # 来源 commit、文件清单和 SHA-256
```

`.upstream/` 是本次核查时使用的临时 Git checkout，已忽略；安装、导入、构建和阅读都不依赖它。`node_modules/`、`dist/` 和 `.astro/` 均为派生产物。

## 内容维护

编辑单篇元数据、注记或相关知识：修改 `content/editorial.json` 中对应 ID。已有速查和阅读提示保留在编辑数据中，文章页不展示；新章节不要求补写 `syntax`，`summary` 继续用于搜索与页面描述。HTML、ES6 的默认章节元数据与图片映射分别保存在 `content/html-source.json`、`content/es6-source.json` 的 `chapters` 与 `assets` 中，本地编辑层可覆盖元数据，不改写原文快照。编辑本站配置文章：修改 `content/local/config/*.md`，必要时调整 `content/local/catalog.json`。

```sh
npm run content:import
npm run verify
```

导入重建 `content/catalog.json` 和 `docs/COVERAGE.md`，并按资源清单将必要图片复制到 `public/`、校验其哈希；不会覆盖 `editorial.json`、来源映射、本地补充或上游快照。缺少必要元数据的文章、无法解释的来源文件变化、资源哈希变化及陈旧生成目录都会明确失败。

更新上游需要先检查目标 commit 的许可与正文 diff，再显式更新快照、`sources.lock.json` 的版本和哈希、逐章映射及资源清单。不要只运行远程拉取然后盲目替换内容。步骤和边界见 [来源与维护记录](docs/SOURCES.md)。

Markdown 支持普通与波浪线代码围栏、GFM 表格、嵌套列表、引用和中文标题。原文需要展示的表格和上标采用受控渲染；教程中的 HTML 代码示例保持代码形式，不执行脚本。来源内部文档链接映射为站内路径；范围外参考仍保留外链。正文图片使用本地资源映射，新增图片须登记来源、许可和哈希；渲染器拒绝直接加载远程图片。

## 来源、范围与许可

- [设计范围](docs/SCOPE.md)、[术语](docs/GLOSSARY.md)。
- [逐章覆盖清单](docs/COVERAGE.md)：所有来源 Markdown 均登记，没有仅依赖上游导航。
- [来源 commit 与许可证据](docs/SOURCES.md)、[配置补充的官方依据](docs/CONFIG-SOURCES.md)。
- [HTML 来源核查](docs/HTML-SOURCE.md)、[ES6 来源核查](docs/ES6-SOURCE.md)：完整收录范围及来源许可差异。
- [许可说明](LICENSE.md)：原创程序 MIT，JavaScript 与本次 ES6 教程及整理 CC BY-SA 3.0，HTML、TypeScript 教程及整理 CC BY-SA 4.0，原创配置补充 CC BY-SA 4.0。**整个仓库不能统一按 MIT 使用。**

JavaScript 来源主要采用 ES5 语境；旧写法按历史背景保留。已发现的版本差异保存在本地编辑记录中，未宣称全面更新至最新规范。参考 UI 的主题 CSS 与站点样式按 MIT 保留署名；原站品牌、正文、图片和语言切换未引入；主题按钮与 GitHub 角标按参考还原，角标指向本站仓库，浏览器不加载原站的 Docsify 或 CDN 插件。

用户已授权首版推送、发布与 GitHub Pages 部署。来源与分项许可随仓库提供；本地根路径预览保留 `noindex`，发布构建使用仓库子路径。

## 贡献

修改应说明对应条目、来源依据和适用版本。正文纠错请在编辑层明确记录，不静默改写快照；更新来源需保留逐章清单、署名和许可。提交前运行 `npm run verify`，UI 改动还需检查桌面与窄屏代表页，并更新验证记录。

## 发布与部署

GitHub Actions 在 main 推送后用 Node.js 24.15.0 执行完整验证，通过后部署 GitHub Pages。工作流只使用 GitHub 内置令牌，不需要另存凭据。PR 只构建检查，不部署。

本地默认根路径；复现发布构建时设置环境变量 `SITE_BASE=/agent-dev-foundations/` 后运行 `npm run verify`。Windows PowerShell 使用 `$env:SITE_BASE="/agent-dev-foundations/"`。静态产物仍在 `dist/`，校验脚本使用同一环境变量核对前缀，关闭该环境变量后可继续原来的根路径本地预览。
