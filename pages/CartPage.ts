import { expect, Locator, Page } from 'playwright/test'

export class CartPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async checkVisibilityOfProducts(param: { products: string[] }) {
    for (const product of param.products) {
      await expect(this.page.getByText(`${product}`)).toBeVisible()
    }
  }

  async removeSomeProducts(param: { selectors: Locator[] }) {
    for (const selector of param.selectors) {
      await selector.click()
    }
  }

  async goBackToProducts() {
    await this.page.getByText('Continue Shopping').click()
    await expect(this.page.getByText('Products')).toBeVisible()
  }

  async goToCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click()
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible()
  }
}
