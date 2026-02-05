import { expect, Page } from 'playwright/test'

export class ProductsPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click()
    await expect(this.page.getByText('Your Cart')).toBeVisible()
  }

  async addFewProducts(param: { products: string[] }) {
    for (const product of param.products) {
      await this.page.locator(`[data-test$="${product}"]`).click()
    }
  }

  async removeSomeProducts(param: { products: string[] }) {
    await this.page.locator(`[data-test$="${param.products}"]`).click()
  }

  async checkNumberOfItemsInCart(param: { expectedValue: string }) {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(param.expectedValue)
  }

  async filterPriceLowToHigh() {
    await this.page.selectOption('.product_sort_container', 'Price (low to high)')
    const elements = await this.page.$$('.inventory_item_price')

    const values: number[] = []

    for (const el of elements) {
      const text = await el.textContent()
      if (text) {
        const number = parseFloat(text.replace('$', '').trim())
        values.push(number)
      }
    }

    let isSorted = true
    for (let i = 1; i < values.length; i++) {
      if (values[i - 1] > values[i]) {
        isSorted = false
        break
      }
    }

    expect(isSorted).toBe(true)
  }
}
