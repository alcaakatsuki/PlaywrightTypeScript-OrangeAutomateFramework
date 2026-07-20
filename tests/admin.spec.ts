import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth';
import { AdminPage } from '../pages/admin';

test.describe('Admin Module', () => {
  let authPage: AuthPage;
  let adminPage: AdminPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    adminPage = new AdminPage(page);

    await authPage.navigate();
    await authPage.login(
      process.env.HRM_USER ?? 'Admin',
      process.env.HRM_PASS ?? 'admin123');
    await adminPage.gotoAdmin();
  });

  test('REQ03 - TS01 - Open Admintab and show results by username Searching', async () => {
    await adminPage.searchByUsername('Admin');
    await adminPage.expectAtLeastOneResult();
    const count = await adminPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('REQ03 - TS02 - Filter by rol user and status', async () => {
    await adminPage.selectUserRole('Admin');
    await adminPage.selectStatus('Enabled');
    await adminPage.clickSearch();
    await adminPage.expectAtLeastOneResult();
    const count = await adminPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('REQ03 - TS03 - Clean filter using "Reset" Button"', async ({ page }) => {
    await adminPage.searchByUsername('Admin');
    await adminPage.clickReset();
    await expect(adminPage.usernameInput).toHaveValue('');
    await adminPage.clickSearch();
    await adminPage.expectAtLeastOneResult();
    await expect(page).toHaveURL(/\/admin\//);
  });
});