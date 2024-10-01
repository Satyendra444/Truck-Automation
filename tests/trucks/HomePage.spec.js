// tests/tractors/HomePage.spec.js
const { test } = require('@playwright/test');
const TrucksPage = require('../../pages/trucks/trucksPage');

test.describe('91 Trucks Website Basic Test', () => {
  let trucksPage;

  test.beforeEach(async ({ page }) => {
    trucksPage = new TrucksPage(page);
  });

  test('Verify home page title in English', async () => {
    await trucksPage.navigateTo('en'); // Navigate to the English site
    await trucksPage.goToHome();       // Click on Home link
    await trucksPage.verifyHomePageTitle('en'); // Verify the English title
  });

  test('Switch to Hindi and verify home page title', async () => {
    await trucksPage.navigateTo('hi'); // Navigate to the Hindi site
    await trucksPage.verifyHomePageTitle('hi'); // Verify the Hindi title
  });
});
