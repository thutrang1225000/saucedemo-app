import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


//LoginPage duoc ke thua tư BasePage 
export class LoginPage extends BasePage{
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

  constructor(protected readonly page: Page) {
    super(page) 
    this.userNameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto(url:string) {
    await this.page.goto(url);
  }

   async login(username: string, password: string) {
   await this.userNameInput.fill(username);
   await this.passwordInput.fill(password);
   await this.loginButton.click();
 }

 // Ví dụ về việc gọi commonbutton từ thằng kế thừa BasePage
//  async clickOnSaveButton(){
//      await this.commonButton2nd.click()
//  }
}
