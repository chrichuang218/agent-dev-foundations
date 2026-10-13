# 手机侧栏：推移布局

2026-10-13：用户指出手机侧栏未复刻参考站，并明确不要 X 关闭按钮。本轮替代首版的原生 `dialog`，仅供本地 review，不提交、推送、发布或部署。这里记录源码依据与适配，不表示运行检查已经通过。

## 布局依据

参考 `index.html` 的固定副本见 [index.html.txt](index.html.txt)：第 15 行为 `--sidebar-width: 260px`，第 289 行引入 Docsify 4。本站手机侧栏恢复此宽度，桌面仍保留用户此前要求的 300px；正文 18px、代码 16px 不变。

`public/styles/reference-theme.css` 保持 docsify-themeable 0.9.0 原始字节，以下仅拆行摘录关键规则；版本、哈希和许可见 [theme-notes.md](theme-notes.md)。侧栏必须紧邻正文，`.sidebar + .content` 才会生效。

```css
.sidebar, .sidebar-toggle, .sidebar + .content {
  transition: all var(--sidebar-transition-duration) ease-out;
}
@media (max-width: 47.99em) {
  body.close .sidebar,
  body.close .sidebar-toggle,
  body.close .sidebar + .content {
    transform: translateX(var(--sidebar-width));
  }
  body.close .sidebar-toggle { width: 100%; max-width: none; }
  body.close nav.app-nav, body.close .github-corner { display: none; }
}
```

原主题的 `.sidebar` 固定于 `right:100%`，手机关闭时在屏幕外；展开时推入屏幕，同时正文和菜单按钮向右移动。按钮是透明点击区，展开后覆盖右侧被推开的正文，不是变暗的模态遮罩。参考站不锁定正文滚动。

## JavaScript 与按钮结构

原始代码保存于忽略目录 `.upstream/reference-evidence/docsify.js`；本次读取的 `docsify@4` 与 [固定版本 4.13.1](https://cdn.jsdelivr.net/npm/docsify@4.13.1/lib/docsify.js) 内容一致。该保存文件 SHA-256：`996922D2C09C2D0BF444B37A63DC8A4B916F48D4C564B4B8BD10EA05907CBF36`。Docsify MIT 许可见 [docsify-MIT.txt](../../licenses/docsify-MIT.txt)。以下保留所用片段，方便没有 `.upstream/` 时复核；没有引入 Docsify 运行时。

第 110 行以初始页面宽度判断移动端：

```js
var isMobile = document.body.clientWidth <= 600;
```

第 944–984 行，菜单按钮切换 `body.close`；移动端 body 点击时收起，章节链接另切换小节折叠类：

```js
function btn(el) {
  var toggle = function (_) { return body.classList.toggle('close'); };

  el = getNode(el);
  if (el === null || el === undefined) {
    return;
  }

  on(el, 'click', function (e) {
    e.stopPropagation();
    toggle();
  });

  isMobile &&
    on(
      body,
      'click',
      function (_) { return body.classList.contains('close') && toggle(); }
    );
}

function collapse(el) {
  el = getNode(el);
  if (el === null || el === undefined) {
    return;
  }

  on(el, 'click', function (ref) {
    var target = ref.target;

    if (
      target.nodeName === 'A' &&
      target.nextSibling &&
      target.nextSibling.classList &&
      target.nextSibling.classList.contains('app-sub-sidebar')
    ) {
      toggleClass(target.parentNode, 'collapse');
    }
  });
}
```

第 4122–4127 行的按钮生成片段；外层是 `div`，三条横线才是 `span`，避免外层误中主题的 `span:nth-child()` 选择器：

```js
'<button class="sidebar-toggle" aria-label="Menu">' +
'<div class="sidebar-toggle-button">' +
'<span></span><span></span><span></span>' +
'</div>' +
'</button>' +
'<aside class="sidebar">' +
```

Docsify 搜索插件对搜索框中的非结果点击调用 `stopPropagation()`，避免输入时触发 body 收起。相关源码为 [4.13.1 的 search.js](https://cdn.jsdelivr.net/npm/docsify@4.13.1/lib/plugins/search.js)。原站核心没有 `touchstart`、`touchmove` 或 `touchend` 侧栏手势，本轮不增加 swipe。

## 本站有意适配

- 按用户明确要求，取消原主题展开时将三条横线旋成 X 的样式，展开后仍为汉堡图标；删除原先独立的右上 X。
- 只保留一个 `aside.sidebar`，紧邻正文；手机/桌面共用内容、搜索和当前章节状态，继续按分区及设备宽度分别保存滚动位置。
- 使用随窗口变化的移动断点，手机展开时为 `body.close`，桌面则用同一个类表示收起。目录按钮的透明点击区负责点击正文收起；跳转文章、搜索结果或同页小节时也收起，输入搜索、切换分区折叠及当前章小节折叠时保持展开。
- 保留 Escape 关闭并返回菜单焦点；隐藏侧栏设为 `inert`，手机目录展开时正文设为 `inert`。不使用 `dialog`、焦点圈定或背景滚动锁定；键盘焦点只描边小按钮，不描边整个透明点击区。
- 删除 `.mobile-sidebar`、`.close-drawer`、`::backdrop` 及 `drawer-open` 方案；保留减少动态效果支持。

浏览器验证需要另行核查手机开关、正文推移、目录滚动、搜索和锚点导航、Escape、桌面开关及尺寸切换。历史 `dialog` 截图与首版验证不能替代这轮实际检查。

## v0.1.1 发布授权

2026-10-13：用户完成本地 review 后明确要求部署发布，授权将上述手机侧栏修改提交、推送、发布并部署为 v0.1.1；此前仅本地 review 的限制在此范围内解除。
