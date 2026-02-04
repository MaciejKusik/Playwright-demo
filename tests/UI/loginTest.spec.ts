import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

test.describe('Login page tests', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    loginPage = new LoginPage(page)
  })

  test('Valid login', async ({ page }) => {
    await loginPage.loginToPage({
      login: 'standard_user',
      password: 'secret_sauce',
    })

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible()
  })

  test('Invalid login', async ({ page }) => {
    await loginPage.loginToPage({
      login: 'standard_user',
      password: 'wrong_pass',
    })

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
  })

  test('Locked out user', async ({ page }) => {
    await loginPage.loginToPage({
      login: 'locked_out_user',
      password: 'secret_sauce',
    })

    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible()
  })
})
