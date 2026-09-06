import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const directory = mkdtempSync(join(tmpdir(), 'lake-ui-package-'))
const run = (command, args, cwd) => execFileSync(command, args, {
  cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'],
  env: { ...process.env, npm_config_cache: join(directory, 'cache') },
})

try {
  const [packed] = JSON.parse(run('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', directory], root))
  const files = new Set(packed.files.map(file => file.path))
  assert(![...files].some(file => /\.(test|stories)\.|^tests\/|^src\/|node_modules\//.test(file)), 'Development files leaked into package')
  for (const entry of Object.values(manifest.exports)) {
    for (const target of Object.values(entry)) assert(files.has(target.slice(2)), `Missing export ${target}`)
    if (entry.types) assert.equal(Object.keys(entry)[0], 'types')
    if (entry.import.endsWith('.js')) {
      const sourceBase = join(root, entry.import.replace('./dist/', './src/').replace(/\.js$/, ''))
      const source = ['.tsx', '.ts'].map(extension => sourceBase + extension).find(existsSync)
      assert(source, `Missing source for ${entry.import}`)
      const hasDirective = (text) => /^['"]use client['"]/.test(text.trimStart())
      assert.equal(hasDirective(readFileSync(join(root, entry.import), 'utf8')),
        hasDirective(readFileSync(source, 'utf8')), `Changed client boundary: ${entry.import}`)
    }
  }

  // Each case uses an isolated real installation, with no peer-dependency bypass.
  const cases = process.argv.includes('--matrix')
    ? [['19.0.0', '0.475.0'], ['19.2.8', '0.539.0'], ['19.2.8', '1.41.0']]
    : [['19.2.8', '1.41.0']]
  for (const [react, lucide] of cases) {
    const consumer = mkdtempSync(join(directory, 'consumer-'))
    writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }))
    run('npm', ['install', '--strict-peer-deps', '--ignore-scripts', '--no-audit', '--no-fund',
      join(directory, packed.filename), `react@${react}`, `react-dom@${react}`, `lucide-react@${lucide}`,
      `@types/react@${manifest.devDependencies['@types/react']}`,
      `@types/react-dom@${manifest.devDependencies['@types/react-dom']}`,
      `typescript@${manifest.devDependencies.typescript}`], consumer)
    const imports = Object.keys(manifest.exports).filter(key => key !== './style.css').map(key =>
      manifest.name + (key === '.' ? '' : key.slice(1)))
    writeFileSync(join(consumer, 'smoke.ts'), imports.map((name, index) =>
      `import * as entry${index} from '${name}';\nvoid entry${index};`).join('\n'))
    run(join(consumer, 'node_modules/.bin/tsc'), ['--noEmit', '--strict', '--module', 'esnext', '--moduleResolution', 'bundler', '--target', 'es2020', 'smoke.ts'], consumer)
    writeFileSync(join(consumer, 'smoke.mjs'), `
      import assert from 'node:assert/strict';
      import { createElement } from 'react';
      import { renderToString } from 'react-dom/server';
      import { InputField, TextareaField, Modal, Sheet } from '${manifest.name}';
      for (const name of ${JSON.stringify(imports)}) assert(Object.keys(await import(name)).length);
      for (const Field of [InputField, TextareaField]) {
        const html = renderToString(createElement(Field, { label: 'Name', error: 'Required', loading: true }));
        assert.match(html, /aria-invalid="true"/);
        assert.match(html, /<svg/);
      }
      for (const Overlay of [Modal, Sheet]) assert.equal(renderToString(createElement(Overlay, { isOpen: false, title: 'Test', onClose() {} })), '');
    `)
    run(process.execPath, ['smoke.mjs'], consumer)
    console.log(`Package imports, declarations, SSR, and icons pass: React ${react}, Lucide ${lucide}`)
  }
} finally {
  rmSync(directory, { recursive: true, force: true })
}
