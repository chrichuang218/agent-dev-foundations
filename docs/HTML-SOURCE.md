# HTML 来源整理记录

核查日期：2026-10-13。来源为 [wangdoc/html-tutorial](https://github.com/wangdoc/html-tutorial)，固定提交 `37cd99758286dc6734d1d1a897c820eb8890b984`。

## 完整性

- `docs/` 实际有 **17 篇** Markdown，全部完整纳入；无教学章节排除或截取。
- `chapters.yml` 列出 16 篇，顺序保留。额外存在的 `mobile.md`（移动设备网页设计）追加到该分区末尾，没有因其未出现在上游菜单而遗漏。
- 仓库 `README.md` 是 2 段教程简介，保留原始快照并登记为非章节，不重复生成文章页。
- 快照共 **23 个文件**：17 篇正文、README、package.json、chapters.yml、loppo.yml，以及 2 张教学配图。
- 17 篇正文合计 290 个 fenced code block、175 个标题（含每篇 H1）、9 个 Markdown 外部参考链接；未发现 Markdown 相对链接或 Markdown 表格。HTML 表格、脚本、表单及多媒体均有完整示例，示例路径不是站点需发起的资源请求。
- 机器可读章节清单：`content/html-source.json`，包含全部 18 个 Markdown 的纳入决定、每章稳定路径、来源文件、摘要和图片映射。固定来源版本与全部快照文件 SHA-256 统一维护在 `sources.lock.json` 的 `sources.html`，不在清单内重复维护来源版本。

## 章节

| 原文件 | 标题 | 站内路径 | 上游菜单 |
| --- | --- | --- | --- |
| `docs/intro.md` | HTML 语言简介 | `/html/intro/` | 已列出 |
| `docs/url.md` | URL 简介 | `/html/url/` | 已列出 |
| `docs/attribute.md` | 网页元素的属性 | `/html/attribute/` | 已列出 |
| `docs/encode.md` | HTML 字符编码 | `/html/encode/` | 已列出 |
| `docs/semantic.md` | 网页的语义结构 | `/html/semantic/` | 已列出 |
| `docs/text.md` | 文本标签 | `/html/text/` | 已列出 |
| `docs/list.md` | 列表标签 | `/html/list/` | 已列出 |
| `docs/image.md` | 图像标签 | `/html/image/` | 已列出 |
| `docs/a.md` | `<a>` | `/html/a/` | 已列出 |
| `docs/link.md` | `<link>` | `/html/link/` | 已列出 |
| `docs/script.md` | `<script>`，`<noscript>` | `/html/script/` | 已列出 |
| `docs/multimedia.md` | 多媒体标签 | `/html/multimedia/` | 已列出 |
| `docs/iframe.md` | iframe | `/html/iframe/` | 已列出 |
| `docs/table.md` | 表格标签 | `/html/table/` | 已列出 |
| `docs/form.md` | 表单标签 | `/html/form/` | 已列出 |
| `docs/elements.md` | 其他标签 | `/html/elements/` | 已列出 |
| `docs/mobile.md` | 移动设备网页设计 | `/html/mobile/` | 未列出，显式纳入 |
| `README.md` | 仓库简介 | — | 非知识章节，保留来源证据 |

## Markdown 与资源处理

源码中 `<a>`、`<link>`、`<script>` 等标题作为字面文本显示。Markdown 渲染只允许上标 `<sup>` 和 `table.md` 的原始表格示例（严格检查元素与属性）；其他原始 HTML 转义显示。不会执行示例中的脚本、表单、iframe、音频或视频，代码示例完整保留。

`mobile.md` 的在线同名路径实测返回网道首页，本站来源链接改用固定 commit 的 GitHub 文件，正文仍完整收录。两张图片使用本地地址，并在资源清单补充替代文字与原始尺寸，保留比例以适配窄屏。

`image.md` 仅有的两张正文图片已本地化；Markdown 中原始 URL 保持不变，由整理清单映射到 `/media/html/bg2019061002.jpg` 和 `/media/html/bg2019061003.jpg`。其他代码块中的 `foo.jpg`、`example.mp4`、`javascript.js` 等属于教学示例，不应下载或改写成站点依赖。

来源仓库没有独立 LICENSE，`package.json` 明确声明 CC BY-SA 4.0，在线页尾声明 3.0，差异及 MDN 配图来源已逐项记录于 `licenses/HTML-NOTICE.md` 与 `licenses/html-source-evidence.json`。未执行来源仓库的安装、构建、部署脚本，也未纳入部署密钥、统计或评论代码。

## 后续维护

`content/upstream/html/` 是锁定的只读来源快照。新增本地修订保存在来源快照以外，不直接编辑原始 Markdown。刷新来源时先审阅新提交与目录差异，再显式更新 `content/html-source.json` 的章节清单，以及 `sources.lock.json` 中的版本和锁定哈希。

Windows 系统 Git 配置 `core.autocrlf=true` 会改变检出文件的换行。本次正文和仓库元数据从 `git show <commit>:<path>` 的原始 Buffer 写入快照，SHA-256 对应 Git 原始字节，不依赖工作树换行转换。图片记录实际下载 URL 与独立 SHA-256。再次运行内容整理只消费已锁定快照，不需要实时连接 wangdoc。

本文记录来源与结构核查；没有宣称全部 HTML 示例在现代浏览器逐条运行，亦没有将来源中的历史描述统一更新为当前标准。站点构建、资源链接、导航与浏览器验证由项目验证记录说明。

本次来源核验通过：17/17 教学章节已登记、18/18 原仓库 Markdown 文件均有明确决定、23 个快照文件 SHA-256 一致、所有 Markdown 与固定 commit 的 Git blob 字节相同、2 张图片均有有效 JPEG 文件头，5 个在线许可或图片出处证据请求均返回 HTTP 200 并保存相关片段。
