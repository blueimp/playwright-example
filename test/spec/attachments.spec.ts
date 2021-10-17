import { test, expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'
import { MailPage } from '../page/mail'
import { validateAttachment, assets, mailhog } from '../util'

test.describe('attachments', () => {
  test('sends one', async ({ page }) => {
    const recipient = uuidv4() + '@example.org'
    const file = assets[1]
    const mailPage = new MailPage(page)
    await mailPage.goto()
    await mailPage.send(recipient, 'One attachment', null, [file])
    await expect(await mailPage.resultElement.textContent()).toBe('Mail sent!')
    await expect(page).toHaveTitle('Mail sent!')
    const mail = await mailhog.latestTo(recipient)
    await expect(mail.attachments.length).toBe(1)
    const attachment = mail.attachments[0]
    await validateAttachment(attachment, file)
  })

  test('sends multiple', async ({ page }) => {
    const recipient = uuidv4() + '@example.org'
    const mailPage = new MailPage(page)
    await mailPage.goto()
    await mailPage.send(recipient, 'Multiple attachments', null, assets)
    await expect(await mailPage.resultElement.textContent()).toBe('Mail sent!')
    await expect(page).toHaveTitle('Mail sent!')
    const mail = await mailhog.latestTo(recipient)
    await expect(mail.attachments.length).toBe(assets.length)
    const validations = []
    for (const [index, file] of assets.entries()) {
      const attachment = mail.attachments[index]
      validations.push(validateAttachment(attachment, file))
    }
    await Promise.all(validations)
  })
})
