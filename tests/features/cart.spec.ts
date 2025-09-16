import { test, expect } from '../fixture';
import dataProduct from '../../testdata/data-product.json';

test.describe('Cart Feature', () => {
    const listProductNames = Object.keys(dataProduct);

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.gotoInventoryPage();
        await inventoryPage.addToCartByProductName(listProductNames[0]);
        await inventoryPage.addToCartByProductName(listProductNames[1]);
        // Verify cart badge = 2
        expect(Number(await inventoryPage.getCartCount())).toBe(2);
    });
    test('Add and remove products in cart', async ({ cartPage }) => {
        await cartPage.gotoCartPage();
        expect(Number(await cartPage.getCartItemCount())).toBe(2);

        // Remove 1 sản phẩm (sản phẩm đầu tiên)
        const removed = await cartPage.removeByName(listProductNames[0]);
        expect(removed).toBe(true);
        // Verify cart chỉ còn 1 sản phẩm
        expect(Number(await cartPage.getCartItemCount())).toBe(1);
        await cartPage.continueShopping();
    });
});