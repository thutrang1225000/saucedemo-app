import { Locator, Page } from "@playwright/test";
export class BasePage {
    protected page: Page;
    protected readonly commonButton: Locator;
    protected readonly commonButton2nd: Locator;

    constructor(page: Page) {
        this.commonButton = page.getByRole('button', { name: 'commonButton1' })
        this.commonButton2nd = page.getByRole('button', { name: 'commonButton2' })
    }


    async clickOnSaveButton() {
        await this.commonButton.click
    }
}


//Những cái nào là common element thì để ở trang này.
//Ví dụ là các thanh menu, navigation bar được sticky trên page 