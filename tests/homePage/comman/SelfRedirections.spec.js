const { test, expect } = require('@playwright/test');
const urls = require('../../../config/url');

const paths = [
  '/tractors',
  '/compare-tractor',
  '/tractor-dealers',
  '/tractor-servicecenters',
  '/tractor-spareparts',
  '/tractors-spareparts',
  '/tractors-dealers',
  '/tractor-bodymakers',
  '/en/tractors',
  '/en/compare-tractor',
  '/en/compare-tractors',
  '/en/tractor-dealers',
  '/en/tractor-servicecenters',
  '/en/tractor-spareparts',
  '/en/tractors-spareparts',
  '/en/tractors-dealers',
  '/en/tractor-bodymakers',
  '/hi/tractors',
  '/hi/compare-tractor',
  '/hi/tractor-dealers',
  '/hi/tractor-servicecenters',
  '/hi/tractor-spareparts',
  '/hi/tractors-spareparts',
  '/hi/tractors-dealers',
  '/hi/tractor-bodymakers',
  '/construction-equipments',
  '/compare-construction-equipments',
  '/construction-equipments-servicecenters',
  '/construction-equipments-spareparts',
  '/construction-equipments-dealers',
  '/construction-equipments-bodymakers',
  '/en/construction-equipments',
  '/en/compare-construction-equipments',
  '/en/construction-equipments-servicecenters',
  '/en/construction-equipments-spareparts',
  '/en/construction-equipments-dealers',
  '/en/construction-equipments-bodymakers',
  '/hi/construction-equipments',
  '/hi/compare-construction-equipments',
  '/hi/construction-equipments-servicecenters',
  '/hi/construction-equipments-spareparts',
  '/hi/construction-equipments-dealers',
  '/hi/construction-equipments-bodymakers',
];

paths.forEach((path) => {
  test(`Verify title and redirection for ${path}`, async ({ page }) => {
    const baseUrl = urls.base;
    await page.goto(`${baseUrl}${path}`);
    await expect(page).toHaveTitle('Explore A Range Of Commercial Trucks, EVs, Buses & Rickshaws');
  });
});