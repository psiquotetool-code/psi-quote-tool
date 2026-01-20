// CONFIGURATION
const SPREADSHEET_ID = '1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw';

// WEB APP ENTRY POINT
// Routes requests based on URL parameters:
//   ?admin=true       → Admin Panel (requires authentication)
//   ?history=tune     → Tune Energy Quote History (public)
//   ?history=exact    → Exact Water Quote History (public)
//   ?brand=tune       → Tune Energy Quote Tool (default)
//   ?brand=exact      → Exact Water Quote Tool
function doGet(e) {
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
 * @param {string} brand - 'tune' or 'exact'
 */
function serveHistoryPage(brand) {
  const brandUpper = brand.toUpperCase();
  const brandName = brandUpper === 'EXACT' ? 'Exact Water' : 'Tune Energy';

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
  return template.evaluate()
    .setTitle('PSI Quote Tool')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
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

// TEST FUNCTION
function testQuoteNumber() {
  const result = getNextQuoteNumber('TUNE');
  Logger.log(result);
}
