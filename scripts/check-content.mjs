import fs from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

execFileSync(process.execPath, ['scripts/import-content.mjs', '--check'], {stdio: 'inherit'});
const upstream = JSON.parse(fs.readFileSync('content/catalog.json', 'utf8'));
const local = JSON.parse(fs.readFileSync('content/local/catalog.json', 'utf8'));
const articles = [...upstream, ...local];
const ids = new Set(articles.map(article => article.id));
assert.equal(ids.size, articles.length, 'Duplicate article IDs');
for (const article of articles) {
  assert(article.title && article.summary && article.group, `${article.id}: incomplete article metadata`);
  const filename = article.sourceFile ?? article.file;
  assert(fs.existsSync(filename), `${article.id}: missing local body`);
  assert(fs.readFileSync(filename, 'utf8').trim().length > 80, `${article.id}: empty body`);
  for (const related of article.related ?? []) assert(ids.has(related), `${article.id}: missing related article ${related}`);
}
console.log(`Content integrity passed: ${upstream.length} source articles + ${local.length} local articles. All bodies, metadata and declared related IDs present.`);
