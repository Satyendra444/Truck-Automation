const { test, expect, describe } = require('@playwright/test');
const urls = require('../../../config/url');
const HomePage = require('../../../pages/homepage/HomePage');

const pages = [
  { label: 'Default', key: 'base' },
  { label: 'English', key: 'english' },
  { label: 'Hindi', key: 'hindi' },
];

const footerData = {
  base: {
    disclaimer: 'Prices are indicative and subject to change.',
    sections: ['About 91trucks', 'Work with us', 'Useful Links', 'Our Partner Website'],
    socialIcons: ['footer-facebook', 'footer-insta', 'footer-linkedin', 'footer-youtube'],
    footerLinks: [
      { href: '/about', text: 'About Us' },
      { href: '/privacy-policy', text: 'Privacy Policy' },
    //   { href: '/trucks', text: 'Trucks' },
    ],
  },
  english: {
    disclaimer: 'Prices are indicative and subject to change.',
    sections: ['About 91trucks', 'Work with us', 'Useful Links', 'Our Partner Website'],
    socialIcons: ['footer-facebook', 'footer-insta', 'footer-linkedin', 'footer-youtube'],
    footerLinks: [
      { href: '/about', text: 'About Us' },
      { href: '/privacy-policy', text: 'Privacy Policy' },
     // { href: '/trucks', text: 'Trucks' },
    ],
  },
  hindi: {
    disclaimer: 'कीमतें सांकेतिक हैं और बदल सकती हैं।',
    sections: ['91trucks  के बारे में', 'हमारे साथ काम करें', 'उपयोगी लिंक', 'हमारी साझेदार वेबसाइट'],
    socialIcons: ['footer-facebook', 'footer-insta', 'footer-linkedin', 'footer-youtube'],
    footerLinks: [
      { href: '/hi/about', text: 'हमारे बारे में' },
      { href: '/hi/privacy-policy', text: 'गोपनीयता नीति' },
     // { href: '/hi/trucks', text: 'ट्रक्स' },
    ],
  },
};

for (const { label, key } of pages) {
  describe(`${label} Footer Validation`, () => {
    test(`${label} - should show correct disclaimer`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigate(urls[key]);
      const disclaimer = page.locator(`text=${footerData[key].disclaimer}`);
      await expect(disclaimer).toBeVisible();
    });

    test(`${label} - should show all main footer sections`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigate(urls[key]);

      for (const sectionTitle of footerData[key].sections) {
        await expect(page.locator(`text=${sectionTitle}`)).toBeVisible();
      }
    });

    test(`${label} - should show valid social icons`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigate(urls[key]);

      for (const iconId of footerData[key].socialIcons) {
        const icon = page.locator(`svg use[href*="${iconId}"]`);
        await expect(icon).toBeVisible();
      }
    });

    test(`${label} - should show and validate footer links`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigate(urls[key]);

      for (const { href, text } of footerData[key].footerLinks) {
        const link = page.locator(`a[href="${href}"]`, { hasText: text });
        await expect(link).toBeVisible();
      }
    });
  });
}
