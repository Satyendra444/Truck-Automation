const BasePage = require('../BasePage');
const { expect } = require('@playwright/test');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.Logo = page.locator('img[alt="91trucks"][width="100"][height="29"]');
    this.trucksLogo = page.locator('//img[@title="91trucks"]');
    this.tractorsLogo = page.locator('//img[@title="91tractors.com"]');
    this.infraLogo = page.locator('//img[@title="91infra.com"]');
}

  async isLogoVisible(logoElement) {
    return logoElement.isVisible();
  }
  async getCanonicalHref() {
  return this.page.locator('link[rel="canonical"]').getAttribute('href');
}

async getAmpHtmlHref() {
  return this.page.locator('link[rel="amphtml"]').getAttribute('href');
}
  async getMetaTagContent(name) {
    const locator = this.page.locator(`meta[name="${name}"]`);
    await locator.waitFor({ state: 'attached' });
    return locator.getAttribute('content');
  }

  async getLinkTagHref(rel) {
    const locator = this.page.locator(`link[rel="${rel}"]`);
    await locator.waitFor({ state: 'attached' });
    return locator.getAttribute('href');
  }

  async getAlternateHref(hreflang) {
    const locator = this.page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`);
    await locator.waitFor({ state: 'attached' });
    return locator.getAttribute('href');
  }
  async getMetaTagContent(name) {
  const locator = this.page.locator(`meta[name="${name}"], meta[property="${name}"]`);
  await locator.first().waitFor({ state: 'attached' });
  return locator.first().getAttribute('content');
}
async getMetaTagContent(name) {
  const locator = this.page.locator(`meta[name="${name}"], meta[property="${name}"]`);
  await locator.first().waitFor({ state: 'attached' });
  return locator.first().getAttribute('content');
}
async getSchemas() {
  const scriptTags = await this.page.locator('script[type="application/ld+json"]').all();
  const schemas = [];

  for (const tag of scriptTags) {
    const content = await tag.textContent();
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        schemas.push(...parsed);
      } else {
        schemas.push(parsed);
      }
    } catch (e) {
      console.warn('Invalid JSON in schema:', e.message);
    }
  }
  
  return schemas;
}
}

module.exports = HomePage;