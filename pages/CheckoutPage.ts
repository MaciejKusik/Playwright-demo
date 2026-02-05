import { expect, Locator, Page } from 'playwright/test'

export class CheckoutPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async fillPersonalDataAndContinue(param: { firstName: String; lastName: String; postalCode: String }) {
    await this.page.getByPlaceholder('First Name').fill(`${param.firstName}`)
    await this.page.getByPlaceholder('Last Name').fill(`${param.lastName}`)
    await this.page.getByPlaceholder('Zip/Postal Code').fill(`${param.postalCode}`)
    await this.page.getByRole('button', { name: 'Continue' }).click()
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible()
  }

  async checkVisibilityOfProducts(param: { products: string[] }) {
    for (const product of param.products) {
      await expect(this.page.getByText(`${product}`)).toBeVisible()
    }
  }

  async checkTotalPrice() {
    const elements = await this.page.$$('.inventory_item_price')
    const text_sum = await this.page.locator('.summary_subtotal_label').innerText()
    const text_sum_trimmed = text_sum.replace('Item total: $', '').trim()
    const values: number[] = []

    for (const el of elements) {
      const text = await el.textContent()
      if (text) {
        const number = parseFloat(text.replace('$', '').trim())
        values.push(number)
      }
    }

    let sum: number = 0
    for (let i = 1; i < values.length; i++) {
      sum += values[i]
      return sum
    }
    expect(sum).toBe(text_sum_trimmed)
  }
}
