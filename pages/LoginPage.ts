import { Page } from 'playwright/test'

export class LoginPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async loginToPage(param: { login: string; password: string }) {
    await this.page.getByPlaceholder('Username').fill(param.login)
    await this.page.getByPlaceholder('Password').fill(param.password)
    await this.page.getByRole('button', { name: 'Login' }).click()
  }
}
