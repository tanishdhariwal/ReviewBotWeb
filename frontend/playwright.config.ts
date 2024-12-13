import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  use: {
    baseURL: 'http://localhost:5173', // Replace with your app URL
    headless: true,
  },
});
