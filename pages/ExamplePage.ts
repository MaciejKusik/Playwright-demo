import { Page } from '@playwright/test';

export const sites = [
  {
    url: 'https://www.ploom.pl/pl',
    locators: {
      acceptCookiesBtn: 'Akceptuj wszystkie pliki cookie',
      acceptAgeBtn: 'Potwierdź',
      shopBtn: '[title="Sklep"]',
      seeAllProducts: 'Zobacz więcej',
      productSKU: '[data-sku="16355378"]',
      addCart: 'Dodaj do koszyka',
      cartValue: '.CartIcon-module-label-qGXlU',
      goToCheckout: 'Realizacja zamówienia',
      productName: 'Ploom X Advanced Black',
      productNameLocator: '[class="ProductMiniature-module-productName-JRifI"]',

      removeItem: 'Usuń produkt',
      cartLocator: '[data-testid="cartIcon"]',
      emptyCartLocator: '[data-testid="emptyCartContainer"]',
      empyCartMessage: 'W tej chwili w Twoim koszyku nie ma żadnych produktów.',
      itemsCountLocator: '[class$="CartMiniHeader-module-count-i2EyF"]',
      itemsCountNumber: 'Ilość produktów: 0',
    }
  },
  {
    url: 'https://www.ploom.co.uk/en',
    locators: {
      acceptCookiesBtn: 'GOT IT',
      acceptAgeBtn: 'Yes, discover more',
      shopBtn: '[data-testid="headerItem-0"]',
      seeAllProducts: 'See all the products',
      productSKU: '[data-sku="ploom-x-advanced"]',
      addCart: 'Add to Cart',
      cartValue: '.CartIcon-module-label-qGXlU',
      goToCheckout: 'Checkout',
      productName: 'Ploom X Advanced Silver',
      productNameLocator: '[class="ProductMiniature-module-productName-JRifI"]',

      removeItem: 'Remove Item',
      cartLocator: '[data-testid="cartIcon"]',
      emptyCartLocator: '[data-testid="emptyCartContainer"]',
      empyCartMessage: 'There are no products in your cart at the moment.',
      itemsCountLocator: '[class$="CartMiniHeader-module-count-i2EyF"]',
      itemsCountNumber: '0 Items',
    }
  }
];

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getAllLinks(): Promise<string[]> {
    return await this.page.locator('a').evaluateAll((anchors: HTMLAnchorElement[]) =>
      anchors.map(a => a.href)
    );
  }

  async getAllImages(): Promise<string[]> {
    return await this.page.locator('img').evaluateAll((images: HTMLImageElement[]) =>
      images.map(img => img.src)
    );
  }
}