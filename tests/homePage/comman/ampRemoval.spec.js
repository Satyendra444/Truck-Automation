const { test, expect } = require('@playwright/test');
const baseUrl = "https://dev.91trucks.com";
import fs from "fs";

const paths = [
  '/trucks','/','/hi','/buses','/auto-rickshaws','/compare-truck',
  '/truck-tyres','/truck-dealers','/tractor-tyres',
  '/bus-dealers','/compare-bus','/truck-servicecenters','/bus-tyres',
  '/three-wheeler-tyres','/truck-spareparts','/auto-rickshaws-spareparts',
  '/used-trucks','/truck-bodymakers','/bus-servicecenters',
  '/compare-auto-rickshaws','/bus-bodymakers','/truck-tyres-dealers',
  '/bus-spareparts','/compare-truck-tyres',
  '/compare-three-wheeler-tyres','/auto-rickshaws-servicecenters',
  '/auto-rickshaws-dealers','/bus-tyres-dealers','/popular-trucks',
  "/buses/force/traveller-26",
  "/buses/force/traveller-26/price-in-bangalore",
  "/buses/force/traveller-26/25-seater-4020",
  "/buses/force/traveller-26/reviews",
  // English
  '/en/trucks','/en/buses','/en/auto-rickshaws','/en/compare-truck',
  "/en/buses/force/traveller-26",
  '/en/truck-tyres','/en/truck-dealers','/en/tractor-tyres',
  '/en/bus-dealers','/en/compare-bus','/en/truck-servicecenters','/en/bus-tyres',
  '/en/three-wheeler-tyres','/en/truck-spareparts','/en/auto-rickshaws-spareparts',
  '/en/used-trucks','/en/truck-bodymakers','/en/bus-servicecenters',
  '/en/compare-auto-rickshaws',
  '/en/bus-bodymakers','/en/truck-tyres-dealers','/en/bus-spareparts',
  '/en/compare-truck-tyres','/en/compare-three-wheeler-tyres',
  '/en/auto-rickshaws-servicecenters',
  '/en/auto-rickshaws-dealers','/en/bus-tyres-dealers','/en/popular-trucks',
  "/en/finance","/en/buses/force/traveller-26/price-in-lucknow",
  "/en/buses/force/traveller-26/25-seater-4020",
  // Hindi
  '/hi/trucks','/hi/buses','/hi/auto-rickshaws','/hi/compare-truck',
  "/hi/buses/force/traveller-26",
  '/hi/truck-tyres','/hi/truck-dealers','/hi/tractor-tyres',
  '/hi/bus-dealers','/hi/compare-bus','/hi/truck-servicecenters','/hi/bus-tyres',
  '/hi/three-wheeler-tyres','/hi/truck-spareparts','/hi/auto-rickshaws-spareparts',
  '/hi/used-trucks','/hi/truck-bodymakers','/hi/bus-servicecenters',
  '/hi/compare-auto-rickshaws',
  '/hi/bus-bodymakers','/hi/truck-tyres-dealers','/hi/bus-spareparts',
  '/hi/compare-truck-tyres',
  '/hi/compare-three-wheeler-tyres',
  '/hi/auto-rickshaws-servicecenters',
  '/hi/auto-rickshaws-dealers','/hi/bus-tyres-dealers','/hi/popular-trucks',
  "/hi/finance", "/hi/buses/force/traveller-26/price-in-bangalore",
  "/hi/buses/force/traveller-26/25-seater-4020",
  // Extra sections
  '/electric','/auto-expo','/hi/electric','/hi/auto-expo',
  '/store','/en/store','/buses/tata/starbus','/en/buses/tata/starbus',
  '/hi/buses/tata/starbus','/electric/charging-stations/new-delhi',
  '/en/electric/charging-stations/new-delhi','/hi/electric/charging-stations/new-delhi',
  '/trucks/mahindra/zeo','/hi/trucks/mahindra/zeo','/tyres','/hi/tyres','/en/tyres',
  '/news','/en/news','/hi/news',"/finance","/web-stories","/web-stories/category/trucks","/web-stories/category/buses",
  "/news/category/truck",
   "/news/tvs-king-kargo-hd-ev-launched-at-rs-3-85-lakh", "/news/author/indraroop","/trucks/onroad", "/buses/onroad", "/auto-rickshaws/onroad",
];


