// Ships the Tailwind theme next to the built modules, so its `@source "./**/*.js"`
// resolves against dist/, and keeps the deprecated `./style.css` export resolvable.
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')

copyFileSync(join(root, 'src/theme.css'), join(dist, 'theme.css'))

const legacy = join(dist, 'assets/index.css')
if (!existsSync(legacy)) {
  mkdirSync(join(dist, 'assets'), { recursive: true })
  writeFileSync(legacy, "/* @annatarhe/lake-ui: style.css is deprecated and intentionally empty. Add `@import '@annatarhe/lake-ui/theme.css';` to your Tailwind CSS entry instead. */\n")
}
