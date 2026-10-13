import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import MarkdownIt from 'markdown-it';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const markdown = new MarkdownIt();
const catalog = JSON.parse(read('content/local/catalog.json'));
const result = {
  checkedAt: new Date().toISOString(),
  status: 'running',
  tools: { node: process.version, typescript: ts.version },
  scope: {
    selectedArticles: catalog.map(article => article.id),
    allArticleSemanticsVerified: false,
    runtimeExecution: false,
    description: 'Only local configuration JSON examples and one selected NodeNext two-file example. No npm commands or generated JavaScript are executed.',
  },
  jsonExamples: [],
  selectedTypeScriptExample: null,
};

try {
  for (const article of catalog) {
    const body = read(article.file);
    const fences = markdown.parse(body, {}).filter(token => token.type === 'fence');
    for (const [index, fence] of fences.entries()) {
      if (fence.info.trim().split(/\s+/)[0] !== 'json') continue;
      JSON.parse(fence.content);
      result.jsonExamples.push({ article: article.id, kind: 'body', fence: index + 1 });
    }
    if (article.syntax.lang === 'json') {
      JSON.parse(article.syntax.code);
      result.jsonExamples.push({ article: article.id, kind: 'quick-reference' });
    }
  }

  const sourceFile = 'content/local/config/module-resolution.md';
  const article = read(sourceFile);
  const fences = markdown.parse(article, {}).filter(token => token.type === 'fence');
  const json = fences.filter(token => token.info.trim() === 'json').map(token => JSON.parse(token.content));
  const packageJson = json.find(value => value.type === 'module');
  const config = json.find(value => value.compilerOptions?.module === 'NodeNext');
  const example = fences.find(token => token.info.trim() === 'typescript' && token.content.includes('// src/message.ts'));
  assert(packageJson && config && example, 'Selected NodeNext example is missing from its article');
  const parts = example.content.split('// src/index.ts（另一个文件）');
  assert.equal(parts.length, 2, 'Expected exactly two labeled TypeScript source files');

  // The virtual host reads standard libraries from the installed compiler but never writes example files.
  const virtualRoot = path.join(root, '.virtual-config-example').replaceAll('\\', '/');
  const files = new Map([
    [virtualRoot + '/package.json', JSON.stringify(packageJson)],
    [virtualRoot + '/src/message.ts', parts[0]],
    [virtualRoot + '/src/index.ts', parts[1]],
  ]);
  const converted = ts.convertCompilerOptionsFromJson(config.compilerOptions, virtualRoot);
  assert.equal(converted.errors.length, 0, 'Selected tsconfig contains invalid compiler options');
  const host = ts.createCompilerHost(converted.options);
  const originalRead = host.readFile.bind(host);
  const originalExists = host.fileExists.bind(host);
  const originalDirectory = host.directoryExists.bind(host);
  const normalize = name => name.replaceAll('\\', '/');
  host.readFile = name => files.get(normalize(name)) ?? originalRead(name);
  host.fileExists = name => files.has(normalize(name)) || originalExists(name);
  host.directoryExists = name => normalize(name) === virtualRoot || normalize(name) === virtualRoot + '/src' || originalDirectory(name);
  host.getSourceFile = (name, languageVersion) => {
    const source = host.readFile(name);
    return source === undefined ? undefined : ts.createSourceFile(name, source, languageVersion, true);
  };
  const output = new Map();
  host.writeFile = (name, source) => output.set(normalize(name), source);
  const program = ts.createProgram([virtualRoot + '/src/message.ts', virtualRoot + '/src/index.ts'], converted.options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  const formatHost = { getCurrentDirectory: () => root, getCanonicalFileName: name => name, getNewLine: () => '\n' };
  assert.equal(diagnostics.length, 0, ts.formatDiagnostics(diagnostics, formatHost));
  const emitted = program.emit();
  assert.equal(emitted.emitSkipped, false, 'Selected NodeNext example did not emit');
  assert.equal(emitted.diagnostics.length, 0, ts.formatDiagnostics(emitted.diagnostics, formatHost));
  assert(output.get(virtualRoot + '/dist/index.js')?.includes('from "./message.js"'), 'Expected ESM import was not preserved');
  assert(output.has(virtualRoot + '/dist/message.js'), 'Expected message.js output is missing');

  result.selectedTypeScriptExample = {
    sourceFile,
    sourceSha256: createHash('sha256').update(article).digest('hex'),
    mode: 'in-memory-compiler',
    options: config.compilerOptions,
    diagnostics: diagnostics.length,
    emittedFiles: [...output.keys()].map(name => path.basename(name)),
    esmImportPreserved: true,
    runtimeExecution: false,
  };
  result.status = 'passed';
} catch (error) {
  result.status = 'failed';
  result.error = error instanceof Error ? error.message : String(error);
  process.exitCode = 1;
} finally {
  const report = path.join(root, 'docs/verification/example-check.json');
  fs.mkdirSync(path.dirname(report), { recursive: true });
  fs.writeFileSync(report, JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ status: result.status, jsonExamples: result.jsonExamples.length, selectedTypeScriptExamples: result.selectedTypeScriptExample ? 1 : 0, allArticleSemanticsVerified: false, report: 'docs/verification/example-check.json' }));
}

