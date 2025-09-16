import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

// Extend base test by providing "loginPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // const conn = await connectToDB();   // setup scripts 
    const loginPage = new LoginPage(page); //setup scripts  // before each test
    await use(loginPage) //  đây là khi testcase đang chạy 
    // await conn.close(); // after 

  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.gotoInventoryPage();
    await use(inventoryPage)
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await cartPage.gotoCartPage();
    await use(cartPage)
  },

  checkoutPage: async ({ page, inventoryPage }, use) => {
    await inventoryPage.addToCartByProductName('Sauce Labs Backpack');
    await inventoryPage.addToCartByProductName('Sauce Labs Bike Light');
    await inventoryPage.addToCartByProductName('Sauce Labs Bolt T-Shirt');
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.gotoCheckoutPage();
    await use(checkoutPage)
  }
});
export { expect } from '@playwright/test';