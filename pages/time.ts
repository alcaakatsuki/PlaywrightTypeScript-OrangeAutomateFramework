import { Locator, Page, expect } from '@playwright/test';

export class TimePage {
  readonly page: Page;

  // Navegación
  readonly timeMenuItem: Locator;
  readonly pageHeader: Locator;

  // Filtros Timesheet
  readonly employeeNameInput: Locator;
  readonly viewButton: Locator;
  readonly requiredEmployeeText: Locator;

  // Bloques del módulo
  readonly topBar: Locator;
  readonly timesheetSheet: Locator;
  readonly editButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.timeMenuItem = page.locator('a[href*="/web/index.php/time/viewTimeModule"]');
    this.pageHeader = page.getByRole('heading', { name: 'Time', exact: true });

    this.employeeNameInput = page.getByPlaceholder('Type for hints...').first();
    this.viewButton = page.getByRole('button', { name: 'View' });
    this.requiredEmployeeText = page.getByText('Required').first();

    this.topBar = page.locator('.oxd-topbar-body');
    this.timesheetSheet = page.locator('.orangehrm-paper-container');
    this.editButton = page.getByRole('button', { name: 'Edit' });
  }

  async gotoTime() {
    await expect(this.timeMenuItem).toBeVisible({ timeout: 60000 });
    await this.timeMenuItem.click({ timeout: 60000 });
    await expect(this.page).toHaveURL(/\/time\//);
    await expect(this.pageHeader).toBeVisible();
  }

  async selectFirstEmployeeSuggestion(searchText = 'a') {
    await this.employeeNameInput.fill(searchText);
    const suggestion = this.page.locator('.oxd-autocomplete-option').first();
    await expect(suggestion).toBeVisible();
    await suggestion.click();
  }

  async viewEmployeeTimesheet() {
    await this.viewButton.click();
    await expect(this.page).toHaveURL(/\/time\/viewEmployeeTimesheet/);
    await expect(this.timesheetSheet).toBeVisible();
  }

  async expectValidationForMissingEmployee() {
    await this.employeeNameInput.fill('');
    await this.viewButton.click();
    await expect(this.requiredEmployeeText).toBeVisible();
  }
}
