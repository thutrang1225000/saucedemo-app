import { test, expect } from '../fixture';
import { BasePage } from '../pages/BasePage';
// Yêu cầu: đã có global-setup để bypass login (storageState.json)
// hoặc login trong beforeEach tùy bạn.

test.describe('Checkout scenario', () => {
    test('checkout step one', async ({ checkoutPage }) => {

        await checkoutPage.fillYourInfo('Trang', 'Thu', '10000');
        await checkoutPage.verifySubtotal(['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']);
        await checkoutPage.finishOrder();
        await checkoutPage.verifyOrderComplete();

    });


});
