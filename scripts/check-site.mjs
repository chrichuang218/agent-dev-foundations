import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
import MarkdownIt from 'markdown-it';

const root = path.resolve('dist');
const basePath = process.env.SITE_BASE || '/';
assert(fs.existsSync(root), 'Run npm run build first');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const documents = walk(root).filter(file => file.endsWith('.html'));
const pages = new Map(documents.map(file => [file, load(fs.readFileSync(file, 'utf8'))]));
const errors = [];
let links = 0;
let assets = 0;
let anchors = 0;
const fail = (file, error) => errors.push(`${path.relative(root, file)}: ${error}`);
for (const [file, $] of pages) {
  const route = '/' + path.relative(root, file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
  const seen = new Set();
  $('[id]').each((_, element) => {
    const id = $(element).attr('id');
    if (seen.has(id)) fail(file, `Duplicate id ${id}`);
    seen.add(id);
  });
  if (route === '/config/') {
    assert.equal($('meta[http-equiv="refresh"]').attr('content'), `0;url=${basePath}typescript/#project-config`, 'Old configuration index must redirect to the TypeScript group');
  } else {
    assert.equal($('h1').length, 1, `Exactly one h1 required: ${route}`);
    assert($('html').attr('lang') === 'zh-CN', `Missing document language: ${route}`);
    assert.deepEqual($('.desktop-sidebar .nav-section').map((_, element) => $(element).attr('data-section')).get(), ['html', 'javascript', 'es6', 'typescript'], `Wrong top-level sections: ${route}`);
  }
  if ($('.reading-progress, .site-footer').length) fail(file, 'Removed progress bar or page footer returned');
  $('a[href], img[src], script[src], link[href]').each((_, element) => {
    if (element.tagName === 'link' && $(element).attr('rel') === 'canonical') return;
    const attr = element.tagName === 'img' || element.tagName === 'script' ? 'src' : 'href';
    const value = $(element).attr(attr);
    if (!value || /^(mailto:|tel:|data:)/i.test(value)) return;
    const url = new URL(value, 'http://site.test' + basePath + route.slice(1));
    if (url.origin !== 'http://site.test') {
      if (element.tagName !== 'a') fail(file, `Runtime external resource ${value}`);
      return;
    }
    if (!url.pathname.startsWith(basePath)) { fail(file, `Link escapes deployment base: ${value}`); return; }
    const pathname = '/' + decodeURIComponent(url.pathname.slice(basePath.length));
    let target = path.join(root, pathname);
    if (pathname.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) { fail(file, `Unreachable ${value}`); return; }
    if (element.tagName === 'a') links++; else assets++;
    if (url.hash && pages.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      const targetPage = pages.get(target);
      const found = targetPage('[id]').toArray().some(node => targetPage(node).attr('id') === id);
      if (!found) fail(file, `Missing anchor ${value}`);
      anchors++;
    }
  });
  $('[data-article-body]').each((_, element) => {
    if ($(element).find('script, iframe, form, input, style, link').length) fail(file, 'Source examples must not become executable page elements');
    if ($(element).text().trim().length < 80) fail(file, 'Empty or abbreviated article body');
    if ($('.quick-reference, .editorial-note, #quick-reference').length) fail(file, 'Removed article callouts returned');
    if (!$(`link[rel="license"][href="${basePath}about/"]`).length) fail(file, 'Missing centralized license reference');
    $(element).find('h2,h3,h4').each((_, heading) => {
      const following = $(heading).next();
      if (!following.length || (/^h[1-6]$/.test(following[0].tagName) && Number(following[0].tagName.slice(1)) <= Number(heading.tagName.slice(1)))) fail(file, `Empty section: ${$(heading).text()}`);
    });
  });
}
const sourceArticles = JSON.parse(fs.readFileSync('content/catalog.json', 'utf8'));
const localArticles = JSON.parse(fs.readFileSync('content/local/catalog.json', 'utf8'));
const markdown = new MarkdownIt({html: true});
const normalized = value => value.replace(/\s+/g, ' ').trim();
let verifiedBlocks = 0;
for (const article of [...sourceArticles, ...localArticles]) {
  const file = path.join(root, article.id, 'index.html');
  if (!pages.has(file)) { fail(file, 'Included article has no generated page'); continue; }
  let source = fs.readFileSync(article.sourceFile ?? article.file, 'utf8').replace(/\r\n/g, '\n');
  if (article.contentSelector === 'arraybuffer') source = source.split('## ArrayBuffer 对象')[1].split('## Blob 对象')[0];
  else if (article.contentSelector === 'debugger') source = source.split('## debugger 语句')[1].split('\n## ')[0];
  else source = source.replace(/^# .+\n+/, '');
  const $ = pages.get(file);
  const currentLink = $(`.desktop-sidebar a[aria-current="page"][href="${basePath}${article.id}/"]`);
  if (currentLink.length !== 1 || currentLink.closest('[data-section]').attr('data-section') !== article.section) {
    fail(file, 'Current chapter is not nested under its own top-level section');
  }
  const rendered = normalized($('[data-article-body]').text());
  // Compare every original paragraph and code block against the rendered article,
  // so having a route and a short summary cannot masquerade as full coverage.
  for (const token of markdown.parse(source, {})) {
    const text = token.type === 'inline' ? (token.children ?? []).map(child => ['softbreak', 'hardbreak'].includes(child.type) ? '\n' : child.type === 'image' || (child.type === 'html_inline' && /^<\/?sup>$/.test(child.content)) ? '' : child.content).join('')
      : ['fence', 'code_block'].includes(token.type) ? token.content
      : token.type === 'html_block' ? (token.content.trimStart().startsWith('<table>') ? load(token.content).text() : token.content) : '';
    const expected = normalized(text);
    if (expected.length > 2 && !rendered.includes(expected)) fail(file, `Original content not rendered: ${expected.slice(0, 100)}`);
    if (expected.length > 2) verifiedBlocks++;
  }
}
assert.equal(errors.length, 0, errors.join('\n'));
const result = { pages: pages.size, articles: sourceArticles.length + localArticles.length, verifiedSourceBlocks: verifiedBlocks, internalLinks: links, localResources: assets, anchors, errors, scope: 'Static HTML coverage, original paragraphs/code preservation, internal link targets, anchors, local assets, section completeness; does not execute tutorial examples.' };
fs.mkdirSync('docs/verification', { recursive: true });
fs.writeFileSync('docs/verification/site-check.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
