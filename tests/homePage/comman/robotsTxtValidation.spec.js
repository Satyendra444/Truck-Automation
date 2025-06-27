const { test, expect } = require('@playwright/test');

test('Robots.txt Validation - 91trucks.com', async ({ request }) => {
  const response = await request.get('https://www.91trucks.com/robots.txt');
  expect(response.status()).toBe(200);

  const text = await response.text();
  expect(text).toContain('User-agent: *');
  expect(text).toContain('Sitemap: https://www.91trucks.com/sitemap.xml');

  //  List of important Disallow rules to validate
  const disallowedPaths = [
    '/filter', '/hi/filter', '/en/filter',
    '/tractors', '/en/tractors', '/hi/tractors',
    '/compare-tractor', '/en/compare-tractor', '/hi/compare-tractor',
    '/compare-tractor/', '/en/compare-tractor/', '/hi/compare-tractor',
    '/tractor-dealers', '/en/tractor-dealers', '/hi/tractor-dealers',
    '/tractor-servicecenters', '/en/tractor-servicecenters', '/hi/tractor-servicecenters',
    '/construction-equipments', '/en/construction-equipments', '/hi/construction-equipments',
    '/(trucks|three-wheelers|buses|autorickshaws)/qna',
    '/hi/(trucks|three-wheelers|buses|autorickshaws)/qna',
    '/en/(trucks|three-wheelers|buses|autorickshaws)/qna',
    '/cdn-cgi/speculation', '/cdn-cgi/rum'
  ];

  for (const path of disallowedPaths) {
    expect(text).toContain(`Disallow: ${path}`);
  }

  //  List of Allow rules to validate
  const allowedPaths = [
    '/compare-tractor-tyres',
    '/en/compare-tractor-tyres',
    '/hi/compare-tractor-tyres'
  ];

  for (const path of allowedPaths) {
    expect(text).toContain(`Allow: ${path}`);
  }
});
