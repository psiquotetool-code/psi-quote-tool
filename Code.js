// CONFIGURATION
const SPREADSHEET_ID = '1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw';

// WEB APP ENTRY POINT
// Routes requests based on URL parameters:
//   ?admin=true       → Admin Panel (requires authentication)
//   ?history=tune     → Tune Energy Quote History (public)
//   ?history=otts     → On Track Technology Solutions Quote History (public)
//                       (legacy ?history=exact also accepted via backward-compat alias)
//   ?brand=tune       → Tune Energy Quote Tool (default)
//   ?brand=otts       → On Track Technology Solutions Quote Tool
//                       (legacy ?brand=exact also accepted via backward-compat alias)
//
// NOTE: The internal brand identifier 'otts' replaced the legacy 'exact' identifier
// in April 2026 when Exact Water was replaced by On Track Technology Solutions as a
// vendor partner. Historical QuoteLog rows retain their original 'Exact Water' /
// 'EXACT-NNNNN' values for audit. The 'Exact Template' tab in the PDF Template Sheet
// is preserved as a rollback safety net.
function doGet(e) {
  // Backward-compat alias: silently route legacy 'exact' URL params to 'otts'.
  // Protects any reps/bookmarks still using the pre-April-2026 URLs.
  if (e.parameter.brand === 'exact') e.parameter.brand = 'otts';
  if (e.parameter.history === 'exact') e.parameter.history = 'otts';

  // Check for Admin Panel request
  if (e.parameter.admin === 'true') {
    return serveAdminPanel();
  }

  // Check for Quote History request
  if (e.parameter.history) {
    return serveHistoryPage(e.parameter.history);
  }

  // Default: Serve Quote Tool
  return serveQuoteTool(e);
}

/**
 * Serve the Admin Panel (authentication checked in Admin.html JavaScript)
 */
function serveAdminPanel() {
  const template = HtmlService.createTemplateFromFile('AdminPanel');
  return template.evaluate()
    .setTitle('PSI Quote Tool - Admin Panel')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Serve the Quote History page (public, filtered by brand)
 * @param {string} brand - 'tune' or 'otts' (legacy 'exact' normalized to 'otts' upstream)
 */
function serveHistoryPage(brand) {
  const brandUpper = brand.toUpperCase();
  // Display text stays "Exact Water" at this step; changes to "On Track Technology Solutions" in step 3
  const brandName = brandUpper === 'OTTS' ? 'Exact Water' : 'Tune Energy';

  const template = HtmlService.createTemplateFromFile('QuoteHistory');
  template.brand = brandUpper;
  template.brandName = brandName;

  return template.evaluate()
    .setTitle(brandName + ' - Quote History')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Serve the Quote Tool (main application)
 * @param {Object} e - Event object with URL parameters
 */
function serveQuoteTool(e) {
  const brand = (e.parameter.brand || 'tune').toUpperCase();
  const quoteNumber = getNextQuoteNumber(brand);
  const template = HtmlService.createTemplateFromFile('Index');
  template.brand = brand;
  template.quoteNumber = quoteNumber;
  template.quoteDate = new Date().toLocaleDateString('en-US');
  template.validUntilDays = getValidUntilDaysSetting();
  return template.evaluate()
    .setTitle('PSI Quote Tool')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Get ValidUntilDays from Settings tab
 * @returns {number} - Number of days quote is valid (default 30)
 */
function getValidUntilDaysSetting() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Settings');
    const data = sheet.getDataRange().getValues();

    for (let i = 0; i < data.length; i++) {
      const firstCell = String(data[i][0]).toLowerCase().trim();
      if (firstCell === 'validuntildays' || firstCell === 'valid until days' || firstCell === 'valid_until_days') {
        return parseInt(data[i][1]) || 30;
      }
    }
    return 30;
  } catch (error) {
    Logger.log('Error reading ValidUntilDays: ' + error.toString());
    return 30;
  }
}

// QUOTE NUMBER GENERATION
function getNextQuoteNumber(brand) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('QuoteNumbers');
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === brand) {
      const nextNum = data[i][1] + 1;
      sheet.getRange(i + 1, 2).setValue(nextNum);
      const paddedNum = String(nextNum).padStart(5, '0');
      return brand + '-' + paddedNum;
    }
  }
  return null;
}

/**
 * Include HTML files (for templates)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Get the web app URL for redirecting to a new quote
 * @param {string} brand - 'TUNE' or 'OTTS'
 * @returns {string} - Full web app URL with brand parameter
 */
function getWebAppUrl(brand) {
  const baseUrl = ScriptApp.getService().getUrl();
  const brandParam = brand === 'OTTS' ? 'otts' : 'tune';
  return baseUrl + '?brand=' + brandParam;
}

// TEST FUNCTION
function testQuoteNumber() {
  const result = getNextQuoteNumber('TUNE');
  Logger.log(result);
}
