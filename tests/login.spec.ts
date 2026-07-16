import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth';

test('TC01 - Login Successfuly', async ({ page, baseURL }) => {

    const authPage = new AuthPage(page);
    await authPage.navigate();
    await authPage.login('Admin', 'admin123');
    await expect(page).toHaveURL(/dashboard/);

});

test('TC02 - Login failed - empty fields', async ({ page, baseURL }) => {

    const authPage = new AuthPage(page);
    await authPage.navigate();
    expect(await authPage.pageheader.textContent()).toBe('Login');
    await authPage.usernameInput.fill('');
    await authPage.passwordInput.fill('');
    await authPage.signInButton.click();
    await expect(authPage.Fieldrequired).toBeVisible({ timeout: 10000 });
    await expect(authPage.Fieldrequired).toHaveText('Required'); 
 
});

test('TC03 - Login failed - wrong fields', async ({ page, baseURL }) => {

    const authPage = new AuthPage(page);
    await authPage.navigate();
    expect(await authPage.pageheader.textContent()).toBe('Login');
    await authPage.usernameInput.fill('wrongUser');
    await authPage.passwordInput.fill('wrongPassword');
    await authPage.signInButton.click(); 
    await expect(authPage.errorlogin).toBeVisible({ timeout: 10000 });
    await expect(authPage.errorlogin).toHaveText('Invalid credentials');
   
});