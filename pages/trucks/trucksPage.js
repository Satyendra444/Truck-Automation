// pages/trucksPage.js
const BasePage = require('../basePage');
const sitesConfig = require('../../config/sitesConfig');

class TrucksPage extends BasePage {
  constructor(page) {
    super(page, sitesConfig.trucks); // Pass the trucks configuration to BasePage
  }
}

module.exports = TrucksPage;
