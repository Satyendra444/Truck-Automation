const { test, expect, describe } = require('@playwright/test');
const urls = require('../../../config/url');

const pages = [
  { label: 'Default', key: 'base', expectedH1: 'India’s fastest growing commercial vehicle website' },
  { label: 'English', key: 'english', expectedH1: 'India’s fastest growing commercial vehicle website' },
  { label: 'Hindi', key: 'hindi', expectedH1: 'भारत की सबसे तेज़ी से बढ़ती कमर्शियल वाहनों की वेबसाइट' },
];

describe('H1 Tag Validation Across Pages', () => {
  pages.forEach(({ label, key, expectedH1 }) => {
    test(`${label} - H1 Content Validation`, async ({ page }) => {
      await page.goto(urls[key], { waitUntil: 'networkidle' });
      const h1 = page.locator('h1', { hasText: expectedH1 });
      await expect(h1).toHaveCount(1);
      const h1Text = await h1.first().textContent();
      expect(h1Text.trim()).toBe(expectedH1);
    });

    test(`${label} - Only One H1 Tag Should Exist`, async ({ page }) => {
      await page.goto(urls[key], { waitUntil: 'domcontentloaded' });

      const h1Elements = page.locator('h1');
      const count = await h1Elements.count();
      if (count !== 1) {
        const allH1Texts = [];
        for (let i = 0; i < count; i++) {
          const text = await h1Elements.nth(i).textContent();
          allH1Texts.push(`H1[${i + 1}]: ${text.trim()}`);
        }
        console.warn(`⚠️ ${label} - Expected 1 <h1>, found ${count}:\n` + allH1Texts.join('\n'));
      }

      expect(count).toBe(1);
    });

    test(`${label} - H1 Tag Should Be Visible`, async ({ page }) => {
      await page.goto(urls[key], { waitUntil: 'domcontentloaded' });
      const h1 = page.locator('h1');
      await expect(h1.first()).toBeVisible();
    });

    test(`${label} - H1 Should Be In Viewport on Load`, async ({ page }) => {
      await page.goto(urls[key], { waitUntil: 'domcontentloaded' });

      const h1 = page.locator('h1');
      const isVisible = await h1.first().isVisible();
      const isInViewport = await h1.first().evaluate(el => {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
      });
      expect(isVisible).toBeTruthy();
      expect(isInViewport).toBeTruthy();
    });

    test(`${label} - H1 Should Contain Only Text`, async ({ page }) => {
      await page.goto(urls[key], { waitUntil: 'domcontentloaded' });
      const h1 = await page.locator('h1').first();
      const innerHTML = await h1.innerHTML();
      const hasNestedTags = /<\/?[a-z][\s\S]*>/i.test(innerHTML.trim());
      expect(hasNestedTags).toBeFalsy();
    });
  });
});
