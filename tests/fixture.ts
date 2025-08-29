import { test as base } from '@playwright/test';
import { LoginPage } from './pages/types/login';      

// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: LoginPage;
};

// Extend base test by providing "loginPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture. - Khởi tạo page object 
    const loginPage = new LoginPage(page);
 //// authentication config thì viết vào đây 
    // await loginPage.goto('https://www.saucedemo.com/');
    // await todoPage.addToDo('item1');
    // await todoPage.addToDo('item2');

    // Use the fixture value in the test.
   await use(loginPage)
  },


});
export { expect } from '@playwright/test';