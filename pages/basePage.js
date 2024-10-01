// pages/basePage.js
const { expect } = require('@playwright/test');

class BasePage {
  constructor(page, siteConfig) {
    this.page = page;
    this.siteConfig = siteConfig; // Store site-specific config
    this.englishButton = page.getByText('English');
    this.hindiButton = page.getByText('हिंदी');
    this.homeLink = page.getByLabel('Home');
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
}

module.exports = BasePage;
