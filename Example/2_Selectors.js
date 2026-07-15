const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  
  // Context for Google
  const OrangeContext = await browser.newContext();
  const OrangePage = await OrangeContext.newPage();
  await OrangePage.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
  // Select User and Password fields
  await OrangePage.fill('xpath=//input[@name="username"]', 'Admin');
  //await OrangePage.fill*('input[name="password"]','admin123');
  await OrangePage.getByPlaceholder('Password').fill('admin123');
  //await OrangePage.click('xpath=//button[@type="submit"]');
  await OrangePage.getByRole('button', { name: 'Login' }).click();
  await OrangePage.waitForTimeout(5000);
  await OrangePage.getByRole('link', { name: 'Admin' }).click();
  await OrangePage.waitForTimeout(2000);
  await OrangePage.getByRole('button', { name: 'Add' }).click();await OrangePage.getByRole('button', { name: 'Add' }).click();
  await OrangePage.getByPlaceholder('Type for hints...').fill('Alain');
  await OrangePage.waitForTimeout(5000);
  await browser.close();

  })();