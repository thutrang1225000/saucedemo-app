import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import dataProduct from '../../testdata/data-product.json';
import { InventoryPage } from './InventoryPage';

export class CheckoutPage extends BasePage {
    readonly stepOneUrl = '/checkout-step-one.html';
    readonly stepTwoUrl = '/checkout-step-two.html';
    readonly checkoutButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;
    readonly cancelBtn: Locator;
    readonly finishBtn: Locator;

    // (Optional) các field tổng tiền ở step two
    readonly paymentInfo: Locator;
    readonly shippingInfo: Locator;
    readonly subTotalLabel: Locator;
    readonly tax: Locator;
    readonly total: Locator;

    constructor(protected readonly page: Page) {
        super(page)
        this.checkoutButton = page.locator('[data-test="checkout"]');
        // Step One
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.cancelBtn = page.locator('[data-test="cancel"]');

        // Step Two 
        this.finishBtn = page.locator('[data-test="finish"]');
        this.paymentInfo = page.locator('.summary_value_label').nth(0);
        this.shippingInfo = page.locator('.summary_value_label').nth(1);
        this.subTotalLabel = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
    }
    async gotoCheckoutPage() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html')
    }
    async fillYourInfo(first: string, last: string, zip: string) {
        await expect(this.page).toHaveURL(/checkout-step-one/);
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
        await this.continueBtn.click();
        await this.page.waitForURL('**/checkout-step-two.html');
    }


    async setUpCart(productNames: string[]) {
        const inventoryPage = new InventoryPage(this.page);
        await inventoryPage.gotoInventoryPage();
        for (const name of productNames) {
            await inventoryPage.addToCartByProductName(name);
        }
        console.log('setUpCart success with' + productNames.length + 'products');
        await this.openCart();
    }
    // Step Two: verify subtotal = sum(dataProduct)
    async verifySubtotal(productNames: string[]) {
        const subtotalText = await this.subTotalLabel.innerText(); // "Item total: $39.98"
        const uiSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));

        const expectedSubtotal = productNames.reduce((sum, name) => {
            return sum + parseFloat(dataProduct[name].replace('$', ''));
        }, 0);

        await expect(uiSubtotal).toBeCloseTo(expectedSubtotal, 2);
    }

    // Step Two: verify total = subtotal + tax
    async verifyTotalWithTax(productNames: string[]) {
        // Lấy subtotal từ UI
        const subtotalText = await this.subTotalLabel.innerText();
        const uiSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));

        // Lấy tax từ UI
        const taxText = await this.tax.innerText(); // "Tax: $3.20"
        const uiTax = parseFloat(taxText.replace('Tax: $', ''));

        // Lấy total từ UI
        const totalText = await this.total.innerText(); // "Total: $43.18"
        const uiTotal = parseFloat(totalText.replace('Total: $', ''));

        // Subtotal khớp data
        const expectedSubtotal = productNames.reduce((sum, name) => {
            return sum + parseFloat(dataProduct[name].replace('$', ''));
        }, 0);
        await expect(uiSubtotal).toBeCloseTo(expectedSubtotal, 2);

        // Total = Subtotal + Tax
        await expect(uiTotal).toBeCloseTo(uiSubtotal + uiTax, 2);
    }

    // Step Two: finish order
    async finishOrder() {
        await this.page.waitForURL('**/checkout-step-two.html');
        await this.finishBtn.click();
        await this.page.waitForURL('**/checkout-complete.html');
    }
    async verifyOrderComplete() {
        await expect(this.page).toHaveURL('checkout-complete.html');

    }
}
