const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
});

test('Verify the Home page title', async ({ page }) => {
  const homePage = new HomePage(page);
  const expectedTitle = "New Trucks, Three Wheelers & Buses, Prices, Latest Commercial Vehicle News in India";
  await homePage.verifyTitle(expectedTitle);
});

test('Verify heading of Select Brand options', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyHeading();
});

test('Verify the presence of Trucks, Buses, and Auto Rickshaws buttons', async ({ page }) => {
  const homePage = new HomePage(page);
  const buttons = ['Trucks', 'Buses', 'Auto Rickshaws'];
  for (const button of buttons) {
    await homePage.verifyButtonPresence(button);
  }
});

test('Verify the brand search box is present', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyElementVisible(homePage.searchCombobox);
});

test('Verify the select brand flow', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.selectBrand('tata');
});

test('Verify search Button CTA', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyElementVisible(homePage.searchButton);
});

test('Verify Tata Trucks search flow', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.selectBrand('tata');
  await homePage.clickSearchButton();
  const bestTataTrucksHeading = page.getByRole('heading', { name: 'Best Tata Trucks in India' });
  await homePage.verifyElementVisible(bestTataTrucksHeading);
});