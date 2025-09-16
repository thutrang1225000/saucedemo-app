import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


//LoginPage duoc ke thua tư BasePage 
export class LoginPage extends BasePage {
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  protected readonly errorButton: Locator;

  constructor(protected readonly page: Page) {
    super(page)
    this.userNameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('[data-test="error-button"]');
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async clickOnErrorButton() {
    await this.errorButton.click();
  }

  async isErrorMessageHidden() {
    return await this.errorMessage.isHidden();
  }


  // Ví dụ về việc gọi commonbutton từ thằng kế thừa BasePage
  //  async clickOnSaveButton(){
  //      await this.commonButton2nd.click()
  //  }
}
