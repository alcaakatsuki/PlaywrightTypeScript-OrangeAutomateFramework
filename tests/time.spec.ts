import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth';
import { TimePage } from '../pages/time';

test.describe('Time Module', () => {
  test.describe.configure({ mode: 'serial' });
  test.setTimeout(90000);

  let authPage: AuthPage;
  let timePage: TimePage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    timePage = new TimePage(page);

    await authPage.navigate();
    await authPage.login(process.env.HRM_USER ?? 'Admin', process.env.HRM_PASS ?? 'admin123');
    await timePage.gotoTime();
  });

  test('REQ04 - TS01 - Abrir módulo Time y visualizar su navegación', async () => {
    await expect(timePage.topBar).toContainText('Timesheets');
    await expect(timePage.topBar).toContainText('Attendance');
  });

  test('REQ04 - TS02 - Abrir Employee Timesheet desde filtro de empleado', async () => {
    await timePage.selectFirstEmployeeSuggestion();
    await timePage.viewEmployeeTimesheet();
  });

  test('REQ04 - TS03 - Validar empleado requerido para consultar timesheet', async () => {
    await timePage.expectValidationForMissingEmployee();
  });
});
