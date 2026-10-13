import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';

const base = process.argv[2] ?? 'http://127.0.0.1:4323';
const basePath = process.env.SITE_BASE || '/';
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(path.join(dir,entry.name)) : [path.join(dir,entry.name)]);
const files = walk('dist').filter(file => file.endsWith('.html'));
const results = [];
for (const file of files) {
  const route = basePath + path.relative('dist', file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
  const response = await fetch(new URL(route, base), {signal:AbortSignal.timeout(10000)});
  assert.equal(response.status, 200, `${route}: ${response.status}`);
  const actual = load(await response.text());
  const expected = load(fs.readFileSync(file,'utf8'));
  assert.equal(actual('h1').text(), expected('h1').text(), `${route}: wrong page or fallback`);
  assert.equal(actual('meta[http-equiv="refresh"]').attr('content'), expected('meta[http-equiv="refresh"]').attr('content'), `${route}: redirect differs from the build`);
  results.push({route,status:response.status,title:actual('title').text()});
}
const missing = await fetch(new URL(`${basePath}this-page-does-not-exist/`,base));
assert.equal(missing.status,404,'Unknown routes must not silently render a valid article');
fs.writeFileSync('docs/verification/http-check.json',JSON.stringify({base,pages:results.length,unknownRouteStatus:missing.status,results},null,2)+'\n');
console.log(`HTTP check passed: ${results.length} generated pages and unknown-route 404 at ${base}`);
