
const { test, expect, describe } = require('@playwright/test');
const urls = require('../../../config/url');
const HomePage = require('../../../pages/homepage/HomePage');

const paths =  [
  '/trucks','/','/hi','/buses','/auto-rickshaws','/three-wheelers','/compare-truck',
  '/truck-tyres','/truck-dealers','/three-wheeler-dealers','/tractor-tyres',
  '/bus-dealers','/compare-bus','/truck-servicecenters','/bus-tyres',
  '/three-wheeler-tyres','/three-wheelers-dealers','/truck-spareparts',
  '/auto-rickshaws-spareparts','/used-trucks','/truck-bodymakers',
  '/bus-servicecenters','/compare-auto-rickshaws','/compare-three-wheeler',
  '/latest-three-wheeler-tyres','/three-wheeler-spareparts','/bus-bodymakers',
  '/truck-tyres-dealers','/bus-spareparts','/compare-truck-tyres',
  '/three-wheelers-spareparts','/buses-dealers','/three-wheeler-servicecenters',
  '/buses-spareparts','/compare-three-wheeler-tyres','/auto-rickshaws-servicecenters',
  '/trucks-dealers','/auto-rickshaws-dealers','/bus-tyres-dealers','/popular-trucks',
  '/en/trucks','/en/buses','/en/auto-rickshaws','/en/three-wheelers','/en/compare-truck',
  '/en/truck-tyres','/en/truck-dealers','/en/three-wheeler-dealers','/en/tractor-tyres',
  '/en/bus-dealers','/en/compare-bus','/en/truck-servicecenters','/en/bus-tyres',
  '/en/three-wheeler-tyres','/en/three-wheelers-dealers','/en/truck-spareparts',
  '/en/auto-rickshaws-spareparts','/en/used-trucks','/en/truck-bodymakers',
  '/en/bus-servicecenters','/en/compare-auto-rickshaws','/en/compare-three-wheeler',
  '/en/latest-three-wheeler-tyres','/en/three-wheeler-spareparts','/en/bus-bodymakers',
  '/en/truck-tyres-dealers','/en/bus-spareparts','/en/compare-truck-tyres',
  '/en/three-wheelers-spareparts','/en/buses-dealers','/en/three-wheeler-servicecenters',
  '/en/buses-spareparts','/en/compare-three-wheeler-tyres','/en/auto-rickshaws-servicecenters',
  '/en/trucks-dealers','/en/auto-rickshaws-dealers','/en/bus-tyres-dealers','/en/popular-trucks',
  '/hi/trucks','/hi/buses','/hi/auto-rickshaws','/hi/three-wheelers','/hi/compare-truck',
  '/hi/truck-tyres','/hi/truck-dealers','/hi/three-wheeler-dealers','/hi/tractor-tyres',
  '/hi/bus-dealers','/hi/compare-bus','/hi/truck-servicecenters','/hi/bus-tyres',
  '/hi/three-wheeler-tyres','/hi/three-wheelers-dealers','/hi/truck-spareparts',
  '/hi/auto-rickshaws-spareparts','/hi/used-trucks','/hi/truck-bodymakers',
  '/hi/bus-servicecenters','/hi/compare-auto-rickshaws','/hi/compare-three-wheeler',
  '/hi/latest-three-wheeler-tyres','/hi/three-wheeler-spareparts','/hi/bus-bodymakers',
  '/hi/truck-tyres-dealers','/hi/bus-spareparts','/hi/compare-truck-tyres',
  '/hi/three-wheelers-spareparts','/hi/buses-dealers','/hi/three-wheeler-servicecenters',
  '/hi/buses-spareparts','/hi/compare-three-wheeler-tyres','/hi/auto-rickshaws-servicecenters',
  '/hi/trucks-dealers','/hi/auto-rickshaws-dealers','/hi/bus-tyres-dealers','/hi/popular-trucks',
  '/electric','/auto-expo','/hi/electric','/hi/auto-expo','/hi/mover','/en/mover',"/store", "/en/store",
  "/buses/tata/starbus","/en/buses/tata/starbus","/hi/buses/tata/starbus",
  "/charging-stations/new-delhi", "/en/charging-stations/new-delhi",
  "/hi/charging-stations/new-delhi","/trucks/mahindra/zeo","/hi/trucks/mahindra/zeo","/tyres", "/hi/tyres", "/en/tyres","/news"
  ,"/en/news","/hi/news"
];


for (const path of paths) {
  test(`Validate image srcset on ${path}`, async ({ page }) => {
    const homePage = new HomePage(page);
    const url = `${urls.base}${path}`;

    await homePage.navigate(url);
    const images = await homePage.getImages();

    const failingImages = images.filter((img) =>
      img.srcset.startsWith("/_next/image")
    );

    if (failingImages.length > 0) {
      console.log(`\n❌ Page failed: ${url}`);
      failingImages.forEach((img, i) => {
        console.log(
          `#${i + 1} | Alt: "${img.alt}" | Src: ${img.src} | Srcset: ${img.srcset}`
        );
      });
    }

    expect(
      failingImages.length,
      `❌ ${url} has ${failingImages.length} invalid image(s) with srcset starting with '/_next/image'`
    ).toBe(0);
  });
}