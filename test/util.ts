import { Page, expect } from '@playwright/test'
import { lookup as mimeType } from 'mime-types'
import { readdirSync, readFileSync } from 'fs'
import { basename, join as pathJoin } from 'path'
import { Attachment } from 'mailhog'
import mailhogInit from 'mailhog'
import { LoginPage } from './page/login'
import config from './config'

export const assets = readdirSync(config.assetsDir, { withFileTypes: true })
  .filter(item => item.isFile() && item.name[0] !== '.')
  .map(item => pathJoin(config.assetsDir, item.name))

export const mailhog = mailhogInit(config.mailhog)

export async function login(page: Page) {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.authenticate(config.user.email, config.user.password)
}

export async function validateAttachment(attachment: Attachment, file: string) {
  await expect(attachment.name).toBe(basename(file))
  await expect(attachment.type).toBe(mimeType(file))
  const body = Buffer.from(
    attachment.Body,
    attachment.encoding as BufferEncoding
  )
  await expect(body.equals(readFileSync(file))).toBe(true)
}
