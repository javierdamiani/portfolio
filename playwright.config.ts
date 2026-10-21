import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4321';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // --ignore-lock keeps astro 7 preview in the foreground (it auto-backgrounds when run by an agent).
    command: 'npm run preview -- --host 127.0.0.1 --port 4321 --ignore-lock',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
