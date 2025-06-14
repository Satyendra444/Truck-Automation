const { test, expect, describe } = require('@playwright/test');
const urls = require('../../config/url');
const metaData = require('../../utils/homeDataHelper');
const HomePage = require('../../pages/HomePage');

const pages = [
  { label: 'Default', key: 'base' },
  { label: 'English', key: 'english' },
  { label: 'Hindi', key: 'hindi' },
];

const expectedCanonicals = {
  base: {
    canonical: '/',
    amphtml: '/?amp=1',
  },
  english: {
    canonical: '/',
    amphtml: '/?amp=1',
  },
  hindi: {
    canonical: '/hi',
    amphtml: '/hi?amp=1',
  },
};

for (const { label, key } of pages) {
  describe(`${label} Home`, () => {
    test('should have correct title and meta description', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigate(urls[key]);

      const title = await homePage.getTitle();
      const desc = await homePage.getMetaDescription();

      expect(title).toBe(metaData[key].title);
      expect(desc).toBe(metaData[key].description);
    });

    test('should have correct canonical and amphtml links', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigate(urls[key]);

      const canonical = await homePage.getCanonicalHref();
      const amphtml = await homePage.getAmpHtmlHref();

      expect(canonical).toBe(expectedCanonicals[key].canonical);
      expect(amphtml).toBe(expectedCanonicals[key].amphtml);
    });

    test(`${label} Home - should validate alternate and favicon links`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigate(urls[key]);

      for (const [lang, expectedHref] of Object.entries(metaData[key].alternates)) {
        const href = await homePage.getAlternateHref(lang);
        expect(href).toBe(expectedHref);
      }

      const favicon = await homePage.getLinkTagHref('shortcut icon');
      expect(favicon).toBe(metaData[key].favicon);
    });
  });
}
