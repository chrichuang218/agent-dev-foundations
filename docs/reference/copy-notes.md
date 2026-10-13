# 参考站代码复制交互取证

核查日期：2026-10-13。固定版本 **docsify-copy-code 3.0.2**；只读元数据、许可与构建源码，没有执行第三方插件或安装脚本。

## 来源与静态资产

| 项目 | 记录 |
| --- | --- |
| npm 元数据 | <https://registry.npmjs.org/docsify-copy-code/3.0.2> |
| 源码项目 | <https://github.com/jperasmus/docsify-copy-code> |
| 可读构建源码 | <https://cdn.jsdelivr.net/npm/docsify-copy-code@3.0.2/dist/docsify-copy-code.js> |
| 压缩插件 | <https://cdn.jsdelivr.net/npm/docsify-copy-code@3.0.2/dist/docsify-copy-code.min.js> |
| 原始许可 | <https://cdn.jsdelivr.net/npm/docsify-copy-code@3.0.2/LICENSE> |
| 许可与版权 | MIT；`Copyright (c) 2017 JP Erasmus` |
| 本地许可 | `licenses/docsify-copy-code-MIT.txt`，1,067 bytes |
| 本地 CSS | `public/styles/reference-copy.css`，926 bytes |

CSS 从可读构建文件第 42 行的 `var css_248z = "..."` 赋值中按 JSON 字符串解析提取，未执行 `styleInject` 或插件代码，未增加换行或改写样式。已确认此 CSS 字符串也完整存在于固定版本压缩插件中。CSS 无 `url()`、`@import` 或外部字体请求。

| 文件 | SHA-256 |
| --- | --- |
| 可读插件 | `E9C4714CF00DC8B58DBCCED13858DAA4384C0285449707754F027FC174615736` |
| 压缩插件 | `326D2F90CC4C8006FFAD64809B1DC01CC442E055DB4FDA91A53D50A90B5ABB77` |
| 本地 CSS | `453B814C6C9B2AE57DA16B61EF131FBE21A1367F1FA82E73D3AC8CED90C59113` |
| 本地许可 | `E77510F86EF5DDB3EE7DF49CACF37476B9942E3078AB1F8C4385808B2A1A1B41` |

## 原版 DOM 与默认文案

参考 `index.html` 没有设置 `copyCode` 文案覆盖。插件第 45–48 行的默认文案是 `Copy to clipboard`、`Error`、`Copied`。第 51、66–69 行给每个 `pre[data-lang]` 在末尾插入以下按钮，按钮属于 `pre`，并非外部标题栏：

```html
<button class="docsify-copy-code-button">
  <span class="label">Copy to clipboard</span>
  <span class="error" aria-hidden="hidden">Error</span>
  <span class="success" aria-hidden="hidden">Copied</span>
  <span aria-live="polite"></span>
</button>
```

以上保留源码原貌。源码的 `aria-hidden="hidden"` 不是规范布尔值；静态接入时使用 `aria-hidden="true"`，并可补 `type="button"`。如果本站选择中文文案，应登记为本地化适配，不称其为原站默认文案。

## 状态、提示与时序

- 按钮默认透明；`pre:hover .docsify-copy-code-button` 或按钮 `:focus` 时显示，样式过渡为 `all .25s ease`。
- 按钮右上角绝对定位；`.label` 始终保留按钮文案，不通过替换按钮 `textContent` 显示结果。
- 复制成功给按钮添加 `.success`，失败抛异常时添加 `.error`。对应子 `span` 从透明变为不透明，并移动至按钮左侧：`right:100%; transform:translate(-25%,-50%)`。
- 成功和失败都将结果文案写入按钮内 `span[aria-live]`，在 **1,000ms** 后移除状态类并清空播报区域（第 89–105 行）。
- 原插件在 **1,500ms** 后调用按钮 `blur()`（第 107–109 行）；这不是提示复位时间。本站为保留键盘焦点可不照搬强制失焦，应将此作为无障碍适配。
- 原主题用 `--copycode-background` / `--copycode-color` 覆盖部分颜色和圆角。需要一起加载原主题、参考站样式和此 CSS，不能用另外绘制的提示代替这些规则。

## 行为与验证边界

原插件用选区和 `document.execCommand('copy')` 复制 `pre > code`，之后清理选区。返回 `false` 时源码没有进入成功或异常分支；接入时不必照搬这一静默失败，也不必采用废弃 API。可保留本站 Clipboard API，以相同 DOM、状态类和提示时序反馈真实成功或失败。

本记录确认的是实际源码、许可和提取资产。成功/失败提示、键盘焦点、深色和窄屏显示仍以接入后的浏览器验证为准；没有运行原插件来声称复制功能已验证。
