import react from '@vitejs/plugin-react-swc'
import { glob } from 'glob'
import preserveDirectives from 'rollup-preserve-directives'

import { fileURLToPath } from 'node:url'
import { extname, relative } from 'path'
import { Plugin, defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    preserveDirectives() as Plugin,
    dts({
      rollupTypes: false,
      tsconfigPath: 'tsconfig.app.json',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'lucide-react'],
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: [
              'src/**/*.d.ts',
              'src/**/*.stories.tsx',
              'src/**/*.test.tsx',
            ],
          })
          .map((file) => [
            relative('src', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