// ✅ Normalize URL helper
function normalizeUrl(url) {
  try {
    const u = new URL(url, baseUrl); // handles relative like "/trucks"
    return u.origin + u.pathname.replace(/\/$/, ""); // strip trailing slash
  } catch {
    return url;
  }
}

async function checkAmpUrl(browser, url, canonical) {
  const ampCandidates = [
    url + "?amp=1",
    url.replace(baseUrl, baseUrl + "/amp"),
  ];

  for (const ampUrl of ampCandidates) {
    const context = await browser.newContext();
    const response = await context.request.get(ampUrl, { maxRedirects: 0 }).catch(() => null);

    if (response) {
      const status = response.status();
      const headers = response.headers();
      const redirectedUrlRaw = headers["location"] || null;
      const redirectedUrl = redirectedUrlRaw ? normalizeUrl(redirectedUrlRaw) : null;

      if (status === 200) {
        await context.close();
        return {
          status,
          redirectedUrl,
          message: `❌ AMP still live at ${ampUrl}`,
          actual: { status, redirectedUrl: ampUrl },
          expected: { status: "redirect (301)", redirectedUrl: "should redirect to canonical path" },
        };
      } else if ([301, 302, 307, 308].includes(status)) {
        let message = `✅ AMP redirected (${status}) → ${redirectedUrl || "Unknown"}`;

        if (canonical && redirectedUrl) {
          const normCanonical = new URL(canonical, baseUrl);
          const normRedirect = new URL(redirectedUrl);

          // Compare only pathname
          if (normCanonical.pathname !== normRedirect.pathname) {
            message = `❌ Redirect path does not match canonical. AMP → ${normRedirect.pathname}, Canonical → ${normCanonical.pathname}`;
            await context.close();
            return {
              status,
              redirectedUrl,
              message,
              actual: { redirectedUrl, status },
              expected: { redirectedUrl: canonical, status },
            };
          }
        }

        await context.close();
        return {
          status,
          redirectedUrl,
          message,
          actual: { redirectedUrl, status },
          expected: { redirectedUrl: canonical, status },
        };
      }
    }
    await context.close();
  }

  return {
    status: "-",
    redirectedUrl: "-",
    message: "✅ AMP URLs not accessible",
    actual: { status: "-", redirectedUrl: "not accessible" },
    expected: { status: "-", redirectedUrl: "should not exist" },
  };
}
// Main test loop
for (const path of paths) {
  test(`AMP removal check: ${path}`, async ({ page, browser }) => {
    const url = baseUrl + path;
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // ✅ Canonical
    const canonicalTag = await page.$("link[rel='canonical']");
    let canonical = null;
    if (canonicalTag) {
      canonical = await canonicalTag.getAttribute("href");
    }
    expect(canonical, "⚠️ Canonical tag should exist").not.toBeNull();

    // ✅ AMP link
    const ampLink = await page.$("link[rel='amphtml']");
    expect(ampLink, "❌ AMP link should be removed").toBeNull();

    // ✅ AMP JS
    const ampScript = await page.$("script[src*='cdn.ampproject.org']");
    expect(ampScript, "❌ AMP JS script should not load").toBeNull();

    // ✅ AMP URL candidates
    const ampCheck = await checkAmpUrl(browser, url, canonical);
    try {
      expect(ampCheck.message, ampCheck.message).toContain("✅"); // fail if ❌ found
    } catch (err) {
      // log failing case
      const logData = {
        path,
        actual: ampCheck.actual,
        expected: ampCheck.expected,
        message: ampCheck.message,
      };
      console.error("AMP check failed:", logData);

      // Optionally save to a JSON file
      fs.appendFileSync("amp-failures.json", JSON.stringify(logData) + "\n");
      throw err; // re-throw to mark test as failed
    }

    console.log(`[${path}] ${ampCheck.message}`);
  });
}
