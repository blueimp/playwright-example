import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/login'
import { MailPage } from '../page/mail'
import { login } from '../util'
import config from '../config'

test.describe('session', () => {
  test('requires login', async ({ page }) => {
    await page.context().clearCookies()
    const mailPage = new MailPage(page)
    await mailPage.goto()
    const loginPage = new LoginPage(page)
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(page).toHaveTitle('Login')
  })

  test('requires email', async ({ page }) => {
    await page.context().clearCookies()
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.authenticate('', config.user.password)
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(page).toHaveTitle('Login')
  })

  test('requires password', async ({ page }) => {
    await page.context().clearCookies()
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.authenticate(config.user.email, '')
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(page).toHaveTitle('Login')
  })

  test('logs in', async ({ page }) => {
    await page.context().clearCookies()
    await login(page)
    const mailPage = new MailPage(page)
    await expect(mailPage.recipientInput).toBeVisible()
    await expect(page).toHaveTitle('Send mail')
  })

  test('logs out', async ({ page }) => {
    const mailPage = new MailPage(page)
    await mailPage.goto()
    await mailPage.logoutButton.click()
    const loginPage = new LoginPage(page)
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(page).toHaveTitle('Login')
  })
})
