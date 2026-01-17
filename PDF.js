// PDF.JS - PDF Generation Engine (Google Sheets Template Approach)
// PSI Quote Tool - Phase C
//
// This approach copies a pre-formatted Google Sheets template, populates cells
// with quote data, exports to PDF, and cleans up. Background colors and formatting
// are preserved because Google Sheets PDF export handles them correctly (unlike
// HTML-to-PDF conversion which ignores background colors).

// Template Sheet Configuration
const PDF_TEMPLATE_ID = '1leM4TF00VjJ9Y9DBv_KqOJeJJAwy6ONp21Rvh-m6PGw';
const TEMPLATE_TAB_NAME = 'Dec 2 Version';

// Cell Reference Mapping (verified from zoomed-in template screenshots)
// These are the cells that need to be populated with quote data
// Note: Many cells are merged. We write to the top-left cell of each merge.
const CELL_MAP = {
  // Header/Metadata (upper right corner)
  date: 'I4',
  quoteNumber: 'I5',
  validUntil: 'I6',

  // Customer Info (left column - "Rental Quote Presented To" box)
  customerCompany: 'D9',
  customerContact: 'D10',
  customerEmail: 'D11',
  customerPhone: 'D12',

  // Rep Info (right column - "Presented by Tune Energy" box)
  // Values are merged H:I, write to H
  repName: 'H9',
  repEmail: 'H10',
  repPhone: 'H11',

  // Quote Highlights (left column)
  panelsMeters: 'D15',
  equipmentFinanced: 'D16',
  grossSavingsMonth: 'D17',
  grossSavingsPercent: 'D18',

  // Sites Table starts at row 22 (header is row 21)
  // Location: Column C, Utility: Column D
  sitesStartRow: 22,
  sitesLocationCol: 'C',
  sitesUtilityCol: 'D',
  sitesMaxRows: 37,  // Rows 22-58

  // ============================================
  // 36-Month Term Block (Term 1) - or 60-month for Tier 3
  // ============================================

  // Cash Flow During Term (rows 17-21)
  // $ values are merged G:H, write to G. % values are in I (not merged).
  term1_currentSpend: 'G18',
  term1_grossSavings: 'G19',
  term1_grossSavingsPct: 'I19',
  term1_payment: 'G20',
  term1_netSavings: 'G21',
  term1_netSavingsPct: 'I21',

  // Cash Flow After Term (rows 22-26)
  term1_afterCurrentSpend: 'G23',
  term1_afterGrossSavings: 'G24',
  term1_afterGrossSavingsPct: 'I24',
  term1_afterPayment: 'G25',
  term1_afterNetSavings: 'G26',
  term1_afterNetSavingsPct: 'I26',

  // Annual Savings Analysis (rows 27-30)
  term1_1yearSavings: 'G28',
  term1_1yearPct: 'I28',
  term1_termYearSavings: 'G29',  // 3-year for 36-mo, 5-year for 60-mo
  term1_termYearPct: 'I29',
  term1_10yearSavings: 'G30',
  term1_10yearPct: 'I30',

  // ROI Metrics (rows 31-33)
  // Labels are merged F:G, values are merged H:I, write to H
  term1_monthlyROI: 'H31',
  term1_termROI: 'H32',
  term1_10yearROI: 'H33',

  // Footnotes (rows 34-36)
  // Each row is merged F:I, write to F
  term1_footnote1: 'F34',  // Static: Monthly ROI definition
  term1_footnote2: 'F35',  // Dynamic: Term-year ROI definition
  term1_footnote3: 'F36',  // Dynamic: 10-year ROI definition (divisor changes)

  // ============================================
  // 60-Month Term Block (Term 2) - or 72-month for Tier 3
  // ============================================

  // The 60-month block starts at row 38
  term2_headerRow: 38,

  // Cash Flow During Term (rows 39-43)
  term2_currentSpend: 'G40',
  term2_grossSavings: 'G41',
  term2_grossSavingsPct: 'I41',
  term2_payment: 'G42',
  term2_netSavings: 'G43',
  term2_netSavingsPct: 'I43',

  // Cash Flow After Term (rows 44-48)
  term2_afterCurrentSpend: 'G45',
  term2_afterGrossSavings: 'G46',
  term2_afterGrossSavingsPct: 'I46',
  term2_afterPayment: 'G47',
  term2_afterNetSavings: 'G48',
  term2_afterNetSavingsPct: 'I48',

  // Annual Savings Analysis (rows 49-52)
  term2_1yearSavings: 'G50',
  term2_1yearPct: 'I50',
  term2_termYearSavings: 'G51',  // 5-year for 60-mo, 6-year for 72-mo
  term2_termYearPct: 'I51',
  term2_10yearSavings: 'G52',
  term2_10yearPct: 'I52',

  // ROI Metrics (rows 53-55)
  // Labels are merged F:G, values are merged H:I, write to H
  term2_monthlyROI: 'H53',
  term2_termROI: 'H54',
  term2_10yearROI: 'H55',

  // Footnotes (rows 56-58)
  // Each row is merged F:I, write to F
  term2_footnote1: 'F56',  // Static: Monthly ROI definition
  term2_footnote2: 'F57',  // Dynamic: Term-year ROI definition
  term2_footnote3: 'F58'   // Dynamic: 10-year ROI definition (divisor changes)

  // Terms and Conditions (rows 60-61)
  // Merged C60:I61 - Static text, no update needed
};

/**
 * Main entry point - creates PDF from quote data using Google Sheets template
 * @param {Object} quoteData - Complete quote data object
 * @returns {Object} - {success: boolean, url: string, error: string}
 */
function createPDFQuote(quoteData) {
  try {
    // Step 1: Open the template spreadsheet
    const templateSS = SpreadsheetApp.openById(PDF_TEMPLATE_ID);
    const templateSheet = templateSS.getSheetByName(TEMPLATE_TAB_NAME);

    if (!templateSheet) {
      throw new Error('Template tab "' + TEMPLATE_TAB_NAME + '" not found');
    }

    // Step 2: Copy template to a new temporary sheet
    const tempSheetName = 'TEMP_' + quoteData.quoteNumber + '_' + new Date().getTime();
    const tempSheet = templateSheet.copyTo(templateSS);
    tempSheet.setName(tempSheetName);

    // Step 3: Populate cells with quote data
    populateCells(tempSheet, quoteData);

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

  // Calculate valid until date (30 days from quote date)
  const quoteDateObj = new Date(quoteData.quoteDate);
  quoteDateObj.setDate(quoteDateObj.getDate() + 30);
  const validUntil = formatDate(quoteDateObj);

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
  let termYearSavings;
  let termYears;
  if (months === 36) {
    termYearSavings = termData.netSavings3Year;
    termYears = 3;
  } else if (months === 60) {
    termYearSavings = termData.netSavings5Year;
    termYears = 5;
  } else if (months === 72) {
    termYearSavings = termData.netSavings6Year;
    termYears = 6;
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
  const templateSheet = templateSS.getSheetByName(TEMPLATE_TAB_NAME);

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
