import { test, expect } from '../fixture';
import dataProduct from '../../testdata/data-product.json';

test.describe('Cart Feature', () => {
    test('Add and remove products in cart', async ({ cartPage, inventoryPage, page }) => {
        // 1) Navigate to inventory page first
        await inventoryPage.gotoInventoryPage();

        // 2) Add 2 sản phẩm đầu tiên vào cart
        const listProductNames = Object.keys(dataProduct);
        await inventoryPage.addToCartByProductName(listProductNames[0]);
        await inventoryPage.addToCartByProductName(listProductNames[1]);

        // 3) Verify cart badge = 2
        expect(Number(await inventoryPage.getCartCount())).toBe(2);
        // 4) Click cart icon để vào CartPage
        await cartPage.gotoCartPage();

        // 5) Verify 2 item trong giỏ
        expect(Number(await cartPage.getCartItemCount())).toBe(2);

        // 6) Remove 1 sản phẩm (sản phẩm đầu tiên)
        const removed = await cartPage.removeByName(listProductNames[0]);
        expect(removed).toBe(true);

        // 7) Verify cart chỉ còn 1 sản phẩm
        expect(Number(await cartPage.getCartItemCount())).toBe(1);

        await cartPage.continueShopping();
    });
});