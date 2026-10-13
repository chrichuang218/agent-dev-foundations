# 逐章覆盖清单

此文件由 `node scripts/import-content.mjs` 从锁定快照和本地编辑生成。源码文件检查覆盖 docs 下全部 Markdown，不能只依赖上游章节目录。

| 来源 | 原始章节 | 纳入页面 | 排除章节 | 纳入中含部分截取 |
| --- | ---: | ---: | ---: | ---: |
| javascript | 82 | 38 | 44 | 2 |
| typescript | 31 | 30 | 1 | 0 |
| html | 17 | 17 | 0 | 0 |
| es6 | 37 | 37 | 0 | 0 |

纳入统计含部分纳入页，未合并不同来源篇目。额外列出各来源 README（仓库介绍与购书说明，非教程章节，不计入上表）。项目独立补充见 `content/local/catalog.json`，由站点完整性检查一并验证。

整理状态“已整理”表示已有标题、分组、摘要及原文映射；正文不展示速查或阅读提示；验证状态“锁定原文”只表示 SHA-256 和文件清单一致，不代表运行过全部示例。构建、链接、资源、浏览器与语义抽样的实际结果见项目验证记录。

| 来源 | 来源文件 | 标题 | 纳入 | 站内路径 | 理由 | 整理 | 验证 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| javascript | `docs/basic/introduction.md` | 导论 | 是 | `/javascript/basic/introduction/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/basic/history.md` | JavaScript 语言的历史 | 是 | `/javascript/basic/history/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/basic/grammar.md` | JavaScript 的基本语法 | 是 | `/javascript/basic/grammar/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/types/general.md` | 数据类型概述 | 是 | `/javascript/types/general/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/types/null-undefined-boolean.md` | null, undefined 和布尔值 | 是 | `/javascript/types/null-undefined-boolean/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/types/number.md` | 数值 | 是 | `/javascript/types/number/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/types/string.md` | 字符串 | 是 | `/javascript/types/string/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/types/object.md` | 对象 | 是 | `/javascript/types/object/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/types/function.md` | 函数 | 是 | `/javascript/types/function/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/types/array.md` | 数组 | 是 | `/javascript/types/array/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/operators/arithmetic.md` | 算术运算符 | 是 | `/javascript/operators/arithmetic/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/operators/comparison.md` | 比较运算符 | 是 | `/javascript/operators/comparison/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/operators/boolean.md` | 布尔运算符 | 是 | `/javascript/operators/boolean/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/operators/bit.md` | 二进制位运算符 | 是 | `/javascript/operators/bit/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/operators/priority.md` | 其他运算符，运算顺序 | 是 | `/javascript/operators/priority/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/features/conversion.md` | 数据类型的转换 | 是 | `/javascript/features/conversion/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/features/error.md` | 错误处理机制 | 是 | `/javascript/features/error/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/features/style.md` | 编程风格 | 是 | `/javascript/features/style/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/features/console.md` | debugger 语句 | 部分 | `/javascript/features/debugger/` | 部分纳入：完整保留 ECMAScript debugger 语句一节；console 和开发者工具 API 不在主体范围 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/object.md` | Object 对象 | 是 | `/javascript/stdlib/object/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/attributes.md` | 属性描述对象 | 是 | `/javascript/stdlib/attributes/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/array.md` | Array 对象 | 是 | `/javascript/stdlib/array/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/wrapper.md` | 包装对象 | 是 | `/javascript/stdlib/wrapper/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/boolean.md` | Boolean 对象 | 是 | `/javascript/stdlib/boolean/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/number.md` | Number 对象 | 是 | `/javascript/stdlib/number/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/string.md` | String 对象 | 是 | `/javascript/stdlib/string/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/math.md` | Math 对象 | 是 | `/javascript/stdlib/math/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/date.md` | Date 对象 | 是 | `/javascript/stdlib/date/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/regexp.md` | RegExp 对象 | 是 | `/javascript/stdlib/regexp/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/stdlib/json.md` | JSON 对象 | 是 | `/javascript/stdlib/json/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/oop/new.md` | 实例对象与 new 命令 | 是 | `/javascript/oop/new/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/oop/this.md` | this 关键字 | 是 | `/javascript/oop/this/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/oop/prototype.md` | 对象的继承 | 是 | `/javascript/oop/prototype/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/oop/object.md` | Object 对象的相关方法 | 是 | `/javascript/oop/object/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/oop/strict.md` | 严格模式 | 是 | `/javascript/oop/strict/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/async/general.md` | 异步操作概述 | 是 | `/javascript/async/general/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/async/timer.md` | 定时器 | 否 | — | 独立的定时器宿主 API 章；语言章中的必要异步示例仍保留 | 已登记排除 | 锁定原文 |
| javascript | `docs/async/promise.md` | Promise 对象 | 是 | `/javascript/async/promise/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| javascript | `docs/dom/general.md` | DOM 概述 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/dom/node.md` | Node 接口 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/dom/nodelist.md` | NodeList 接口，HTMLCollection 接口 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/dom/parentnode.md` | ParentNode 接口，ChildNode 接口 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/dom/document.md` | Document 节点 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/dom/element.md` | Element 节点 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/dom/attributes.md` | 属性的操作 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/dom/text.md` | Text 节点和 DocumentFragment 节点 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/dom/css.md` | CSS 操作 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/dom/mutationobserver.md` | Mutation Observer API | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/eventtarget.md` | EventTarget 接口 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/model.md` | 事件模型 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/event.md` | Event 对象 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/mouse.md` | 鼠标事件 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/keyboard.md` | 键盘事件 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/progress.md` | 进度事件 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/form.md` | 表单事件 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/touch.md` | 触摸事件 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/drag.md` | 拖拉事件 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/common.md` | 其他常见事件 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/events/globaleventhandlers.md` | GlobalEventHandlers 接口 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/engine.md` | 浏览器环境概述 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/window.md` | window 对象 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/navigator.md` | Navigator 对象，Screen 对象。 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/cookie.md` | Cookie | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/xmlhttprequest.md` | XMLHttpRequest 对象 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/same-origin.md` | 同源限制 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/cors.md` | CORS 通信 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/storage.md` | Storage 接口 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/history.md` | History 对象 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/location.md` | Location 对象，URL 对象，URLSearchParams 对象 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/arraybuffer.md` | ArrayBuffer 对象 | 部分 | `/javascript/stdlib/arraybuffer/` | 部分纳入：完整保留 ArrayBuffer 语言标准对象一节；Blob 及浏览器文件应用排除 | 已整理 | 锁定原文 |
| javascript | `docs/bom/file.md` | File 对象，FileList 对象，FileReader 对象 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/form.md` | 表单，FormData 对象 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/indexeddb.md` | IndexedDB API | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/bom/webworker.md` | Web Worker | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/elements/a.md` | <a> 元素 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/elements/image.md` | <img> 元素 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/elements/form.md` | <form> 元素 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/elements/input.md` | <input> 元素 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/elements/button.md` | <button> 元素 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/elements/option.md` | <option> 元素 | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/elements/video.md` | <video>，<audio> | 否 | — | DOM、浏览器 API、事件或元素接口，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| javascript | `docs/preface.md` | 前言 | 否 | — | 作者前言，非语言知识章节；保留原始快照 | 已登记排除 | 锁定原文 |
| javascript | `README.md` | 仓库说明 | 否 | — | 仓库介绍，非知识章节；保留快照作为来源证据 | 已登记排除 | 锁定原文 |
| typescript | `docs/intro.md` | TypeScript 语言简介 | 是 | `/typescript/intro/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/basic.md` | TypeScript 基本用法 | 是 | `/typescript/basic/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/any.md` | any 类型，unknown 类型，never 类型 | 是 | `/typescript/any/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/types.md` | TypeScript 的类型系统 | 是 | `/typescript/types/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/array.md` | TypeScript 的数组类型 | 是 | `/typescript/array/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/tuple.md` | TypeScript 的元组类型 | 是 | `/typescript/tuple/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/symbol.md` | TypeScript 的 symbol 类型 | 是 | `/typescript/symbol/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/function.md` | TypeScript 的函数类型 | 是 | `/typescript/function/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/object.md` | TypeScript 的对象类型 | 是 | `/typescript/object/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/interface.md` | TypeScript 的 interface 接口 | 是 | `/typescript/interface/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/class.md` | TypeScript 的 class 类型 | 是 | `/typescript/class/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/generics.md` | TypeScript 泛型 | 是 | `/typescript/generics/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/enum.md` | TypeScript 的 Enum 类型 | 是 | `/typescript/enum/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/assert.md` | TypeScript 的类型断言 | 是 | `/typescript/assert/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/module.md` | TypeScript 模块 | 是 | `/typescript/module/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/namespace.md` | TypeScript namespace | 是 | `/typescript/namespace/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/decorator.md` | TypeScript 装饰器 | 是 | `/typescript/decorator/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/decorator-legacy.md` | 装饰器（旧语法） | 是 | `/typescript/decorator-legacy/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/declare.md` | declare 关键字 | 是 | `/typescript/declare/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/d.ts.md` | d.ts 类型声明文件 | 是 | `/typescript/d.ts/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/operator.md` | TypeScript 类型运算符 | 是 | `/typescript/operator/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/mapping.md` | TypeScript 的类型映射 | 是 | `/typescript/mapping/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/utility.md` | TypeScript 类型工具 | 是 | `/typescript/utility/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/comment.md` | TypeScript 的注释指令 | 是 | `/typescript/comment/` | 语言知识；保留完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/tsconfig.json.md` | tsconfig.json | 是 | `/config/tsconfig/` | 归入 TypeScript 末尾的项目配置组；保留原有 URL 与完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/tsc.md` | tsc 命令行编译器 | 是 | `/config/tsc/` | 归入 TypeScript 末尾的项目配置组；保留原有 URL 与完整正文 | 已整理 | 锁定原文 |
| typescript | `docs/es6.md` | TypeScript 的 ES6 类型 | 是 | `/typescript/es6/` | 语言知识；保留完整正文；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| typescript | `docs/narrowing.md` | TypeScript 类型缩小 | 是 | `/typescript/narrowing/` | 语言知识；保留完整正文；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| typescript | `docs/npm.md` | TypeScript 项目使用 npm 模块 | 是 | `/config/npm/` | 归入 TypeScript 末尾的项目配置组；保留原有 URL 与完整正文；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| typescript | `docs/react.md` | TypeScript 的 React 支持 | 否 | — | React 框架集成，不属于第一版主体范围 | 已登记排除 | 锁定原文 |
| typescript | `docs/type-operations.md` | 类型运算 | 是 | `/typescript/type-operations/` | 语言知识；保留完整正文；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| typescript | `README.md` | 仓库说明 | 否 | — | 仓库介绍，非知识章节；保留快照作为来源证据 | 已登记排除 | 锁定原文 |
| html | `docs/intro.md` | HTML 语言简介 | 是 | `/html/intro/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/url.md` | URL 简介 | 是 | `/html/url/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/attribute.md` | 网页元素的属性 | 是 | `/html/attribute/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/encode.md` | HTML 字符编码 | 是 | `/html/encode/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/semantic.md` | 网页的语义结构 | 是 | `/html/semantic/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/text.md` | 文本标签 | 是 | `/html/text/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/list.md` | 列表标签 | 是 | `/html/list/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/image.md` | 图像标签 | 是 | `/html/image/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/a.md` | <a> | 是 | `/html/a/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/link.md` | <link> | 是 | `/html/link/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/script.md` | <script>，<noscript> | 是 | `/html/script/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/multimedia.md` | 多媒体标签 | 是 | `/html/multimedia/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/iframe.md` | iframe | 是 | `/html/iframe/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/table.md` | 表格标签 | 是 | `/html/table/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/form.md` | 表单标签 | 是 | `/html/form/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/elements.md` | 其他标签 | 是 | `/html/elements/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| html | `docs/mobile.md` | 移动设备网页设计 | 是 | `/html/mobile/` | 完整教程章节；保留全部正文与示例；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| html | `README.md` | 仓库说明 | 否 | — | 仓库介绍，非知识章节；保留快照作为来源证据 | 已登记排除 | 锁定原文 |
| es6 | `docs/intro.md` | ECMAScript 6 简介 | 是 | `/es6/intro/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/let.md` | let 和 const 命令 | 是 | `/es6/let/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/destructuring.md` | 变量的解构赋值 | 是 | `/es6/destructuring/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/string.md` | 字符串的扩展 | 是 | `/es6/string/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/string-methods.md` | 字符串的新增方法 | 是 | `/es6/string-methods/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/regex.md` | 正则的扩展 | 是 | `/es6/regex/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/number.md` | 数值的扩展 | 是 | `/es6/number/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/function.md` | 函数的扩展 | 是 | `/es6/function/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/array.md` | 数组的扩展 | 是 | `/es6/array/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/object.md` | 对象的扩展 | 是 | `/es6/object/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/object-methods.md` | 对象的新增方法 | 是 | `/es6/object-methods/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/operator.md` | 运算符的扩展 | 是 | `/es6/operator/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/symbol.md` | Symbol | 是 | `/es6/symbol/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/set-map.md` | Set 和 Map 数据结构 | 是 | `/es6/set-map/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/proxy.md` | Proxy | 是 | `/es6/proxy/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/reflect.md` | Reflect | 是 | `/es6/reflect/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/promise.md` | Promise 对象 | 是 | `/es6/promise/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/iterator.md` | Iterator 和 for...of 循环 | 是 | `/es6/iterator/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/generator.md` | Generator 函数的语法 | 是 | `/es6/generator/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/generator-async.md` | Generator 函数的异步应用 | 是 | `/es6/generator-async/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/async.md` | async 函数 | 是 | `/es6/async/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/class.md` | Class 的基本语法 | 是 | `/es6/class/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/class-extends.md` | Class 的继承 | 是 | `/es6/class-extends/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/module.md` | Module 的语法 | 是 | `/es6/module/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/module-loader.md` | Module 的加载实现 | 是 | `/es6/module-loader/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/style.md` | 编程风格 | 是 | `/es6/style/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/spec.md` | 读懂规格 | 是 | `/es6/spec/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/async-iterator.md` | 异步遍历器 | 是 | `/es6/async-iterator/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/arraybuffer.md` | ArrayBuffer | 是 | `/es6/arraybuffer/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/proposals.md` | 最新提案 | 是 | `/es6/proposals/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/decorator.md` | Decorator | 是 | `/es6/decorator/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/reference.md` | 参考链接 | 是 | `/es6/reference/` | 完整教程章节；保留全部正文与示例 | 已整理 | 锁定原文 |
| es6 | `docs/acknowledgment.md` | 鸣谢 | 是 | `/es6/acknowledgment/` | 完整教程章节；保留全部正文与示例；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| es6 | `docs/fp.md` | 函数式编程 | 是 | `/es6/fp/` | 完整教程章节；保留全部正文与示例；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| es6 | `docs/mixin.md` | Mixin | 是 | `/es6/mixin/` | 完整教程章节；保留全部正文与示例；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| es6 | `docs/simd.md` | SIMD | 是 | `/es6/simd/` | 完整教程章节；保留全部正文与示例；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| es6 | `docs/temporal.md` | Temporal API | 是 | `/es6/temporal/` | 完整教程章节；保留全部正文与示例；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入 | 已整理 | 锁定原文 |
| es6 | `README.md` | 仓库说明 | 否 | — | 仓库介绍，非知识章节；保留快照作为来源证据 | 已登记排除 | 锁定原文 |
