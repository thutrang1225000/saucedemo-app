import { chromium, FullConfig } from '@playwright/test';
import accounts from './testdata/data-account.json';
// Lấy ENV và ROLE từ biến môi trường (default = local + user)
const ENV = process.env.TEST_ENV || 'prod';
const ROLE = process.env.TEST_ROLE || 'admin';

const creds = accounts[ENV][ROLE];
async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', creds.username);
    await page.fill('[data-test="password"]', creds.password);
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html');
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;