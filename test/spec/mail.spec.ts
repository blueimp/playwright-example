import { test, expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'
import { MailPage } from '../page/mail'
import { mailhog } from '../util'

test.describe('mail', () => {
  test('requires recipient', async ({ page }) => {
    const mailPage = new MailPage(page)
    await mailPage.goto()
    await mailPage.send('')
    await expect(mailPage.recipientInput).toBeVisible()
    await expect(page).toHaveTitle('Send mail')
  })

  test('sends unicode', async ({ page }) => {
    const recipient = uuidv4() + '@example.org'
    const content = '日本'
    const mailPage = new MailPage(page)
    await mailPage.goto()
    await mailPage.send(recipient, 'Unicode mail', content)
    await expect(await mailPage.resultElement.textContent()).toBe('Mail sent!')
    await expect(page).toHaveTitle('Mail sent!')
    await expect((await mailhog.latestTo(recipient)).text).toBe(content)
    await mailPage.backLink.click()
    await expect(mailPage.recipientInput).toBeVisible()
    await expect(page).toHaveTitle('Send mail')
  })
})
