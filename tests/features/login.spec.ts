import { expect } from '@playwright/test';
import { test } from '../fixture';
import accounts from '../../testdata/data-account.json';
import dataProduct from '../../testdata/data-product.json';
// Lấy ENV và ROLE từ biến môi trường (default = local + user)
const ENV = process.env.TEST_ENV || 'prod';
const ROLE = process.env.TEST_ROLE || 'admin';

const creds = accounts[ENV][ROLE];

test.describe('Login', () => {
    test(`Login success as ${ROLE} on ${ENV} `, async ({ loginPage, page }) => {
        await loginPage.goto('https://www.saucedemo.com');
        await loginPage.login(creds.username, creds.password);

        const inventoryList = page.locator('[data-test="inventory-item-name"]');
        const itemCount = await inventoryList.count();
        console.log('item count:' + itemCount);
        expect(itemCount).toBe(6);

        for (const item of await inventoryList.all()) {  // trả về 1 list các locator 
            const itemName = await item.textContent();  // trả về 1 single locator 
            if (itemName && dataProduct.hasOwnProperty(itemName)) {
                const priceLocator = item.locator('xpath=../../..//div[@data-test="inventory-item-price"]');
                const itemPrice = await priceLocator.textContent();
                console.log(itemPrice + ' item price' + item);
                expect(itemPrice).toBe(dataProduct[itemName]);
            }
        }

    });
    test(`Login failed as ${ROLE} on ${ENV} `, async ({ loginPage, page }) => {
        await loginPage.goto('https://www.saucedemo.com');
        await loginPage.login(creds.username, 'invalid_password');
        expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
        await loginPage.clickOnErrorButton();
        expect(await loginPage.isErrorMessageHidden()).toBe(true)
    });
});