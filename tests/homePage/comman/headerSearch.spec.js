const { test, expect } = require('@playwright/test');
const urls = require('../../../config/url');

const pages = [
  {
    label: 'Base',
    key: 'base',
    placeholder: 'Search for Trucks, Buses,',
    searchTerm: 'tata',
    resultText: 'Tata Truck',
    verifyHeading: 'Tata Trucks'
  },
  {
    label: 'English',
    key: 'english',
    placeholder: 'Search for Trucks, Buses,',
    searchTerm: 'tata',
    resultText: 'Tata Truck',
    verifyHeading: 'Tata Trucks'
  },
  {
    label: 'Hindi',
    key: 'hindi',
    placeholder: 'ट्रक, बस, तिपहिया वाहन खोजें',
    searchTerm: 'ace',
    resultText: 'Tata Ace EV Offers',
    verifyHeading: 'टाटा ऐस ईवी'
  }
];

pages.forEach(({ label, key, placeholder, searchTerm, resultText, verifyHeading }) => {
  test.describe(`${label} Header Search`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(urls[key]);
    });

    test('should display correct placeholder', async ({ page }) => {
      await expect(page.getByPlaceholder(placeholder)).toBeVisible();
    });

    test('should search and navigate to correct result', async ({ page }) => {
      const input = page.getByPlaceholder(placeholder);
      await input.click();
      await input.fill(searchTerm);

      const result = page.getByText(resultText, { exact: true });
      await expect(result).toBeVisible();
      await result.click();

      if (verifyHeading) {
        await expect(page.getByRole('heading', { name: verifyHeading, exact: true })).toBeVisible();
      } else {
        await expect(page).toHaveURL(new RegExp(searchTerm, 'i'));
      }
    });

    test('should support pressing Enter after typing', async ({ page }) => {
      const input = page.getByPlaceholder(placeholder);
      await input.click();
      await input.fill(searchTerm);
      await page.waitForTimeout(5000);
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/search|listing|tata|ace/i);
    });

    test('should show no result for invalid search term', async ({ page }) => {
      const input = page.getByPlaceholder(placeholder);
      await input.click();
      await input.fill('invalidtruckname123');
      await page.keyboard.press('Enter');

      await expect(
        page.locator('text=/No Result Found|No Results|कोई परिणाम नहीं मिला/')
      ).toBeVisible();
    });

  });
});
