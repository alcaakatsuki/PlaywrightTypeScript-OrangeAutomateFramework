const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe',
    { waitUntil: 'domcontentloaded' });

  // iframe externo
  const outerFrame = page.frameLocator('#iframeResult');

  // iframe interno (el ejemplo)
  const innerFrame = outerFrame.frameLocator('iframe');

  console.log("iframe encontrado");

  // click en el link
  await innerFrame.getByRole('link', { name: 'HTML Tutorial' }).click();

  console.log("Click realizado en el iframe");
})();