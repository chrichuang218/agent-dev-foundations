import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import { createHighlighter } from 'shiki';
import { load } from 'cheerio';
import { sitePath } from './site';

export type Section = 'html' | 'javascript' | 'es6' | 'typescript';
export interface Article {
  id: string;
  title: string;
  section: Section;
  group: string;
  path: string;
  sourceFile: string;
  sourceUrl?: string;
  sourceRepo?: string;
  sourceCommit?: string;
  summary: string;
  syntax?: string | { lang: string; code: string };
  language?: string;
  related?: string[];
  notes?: string[];
  contentSelector?: string;
  headingSupplements?: Record<string, string>;
  sources?: { title: string; url: string }[];
  officialSources?: string[];
}
export interface Heading { depth: number; slug: string; text: string }

const readJson = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));
const sourceAssets = ['html', 'es6'].flatMap(source => readJson(`content/${source}-source.json`).assets) as {originalUrl: string; sourceFile: string; publicPath: string; width?: number; height?: number; alt?: string}[];
const upstream = readJson('content/catalog.json') as Article[];
const local = readJson('content/local/catalog.json').map((item: Article & {file: string}) => ({
  ...item, path: `/${item.id}/`, sourceFile: item.file,
})) as Article[];
export const sections = [
  { id: 'html' as const, label: 'HTML', description: '网页的结构与内容。从标签、链接和图像，到表格、表单与移动网页。' },
  { id: 'javascript' as const, label: 'JavaScript', description: '理解代码如何运行。从值、函数与对象，到原型和异步。' },
  { id: 'es6' as const, label: 'ES6', description: '现代 JavaScript。从声明、解构与模块，到 Promise、异步函数与迭代器。' },
  { id: 'typescript' as const, label: 'TypeScript', description: '从类型系统、泛型与类型运算，到项目配置、编译与模块解析。' },
];
export const articles = [...upstream, ...local].sort((a, b) => sections.findIndex(section => section.id === a.section) - sections.findIndex(section => section.id === b.section));
export const navigation = sections.map(section => {
  const members = articles.filter(article => article.section === section.id);
  return {
    ...section, href: `/${section.id}/`, count: members.length,
    groups: [...new Set(members.map(article => article.group))].map(label => ({
      label, items: members.filter(article => article.group === label).map(article => ({title: article.title, href: article.path})),
    })),
  };
});

const highlighter = await createHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['javascript', 'typescript', 'json', 'jsonc', 'bash', 'html', 'css', 'http', 'c', 'python'],
});
const md = new MarkdownIt({ html: true, linkify: false, typographer: false });
const escape = md.utils.escapeHtml;
// Only the source's superscripts and table demonstration are live HTML.
// Tag names in prose (including <script>) remain literal text; examples never execute.
md.renderer.rules.html_inline = (tokens, index) => {
  const token = tokens[index];
  return token.meta?.headingAnchor || /^<\/?sup>$/.test(token.content) ? token.content : escape(token.content);
};
md.renderer.rules.html_block = (tokens, index) => {
  const raw = tokens[index].content;
  if (!raw.trimStart().startsWith('<table>')) return escape(raw);
  const $ = load(raw, null, false);
  $('*').each((_, element) => {
    if (!('tagName' in element)) throw new Error('Unsupported source table node');
    if (!['table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption'].includes(element.tagName)) throw new Error(`Unsupported source table element: ${element.tagName}`);
    for (const [name, value] of Object.entries(element.attribs)) {
      if (!((['colspan', 'rowspan'].includes(name) && /^\d+$/.test(value)) || (name === 'scope' && /^(col|row|colgroup|rowgroup)$/.test(value)))) throw new Error(`Unsupported source table attribute: ${name}`);
    }
  });
  return `<div class="table-scroll" role="region" aria-label="内容表格，可横向滚动" tabindex="0">${raw}</div>`;
};

export function codeBlock(code: string, language = 'text') {
  const lang = highlighter.getLoadedLanguages().includes(language) ? language : 'text';
  const html = highlighter.codeToHtml(code.trimEnd(), {
    lang, themes: {light: 'github-light', dark: 'github-dark'},
  });
  const highlighted = html.replace(' tabindex="0"', '').replace('<pre ', `<pre data-lang="${escape(language || 'text')}" `).replace('<code>', `<code class="language-${escape(lang)}" tabindex="0" aria-label="代码，可横向滚动">`);
  const copy = '<button class="docsify-copy-code-button copy-code" type="button" aria-label="复制代码"><span class="label">复制</span><span class="error" aria-hidden="true">复制失败</span><span class="success" aria-hidden="true">已复制</span><span aria-live="polite"></span></button>';
  return `<div class="code-block">${highlighted.replace('</pre>', `${copy}</pre>`)}</div>`;
}
md.renderer.rules.fence = (tokens, index) => codeBlock(tokens[index].content, tokens[index].info.trim().split(/\s+/)[0] || 'text');
md.renderer.rules.code_block = (tokens, index) => codeBlock(tokens[index].content);
md.renderer.rules.table_open = () => '<div class="table-scroll" role="region" aria-label="内容表格，可横向滚动" tabindex="0"><table>';
md.renderer.rules.table_close = () => '</table></div>';

