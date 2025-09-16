import { test, expect } from '../fixture';
import dataProduct from '../../testdata/data-product.json';


test.describe('Checkout scenario', () => {

    const listProductNames = Object.keys(dataProduct);

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.gotoInventoryPage();
        await inventoryPage.addToCartByProductName(listProductNames[0]);
        await inventoryPage.addToCartByProductName(listProductNames[1]);
        await inventoryPage.addToCartByProductName(listProductNames[2]);
    });
    test('checkout step one', async ({ checkoutPage }) => {

        await checkoutPage.fillYourInfo('Trang', 'Thu', '10000');
        await checkoutPage.verifySubtotal(['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']);
        await checkoutPage.finishOrder();
        await checkoutPage.verifyOrderComplete();

    });


});
