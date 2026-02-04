import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { ProductsPage } from '../../pages/ProductsPage'

test.describe('Products page tests', () => {
  let loginPage: LoginPage
  let productsPage: ProductsPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productsPage = new ProductsPage(page)
    await page.goto('https://www.saucedemo.com/')
    await loginPage.loginToPage({
      login: 'standard_user',
      password: 'secret_sauce',
    })
  })

  test('Add some products', async ({ page }) => {
    await productsPage.addFewProducts({ products: ['backpack', 'light', 'jacket'] })
  })

  test('Remove some products', async ({ page }) => {
    await productsPage.addFewProducts({ products: ['backpack', 'jacket'] })
  })

  test('Check number in cart and go to cart', async ({ page }) => {
    await productsPage.addFewProducts({ products: ['backpack', 'light'] })
    await productsPage.checkNumberOfItemsInCart({ expectedValue: '2' })
    await page.locator('[data-test="shopping-cart-link"]').click()
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible()
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
  })
})
