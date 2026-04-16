// HISTORY.JS - Public Quote History Backend Functions
// PSI Quote Tool - Phase D
//
// This file handles public (no auth required) quote history views:
// - Tune quote history (filtered by brand)
// - OTTS (On Track Technology Solutions) quote history (filtered by brand)
//   Note: legacy "Exact Water" QuoteLog rows are visible only under All Brands view.
// - PDF download URL retrieval
//
// NOTE: This is READ-ONLY. No editing capability.

// Configuration
const HISTORY_SPREADSHEET_ID = '1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw';

// ============================================
// QUOTE HISTORY BY BRAND
// ============================================

/**
 * Get quote history filtered by brand
 * @param {string} brand - 'TUNE' or 'OTTS'
 * @returns {Object} - {success: boolean, quotes: Array}
 */
function getQuoteHistoryByBrand(brand) {
  try {
    const ss = SpreadsheetApp.openById(HISTORY_SPREADSHEET_ID);
    const sheet = ss.getSheetByName('QuoteLog');

    if (!sheet) {
      return {
        success: true,
        quotes: [],
        message: 'No quotes logged yet'
      };
    }

    const data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return { success: true, quotes: [], message: 'No quotes logged yet' };
    }

    // Normalize brand for comparison.
    // 'OTTS' matches new On Track Technology Solutions quotes only.
    // Legacy "Exact Water" QuoteLog rows are excluded from the OTTS filter
    // (per plan: historical rows viewable under All Brands in admin panel).
    const brandUpper = brand.toUpperCase();
    const brandNames = {
      'TUNE': ['TUNE', 'TUNE ENERGY'],
      'OTTS': ['OTTS', 'ON TRACK TECHNOLOGY SOLUTIONS']
    };
    const matchBrands = brandNames[brandUpper] || [brandUpper];

    const quotes = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0] && !row[1]) continue;

      // Check if this quote matches the requested brand
      const quoteBrand = String(row[0]).toUpperCase().trim();
      const isMatch = matchBrands.some(b => quoteBrand.includes(b));

      if (isMatch) {
        // Columns: Brand, QuoteNumber, QuoteDate, QuoteExpires, CustomerName,
        //          CustomerContact, CustomerEmail, RepName, EquipmentFinanced,
        //          GrossSavingsPercent, PDFFileID
        quotes.push({
          brand: row[0] || '',
          quoteNumber: row[1] || '',
          quoteDate: row[2] ? formatHistoryDate(row[2]) : '',
          expiresDate: row[3] ? formatHistoryDate(row[3]) : '',
          customerName: row[4] || '',
          customerContact: row[5] || '',
          customerEmail: row[6] || '',
          repName: row[7] || '',
          equipmentFinanced: row[8] || 0,
          savingsPercent: row[9] || 0,
          pdfFileId: row[10] || ''
        });
      }
    }

    return { success: true, quotes: quotes };

  } catch (error) {
    Logger.log('getQuoteHistoryByBrand error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Format date for display
 */
function formatHistoryDate(date) {
  if (!date) return '';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return String(date);
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
  } catch (e) {
    return String(date);
  }
}

/**
 * Get PDF download URL by file ID (public access)
 * @param {string} fileId - Google Drive file ID
 * @returns {Object} - {success: boolean, url: string}
 */
function getHistoryPDFUrl(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    return {
      success: true,
      url: file.getDownloadUrl(),
      fileName: file.getName()
    };
  } catch (error) {
    Logger.log('getHistoryPDFUrl error: ' + error.toString());
    return { success: false, error: 'Could not find PDF file' };
  }
}

// ============================================
// QUOTE LOGGING (called from Email.js)
// ============================================

/**
 * Log a quote to the QuoteLog tab
 * Called after successful email send
 * @param {Object} quoteData - Quote data to log
 * @returns {Object} - {success: boolean}
 */
function logQuoteToHistory(quoteData) {
  try {
    const ss = SpreadsheetApp.openById(HISTORY_SPREADSHEET_ID);
    let sheet = ss.getSheetByName('QuoteLog');

    // Create QuoteLog tab if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('QuoteLog');
      // Add headers
      sheet.getRange(1, 1, 1, 11).setValues([[
        'Brand',
        'QuoteNumber',
        'QuoteDate',
        'QuoteExpires',
        'CustomerName',
        'CustomerContact',
        'CustomerEmail',
        'RepName',
        'EquipmentFinanced',
        'GrossSavingsPercent',
        'PDFFileID'
      ]]);
      // Format header row
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Get valid until days from Settings
    let validUntilDays = 30; // Default
    try {
      const settingsSheet = ss.getSheetByName('Settings');
      if (settingsSheet) {
        const settingsData = settingsSheet.getDataRange().getValues();
        for (let i = 0; i < settingsData.length; i++) {
          const firstCell = String(settingsData[i][0]).toLowerCase().trim();
          if (firstCell === 'validuntildays' || firstCell === 'valid until days') {
            validUntilDays = parseInt(settingsData[i][1]) || 30;
            break;
          }
        }
      }
    } catch (e) {
      Logger.log('Could not read validUntilDays, using default: ' + e.toString());
    }

    // Calculate expiration date
    const quoteDate = new Date(quoteData.quoteDate);
    const expiresDate = new Date(quoteDate);
    expiresDate.setDate(expiresDate.getDate() + validUntilDays);

    // Append new row
    // Columns: Brand, QuoteNumber, QuoteDate, QuoteExpires, CustomerName,
    //          CustomerContact, CustomerEmail, RepName, EquipmentFinanced,
    //          GrossSavingsPercent, PDFFileID
    const newRow = [
      quoteData.companyName || quoteData.brand || '',
      quoteData.quoteNumber || '',
      quoteData.quoteDate || '',
      formatHistoryDate(expiresDate),
      quoteData.customerCompany || '',
      quoteData.customerContact || '',
      quoteData.customerEmail || '',
      quoteData.repName || '',
      quoteData.totalEquipment || 0,
      quoteData.avgSavingsPercent || 0,
      quoteData.pdfFileId || ''
    ];

    sheet.appendRow(newRow);

    return { success: true };

  } catch (error) {
    Logger.log('logQuoteToHistory error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

// ============================================
// TEST FUNCTIONS
// ============================================

function testGetTuneHistory() {
  const result = getQuoteHistoryByBrand('TUNE');
  Logger.log('Tune quotes: ' + JSON.stringify(result));
}

function testGetOTTSHistory() {
  const result = getQuoteHistoryByBrand('OTTS');
  Logger.log('OTTS quotes: ' + JSON.stringify(result));
}

function testLogQuote() {
  const testData = {
    companyName: 'Tune Energy',
    quoteNumber: 'TUNE-99999',
    quoteDate: '1/20/2026',
    customerCompany: 'Test Company',
    customerContact: 'John Doe',
    customerEmail: 'john@testcompany.com',
    repName: 'Test Rep',
    totalEquipment: 50000,
    avgSavingsPercent: 15,
    pdfFileId: 'test-file-id'
  };

  const result = logQuoteToHistory(testData);
  Logger.log('Log result: ' + JSON.stringify(result));
}
