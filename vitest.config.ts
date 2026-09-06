import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.*', 'src/**/*.test.*', 'src/**/*.d.ts'],
    },
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    environment: 'happy-dom',
  },
})
