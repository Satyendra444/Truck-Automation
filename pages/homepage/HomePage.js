const BasePage = require('../BasePage');
const { expect } = require('@playwright/test');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
   this.Logo = page.locator('img[alt="91trucks"][width="100"][height="29"]').first();
this.trucksLogo = page.locator('//img[@title="91trucks"]').first();
this.tractorsLogo = page.locator('//img[@title="91tractors.com"]').first();
this.infraLogo = page.locator('//img[@title="91infra.com"]').first();
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
// async trucksNavigationFlow({
//   trucksLabel,
//   newTrucksLabel,
//   bodyTypeLabel,
//   fuelTypeLabel,
//   brandLabel,
//   compareLabel,
//   popularLabel
// }) {
//   const { page } = this;

//   // Click "Trucks" Menu
//   await page.locator('span', { hasText: new RegExp(`^${trucksLabel}$`) }).first().click();

//   // Click "New Trucks" (use .first() to avoid strict mode error)
//   await page.getByRole('link', { name: newTrucksLabel }).first().click();
//   await page.waitForLoadState('networkidle');

//   // Click "Popular Trucks"
//   //await page.locator('span', { hasText: new RegExp(`^${popularLabel}$`) }).first().click();

//   // Click "Body Type"
//   await page.locator('span', { hasText: new RegExp(`^${bodyTypeLabel}$`) }).first().click();

//   // Click first Fuel Type option
//   await page.locator('li').filter({ hasText: fuelTypeLabel }).locator('span').first().click();

//   // Click "Truck Brands"
//   await page.getByText(brandLabel, { exact: true }).click();

//   // Click "Compare Trucks" (use .first() again to avoid ambiguity)
//   await page.getByRole('link', { name: compareLabel }).first().click();

//   // Final: check that some heading is present
//   await expect(page.locator('h1, h2')).toHaveCountGreaterThan(0);
// }\
async getImages() {
    return await this.page.$$eval("img", (imgs) =>
      imgs.map((img) => ({
        alt: img.getAttribute("alt") || "",
        src: img.getAttribute("src") || "",
        srcset: img.getAttribute("srcset") || "",
      }))
    );
  }



}

module.exports = HomePage;