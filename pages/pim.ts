import { Locator, Page, expect } from '@playwright/test';

export class PimPage {
  readonly page: Page;

  // Navegación
  readonly pimMenuItem: Locator;
  readonly header: Locator;

  // Búsqueda
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly addEmployeeButton: Locator;

  readonly employeeNameInput: Locator;
  readonly employeeIdInput: Locator;

  // Resultados
  readonly resultRows: Locator;
  readonly noRecordsText: Locator;

  // Add Employee
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;

  // Mensajes
  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;

    // Menú / header
    this.pimMenuItem = page.locator('a[href*="/web/index.php/pim/viewPimModule"]');
    this.header = page.getByRole('heading', { name: 'PIM' });

    // Botones
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });

    // Inputs búsqueda (Employee Information)
    this.employeeNameInput = page.getByPlaceholder('Type for hints...').first();
    this.employeeIdInput = page.locator('form input').nth(1); // más seguro que nth(2) en tu DOM actual

    // Result table / empty state
    this.resultRows = page.locator('.oxd-table-body .oxd-table-row');
    this.noRecordsText = page.getByText('No Records Found');

    // Add employee form
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' });

    this.toast = page.locator('.oxd-toast-content');
  }

  async gotoPim() {
    await this.pimMenuItem.click();
    await expect(this.page).toHaveURL(/\/pim\//);
    await expect(this.header).toBeVisible();
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
    await expect(this.page).toHaveURL(/\/pim\/addEmployee/);
  }

  async searchByEmployeeName(name: string) {
    await this.employeeNameInput.fill(name);

    // Intentar seleccionar sugerencia si aparece
    const suggestion = this.page.locator('.oxd-autocomplete-dropdown [role="option"]').first();
    if (await suggestion.isVisible({ timeout: 1500 }).catch(() => false)) {
      await suggestion.click();
    }

    await this.searchButton.click();
    await this.waitForSearchResultState();
  }

  async searchByEmployeeId(id: string) {
    await this.employeeIdInput.fill(id);
    await this.searchButton.click();
    await this.waitForSearchResultState();
  }

  async clickReset() {
    await this.resetButton.click();
  }

  async addEmployee(firstName: string, lastName: string, middleName?: string) {
    await this.clickAddEmployee();
    await this.firstNameInput.fill(firstName);
    if (middleName) await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }

  async waitForSearchResultState() {
  await expect(this.resultRows.first().or(this.noRecordsText)).toBeVisible({ timeout: 10000 });
}

  async expectAtLeastOneResult() {
    await expect
      .poll(async () => this.resultRows.count(), { timeout: 10000 })
      .toBeGreaterThan(0);
  }

  async expectNoRecordsFound() {
  await expect(this.noRecordsText).toBeVisible();
}

  async expectToastContains(text: string | RegExp) {
    await expect(this.toast).toContainText(text);
  }
}