export function sourceMarkdown(article: Article) {
  let body = fs.readFileSync(article.sourceFile, 'utf8').replace(/\r\n/g, '\n');
  if (article.contentSelector) {
    const start = article.contentSelector === 'arraybuffer' ? '## ArrayBuffer 对象' : '## debugger 语句';
    const startIndex = body.indexOf(start);
    if (startIndex < 0) throw new Error(`Missing selection ${start}: ${article.id}`);
    const end = article.contentSelector === 'arraybuffer' ? body.indexOf('## Blob 对象', startIndex + start.length) : body.indexOf('\n## ', startIndex + start.length);
    body = body.slice(startIndex, end < 0 ? undefined : end);
  } else {
    body = body.replace(/^# .+\n+/, '');
  }
  for (const [heading, supplement] of Object.entries(article.headingSupplements ?? {})) {
    const marker = `${heading.startsWith('#') ? heading : `## ${heading}`}\n`;
    if (!body.includes(marker)) throw new Error(`Missing supplement heading ${heading}`);
    body = body.replace(marker, `${marker}\n${supplement}\n`);
  }
  return body;
}

export function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s+/g, '-') || 'section';
}

function rewriteLink(href: string, article: Article) {
  if (href.startsWith('#')) return `#${slugify(decodeURIComponent(href.slice(1)))}`;
  const url = new URL(href, article.sourceUrl ?? `https://wangdoc.com/${article.id}`);
  if (url.hostname === 'wangdoc.com') {
    const upstreamPath = url.pathname.replace(/\.(html|md)$/, '').replace(/\/$/, '');
    const section = sections.find(section => `/${section.id}` === upstreamPath);
    if (section) return `/${section.id}/`;
    const found = articles.find(item => item.sourceUrl && new URL(item.sourceUrl).pathname.replace(/\.(html|md)$/, '').replace(/\/$/, '') === upstreamPath)
      ?? articles.find(item => item.sourceFile.replace(/^content\/upstream\//, '').replace('/docs/', '/').replace(/\.md$/, '') === upstreamPath.slice(1));
    if (found) return found.path + (url.hash ? `#${slugify(decodeURIComponent(url.hash.slice(1)))}` : '');
  }
  if (!href.startsWith('/') && !/^[a-z][a-z\d+.-]*:/i.test(href)) {
    const targetFile = path.posix.normalize(path.posix.join(path.posix.dirname(article.sourceFile), href.split('#')[0])).replace(/\.html$/, '.md');
    const target = articles.find(item => item.sourceFile === targetFile);
    if (target) return target.path + (href.includes('#') ? `#${slugify(decodeURIComponent(href.split('#')[1]))}` : '');
    return url.href.replace(/\.md(?=#|$)/, '.html');
  }
  return href;
}

export function renderMarkdown(markdown: string, article?: Article) {
  const tokens = md.parse(markdown, {});
  const headings: Heading[] = [];
  const used = new Map<string, number>();
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === 'heading_open') {
      const inline = tokens[i + 1];
      const text = inline.children?.map(child => child.content).join('') ?? inline.content;
      const base = slugify(text);
      const count = used.get(base) ?? 0;
      used.set(base, count + 1);
      const slug = count ? `${base}-${count}` : base;
      token.attrSet('id', slug);
      headings.push({ depth: Number(token.tag.slice(1)), slug, text });
      if (!inline.children?.some(child => child.type === 'link_open')) {
        const opening = new MarkdownIt.Token('html_inline', '', 0);
        opening.meta = {headingAnchor: true};
        opening.content = `<a class="anchor" href="#${slug}"><span>`;
        const closing = new MarkdownIt.Token('html_inline', '', 0);
        closing.meta = {headingAnchor: true};
        closing.content = '</span></a>';
        inline.children = [opening, ...(inline.children ?? []), closing];
      }
    }
    for (const child of token.children ?? []) {
      if (child.type === 'link_open' && article) {
        child.attrSet('href', sitePath(rewriteLink(String(child.attrGet('href') ?? ''), article)));
      }
      if (child.type === 'image') {
        const src = String(child.attrGet('src') ?? '');
        const asset = sourceAssets.find(asset => asset.originalUrl === src || (article && asset.sourceFile === path.posix.normalize(path.posix.join(path.posix.dirname(article.sourceFile), src))));
        if (!asset) throw new Error(`Image missing from source inventory: ${src}`);
        child.attrSet('src', sitePath(asset.publicPath));
        if (!child.content && asset.alt) child.content = asset.alt;
        if (!child.children?.length && asset.alt) {
          const text = new MarkdownIt.Token('text', '', 0);
          text.content = asset.alt;
          child.children = [text];
        }
        if (asset.width && asset.height) {
          child.attrSet('width', String(asset.width));
          child.attrSet('height', String(asset.height));
        }
        child.attrSet('loading', 'lazy');
      }
    }
  }
  return { html: md.renderer.render(tokens, md.options, {}), headings };
}

export const renderArticle = (article: Article) => renderMarkdown(sourceMarkdown(article), article);
