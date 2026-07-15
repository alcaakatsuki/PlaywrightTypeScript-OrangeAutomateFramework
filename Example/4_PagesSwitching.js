const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  
  // Context for Google
  const OrangeContext = await browser.newContext();
  const OrangePage = await OrangeContext.newPage();
  await OrangePage.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await OrangePage.waitForTimeout(2000);
  console.log("Contexto 1 de Inicio de prueba abierto");


  //Context 2 Google
  const GoogleContext = await  browser.newContext();
  const GooglePage = await GoogleContext.newPage();
  await GooglePage.goto('https://Google.com');
  await GooglePage.waitForTimeout(2000);
  console.log("Contexto 2 de Inicio de prueba abierto");

  console.log("Cambiando a pestala google");
  await GooglePage.bringToFront();  
  console.log("Pestala google activa");

  console.log("Cambiando a pestala Orange");
  await OrangePage.bringToFront();  
  console.log("Pestaña Orange activa");

await OrangePage.waitForTimeout(10000);  
  await browser.close();
  })();