const { test, expect, describe } = require('@playwright/test');
const urls = require('../../../config/url');
const pages = [
  {
    label: 'Default',
    key: 'base',
    expectedH1: 'India’s fastest growing commercial vehicle website',
    expectedH2: [
      'Select Brand',
      'What are you looking for?',
      'Most Popular Commercial Trucks',
      //'Search Commercial Trucks By Brands',
      'Search Commercial Truck By Brands',  
      'Most Popular Commercial Buses',
      'Search Commercial Bus By Brands',
      // 'Most Popular Auto Rickshaw',
      // 'Search Auto Rickshaw By Brands',
      'Most Popular Commercial Auto Rickshaw',          
      'Search Commercial Auto Rickshaw By Brands',
      'Most Popular Comparison',
      'Latest News',
    ],
    expectedH3: [
      'Pick Up Trucks',
      'Buses',
      'Mini Trucks',
      'Trucks',
      'Three Wheelers',
      // 'Ashok LeylandBada Dost i4',
      'MahindraBolero Maxx Pickup City',
      // Add more h3 as required...
    ],
    expectedH4: [
      "About Us", "Contact Us", "Privacy Policy", "Terms and Conditions", "Advertise With Us", "Feedback", "Career", "Trucks", "Buses", "Auto Rickshaws"
    ]
  },
  {
    label: 'English',
    key: 'english',
    expectedH1: 'India’s fastest growing commercial vehicle website',
    expectedH2: [
      'Select Brand',
      'What are you looking for?',
      'Most Popular Commercial Trucks',
      //'Search Commercial Trucks By Brands',
      'Search Commercial Truck By Brands',  
      'Most Popular Commercial Buses',
      'Search Commercial Bus By Brands',
      // 'Most Popular Auto Rickshaw',
      // 'Search Auto Rickshaw By Brands',
      'Most Popular Commercial Auto Rickshaw',        
      'Search Commercial Auto Rickshaw By Brands',
      'Most Popular Comparison',
      'Latest News',
    ],
    expectedH3: [
      'Pick Up Trucks',
      'Buses',
      'Mini Trucks',
      'Trucks',
      'Three Wheelers',
      //'Ashok LeylandBada Dost i4',
      'MahindraBolero Maxx Pickup City',
    
    ],
    expectedH4: [
      "About Us", "Contact Us", "Privacy Policy", "Terms and Conditions", "Advertise With Us", "Feedback", "Career", "Trucks", "Buses", "Auto Rickshaws"
    ]
  },
  {
    label: 'Hindi',
    key: 'hindi',
    expectedH1: 'भारत की सबसे तेज़ी से बढ़ती कमर्शियल वाहनों की वेबसाइट',
    expectedH2: [
      "ब्रांड चुनें", "आप क्या ढूंढ रहे है", "लोकप्रिय ट्रक", "ब्रांड के आधार पर ट्रक खोजें", "लोकप्रिय बस", "ब्रांड के आधार पर बस खोजें", "लोकप्रिय ऑटो रिक्शा", "ब्रांड के आधार पर ऑटो रिक्शा खोजें", "सर्वाधिक लोकप्रिय तुलनाएँ", "लेटेस्ट न्यूज़"
    ],
    expectedH3: [
      '91trucks के बारे में',
      'हमारे साथ काम करें',
      'उपयोगी लिंक',
      'हमारी साझेदार वेबसाइट',
      //'मोंट्रासुपर ऑटो',
      'बजाजआरई सीएनजी',
    ],
    expectedH4: [
      'हमारे बारे में',
      'संपर्क करें',
      'गोपनीयता नीति',
      'नियम और शर्तें',
      'हमारे साथ विज्ञापन',
      'प्रतिक्रिया',
      'करियर',
      'ट्रक्स',
      'बस',
      'ऑटो',
    ]
  },
 ];


function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

pages.forEach(({  label, key, expectedH1, expectedH2, expectedH3, expectedH4 }) => {
  test.describe(`${label} Page Headings`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(urls[key]);
    });

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
  

    test(`should have correct h2 elements`, async ({ page }) => {
      const h2s = (await page.locator('h2').allTextContents()).map(normalizeText);
      for (const expected of expectedH2) {
        expect(h2s).toContain(normalizeText(expected));
      }
    });

//     test(`should have correct h3 elements`, async ({ page }) => {
//       const h3s = (await page.locator('h3').allTextContents()).map(normalizeText);

//       for (const expected of expectedH3) {
//     const normalizedExpected = normalizeText(expected);
//     const isFound = h3s.some(h => h.includes(normalizedExpected));

//     if (!isFound) {
//       console.log(`❌ '${expected}' not found in:\n`, h3s);
//       expect.fail(`❌ '${expected}' not found in h3 list`);
//     }
// }
//     });

    test(`should have correct h4 elements`, async ({ page }) => {
      const h4s = (await page.locator('h4').allTextContents()).map(normalizeText);
      for (const expected of expectedH4) {
        expect(h4s).toContain(normalizeText(expected));
      }
    });

  });
});