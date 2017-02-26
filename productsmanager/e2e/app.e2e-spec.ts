import { ProductsmanagerPage } from './app.po';

describe('productsmanager App', () => {
  let page: ProductsmanagerPage;

  beforeEach(() => {
    page = new ProductsmanagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
