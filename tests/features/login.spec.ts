import {  expect } from '@playwright/test';
import {test} from '../fixture';
const data: { [key: string]: string } = {
    'Sauce Labs Backpack': '$29.99',
    'Sauce Labs Bike Light': '$9.99',
    'Sauce Labs Bolt T-Shirt': '$15.99',
    'Sauce Labs Fleece Jacket': '$49.99',
    'Sauce Labs Onesie': '$7.99',
    'Test.allTheThings() T-Shirt (Red)': '$15.99'
}
test('Login success ', async ({ loginPage, page }) => {
    await loginPage.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    // await loginPage.clickOnSaveButton();

    const inventoryList = page.locator('[data-test="inventory-item-name"]');
    const itemCount = await inventoryList.count();
    console.log('item count:' + itemCount);
    expect(itemCount).toBe(6);

    for (const item of await inventoryList.all()) {  // trả về 1 list các locator 
        const itemName = await item.textContent();  // trả về 1 single locator 
        console.log(itemName + ' trang test locator Name' + item);
        if (itemName && data.hasOwnProperty(itemName)) {
            const priceLocator = item.locator('xpath=../../..//div[@data-test="inventory-item-price"]');
            const itemPrice = await priceLocator.textContent();
            console.log(itemPrice + ' item price' + item);
            expect(itemPrice).toBe(data[itemName]);
        }
    }

});