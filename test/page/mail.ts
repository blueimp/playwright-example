import { Locator, Page } from '@playwright/test'

export class MailPage {
  readonly page: Page
  readonly recipientInput: Locator
  readonly subjectInput: Locator
  readonly contentInput: Locator
  readonly attachmentsSelector: string
  readonly submitButton: Locator
  readonly resultElement: Locator
  readonly backLink: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.recipientInput = page.locator('#recipient')
    this.subjectInput = page.locator('#subject')
    this.contentInput = page.locator('#content')
    this.attachmentsSelector = '#attachments'
    this.submitButton = page.locator('#submit')
    this.resultElement = page.locator('#result')
    this.backLink = page.locator('#back a')
    this.logoutButton = page.locator('#logout')
  }

  async goto() {
    await this.page.goto('/')
  }

  async send(
    recipient: string,
    subject?: string,
    content?: string,
    attachments?: Array<string>
  ) {
    await this.recipientInput.fill(recipient)
    if (subject) await this.subjectInput.fill(subject)
    if (content) await this.contentInput.fill(content)
    if (attachments)
      await this.page.setInputFiles(this.attachmentsSelector, attachments)
    await this.submitButton.click()
  }
}
