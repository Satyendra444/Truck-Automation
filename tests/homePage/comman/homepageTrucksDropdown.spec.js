// const { test, expect } = require('@playwright/test');
// const urls = require('../../../config/url');
// const HomePage = require('../../../pages/homepage/HomePage');

// const pages = [
//   {
//     label: 'Default',
//     key: 'base',
//     trucksLabel: 'Trucks',
//     newTrucksLabel: 'New Trucks',
//     bodyTypeLabel: 'Body Type',
//     fuelTypeLabel: 'Fuel TypeElectric TrucksDiesel TrucksCNG TrucksPetrol Trucks',
//     brandLabel: 'Trucks Brands',
//     compareLabel: 'Compare Trucks',
//     popularLabel: 'Popular Trucks'
//   },
//   {
//     label: 'English',
//     key: 'english',
//     trucksLabel: 'Trucks',
//     newTrucksLabel: 'New Trucks',
//     bodyTypeLabel: 'Body Type',
//     fuelTypeLabel: 'Fuel TypeElectric TrucksDiesel TrucksCNG TrucksPetrol Trucks',
//     brandLabel: 'Trucks Brands',
//     compareLabel: 'Compare Trucks',
//     popularLabel: 'Popular Trucks'
//   },
//   {
//     label: 'Hindi',
//     key: 'hindi',
//     trucksLabel: 'ट्रक',
//     newTrucksLabel: 'नये ट्रक',
//     bodyTypeLabel: 'बॉडी टाइप',
//     fuelTypeLabel: 'ईंधन प्रकारइलेक्ट्रिक ट्रकडीजल ट्रकसीएनजी ट्रकपेट्रोल ट्रक',
//     brandLabel: 'ट्रक ब्रांड',
//     compareLabel: 'ट्रकों की तुलना करें',
//     popularLabel: 'लोकप्रिय ट्रक'
//   }
// ];

// for (const { label, key, ...labels } of pages) {
//   test(`${label} Home - Trucks dropdown navigation`, async ({ page }) => {
//     const homePage = new HomePage(page);
//     await homePage.navigate(urls[key]);
//     await homePage.trucksNavigationFlow(labels);
//   });
// }
