import { type Locator, type Page } from '@playwright/test';

export class ClaimPage {
readonly page: Page;

  // --- Tab/menú "Employee Claims"
  readonly employeeClaimsTab: Locator;
  
 // --- Fields de la tabla Employee Claims
 readonly employeeNameInput: Locator; 
 readonly referenceIdInput: Locator;
 readonly eventNameDropdown: Locator;
 readonly statusDropdown: Locator;
 readonly fromDateInput: Locator;
 readonly toDateInput: Locator;
 readonly includeDropdown: Locator;

  // --- Botones "Reset" y "Search" (formulario de búsqueda)
  readonly resetButton: Locator;
  readonly searchButton: Locator;

  // --- Botón "+ Assign Claim"
  readonly assignClaimButton: Locator;
  readonly NewClaimEmployeeName: Locator;
  readonly NewClaimEvent: Locator;
  readonly NewClaimCurrency: Locator;
  readonly NewClaimRemarks: Locator;
  readonly NewClaimCreateButton: Locator;
  readonly NewClaimCancelButton: Locator;

  // --- ReferenceID cuando un Claim es Creado correctamente
  readonly claimReferenceId: Locator;

  // --- Tabla / bloque de resultados "Records Found"
  readonly recordsFoundLabel: Locator;
  readonly recordsTable: Locator;
  readonly recordsTableRows: Locator;

  constructor(page: Page) {
    this.page = page;

    // Employee Claims (topbar del módulo Claim)
    this.employeeClaimsTab = page.getByRole('link', { name: /Employee Claims/i });
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.referenceIdInput = page.locator('label:has-text("Reference Id")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]//input');
    this.eventNameDropdown = page.locator('label:has-text("Event Name")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]//div[contains(@class,"oxd-select-text")]');
    this.statusDropdown = page.locator('label:has-text("Status")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]//div[contains(@class,"oxd-select-text")]');
    this.fromDateInput = page.locator('label:has-text("From Date")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]//input');
    this.toDateInput = page.locator('label:has-text("To Date")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]//input');
    this.includeDropdown = page.locator('label:has-text("Include")')
    .locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]//div[contains(@class,"oxd-select-text")]');
   
    // Botones Reset y Search (formulario de búsqueda)
    this.resetButton = page.getByRole('button', { name: /^Reset$/i });
    this.searchButton = page.getByRole('button', { name: /^Search$/i });

    // Botón + Assign Claim Y Campos para crear un Nuevo Claim
    this.assignClaimButton = page.getByRole('button', { name: /\+?\s*Assign Claim/i });
    this.NewClaimEmployeeName = page.locator('//label[text()="Employee Name"]/ancestor::div[contains(@class,"oxd-input-group")]//input');
    this.NewClaimEvent = page.locator('//label[text()="Event"]/ancestor::div[contains(@class,"oxd-input-group")]//div[contains(@class,"oxd-select-text-input")]');
    this.NewClaimCurrency = page.locator('//label[text()="Currency"]/ancestor::div[contains(@class,"oxd-input-group")]//div[contains(@class,"oxd-select-text-input")]');
    this.NewClaimRemarks = page.locator('//label[text()="Remarks"]/ancestor::div[contains(@class,"oxd-input-group")]//textarea');
    this.NewClaimCreateButton = page.getByRole('button', { name: /^Create$/i });
    this.NewClaimCancelButton = page.getByRole('button', { name: /^Cancel$/i });

    // Txt auq muestra el campo Reference ID
    this.claimReferenceId = page.locator('//label[text()="Reference Id"]/ancestor::div[contains(@class,"oxd-input-group")]//input');
    
    // --- Tabla / bloque de resultados "Records Found"
    this.recordsFoundLabel = page.getByText(/Records Found/i);
    this.recordsTable = page.locator('.oxd-table');
    this.recordsTableRows = page.locator('.oxd-table-body .oxd-table-card');
  }

// evento para seleccionar un empleado de la lista desplegable
// y se agrega una funcion de espera para que la opcion sea visible antes de hacer clic en ella
async selectEmployee(employeeName: string) {
  await this.NewClaimEmployeeName.pressSequentially(employeeName, {delay: 100});
  const option = this.page
    .locator('.oxd-autocomplete-option')
    .filter({ hasText: employeeName })
    .first();
    await option.waitFor({ state: 'visible' });
    await option.click();
}

// evento para seleccionar un evento de la lista desplegable
async selectEvent(event: string) {
  await this.NewClaimEvent.click();
  await this.page.getByText(event, { exact: true }).click();
}

// evento para seleccionar una moneda de la lista desplegable
async selectCurrency(currency: string) {
  await this.NewClaimCurrency.click();
  await this.page.getByText(currency, { exact: true }).click();
}

// evento para obtener el Reference ID del Claim creado
async getReferenceId(): Promise<string> {
  return await this.claimReferenceId.inputValue();
}

// metodo para selecionar un Reference ID de la lista desplegable en el formulario de búsqueda
async selectReferenceId(ReferenceIdtxt: string) {
  await this.claimReferenceId.pressSequentially(ReferenceIdtxt, {delay: 100});
  const option = this.page
    .locator('.oxd-autocomplete-option')
    .filter({ hasText: ReferenceIdtxt })
    .first();
    await option.waitFor({ state: 'visible' });
    await option.click();
}

// Metodo para selecionar View Details de un Claim en la tabla de resultados, filtrando por Reference ID
async clickViewDetailsByReference(referenceId: string) {
    const row = this.page
        .locator('.oxd-table-body .oxd-table-card')
        .filter({ hasText: referenceId });

    await row.getByText('View Details').click();
}




}