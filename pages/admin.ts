import { Locator, Page, expect } from '@playwright/test';

export class AdminPage {
  readonly page: Page;

  // Navegación  
  readonly adminMenuItem: Locator;
  readonly pageHeader: Locator;

  // Formulario de búsqueda de usuarios.
  readonly usernameInput: Locator;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  // Dropdowns (contenedor clickable)
  readonly userRoleDropdown: Locator;
  readonly statusDropdown: Locator;

  // Tabla de usuarios
  readonly resultTable: Locator;
  readonly resultRows: Locator;

  // Acciones internas de la pagina
  readonly addButton: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  // Toast
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Encabezado
    this.adminMenuItem = page.locator('a[href*="/web/index.php/admin/viewAdminModule"]');
    this.pageHeader = page.getByRole('heading', { name: 'Admin' });

    // Inputs
    this.usernameInput = page.locator('form').locator('input').nth(1); // ajustable según tu DOM
    this.employeeNameInput = page.getByPlaceholder('Type for hints...');

    // Dropdowns (User Role y Status)
    this.userRoleDropdown = page.locator('form .oxd-select-text').first();
    this.statusDropdown = page.locator('form .oxd-select-text').nth(1);

    // Botones
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Tabla
    this.resultTable = page.locator('.oxd-table');
    this.resultRows = page.locator('.oxd-table-body .oxd-table-row');

    // Toast
    this.toastMessage = page.locator('.oxd-toast-content');
  }

  async gotoAdmin() {
    await this.adminMenuItem.click();
    await expect(this.page).toHaveURL(/\/admin\//);
    await expect(this.pageHeader).toBeVisible();
  }

  async searchByUsername(username: string) {
    await this.usernameInput.fill(username);
    await this.searchButton.click();
  }

  async fillEmployeeName(employee: string) {
    await this.employeeNameInput.fill(employee);

    // Seleccionar primer resultado si aparece
    const suggestion = this.page.locator('.oxd-autocomplete-dropdown > div').first();
    if (await suggestion.isVisible()) {
      await suggestion.click();
    }
  }

  async selectUserRole(role: string) {
    await this.userRoleDropdown.click();
    await this.page.locator('.oxd-select-dropdown [role="option"]').getByText(role, { exact: true }).click();
  }

  async selectStatus(status: string) {
    await this.statusDropdown.click();
    await this.page.locator('.oxd-select-dropdown [role="option"]').getByText(status, { exact: true }).click();
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async clickReset() {
    await this.resetButton.click();
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async getResultCount(): Promise<number> {
    return this.resultRows.count();
  }

  async expectAtLeastOneResult() {
    await expect(this.resultRows.first()).toBeVisible();
  }

  async expectToastContains(text: string) {
    await expect(this.toastMessage).toContainText(text);
  }
}