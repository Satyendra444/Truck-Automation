const { test, expect } = require('@playwright/test');
const urls = require('../../../config/url'); 
const HomePage = require('../../../pages/homepage/HomePage');
const schemaData = require('../../../utils/homepage/homeDataHelper');

const pages = [
  { label: 'Default', key: 'base' },
  { label: 'English', key: 'english' },
  { label: 'Hindi', key: 'hindi' },
];

pages.forEach(({ label, key }) => {
  test(`${label} - Schema validation`, async ({ page }) => {
    const home = new HomePage(page);
    await page.goto(urls[key], { waitUntil: 'domcontentloaded' });

    const actualSchemas = await home.getSchemas();
    const expectedSchemas = schemaData[key].schema;

    for (const expected of expectedSchemas) {
      const found = actualSchemas.find(s => s['@type'] === expected['@type']);
      expect(found).toBeTruthy();

      for (const prop in expected) {
        if (typeof expected[prop] === 'object') {
          expect(found[prop]).toMatchObject(expected[prop]);
        } else {
          expect(found[prop]).toBe(expected[prop]);
        }
      }
    }
  });
});
