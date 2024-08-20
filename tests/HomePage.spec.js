const { test } = require('@playwright/test');
const HomePage = require('../pages/homePage');

test('Verify the Home page title', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.verifyTitle();
});
test('Verify heading of Select Brand options', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.verifyHeading();
  
});
test('Verify the presence of Trucks, Buses, and Auto Rickshaws buttons', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.verifyButtonsPresence();
});
test('Verify the brand serach box present or not ', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.verifySearchBoxPresence();
  
});
test('Verify the select brand flow', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.selectTruckBrand('tata');
});
test('Verify search Button CTA', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.verifySearchButtonPresence();

});

test('Verify Tata Trucks search flow', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.selectTruckBrand('tata');
  await homePage.clickSearchButton();
  await homePage.verifyBestTataTrucksHeading();
});