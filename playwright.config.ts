import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 20000,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
  },
})
