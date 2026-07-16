import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth';
import { DashboardPage } from '../pages/homepage';
import { ClaimPage } from '../pages/Claim';

test.describe('Create Claim', () => {
    let authPage: AuthPage;
    let dashboardPage: DashboardPage;
    let claimPage: ClaimPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        dashboardPage = new DashboardPage(page);
        await authPage.navigate();
        claimPage = new ClaimPage(page);
    });
    
    

    test('REQ02 - TS01 - Create a Claim - Successfuly', async ({page}) => {
        const authPage = new AuthPage(page);
        await authPage.navigate();
        await authPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/dashboard/i);
        await dashboardPage.clickMenuByName('Claim');
        await expect(page).toHaveURL(/claim/);
        await claimPage.assignClaimButton.click();
        await expect(claimPage.NewClaimEmployeeName).toBeVisible();
        await claimPage.selectEmployee('Th');
        await claimPage.selectEvent('Accommodation');
        await claimPage.selectCurrency('Argentine Peso');
        await claimPage.NewClaimRemarks.fill('Travel expenses for client meeting');
        await claimPage.NewClaimCreateButton.click();
        await expect(claimPage.claimReferenceId).toBeVisible();
        await expect(claimPage.claimReferenceId).toHaveValue(/\d+/);
        const referenceId = await claimPage.getReferenceId();
        console.log('Reference ID:', referenceId);
    });

    test('REQ02 - TS02 - Search Exist Claim in the Table', async ({page}) => {
        const authPage = new AuthPage(page);
        await authPage.navigate();
        await authPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/dashboard/i);
        await dashboardPage.clickMenuByName('Claim');
        await expect(page).toHaveURL(/claim/);
        await claimPage.selectReferenceId('2026');
        await claimPage.searchButton.click();
        const rowText = await claimPage.recordsTableRows.first().textContent();
        console.log(rowText);
        expect(rowText).toContain('2026');
    });

       test('REQ02 - TS03 - View Detail Exist Claim in the Table', async ({page}) => {
        const authPage = new AuthPage(page);
        await authPage.navigate();
        await authPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/dashboard/i);
        await dashboardPage.clickMenuByName('Claim');
        await expect(page).toHaveURL(/claim/);
        const row = claimPage.recordsTableRows.filter({
        hasText: '202307180000001'});
        await expect(row).toHaveCount(1);
        await claimPage.clickViewDetailsByReference('202307180000001');
        await expect(claimPage.claimReferenceId).toBeVisible();
        await expect(claimPage.claimReferenceId).toHaveValue(/\d+/);
        const referenceId = await claimPage.getReferenceId();
        console.log('Reference ID:', referenceId);
    });


    
});
