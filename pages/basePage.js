class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async getTitle() {
    return this.page.title();
  }

  async getMetaDescription() {
    return this.page.locator('meta[name="description"]').getAttribute('content');
  }
}

module.exports = BasePage;
