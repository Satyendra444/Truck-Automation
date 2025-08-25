const { test, expect } = require('@playwright/test');
const urls = require('../../../config/url');

const paths =  [
  '/trucks','/','/hi','/buses','/auto-rickshaws','/three-wheelers','/compare-truck',
  '/truck-tyres','/truck-dealers','/three-wheelers-dealers','/tractor-tyres',
  '/bus-dealers','/compare-bus','/truck-servicecenters','/bus-tyres',
  '/three-wheeler-tyres','/truck-spareparts','/auto-rickshaws-spareparts',
  '/used-trucks','/truck-bodymakers','/bus-servicecenters',
  '/compare-auto-rickshaws','/compare-three-wheelers',
  '/three-wheelers-spareparts','/bus-bodymakers','/truck-tyres-dealers',
  '/bus-spareparts','/compare-truck-tyres','/buses-dealers',
  '/three-wheelers-servicecenters','/buses-spareparts',
  '/compare-three-wheeler-tyres','/auto-rickshaws-servicecenters',
  '/trucks-dealers','/auto-rickshaws-dealers','/bus-tyres-dealers','/popular-trucks',

  // English
  '/en/trucks','/en/buses','/en/auto-rickshaws','/en/three-wheelers','/en/compare-truck',
  '/en/truck-tyres','/en/truck-dealers','/en/three-wheelers-dealers','/en/tractor-tyres',
  '/en/bus-dealers','/en/compare-bus','/en/truck-servicecenters','/en/bus-tyres',
  '/en/three-wheeler-tyres','/en/truck-spareparts','/en/auto-rickshaws-spareparts',
  '/en/used-trucks','/en/truck-bodymakers','/en/bus-servicecenters',
  '/en/compare-auto-rickshaws','/en/compare-three-wheelers',
  '/en/three-wheelers-spareparts',
  '/en/bus-bodymakers','/en/truck-tyres-dealers','/en/bus-spareparts',
  '/en/compare-truck-tyres','/en/buses-dealers','/en/three-wheelers-servicecenters',
  '/en/buses-spareparts','/en/compare-three-wheeler-tyres',
  '/en/auto-rickshaws-servicecenters','/en/trucks-dealers',
  '/en/auto-rickshaws-dealers','/en/bus-tyres-dealers','/en/popular-trucks',
  "/en/finance",

  // Hindi
  '/hi/trucks','/hi/buses','/hi/auto-rickshaws','/hi/three-wheelers','/hi/compare-truck',
  '/hi/truck-tyres','/hi/truck-dealers','/hi/three-wheelers-dealers','/hi/tractor-tyres',
  '/hi/bus-dealers','/hi/compare-bus','/hi/truck-servicecenters','/hi/bus-tyres',
  '/hi/three-wheeler-tyres','/hi/truck-spareparts','/hi/auto-rickshaws-spareparts',
  '/hi/used-trucks','/hi/truck-bodymakers','/hi/bus-servicecenters',
  '/hi/compare-auto-rickshaws','/hi/compare-three-wheelers',
  ,'/hi/three-wheelers-spareparts',
  '/hi/bus-bodymakers','/hi/truck-tyres-dealers','/hi/bus-spareparts',
  '/hi/compare-truck-tyres','/hi/buses-dealers','/hi/three-wheelers-servicecenters',
  '/hi/buses-spareparts','/hi/compare-three-wheeler-tyres',
  '/hi/auto-rickshaws-servicecenters','/hi/trucks-dealers',
  '/hi/auto-rickshaws-dealers','/hi/bus-tyres-dealers','/hi/popular-trucks',"/hi/finance",

  // Extra sections
  '/electric','/auto-expo','/hi/electric','/hi/auto-expo','/hi/mover','/en/mover','/mover',
  '/store','/en/store','/buses/tata/starbus','/en/buses/tata/starbus',
  '/hi/buses/tata/starbus','/electric/charging-stations/new-delhi',
  '/en/electric/charging-stations/new-delhi','/hi/electric/charging-stations/new-delhi',
  '/trucks/mahindra/zeo','/hi/trucks/mahindra/zeo','/tyres','/hi/tyres','/en/tyres',
  '/news','/en/news','/hi/news',"/finance",
];


test.describe('AMP Pages Removal Validation', () => {
  for (const path of paths) {
    test(`Validate AMP removed on ${path}`, async ({ request }) => {
      const baseUrl = urls.base.replace(/\/$/, '');
      const normalPath = path.startsWith('/') ? path : `/${path}`;
      const ampUrls = [
        `${baseUrl}${normalPath}?amp=1`,
        `${baseUrl}${normalPath.endsWith('/') ? normalPath + 'amp/' : normalPath + '/amp/'}`
      ];

      for (const ampUrl of ampUrls) {
        const response = await request.get(ampUrl);
        const status = response.status();

        if (status === 200) {
          const body = await response.text();

          // ✅ AMP detection markers
          const isAmp =
            body.includes('<html amp') ||
            body.includes('<html ⚡') ||
            body.includes('https://cdn.ampproject.org/v0.js') ||
            body.includes('rel="amphtml"');

          expect(isAmp, `❌ AMP still available at: ${ampUrl}`).toBeFalsy();
        } else {
          // non-200 means removed (404, 301, 302, etc.)
          expect(status, `✅ AMP correctly removed at: ${ampUrl}`).toBeGreaterThanOrEqual(300);
        }
      }
    });
  }
});
