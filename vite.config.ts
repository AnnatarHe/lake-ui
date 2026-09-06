import react from '@vitejs/plugin-react-swc'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const manifest = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const sourceRoot = fileURLToPath(new URL('./src/', import.meta.url))
const externals = Object.keys({ ...manifest.peerDependencies, ...manifest.dependencies })

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: 'tsconfig.app.json',
      entryRoot: 'src',
      include: ['src'],
      exclude: ['src/**/*.test.*', 'src/**/*.stories.*'],
    }),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    cssCodeSplit: false,
    lib: { entry: 'src/index.ts', formats: ['es'], cssFileName: 'index' },
    rolldownOptions: {
      external: (id) => externals.some(dependency => id === dependency || id.startsWith(`${dependency}/`)),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        // Preserve source boundaries without turning static components into client entries.
        banner: (chunk) => {
          const id = chunk.facadeModuleId
          if (!id?.startsWith(sourceRoot) || !/\.tsx?$/.test(id)) return ''
          return /^['"]use client['"]/.test(readFileSync(id, 'utf8').trimStart())
            ? "'use client';"
            : ''
        },
      },
      input: {
        index: 'src/index.ts',
        'hooks/useInViewport': 'src/hooks/useInViewport.ts',
      },
    },
  },
})
