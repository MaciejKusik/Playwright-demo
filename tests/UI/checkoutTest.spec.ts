import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { ProductsPage } from '../../pages/ProductsPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'

test.describe('Checkout page tests', () => {
  let loginPage: LoginPage
  let productsPage: ProductsPage
  let cartPage: CartPage
  let checkoutPage: CheckoutPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productsPage = new ProductsPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)

    await page.goto('https://www.saucedemo.com/')
    await loginPage.loginToPage({
      login: 'standard_user',
      password: 'secret_sauce',
    })

    await productsPage.addFewProducts({ products: ['backpack', 'light'] })
    await productsPage.checkNumberOfItemsInCart({ expectedValue: '2' })
    await productsPage.goToCart()
    await cartPage.goToCheckout()
  })

  test('Fill data and check overview', async ({ page }) => {
    await checkoutPage.fillPersonalDataAndContinue({ firstName: 'John', lastName: 'Smith', postalCode: '11-111' })
    await checkoutPage.checkVisibilityOfProducts({ products: ['Sauce Labs Bike Light', 'Sauce Labs Bike Light'] })
    await checkoutPage.checkTotalPrice()
  })
})
