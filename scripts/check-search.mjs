import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';

const root = path.resolve('dist');
const basePath = process.env.SITE_BASE || '/';
assert(fs.existsSync(path.join(root, 'search.json')), 'Run npm run build first');
const entries = JSON.parse(fs.readFileSync(path.join(root, 'search.json'), 'utf8'));
const articles = [
  ...JSON.parse(fs.readFileSync('content/catalog.json', 'utf8')),
  ...JSON.parse(fs.readFileSync('content/local/catalog.json', 'utf8')),
];
const normalize = text => text.replace(/\s+/g, ' ').trim();
const expectedPaths = new Set(articles.map(article => `${basePath}${article.id}/`));
const byPath = new Map();
const seen = new Set();
const errors = [];
let anchorCount = 0;
let bodyBlocks = 0;
let copyButtonsExcluded = 0;

for (const entry of entries) {
  if (!entry.title || typeof entry.body !== 'string') errors.push(`Invalid search entry: ${entry.url}`);
  const url = new URL(entry.url, 'http://site.test');
  if (url.origin !== 'http://site.test' || !expectedPaths.has(url.pathname)) errors.push(`Unexpected target: ${entry.url}`);
  if (seen.has(entry.url)) errors.push(`Duplicate search target: ${entry.url}`);
  seen.add(entry.url);
  const rows = byPath.get(url.pathname) ?? [];
  rows.push({ entry, hash: decodeURIComponent(url.hash.slice(1)) });
  byPath.set(url.pathname, rows);
}

for (const article of articles) {
  const route = `${basePath}${article.id}/`;
  const file = path.join(root, article.id, 'index.html');
  const $ = load(fs.readFileSync(file, 'utf8'));
  const rows = byPath.get(route) ?? [];
  const articleRows = rows.filter(row => !row.hash);
  if (articleRows.length !== 1) errors.push(`${route}: expected one article entry`);
  const ids = new Set($('[id]').map((_, element) => $(element).attr('id')).get());
  const indexedIds = new Set(rows.map(row => row.hash));
  for (const { entry, hash } of rows) {
    if (entry.section !== article.section) errors.push(`${entry.url}: wrong content section`);
    if (hash) {
      anchorCount++;
      if (!ids.has(hash)) errors.push(`${entry.url}: missing anchor`);
    }
  }
  $('[data-article-body] h2, [data-article-body] h3').each((_, heading) => {
    if (!indexedIds.has($(heading).attr('id'))) errors.push(`${route}: unindexed heading ${$(heading).attr('id')}`);
  });

  // Compare the index with the actual built page, excluding copy controls and their status text.
  const controls = $('[data-article-body] button.copy-code');
  copyButtonsExcluded += controls.length;
  controls.remove();
  $('[data-article-body] .heading-anchor').filter((_, element) => $(element).text() === '#').remove();
  const expected = new Map([['', { title: article.title, body: article.summary }]]);
  let current = expected.get('');
  $('[data-article-body]').children().each((_, element) => {
    const block = $(element);
    bodyBlocks++;
    if (block.is('h2, h3')) {
      current = { title: normalize(block.text()), body: '' };
      expected.set(block.attr('id'), current);
    } else {
      current.body += ` ${block.text()}`;
    }
  });
  for (const { entry, hash } of rows) {
    const target = expected.get(hash);
    if (!target) errors.push(`${entry.url}: index target is not an article or H2/H3 section`);
    else if (entry.title !== target.title || entry.body !== normalize(target.body)) {
      errors.push(`${entry.url}: title/body differs from rendered content (possible missing text or copy-control leakage)`);
    }
  }
}

const result = {
  articles: articles.length, entries: entries.length, anchors: anchorCount, verifiedBodyBlocks: bodyBlocks,
  copyButtonsExcluded, errors,
  scope: 'Built search index: article coverage, every H2/H3 target, valid unique anchors, complete section text, and copy-control exclusion. Empty section bodies are allowed when their next child is a subsection. Does not execute tutorial examples or browser interactions.',
};
fs.mkdirSync('docs/verification', { recursive: true });
fs.writeFileSync('docs/verification/search-section-check.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
assert.equal(errors.length, 0, errors.join('\n'));
