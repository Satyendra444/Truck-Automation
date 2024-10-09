// pages/basePage.js
const { expect } = require('@playwright/test');

class BasePage {
  constructor(page, siteConfig) {
    this.page = page;
    this.siteConfig = siteConfig; // Store site-specific config
    this.englishButton = page.getByText('English');
    this.hindiButton = page.getByText('हिंदी');
    this.homeLink = page.getByLabel('Home');
    this.heading = page.getByRole('heading', { name: 'Select Brand' });
    this.hindiheading = page.getByRole('heading', { name: 'ब्रांड चुनें' });
    this.trucksButton = page.getByRole('button', { name: 'Trucks' }).first();
    this.hinditrucksButton = page.getByRole('button', { name: 'ट्रक' }).first();
    this.combobox = page.getByRole('combobox');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.hindisearchButton = page.getByRole('button', { name: 'खोजें' });
  }

  async navigateTo(language = 'en') {
    await this.page.goto(this.siteConfig[language].url);
    await this.page.waitForLoadState('networkidle'); // Wait for the page to load completely
  }

  async switchToHindi() {
    await this.page.waitForSelector('text=हिंदी');
    await this.hindiButton.click();
  }

  async switchToEnglish() {
    await this.page.waitForSelector('text=English');
    await this.englishButton.click();
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async verifyHomePageTitle(language = 'en') {
    const expectedTitle = this.siteConfig[language].expectedTitle;
    await expect(this.page).toHaveTitle(expectedTitle);
  }
  async verifyHeading(headingText) {
    const heading = this.page.getByRole('heading', { name: headingText });
    await expect(heading).toBeVisible();
  }

  async selectTruckBrand(brand) {
    await this.trucksButton.click();
    await this.combobox.selectOption(brand);
  }
 

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async verifyNextPageHeading(nextHeadingText) {
    const nextHeading = this.page.getByRole('heading', { name: nextHeadingText });
    await expect(nextHeading).toBeVisible();
  }

}

module.exports = BasePage;
