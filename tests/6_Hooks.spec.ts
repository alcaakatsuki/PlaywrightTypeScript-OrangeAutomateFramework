/* import { test, expect } from '@playwright/test';

let page: any;

test.describe('Ejemplo de Hooks en Playwright', () => {
  test.beforeAll(async ({ browser }) => {
    console.log('beforeAll: Se ejecuta antes de todos los tests');
    const context = await browser.newContext();
    page = await context.newPage();

  });
  test.beforeEach(async () => {
    console.log('beforeEach: Se ejecuta antes de cada test');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

//Test case 1
  test('Test Case 1: Verificar título de la página', async () => {
    await expect(page).toHaveTitle(/OrangeHRM/);
  } 
);
//test case 2
  test('Test Case 2: Verificar visibilidad del logo', async () => {
    const logo = page.locator('.orangehrm-login-branding');
    await expect(logo).toBeVisible();
  });

  test.afterEach(async () => {
    console.log('afterEach: Se ejecuta después de cada test');
    await page.close();
  } 
);

  test.afterAll(async () => {
    

    console.log('afterAll: Se ejecuta después de todos los tests');
    console.log('Limpiando cookies y almacenamiento local...');
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  }
);
  
});
*/