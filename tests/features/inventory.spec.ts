import { test, expect } from '../fixture';
import dataProduct from '../../testdata/data-product.json';
test.describe('Inventory page', () => {
    const listProductNames = Object.keys(dataProduct);
    test('Add product to cart', async ({ inventoryPage, page }) => {
        let count = 0;
        for (const name of listProductNames) {
            count++;
            await inventoryPage.addToCartByProductName(name);
            expect(Number(await inventoryPage.getCartCount())).toBe(count);

        }
    });
    test('remove product from cart', async ({ inventoryPage, page }) => {
        for (const name of listProductNames) {
            await inventoryPage.addToCartByProductName(name);
        }
        // Verify badge = total number of products added
        expect(Number(await inventoryPage.getCartCount())).toBe(listProductNames.length);

        // Remove each product, badge decreases
        let expected = listProductNames.length; //expected lưu số lượng sản phẩm còn lại trong giỏ hàng.
        for (const name of listProductNames) {
            // Try remove if there is
            const removed = await inventoryPage.removeFromCartByProductName(name);

            // Nếu remove thành công → expected-1
            if (removed) expected--;
        }
        // // Verify badge giảm đúng (nếu app ẩn badge khi 0 thì getCartCount sẽ trả 0)
        expect(Number(await inventoryPage.getCartCount())).toBe(expected);
    });
});