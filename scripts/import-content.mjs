import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Import is deliberately offline: upstream bytes and local editorial work have separate owners.
const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8').replace(/^\uFEFF/, '');
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const files = (dir) => fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]);
const lock = JSON.parse(read('sources.lock.json'));
const editorial = JSON.parse(read('content/editorial.json'));
const check = process.argv.includes('--check');
const catalog = [];
const rows = [];
const jsGroups = { basic: '语言起点', types: '数据类型', operators: '运算符', features: '语法与调试', stdlib: '标准库', oop: '对象与原型', async: '异步语言基础' };
const tsGroups = { intro: '语言起点', basic: '语言起点', any: '类型基础', types: '类型基础', array: '类型基础', tuple: '类型基础', symbol: '类型基础', function: '函数与对象', object: '函数与对象', interface: '函数与对象', class: '函数与对象', generics: '类型编程', enum: '类型基础', assert: '类型基础', narrowing: '类型基础', 'type-operations': '类型编程', module: '模块与声明', namespace: '模块与声明', decorator: '类与装饰器', 'decorator-legacy': '类与装饰器', declare: '模块与声明', 'd.ts': '模块与声明', operator: '类型编程', mapping: '类型编程', utility: '类型编程', comment: '编译协作', es6: '现代内置类型' };
const groupOrder = ['语言起点', '数据类型', '运算符', '语法与调试', '标准库', '对象与原型', '异步语言基础', '类型基础', '函数与对象', '类型编程', '模块与声明', '类与装饰器', '现代内置类型', '编译协作', '项目配置'];
for (const [source, info] of Object.entries(lock.sources)) {
  const base = `content/upstream/${source}`;
  const fullTutorial = ['html', 'es6'].includes(source);
  const manifest = fullTutorial ? JSON.parse(read(`content/${source}-source.json`)) : undefined;
  const actual = files(base).sort();
  if (JSON.stringify(actual) !== JSON.stringify(Object.keys(info.files).sort())) throw new Error(`${source}: snapshot file inventory changed; review and update the source lock explicitly`);
  for (const file of actual) if (hash(file) !== info.files[file]) throw new Error(`Snapshot differs from locked source: ${file}`);
  const listed = [...read(`${base}/chapters.yml`).matchAll(/^- ([^\n:]+\.md):/gm)].map(match => match[1]);
  const documents = actual.filter(file => file.endsWith('.md'));
  documents.sort((a, b) => {
    const rank = file => { const n = manifest ? manifest.chapters.findIndex(chapter => chapter.sourceFile === file) : listed.indexOf(file.replace(`${base}/docs/`, '')); return n < 0 ? 1000 : n; };
    return rank(a) - rank(b) || a.localeCompare(b);
  });
  for (const file of documents) {
    const rel = file.replace(`${base}/`, '');
    const slug = rel.replace(/^docs\//, '').replace(/\.md$/, '');
    const raw = read(file);
    let title = raw.match(/^# (.+)$/m)?.[1] ?? '仓库说明';
    let included = rel.startsWith('docs/');
    let section = source;
    let id = `${source}/${slug}`;
    let group = source === 'javascript' ? jsGroups[slug.split('/')[0]] : tsGroups[slug];
    let selector;
    let reason = '语言知识；保留完整正文';
    if (!included) reason = '仓库介绍，非知识章节；保留快照作为来源证据';
    else if (source === 'javascript') {
      if (slug === 'preface') { included = false; reason = '作者前言，非语言知识章节；保留原始快照'; }
      else if (slug === 'features/console') { id = 'javascript/features/debugger'; title = 'debugger 语句'; selector = 'debugger'; reason = '部分纳入：完整保留 ECMAScript debugger 语句一节；console 和开发者工具 API 不在主体范围'; }
      else if (slug === 'bom/arraybuffer') { id = 'javascript/stdlib/arraybuffer'; title = 'ArrayBuffer 对象'; group = '标准库'; selector = 'arraybuffer'; reason = '部分纳入：完整保留 ArrayBuffer 语言标准对象一节；Blob 及浏览器文件应用排除'; }
      else if (slug === 'async/timer') { included = false; reason = '独立的定时器宿主 API 章；语言章中的必要异步示例仍保留'; }
      else if (/^(dom|bom|events|elements)\//.test(slug)) { included = false; reason = 'DOM、浏览器 API、事件或元素接口，不属于第一版主体范围'; }
    } else if (source === 'typescript') {
      if (slug === 'react') { included = false; reason = 'React 框架集成，不属于第一版主体范围'; }
      if (['tsconfig.json', 'tsc', 'npm'].includes(slug)) { id = `config/${slug === 'tsconfig.json' ? 'tsconfig' : slug}`; group = '项目配置'; reason = '归入 TypeScript 末尾的项目配置组；保留原有 URL 与完整正文'; }
    }
    if (included) {
      const chapter = manifest?.chapters.find(chapter => chapter.sourceFile === file);
      if (fullTutorial && !chapter) throw new Error(`Source chapter missing from complete inventory: ${file}`);
      const edit = { ...(chapter ? {summary: chapter.summary} : {}), ...editorial[id] };
      if (!edit.summary) throw new Error(`Missing article summary: ${id}`);
      if (chapter) { title = chapter.title; group = chapter.group; reason = '完整教程章节；保留全部正文与示例'; }
      if (!group) throw new Error(`Missing group: ${id}`);
      catalog.push({ id, section, group, title, path: `/${id}/`, sourceFile: file, sourceUrl: chapter?.sourceUrl ?? `${info.website}${slug}`, sourceRepo: info.repository, sourceCommit: info.commit, sourceLicense: info.license, sourceAuthor: '阮一峰（Ruan Yifeng）及原仓库贡献者', sourceSha256: info.files[file], sourceListed: listed.includes(`${slug}.md`), ...(selector ? { contentSelector: selector } : {}), language: source === 'es6' ? 'javascript' : source, ...edit });
    }
    rows.push({ source, file: rel, title, included, partial: !!selector, id, reason: reason + (included && !listed.includes(`${slug}.md`) ? '；文件存在于来源仓库但未列入 chapters.yml，本站显式纳入' : '') });
  }
  for (const chapter of manifest?.chapters ?? []) {
    if (!documents.includes(chapter.sourceFile) || !chapter.sourceFile.startsWith(`${base}/docs/`)) throw new Error(`Catalog references an unknown chapter: ${chapter.sourceFile}`);
  }
  for (const asset of manifest?.assets ?? []) {
    if (info.files[asset.sourceFile] !== asset.sha256) throw new Error(`Unverified source asset: ${asset.sourceFile}`);
    if (!asset.publicPath.startsWith(`/media/${source}/`) || asset.publicPath.includes('..')) throw new Error(`Invalid asset path: ${asset.publicPath}`);
    const target = `public${asset.publicPath}`;
    if (check) {
      if (!fs.existsSync(path.join(root, target)) || hash(target) !== asset.sha256) throw new Error(`Stale public asset: ${target}`);
    } else {
      fs.mkdirSync(path.dirname(path.join(root, target)), {recursive: true});
      fs.copyFileSync(path.join(root, asset.sourceFile), path.join(root, target));
    }
  }
}
const sectionOrder = ['html', 'javascript', 'es6', 'typescript'];
catalog.sort((a, b) => sectionOrder.indexOf(a.section) - sectionOrder.indexOf(b.section) || (['html', 'es6'].includes(a.section) ? 0 : groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group)));
const ids = new Set(catalog.map(entry => entry.id));
if (ids.size !== catalog.length) throw new Error('Duplicate catalog ID');
for (const id of Object.keys(editorial)) if (!ids.has(id)) throw new Error(`Editorial entry without source article: ${id}`);
const counts = source => rows.filter(row => row.source === source && row.file.startsWith('docs/'));
const countLine = source => { const all = counts(source); return `| ${source} | ${all.length} | ${all.filter(row => row.included).length} | ${all.filter(row => !row.included).length} | ${all.filter(row => row.partial).length} |`; };
const escape = str => str.replaceAll('|', '\\|').replaceAll('\n', ' ');
const coverage = `# 逐章覆盖清单\n\n此文件由 \`node scripts/import-content.mjs\` 从锁定快照和本地编辑生成。源码文件检查覆盖 docs 下全部 Markdown，不能只依赖上游章节目录。\n\n| 来源 | 原始章节 | 纳入页面 | 排除章节 | 纳入中含部分截取 |\n| --- | ---: | ---: | ---: | ---: |\n${Object.keys(lock.sources).map(countLine).join('\n')}\n\n纳入统计含部分纳入页，未合并不同来源篇目。额外列出各来源 README（仓库介绍与购书说明，非教程章节，不计入上表）。项目独立补充见 \`content/local/catalog.json\`，由站点完整性检查一并验证。\n\n整理状态“已整理”表示已有标题、分组、摘要及原文映射；正文不展示速查或阅读提示；验证状态“锁定原文”只表示 SHA-256 和文件清单一致，不代表运行过全部示例。构建、链接、资源、浏览器与语义抽样的实际结果见项目验证记录。\n\n| 来源 | 来源文件 | 标题 | 纳入 | 站内路径 | 理由 | 整理 | 验证 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${rows.map(row => `| ${row.source} | \`${row.file}\` | ${escape(row.title)} | ${row.included ? row.partial ? '部分' : '是' : '否'} | ${row.included ? `\`/${row.id}/\`` : '—'} | ${escape(row.reason)} | ${row.included ? '已整理' : '已登记排除'} | 锁定原文 |`).join('\n')}\n`;
function output(file, value) {
  if (check) { if (!fs.existsSync(path.join(root, file)) || read(file) !== value) throw new Error(`${file} is stale; run node scripts/import-content.mjs`); }
  else fs.writeFileSync(path.join(root, file), value);
}
output('content/catalog.json', JSON.stringify(catalog, null, 2) + '\n');
output('docs/COVERAGE.md', coverage);
console.log(`${check ? 'Checked' : 'Imported'} ${catalog.length} source articles; ${rows.filter(row => !row.included && row.file.startsWith('docs/')).length} excluded source chapters; ${rows.length} Markdown files accounted for.`);
