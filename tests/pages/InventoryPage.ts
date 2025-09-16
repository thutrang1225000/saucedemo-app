import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    private readonly cartBadge: Locator;
    private readonly itemCard: Locator;
    private readonly itemName: Locator;
    private readonly addToCartBtnSelector: string;
    private readonly removeFromCartBtnSelector: string;
    constructor(protected readonly page: Page) {
        super(page)
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.itemCard = page.locator('[data-test="inventory-item"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.addToCartBtnSelector = 'button:has-text("Add to cart")';
        this.removeFromCartBtnSelector = 'button:has-text("Remove")';
    }

    async gotoInventoryPage() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }
    async addToCartByProductName(productName: string): Promise<boolean> {
        const card = this.itemCard.filter({
            has: this.itemName.filter({ hasText: productName })
        });
        await card.waitFor({ state: 'visible' });
        await card.locator(this.addToCartBtnSelector).click();

        const addToCartBtnSelector = card.locator(this.addToCartBtnSelector);
        if (await card.getByRole('button', { name: /^remove$/i }).count()) {
            return true;
        }
        try {
            await addToCartBtnSelector.click({ timeout: 1500 });
            return true;
        } catch {
            return false;
        }
    }

    async removeFromCartByProductName(name: string): Promise<boolean> {
        const card = this.itemCard.filter({
            has: this.itemName.filter({ hasText: name })
        });
        const removeBtn = card.locator(this.removeFromCartBtnSelector);
        // Nếu không có Remove → không làm gì, trả về false (trạng thái đã sạch / chưa add)
        if (await removeBtn.count() === 0 || !(await removeBtn.isVisible())) return false;
        // Click Remove với timeout ngắn để không treo test
        try {
            await removeBtn.click({ timeout: 1500 });
            return true;
        } catch {
            return false;
        }
    }

    async getCartCount(): Promise<number> {
        // 1) Không có badge => giỏ trống
        if (await this.cartBadge.count() === 0) return 0;
        // 2) Có badge thì đọc text với timeout ngắn, tránh đợi 30s
        const text = await this.cartBadge.textContent({ timeout: 1000 }).catch(() => null);
        // 3) Convert sang number an toàn
        const n = Number.parseInt((text ?? '0').trim(), 10);
        return Number.isNaN(n) ? 0 : n;
    }

}