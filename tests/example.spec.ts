import { test, expect, BrowserContext, Page } from '@playwright/test';
import { ProductPage, sites } from '../pages/ExamplePage';

sites.forEach(({ url, locators }) => {
  test.describe.serial(`Testy produktowe dla ${url}`, () => {
    let context: BrowserContext;
    let page: Page;
    let productPage: ProductPage;

    test.beforeAll(async ({ browser }) => {
      context = await browser.newContext();
      page = await context.newPage();
      productPage = new ProductPage(page);
    });

    test('Otwieranie strony produktu po SKU i sprawdzenie checkout', async () => {
      await page.goto(url);
      await page.getByText(locators.acceptCookiesBtn).click();
      await page.getByText(locators.acceptAgeBtn).click();
      await page.locator(locators.shopBtn).hover();

      if (url === 'https://www.ploom.co.uk/en') {
        await page.getByText(locators.seeAllProducts).first().click();
      }

      await page.locator(locators.productSKU).click({ force: true });
      await page.getByText(locators.addCart).click();
      await expect(page.locator(locators.cartValue)).toHaveText('1');

      if (url === 'https://www.ploom.co.uk/en') {
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          page.getByText(locators.goToCheckout).click(),
        ]);
        await newPage.waitForLoadState('load');
        await expect(newPage.locator(locators.productNameLocator).nth(1)).toHaveText(locators.productName);
      } else {
        await page.getByText(locators.goToCheckout).click();
        await expect(page.locator(locators.productNameLocator).nth(1)).toHaveText(locators.productName);
      }
    });

    test('Sprawdzenie usuwania produktu z koszyka na oryginalnej karcie', async () => {
      if (url === 'https://www.ploom.co.uk/en') {
        await page.bringToFront();
        await page.getByText(locators.removeItem).click();
      } else {
        await page.locator(locators.cartLocator).click();
        await page.getByTestId('item').getByText(locators.removeItem).click();
      }
      await expect(page.locator(locators.emptyCartLocator).nth(0)).toHaveText(locators.empyCartMessage);
      await expect(page.locator(locators.itemsCountLocator)).toHaveText(locators.itemsCountNumber);
    });

    test('Sprawdzenie obrazków i linków', async () => {
      await page.goto(url);
      await page.locator(locators.shopBtn).hover();

      if (url === 'https://www.ploom.co.uk/en') {
        await page.getByText(locators.seeAllProducts).first().click();
      }

      await page.locator(locators.productSKU).click({ force: true });
      await page.waitForLoadState('load');

      const links = await productPage.getAllLinks();
      const images = await productPage.getAllImages();

      const brokenLinks: string[] = [];
      const brokenImages: string[] = [];

      const concurrency = 5;

      async function checkUrls(urls: string[], brokenArray: string[]) {
        for (let i = 0; i < urls.length; i += concurrency) {
          const batch = urls.slice(i, i + concurrency);
          await Promise.all(batch.map(async (url) => {
            if (!url.startsWith('http')) return;
            try {
              const response = await page.request.get(url);
              if (response.status() >= 400) {
                brokenArray.push(`${url} (status ${response.status()})`);
              }
            } catch (e) {
              brokenArray.push(`${url} (error: ${(e as Error).message})`);
            }
          }));
        }
      }

      await checkUrls(links, brokenLinks);
      await checkUrls(images, brokenImages);

      if (brokenLinks.length > 0 || brokenImages.length > 0) {
        console.warn('Broken links found:', brokenLinks);
        console.warn('Broken images found:', brokenImages);
      }
    });

    test.afterAll(async () => {
      await context.close();
    });
  });
});