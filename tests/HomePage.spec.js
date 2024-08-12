// testHomePage.spec.js
const { test } = require('@playwright/test');
// testHomePage.spec.js
const HomePage = require('../pages/homePage');


test('Home page title should be correct', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToHome();
  await homePage.verifyTitle();
});
