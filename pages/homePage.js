// homePage.js
const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.homeLink = this.page.getByLabel('Home');
    this.heading = this.page.getByRole('heading', { name: 'Select Brand' });
    this.searchButton = this.page.locator("div[class='block'] button[name='Search']");
    this.searchCombobox = this.page.getByRole('combobox');
  }

  async navigateToHome() {
    await this.page.goto('https://www.91trucks.com/');
    await this.homeLink.click();
  }

  async verifyTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyHeading() {
    await expect(this.heading).toBeVisible();
  }

  async verifyButtonPresence(buttonName) {
    const button = this.page.getByRole('button', { name: buttonName }).first();
    await expect(button).toBeVisible();
  }

  async selectBrand(brand) {
    await this.searchCombobox.selectOption(brand);
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async verifyElementVisible(locator) {
    await expect(locator).toBeVisible();
  }
}

module.exports = HomePage;
