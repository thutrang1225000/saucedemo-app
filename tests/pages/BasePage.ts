import { Locator, Page } from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected readonly menuButton: Locator;
    protected readonly cartButton: Locator;
    protected readonly cartItem: Locator;
    protected readonly itemQuantity: Locator;
    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.locator('button[type="button"][id="react-burger-menu-btn"]');
        this.cartButton = page.getByTestId('shopping-cart-link');
        this.cartItem = page.locator('[data-test="inventory-item"]');
        this.itemQuantity = page.locator('[data-test="item-quantity"]');

    }

    async openMenu() {
        await this.menuButton.click();
    }

    async openCart() {
        await this.cartButton.waitFor({ state: 'visible' });
        await this.cartButton.click();
    }
    async itemTotal() {
        const itemPrice = await this.cartItem.locator('[data-test="inventory-item-price"]').textContent();
        const itemQuantity = await this.itemQuantity.textContent();
        const itemTotal = Number(itemPrice) * Number(itemQuantity);
        return itemTotal;

    }
    async getCartItemCount() {
        return await this.cartItem.count();
    }
}


//Những cái nào là common element thì để ở trang này.
//Ví dụ là các thanh menu, navigation bar được sticky trên page 