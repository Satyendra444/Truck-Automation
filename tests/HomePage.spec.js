const { test } = require('@playwright/test');
const HomePage = require('../pages/homePage');

test('Verify the Home page title', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.verifyTitle();
});
test('Verify Select Brand options', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  // Verify the heading
  await homePage.verifyHeading();
  // Verify the presence of Trucks, Buses, and Auto Rickshaws buttons
  await homePage.verifyButtonsPresence();
});
