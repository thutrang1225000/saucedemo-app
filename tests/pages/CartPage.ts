import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;

    constructor(protected readonly page: Page) {
        super(page)
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async gotoCartPage() {
        await this.page.goto('https://www.saucedemo.com/cart.html')
    }
    async getCartItemCount() {
        return await this.cartItem.count();
    }
    // Remove theo tên sản phẩm (nếu có)
    async removeByName(name: string) {
        const row = this.cartItem.filter({ has: this.page.locator('.inventory_item_name', { hasText: name }) });
        const removeBtn = row.getByRole('button', { name: /^remove$/i });
        if (await removeBtn.count()) {
            await removeBtn.click();
            return true;
        }
        return false;
    }
    async gotoCheckoutPage() {
        await this.checkoutButton.click();
    }
    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}