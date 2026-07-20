import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth';
import { PimPage } from '../pages/pim';

test.describe('PIM Module', () => {
  let authPage: AuthPage;
  let pimPage: PimPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    pimPage = new PimPage(page);

    await authPage.navigate();
    await authPage.login(
      process.env.HRM_USER ?? 'Admin',
      process.env.HRM_PASS ?? 'admin123');
    await pimPage.gotoPim();
  });

  test('REQ04 - TS01 - Searching by existing employee ID and expecting results', async ({ page }) => {
    await expect(page).toHaveURL(/\/pim\//);
    await expect(pimPage.header).toBeVisible();
    await expect(pimPage.employeeNameInput).toBeVisible();
    await expect(pimPage.employeeIdInput).toBeVisible();
    await pimPage.employeeIdInput.fill('0001');
    await pimPage.searchButton.click();
    await pimPage.waitForSearchResultState();
    await pimPage.expectAtLeastOneResult();
    await expect(pimPage.resultRows.first()).toBeVisible();
    await page.waitForLoadState('networkidle');
    await expect(pimPage.resultRows.first()).toHaveText(/0001/);
  });

});  
