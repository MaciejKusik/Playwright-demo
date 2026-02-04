import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 20000,
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
  },
})
