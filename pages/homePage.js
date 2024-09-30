// homePage.js
const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.homeLink = this.page.getByLabel('Home');
    this.heading = this.page.getByRole('heading', { name: 'Select Brand' });
    this.trucksButton = this.page.getByRole('button', { name: 'Trucks' }).first();
    this.busesButton = this.page.getByRole('button', { name: 'Buses' }).first();
    this.autoRickshawsButton = this.page.getByRole('button', { name: 'Auto Rickshaws' }).first();
    this.searchButton =  this.page.locator("div[class='block'] button[name='Search']");
    this.searchCombobox = this.page.getByRole('combobox');
  }

  async navigateToHome() {
    await this.page.goto('https://www.91trucks.com/');
    await this.homeLink.click();
  }

  async verifyTitle() {
    const expectedTitle = "New Trucks, Three Wheelers & Buses, Prices, Latest Commercial Vehicle News in India";
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyHeading() {
    await expect(this.heading).toBeVisible();
  }

  async verifyButtonsPresence() {
    await expect(this.trucksButton).toBeVisible();
    await expect(this.busesButton).toBeVisible();
    await expect(this.autoRickshawsButton).toBeVisible();
  }

  async selectTruckBrand(brand) {
    await this.trucksButton.click();
    await this.searchCombobox.selectOption(brand);
  }

  async verifySearchBoxPresence() {
    await expect(this.searchCombobox).toBeVisible();
  }

  async verifySearchButtonPresence() {
    await expect(this.searchButton).toBeVisible();
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async verifyBestTataTrucksHeading() {
    const bestTataTrucksHeading = this.page.getByRole('heading', { name: 'Best Tata Trucks in India' });
    await expect(bestTataTrucksHeading).toBeVisible();
  }
}

module.exports = HomePage;




