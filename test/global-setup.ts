import { chromium, FullConfig } from '@playwright/test'
import { login } from './util'

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use
  const browser = await chromium.launch()
  const page = await browser.newPage({ baseURL })
  await login(page)
  await page.context().storageState({ path: storageState as string })
  await browser.close()
}

export default globalSetup
