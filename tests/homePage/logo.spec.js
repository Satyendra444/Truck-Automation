const { test, expect } = require('@playwright/test');
const urls = require('../../config/url');
const HomePage = require('../../pages/HomePage');

const pages = [
  { label: 'Default', key: 'base' },
  { label: 'English', key: 'english' },
  { label: 'Hindi', key: 'hindi' },
];

for (const { label, key } of pages) {
  test(`${label} Home - should display 91trucks logo`, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate(urls[key]);
    const isLogoVisible = await homePage.isLogoVisible(homePage.Logo);
    const trucksLogoVisible = await homePage.isLogoVisible(homePage.trucksLogo);
    const tractorsLogoVisible = await homePage.isLogoVisible(homePage.tractorsLogo);
    const infraLogoVisible = await homePage.isLogoVisible(homePage.infraLogo);
    expect(isLogoVisible).toBe(true);
    expect(trucksLogoVisible).toBe(true);
    expect(tractorsLogoVisible).toBe(true);
    expect(infraLogoVisible).toBe(true);
  });
}
