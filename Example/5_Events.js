const { chromium } = require('playwright');

(async () => {

  const browser = await chromium.launch({ headless: false });
  
  // Context for Google
  const OrangeContext = await browser.newContext();
  const OrangePage = await OrangeContext.newPage();
  

  await OrangePage.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
 
  //espera implicita
  OrangePage.setDefaultTimeout(10000);
  await OrangePage.fill('input[name="username"]', 'Admin');
  await OrangePage.fill('input[name="password"]', 'admin123');
  

  //espera explicita
  await Promise.all([
    OrangePage.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
    OrangePage.click('button[type="submit"]')
  ]);
// espera condicional
await OrangePage.waitForSelector('div[class="oxd-topbar-header-title"]');
await OrangePage.locator('.oxd-userdropdown-name').nth(0).click();
await OrangePage.getByRole('menuitem', { name: 'About' }).click();
await OrangePage.waitForTimeout(10000);
await OrangePage.getByRole('button', { name: '×' }).click();
console.log('Test completed successfully');
await browser.close();

 })();