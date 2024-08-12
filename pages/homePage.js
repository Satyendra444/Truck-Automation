// homePage.js
const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.homeLink = this.page.getByLabel('Home');
  }

  async navigateToHome() {
    await this.page.goto('https://www.91trucks.com/');
    await this.homeLink.click();
  }

  async verifyTitle() {
    const expectedTitle = "New Trucks, Three Wheelers & Buses, Prices, Latest Commercial Vehicle News in India";
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}

module.exports = HomePage;



// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://www.91trucks.com/');
//   await page.getByLabel('Home').click();
//   await page.getByRole('heading', { name: 'What are you looking for?' }).click();
//   await page.getByRole('link', { name: 'subcategory Pickup' }).click();
//   await page.goto('https://www.91trucks.com/');
//   await page.getByRole('link', { name: 'subcategory Mini' }).click();
//   await page.goto('https://www.91trucks.com/');
//   await page.getByRole('link', { name: 'subcategory Three Wheeler' }).click();
//   await page.getByRole('link', { name: 'subcategory Bus' }).click();
//   await page.getByRole('heading', { name: 'Most Popular Trucks' }).click();
//   await page.getByRole('heading', { name: 'Trucks Dealers in Popular' }).click();
//   await page.getByRole('heading', { name: 'Most Popular Buses' }).click();
//   await page.getByRole('heading', { name: 'Most Popular Auto Rickshaws' }).click();
//   await page.getByRole('heading', { name: 'Most Popular Comparison' }).click();
//   await page.getByRole('heading', { name: 'Latest News' }).click();
// });