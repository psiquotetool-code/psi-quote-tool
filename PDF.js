// PDF.JS - PDF Generation Engine (Google Sheets Template Approach)
// PSI Quote Tool - Phase C (Updated Phase D)
//
// This approach copies a pre-formatted Google Sheets template, populates cells
// with quote data, exports to PDF, and cleans up. Background colors and formatting
// are preserved because Google Sheets PDF export handles them correctly (unlike
// HTML-to-PDF conversion which ignores background colors).

// Template Sheet Configuration
const PDF_TEMPLATE_ID = '1leM4TF00VjJ9Y9DBv_KqOJeJJAwy6ONp21Rvh-m6PGw';
const TUNE_TEMPLATE_TAB = 'Tune Template';
const EXACT_TEMPLATE_TAB = 'Exact Template';

// Data Spreadsheet for Settings
const PDF_DATA_SPREADSHEET_ID = '1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw';

/**
 * Get valid until days from Settings tab
 * @returns {number} - Number of days quote is valid
 */
function getValidUntilDays() {
  try {
    const ss = SpreadsheetApp.openById(PDF_DATA_SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Settings');
    const data = sheet.getDataRange().getValues();

    for (let i = 0; i < data.length; i++) {
      const firstCell = String(data[i][0]).toLowerCase().trim();
      if (firstCell === 'validuntildays' || firstCell === 'valid until days' || firstCell === 'valid_until_days') {
        return parseInt(data[i][1]) || 30;
      }
    }
    return 30; // Default
  } catch (error) {
    Logger.log('Error reading validUntilDays from Settings: ' + error.toString());
    return 30; // Default
  }
}

// Cell Reference Mapping (verified from zoomed-in template screenshots)
// These are the cells that need to be populated with quote data
// Note: Many cells are merged. We write to the top-left cell of each merge.
const CELL_MAP = {
  // Brand Name locations (need to update for Exact Water quotes)
  mainTitle: 'C2',                    // Main title: "Tune Energy" or "Exact Water" (merged C2:F6)
  presentedByHeader: 'F9',            // Box header: "Presented by Tune Energy" or "Presented by Exact Water" (merged F9:I9)

  // Header/Metadata (upper right corner) - UNCHANGED
  date: 'I4',
  quoteNumber: 'I5',
  validUntil: 'I6',

  // Customer Info (left column - "Rental Quote Presented To" box)
  customerCompany: 'D10',
  customerContact: 'D11',
  customerEmail: 'D12',
  customerPhone: 'D13',

  // Rep Info (right column - "Presented by [Brand]" box)
  // Values are merged H:I, write to H
  repName: 'H10',
  repEmail: 'H11',
  repPhone: 'H12',

  // Quote Highlights (left column)
  panelsMeters: 'D16',
  equipmentFinanced: 'D17',
  grossSavingsMonth: 'D18',
  grossSavingsPercent: 'D19',

  // Sites Table starts at row 23 (header is row 22)
  // Location: Column C, Utility: Column D
  sitesStartRow: 23,
  sitesLocationCol: 'C',
  sitesUtilityCol: 'D',
  sitesMaxRows: 37,  // Number of rows available for sites

  // ============================================
  // 36-Month Term Block (Term 1) - or 60-month for Tier 3
  // Rows 17-37
  // ============================================

  // Dynamic Labels (must be updated for Tier 3 quotes)
  // These cells contain text labels that change based on term length
  term1_header: 'F17',              // "XX-Month Term Rental Option"
  term1_cashFlowDuringHeader: 'F18', // "Cash Flow During XX-Mo Term"
  term1_paymentLabel: 'F21',        // "XX-Month Rental Payment"
  term1_cashFlowAfterHeader: 'F23', // "Cash Flow After XX-Mo Term"
  term1_termYearLabel: 'F30',       // "X-Year Total Net Savings"
  term1_termROILabel: 'F33',        // "X-Year Return on Rental Payment **"

  // Cash Flow During Term (rows 18-22)
  // $ values are merged G:H, write to G. % values are in I (not merged).
  term1_currentSpend: 'G19',
  term1_grossSavings: 'G20',
  term1_grossSavingsPct: 'I20',
  term1_payment: 'G21',
  term1_netSavings: 'G22',
  term1_netSavingsPct: 'I22',

  // Cash Flow After Term (rows 23-27)
  term1_afterCurrentSpend: 'G24',
  term1_afterGrossSavings: 'G25',
  term1_afterGrossSavingsPct: 'I25',
  term1_afterPayment: 'G26',
  term1_afterNetSavings: 'G27',
  term1_afterNetSavingsPct: 'I27',

  // Annual Savings Analysis (rows 28-31)
  term1_1yearSavings: 'G29',
  term1_1yearPct: 'I29',
  term1_termYearSavings: 'G30',  // 3-year for 36-mo, 5-year for 60-mo
  term1_termYearPct: 'I30',
  term1_10yearSavings: 'G31',
  term1_10yearPct: 'I31',

  // ROI Metrics (rows 32-34)
  // Labels are merged F:G, values are merged H:I, write to H
  term1_monthlyROI: 'H32',
  term1_termROI: 'H33',
  term1_10yearROI: 'H34',

  // Footnotes (rows 35-37)
  // Each row is merged F:I, write to F
  term1_footnote1: 'F35',  // Static: Monthly ROI definition
  term1_footnote2: 'F36',  // Dynamic: Term-year ROI definition
  term1_footnote3: 'F37',  // Dynamic: 10-year ROI definition (divisor changes)

  // ============================================
  // 60-Month Term Block (Term 2) - or 72-month for Tier 3
  // Rows 39-59
  // ============================================

  // Dynamic Labels (must be updated for Tier 3 quotes)
  // These cells contain text labels that change based on term length
  term2_header: 'F39',              // "XX-Month Term Rental Option"
  term2_cashFlowDuringHeader: 'F40', // "Cash Flow During XX-Mo Term"
  term2_paymentLabel: 'F43',        // "XX-Month Rental Payment"
  term2_cashFlowAfterHeader: 'F45', // "Cash Flow After XX-Mo Term"
  term2_termYearLabel: 'F52',       // "X-Year Total Net Savings"
  term2_termROILabel: 'F55',        // "X-Year Return on Rental Payment **"

  // Cash Flow During Term (rows 40-44)
  term2_currentSpend: 'G41',
  term2_grossSavings: 'G42',
  term2_grossSavingsPct: 'I42',
  term2_payment: 'G43',
  term2_netSavings: 'G44',
  term2_netSavingsPct: 'I44',

  // Cash Flow After Term (rows 45-49)
  term2_afterCurrentSpend: 'G46',
  term2_afterGrossSavings: 'G47',
  term2_afterGrossSavingsPct: 'I47',
  term2_afterPayment: 'G48',
  term2_afterNetSavings: 'G49',
  term2_afterNetSavingsPct: 'I49',

  // Annual Savings Analysis (rows 50-53)
  term2_1yearSavings: 'G51',
  term2_1yearPct: 'I51',
  term2_termYearSavings: 'G52',  // 5-year for 60-mo, 6-year for 72-mo
  term2_termYearPct: 'I52',
  term2_10yearSavings: 'G53',
  term2_10yearPct: 'I53',

  // ROI Metrics (rows 54-56)
  // Labels are merged F:G, values are merged H:I, write to H
  term2_monthlyROI: 'H54',
  term2_termROI: 'H55',
  term2_10yearROI: 'H56',

  // Footnotes (rows 57-59)
  // Each row is merged F:I, write to F
  term2_footnote1: 'F57',  // Static: Monthly ROI definition
  term2_footnote2: 'F58',  // Dynamic: Term-year ROI definition
  term2_footnote3: 'F59'   // Dynamic: 10-year ROI definition (divisor changes)

  // Terms and Conditions (rows 61-62)
  // Merged C61:I62 - Static text, no update needed
};

/**
 * Main entry point - creates PDF from quote data using Google Sheets template
 * @param {Object} quoteData - Complete quote data object
 * @returns {Object} - {success: boolean, url: string, error: string}
 */
function createPDFQuote(quoteData) {
  try {
    // Step 1: Open the template spreadsheet and select correct tab based on brand
    const templateSS = SpreadsheetApp.openById(PDF_TEMPLATE_ID);
    const templateTabName = quoteData.companyName === 'Exact Water' ? EXACT_TEMPLATE_TAB : TUNE_TEMPLATE_TAB;
    const templateSheet = templateSS.getSheetByName(templateTabName);

    if (!templateSheet) {
      throw new Error('Template tab "' + templateTabName + '" not found');
    }

    // Step 2: Copy template to a new temporary sheet
    const tempSheetName = 'TEMP_' + quoteData.quoteNumber + '_' + new Date().getTime();
    const tempSheet = templateSheet.copyTo(templateSS);
    tempSheet.setName(tempSheetName);

    // Step 3: Populate cells with quote data
    populateCells(tempSheet, quoteData);

    // Step 3.5: Flush all pending changes to ensure data is written before export
    SpreadsheetApp.flush();

    // Step 4: Export sheet as PDF
    const pdfBlob = exportSheetAsPDF(templateSS, tempSheet);

    // Step 5: Generate filename and save to Drive
    const fileName = generateFileName(quoteData);
    pdfBlob.setName(fileName);

    const folder = getOrCreateQuoteFolder();
    const file = folder.createFile(pdfBlob);

    // Step 6: Delete temporary sheet
    templateSS.deleteSheet(tempSheet);

    // Step 7: Return download URL
    return {
      success: true,
      url: file.getDownloadUrl(),
      fileId: file.getId(),
      fileName: fileName
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Populates the template sheet with quote data
 * @param {Sheet} sheet - The Google Sheet to populate
 * @param {Object} quoteData - Quote data object
 */
function populateCells(sheet, quoteData) {
  const results = quoteData.results;

  // Calculate valid until date (configurable via Admin Panel)
  const validUntilDays = getValidUntilDays();
  const quoteDateObj = new Date(quoteData.quoteDate);
  quoteDateObj.setDate(quoteDateObj.getDate() + validUntilDays);
  const validUntil = formatDate(quoteDateObj);

  // Brand Name (update for Exact Water quotes)
  const brandName = quoteData.companyName; // "Tune Energy" or "Exact Water"
  sheet.getRange(CELL_MAP.mainTitle).setValue(brandName + '\nEquipment Rental Quote');
  sheet.getRange(CELL_MAP.presentedByHeader).setValue('Presented by ' + brandName);

  // Header/Metadata
  sheet.getRange(CELL_MAP.date).setValue(quoteData.quoteDate);
  sheet.getRange(CELL_MAP.quoteNumber).setValue(quoteData.quoteNumber);
  sheet.getRange(CELL_MAP.validUntil).setValue(validUntil);

  // Customer Info
  sheet.getRange(CELL_MAP.customerCompany).setValue(quoteData.customerCompany);
  sheet.getRange(CELL_MAP.customerContact).setValue(quoteData.customerContact);
  sheet.getRange(CELL_MAP.customerEmail).setValue(quoteData.customerEmail);
  sheet.getRange(CELL_MAP.customerPhone).setValue(quoteData.customerPhone);

  // Rep Info
  sheet.getRange(CELL_MAP.repName).setValue(quoteData.repName);
  sheet.getRange(CELL_MAP.repEmail).setValue(quoteData.repEmail);
  sheet.getRange(CELL_MAP.repPhone).setValue(quoteData.repPhone);

  // Quote Highlights
  sheet.getRange(CELL_MAP.panelsMeters).setValue(results.totalPanelsMeters);
  sheet.getRange(CELL_MAP.equipmentFinanced).setValue('$' + formatNumber(results.totalEquipment));
  sheet.getRange(CELL_MAP.grossSavingsMonth).setValue('$' + formatNumber(results.grossMonthlySavings));
  sheet.getRange(CELL_MAP.grossSavingsPercent).setValue(Math.round(results.avgSavingsPercent) + '%');

  // Sites Table
  populateSitesTable(sheet, results.locations);

  // Financial Terms - depends on tier
  if (results.tier === 1 || results.tier === 2) {
    // Tier 1-2: 36-month and 60-month terms
    populateTermBlock(sheet, 1, results.term36, results, 36);
    populateTermBlock(sheet, 2, results.term60, results, 60);
  } else {
    // Tier 3: 60-month and 72-month terms
    populateTermBlock(sheet, 1, results.term60, results, 60);
    populateTermBlock(sheet, 2, results.term72, results, 72);
  }
}

/**
 * Populates the sites table with location data
 * @param {Sheet} sheet - The Google Sheet
 * @param {Array} locations - Array of location objects
 */
function populateSitesTable(sheet, locations) {
  const startRow = CELL_MAP.sitesStartRow;
  const locCol = CELL_MAP.sitesLocationCol;
  const utilCol = CELL_MAP.sitesUtilityCol;
  const maxRows = CELL_MAP.sitesMaxRows;

  // Clear existing site data first (in case template has sample data)
  const clearRange = sheet.getRange(locCol + startRow + ':' + utilCol + (startRow + maxRows - 1));
  clearRange.clearContent();

  // Populate with actual locations
  for (let i = 0; i < locations.length && i < maxRows; i++) {
    const row = startRow + i;
    sheet.getRange(locCol + row).setValue(locations[i].address);
    sheet.getRange(utilCol + row).setValue(locations[i].utility);
  }

  // Leave remaining rows empty (they already have formatting from template)
}

/**
 * Populates a term block with financial data
 * @param {Sheet} sheet - The Google Sheet
 * @param {number} termNum - 1 for first term block, 2 for second
 * @param {Object} termData - Calculated term data
 * @param {Object} results - Full results object for monthly spend/savings
 * @param {number} months - Term length (36, 60, or 72)
 */
function populateTermBlock(sheet, termNum, termData, results, months) {
  const prefix = 'term' + termNum + '_';

  const monthlySpend = results.totalMonthlySpend;
  const grossSavings = results.grossMonthlySavings;
  const grossPct = Math.round(results.avgSavingsPercent);
  const netPct = Math.round((termData.netMonthlySavings / monthlySpend) * 100);

  // Determine term years for labels (3, 5, or 6)
  let termYears;
  if (months === 36) {
    termYears = 3;
  } else if (months === 60) {
    termYears = 5;
  } else if (months === 72) {
    termYears = 6;
  }

  // Set Dynamic Labels (these change based on term length)
  // For Tier 3, Term 1 shows 60-month and Term 2 shows 72-month
  sheet.getRange(CELL_MAP[prefix + 'header']).setValue(months + '-Month Term Rental Option');
  sheet.getRange(CELL_MAP[prefix + 'cashFlowDuringHeader']).setValue('Cash Flow During ' + months + '-Mo Term');
  sheet.getRange(CELL_MAP[prefix + 'paymentLabel']).setValue(months + '-Month Rental Payment');
  sheet.getRange(CELL_MAP[prefix + 'cashFlowAfterHeader']).setValue('Cash Flow After ' + months + '-Mo Term');
  sheet.getRange(CELL_MAP[prefix + 'termYearLabel']).setValue(termYears + '-Year Total Net Savings');
  sheet.getRange(CELL_MAP[prefix + 'termROILabel']).setValue(termYears + '-Year Return on Rental Payment **');

  // Cash Flow During Term
  sheet.getRange(CELL_MAP[prefix + 'currentSpend']).setValue('$' + formatNumber(monthlySpend));
  sheet.getRange(CELL_MAP[prefix + 'grossSavings']).setValue('$' + formatNumber(grossSavings));
  sheet.getRange(CELL_MAP[prefix + 'grossSavingsPct']).setValue(grossPct + '%');
  sheet.getRange(CELL_MAP[prefix + 'payment']).setValue('$' + formatNumber(termData.monthlyPayment));
  sheet.getRange(CELL_MAP[prefix + 'netSavings']).setValue('$' + formatNumber(termData.netMonthlySavings));
  sheet.getRange(CELL_MAP[prefix + 'netSavingsPct']).setValue(netPct + '%');

  // Cash Flow After Term (payment becomes $0, net savings = gross savings)
  sheet.getRange(CELL_MAP[prefix + 'afterCurrentSpend']).setValue('$' + formatNumber(monthlySpend));
  sheet.getRange(CELL_MAP[prefix + 'afterGrossSavings']).setValue('$' + formatNumber(grossSavings));
  sheet.getRange(CELL_MAP[prefix + 'afterGrossSavingsPct']).setValue(grossPct + '%');
  sheet.getRange(CELL_MAP[prefix + 'afterPayment']).setValue('$0');
  sheet.getRange(CELL_MAP[prefix + 'afterNetSavings']).setValue('$' + formatNumber(grossSavings));
  sheet.getRange(CELL_MAP[prefix + 'afterNetSavingsPct']).setValue(grossPct + '%');

  // Annual Savings Analysis
  sheet.getRange(CELL_MAP[prefix + '1yearSavings']).setValue('$' + formatNumber(termData.netYearlySavings));
  sheet.getRange(CELL_MAP[prefix + '1yearPct']).setValue(netPct + '%');

  // Term-specific savings (3-year, 5-year, or 6-year)
  // Note: termYears is already defined at the top of this function
  let termYearSavings;
  if (months === 36) {
    termYearSavings = termData.netSavings3Year;
  } else if (months === 60) {
    termYearSavings = termData.netSavings5Year;
  } else if (months === 72) {
    termYearSavings = termData.netSavings6Year;
  }
  sheet.getRange(CELL_MAP[prefix + 'termYearSavings']).setValue('$' + formatNumber(termYearSavings));
  sheet.getRange(CELL_MAP[prefix + 'termYearPct']).setValue(netPct + '%');

  // 10-year savings
  const tenYearPct = Math.round((termData.netSavings10Year / (monthlySpend * 120)) * 100);
  sheet.getRange(CELL_MAP[prefix + '10yearSavings']).setValue('$' + formatNumber(termData.netSavings10Year));
  sheet.getRange(CELL_MAP[prefix + '10yearPct']).setValue(tenYearPct + '%');

  // ROI Metrics
  sheet.getRange(CELL_MAP[prefix + 'monthlyROI']).setValue(Math.round(termData.roiMonth1 * 100) + '%');

  // Term ROI (3-year, 5-year, or 6-year)
  let termROI;
  if (months === 36) {
    termROI = termData.roi3Year;
  } else if (months === 60) {
    termROI = termData.roi5Year;
  } else if (months === 72) {
    termROI = termData.roi6Year;
  }
  sheet.getRange(CELL_MAP[prefix + 'termROI']).setValue(Math.round(termROI * 100) + '%');

  sheet.getRange(CELL_MAP[prefix + '10yearROI']).setValue(Math.round(termData.roi10Year * 100) + '%');

  // Dynamic Footnotes
  populateFootnotes(sheet, termNum, termYears);
}

/**
 * Populates the dynamic footnotes for a term block
 * @param {Sheet} sheet - The Google Sheet
 * @param {number} termNum - 1 for first term block, 2 for second
 * @param {number} termYears - Number of years for this term (3, 5, or 6)
 */
function populateFootnotes(sheet, termNum, termYears) {
  const prefix = 'term' + termNum + '_';

  // Footnote 1 is always the same (Monthly ROI definition)
  const footnote1 = '* Monthly Return on Rental Payment = Monthly Net Savings / Monthly Rental Payment.';
  sheet.getRange(CELL_MAP[prefix + 'footnote1']).setValue(footnote1);

  // Footnote 2 - Term-year ROI definition (changes based on term)
  const footnote2 = '** ' + termYears + '-Year Return on Rental Payment = ' + termYears + '-Year Total Net Savings / ' + termYears + ' Years of Rental Payments.';
  sheet.getRange(CELL_MAP[prefix + 'footnote2']).setValue(footnote2);

  // Footnote 3 - 10-year ROI definition (divisor changes based on term)
  const footnote3 = '*** 10-Year Return on Rental Payment = 10-Year Total Net Savings / ' + termYears + ' Years of Rental Payments.';
  sheet.getRange(CELL_MAP[prefix + 'footnote3']).setValue(footnote3);
}

/**
 * Exports a specific sheet as PDF
 * @param {Spreadsheet} spreadsheet - The parent spreadsheet
 * @param {Sheet} sheet - The sheet to export
 * @returns {Blob} - PDF blob
 */
function exportSheetAsPDF(spreadsheet, sheet) {
  const ssId = spreadsheet.getId();
  const sheetId = sheet.getSheetId();

  // Build PDF export URL with parameters
  const url = 'https://docs.google.com/spreadsheets/d/' + ssId + '/export?' +
    'format=pdf' +
    '&gid=' + sheetId +
    '&portrait=true' +          // Portrait orientation
    '&size=letter' +            // Letter size paper
    '&fitw=true' +              // Fit to width
    '&gridlines=false' +        // No gridlines
    '&printtitle=false' +       // No title
    '&sheetnames=false' +       // No sheet names
    '&pagenum=false' +          // No page numbers
    '&fzr=false' +              // Don't repeat frozen rows
    '&fzc=false' +              // Don't repeat frozen columns
    '&top_margin=0.25' +        // Margins in inches
    '&bottom_margin=0.25' +
    '&left_margin=0.25' +
    '&right_margin=0.25';

  // Fetch PDF with authorization
  const token = ScriptApp.getOAuthToken();
  const response = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  return response.getBlob().setContentType('application/pdf');
}

/**
 * Generates a filename for the PDF
 * @param {Object} quoteData - Quote data
 * @returns {string} - Filename
 */
function generateFileName(quoteData) {
  // Format: Quote_[CustomerName]_[QuoteNumber]_[Date].pdf
  const customerName = quoteData.customerCompany.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const quoteNum = quoteData.quoteNumber;
  const dateStr = quoteData.quoteDate.replace(/\//g, '-');

  return 'Quote_' + customerName + '_' + quoteNum + '_' + dateStr + '.pdf';
}

/**
 * Gets or creates the Drive folder for storing quote PDFs
 * @returns {Folder} - Google Drive Folder object
 */
function getOrCreateQuoteFolder() {
  const folderName = 'PSI Quote PDFs';
  const folders = DriveApp.getFoldersByName(folderName);

  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

/**
 * Formats a number with commas and rounds to whole number
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string
 */
function formatNumber(num) {
  return Math.round(num).toLocaleString('en-US');
}

/**
 * Formats a date as MM/DD/YYYY
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return month + '/' + day + '/' + year;
}

/**
 * Run this FIRST to authorize Drive and Spreadsheet permissions
 * Run from Apps Script editor: Run > authorizeDrive
 */
function authorizeDrive() {
  // Authorize Drive access
  var folders = DriveApp.getFoldersByName('PSI Quote PDFs');
  if (!folders.hasNext()) {
    var folder = DriveApp.createFolder('PSI Quote PDFs');
    Logger.log('Created folder: ' + folder.getName());
  } else {
    Logger.log('Folder already exists');
  }

  // Authorize Spreadsheet access
  var templateSS = SpreadsheetApp.openById(PDF_TEMPLATE_ID);
  Logger.log('Template spreadsheet: ' + templateSS.getName());

  // Authorize UrlFetchApp
  var token = ScriptApp.getOAuthToken();
  Logger.log('OAuth token obtained');

  Logger.log('Authorization successful! All permissions granted.');
}

/**
 * Test function for PDF generation
 * Run from Apps Script editor: Run > testPDFGeneration
 */
function testPDFGeneration() {
  const testQuoteData = {
    companyName: 'Tune Energy',
    quoteNumber: 'TQ-TEST-001',
    quoteDate: '1/16/2026',
    customerCompany: 'Test Company Inc.',
    customerContact: 'John Smith',
    customerEmail: 'john@test.com',
    customerPhone: '555-123-4567',
    repName: 'Jane Doe',
    repEmail: 'jane@tuneenergy.com',
    repPhone: '555-987-6543',
    results: {
      totalEquipment: 17000,
      totalMonthlySpend: 8630,
      totalPanelsMeters: 13,
      avgSavingsPercent: 10,
      grossMonthlySavings: 863,
      tier: 1,
      locationCount: 3,
      locations: [
        { address: '123 Main St, Irvine CA', utility: 'SCE' },
        { address: '456 Oak Ave, Los Angeles CA', utility: 'LADWP' },
        { address: '789 Pine Blvd, San Diego CA', utility: 'SDG&E' }
      ],
      term36: {
        monthlyPayment: 556,
        netMonthlySavings: 307,
        netYearlySavings: 3678,
        netSavings3Year: 11034,
        netSavings5Year: 18390,
        netSavings10Year: 83526,
        roiMonth1: 0.55,
        roi3Year: 0.55,
        roi5Year: 0.92,
        roi10Year: 4.17
      },
      term60: {
        monthlyPayment: 360,
        netMonthlySavings: 503,
        netYearlySavings: 6036,
        netSavings3Year: 18108,
        netSavings5Year: 30180,
        netSavings6Year: 36216,
        netSavings10Year: 81937,
        roiMonth1: 1.40,
        roi3Year: 0.84,
        roi5Year: 1.40,
        roi6Year: 1.68,
        roi10Year: 3.79
      },
      term72: {
        monthlyPayment: 306,
        netMonthlySavings: 557,
        netYearlySavings: 6684,
        netSavings6Year: 40104,
        netSavings10Year: 79848,
        roiMonth1: 1.82,
        roi6Year: 1.82,
        roi10Year: 3.62
      }
    }
  };

  Logger.log('Starting PDF generation test...');
  const result = createPDFQuote(testQuoteData);

  if (result.success) {
    Logger.log('SUCCESS!');
    Logger.log('File: ' + result.fileName);
    Logger.log('URL: ' + result.url);
  } else {
    Logger.log('FAILED: ' + result.error);
  }

  return result;
}

/**
 * Test function to verify cell mapping
 * Run from Apps Script editor: Run > testCellMapping
 */
function testCellMapping() {
  const templateSS = SpreadsheetApp.openById(PDF_TEMPLATE_ID);
  const templateSheet = templateSS.getSheetByName(TUNE_TEMPLATE_TAB); // Use Tune template for testing

  if (!templateSheet) {
    Logger.log('ERROR: Template sheet not found');
    return;
  }

  Logger.log('Template sheet found: ' + templateSheet.getName());

  // Test reading key cells to verify mapping
  const testCells = [
    'I4', 'I5', 'I6',           // Metadata
    'D9', 'D10', 'D11', 'D12',  // Customer info
    'H9', 'H10', 'H11',         // Rep info
    'D15', 'D16', 'D17', 'D18', // Quote highlights
    'C22', 'D22',               // Sites table first row
    'G18', 'G19', 'I19',        // 36-month term values
    'H31', 'H32', 'H33',        // 36-month ROI
    'G40', 'G41', 'I41',        // 60-month term values
    'H53', 'H54', 'H55'         // 60-month ROI
  ];

  Logger.log('--- Cell Values from Template ---');
  for (let cell of testCells) {
    const value = templateSheet.getRange(cell).getValue();
    Logger.log(cell + ': ' + value);
  }

  Logger.log('Cell mapping test complete');
}
