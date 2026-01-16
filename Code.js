// CONFIGURATION
const SPREADSHEET_ID = '1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw';

// WEB APP ENTRY POINT
function doGet(e) {
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