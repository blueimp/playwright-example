import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./test/global-setup'),
  testDir: 'test/spec',
  workers: 5,
  retries: 1,
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    baseURL: process.env.BASE_URL || 'http://localhost:8080',
    storageState: 'test/storage-state.json'
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'webKit',
      use: { browserName: 'webkit' }
    },
    {
      name: 'mobile-chromium',
      use: devices['Pixel 5']
    }
  ]
}

export default config
