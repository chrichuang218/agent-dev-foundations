# v0.1.0 首版发布记录

用户已明确授权远端推送、首版发布与部署。目标仓库：`chrichuang218/agent-dev-foundations`，托管地址：<https://chrichuang218.github.io/agent-dev-foundations/>。

## 本地验收

- `content:check`：125 篇文章、锁定文件与离线生成目录通过。
- `check`：16 个文件，0 errors / warnings / hints。
- 根路径与 `/agent-dev-foundations/` 发布路径分别构建，`site:check` 与 `search:check` 均通过：16,238 个原文内容块、1,636 条搜索入口、1,511 个搜索锚点。
- 发布路径 HTTP：133 个 HTML（含配置总览跳转）身份正确、未知路径 404。
- 既有配置示例：8 个 JSON 解析与一个 NodeNext 内存编译通过；不是全教程示例运行验证。
- 浏览器：发布路径搜索打开原 `/config/tsconfig/`；桌面与 390×844 窄屏主题切换正常，刷新保留主题，无整页横向溢出。
- 与运行的参考站对照：GitHub SVG 三条 path 完全相同；SVG 宽 70px、主题按钮宽 34px、工具组 top 12px / right 100px 一致。原版 CSS 提供悬停和手臂动画。差异仅为本站仓库链接与可访问性适配，详见 [控件记录](reference/top-controls.md)。
- 待发布文件的常见 GitHub / OpenAI token 与私钥标记扫描未发现命中；`.upstream`、依赖、构建目录和日志均被忽略。

证据：[几何与 SVG 对照](verification/top-controls-comparison.json)、[深色桌面](verification/top-controls-dark.jpg)、[深色窄屏](verification/top-controls-mobile.jpg)。

## 发布流程

主分支推送触发 `.github/workflows/pages.yml`：安装锁定依赖，运行 `npm run verify`，成功后部署 Pages。远端构建、部署结果以 GitHub Actions 为准，发布 tag 与 Release 固定到通过检查的 commit。最终公网地址、版本及线上核查结果同时记录在 GitHub Release 中。

教程内容和 UI 程序分别按各自许可提供，署名与许可差异保留在 [LICENSE.md](../LICENSE.md)、[来源记录](SOURCES.md) 与 `/about/`。不声明全站像素一致，也不声明所有历史提案和示例均已适用于最新运行环境。
