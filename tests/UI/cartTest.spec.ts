import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { ProductsPage } from '../../pages/ProductsPage'
import { CartPage } from '../../pages/CartPage'

test.describe('Cart page tests', () => {
  let loginPage: LoginPage
  let productsPage: ProductsPage
  let cartPage: CartPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productsPage = new ProductsPage(page)
    cartPage = new CartPage(page)

    await page.goto('https://www.saucedemo.com/')
    await loginPage.loginToPage({
      login: 'standard_user',
      password: 'secret_sauce',
    })

    await productsPage.addFewProducts({ products: ['backpack', 'light'] })
    await productsPage.checkNumberOfItemsInCart({ expectedValue: '2' })
    await productsPage.goToCart()
  })

  test('Check visibility of products and removing products', async ({ page }) => {
    await cartPage.checkVisibilityOfProducts({ products: ['Sauce Labs Bike Light', 'Sauce Labs Backpack'] })
    await cartPage.removeSomeProducts({ selectors: [page.locator('button[id$="bike-light"]')] })
    await cartPage.checkVisibilityOfProducts({ products: ['Sauce Labs Backpack'] })
  })

  test('Check going back to products and going to checkout', async ({ page }) => {
    await cartPage.goBackToProducts()
    await page.locator('[data-test="shopping-cart-link"]').click()
    await productsPage.goToCart()
    await cartPage.goToCheckout()
  })
})
