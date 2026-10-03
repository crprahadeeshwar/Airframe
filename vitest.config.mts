import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    env: loadEnv(mode, process.cwd(), ''),
    include: ['src/__tests__/**/*.test.{ts,tsx}'],
  },
}))