// ADMIN.JS - Admin Panel Backend Functions
// PSI Quote Tool - Phase D
//
// This file handles admin-only functionality:
// 1. Authentication and access control
// 2. Rate factor management (CRUD)
// 3. Settings management (valid until days, admin email)
// 4. View ALL quotes (both brands combined)

// Configuration
const ADMIN_SPREADSHEET_ID = '1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw';

// Authorized admin emails (lowercase for comparison)
const ALLOWED_ADMINS = [
  'psiquotetool@gmail.com',
  'mboyerchurch@gmail.com'
  // Add additional admin emails here as needed
];

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Check if current user is authorized admin
 * @returns {Object} - {authorized: boolean, email: string}
 */
function checkAdminAuth() {
  try {
    const user = Session.getActiveUser().getEmail();
    const isAuthorized = ALLOWED_ADMINS.includes(user.toLowerCase());

    return {
      authorized: isAuthorized,
      email: user
    };
  } catch (error) {
    Logger.log('Auth check error: ' + error.toString());
    return {
      authorized: false,
      email: '',
      error: error.toString()
    };
  }
}

// ============================================
// RATE FACTOR MANAGEMENT
// ============================================

/**
 * Get current rate factors from Settings tab
 * @returns {Object} - Rate factor data organized by tier
 */
function getRateFactors() {
  try {
    const ss = SpreadsheetApp.openById(ADMIN_SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Settings');
    const data = sheet.getDataRange().getValues();

    // Expected structure in Settings tab:
    // Row 1: Headers (Tier, 36-Month, 60-Month, 72-Month)
    // Row 2: Tier 1 data
    // Row 3: Tier 2 data
    // Row 4: Tier 3 data

    const rateFactors = {
      tier1: { rate36: null, rate60: null, rate72: null },
      tier2: { rate36: null, rate60: null, rate72: null },
      tier3: { rate36: null, rate60: null, rate72: null }
    };

    // Find rate factor rows
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const firstCell = String(row[0]).toLowerCase().trim();

      if (firstCell === '1' || firstCell === 'tier 1' || firstCell === 'tier1') {
        rateFactors.tier1.rate36 = row[1] || null;
        rateFactors.tier1.rate60 = row[2] || null;
        rateFactors.tier1.rate72 = row[3] || null;
      } else if (firstCell === '2' || firstCell === 'tier 2' || firstCell === 'tier2') {
        rateFactors.tier2.rate36 = row[1] || null;
        rateFactors.tier2.rate60 = row[2] || null;
        rateFactors.tier2.rate72 = row[3] || null;
      } else if (firstCell === '3' || firstCell === 'tier 3' || firstCell === 'tier3') {
        rateFactors.tier3.rate36 = row[1] || null;
        rateFactors.tier3.rate60 = row[2] || null;
        rateFactors.tier3.rate72 = row[3] || null;
      }
    }

    return {
      success: true,
      rateFactors: rateFactors
    };

  } catch (error) {
    Logger.log('getRateFactors error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Update rate factors in Settings tab
 * @param {Object} newRates - New rate factor values
 * @returns {Object} - {success: boolean, error: string}
 */
function updateRateFactors(newRates) {
  try {
    // Validate all rate factors first
    const validationError = validateRateFactors(newRates);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const ss = SpreadsheetApp.openById(ADMIN_SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Settings');
    const data = sheet.getDataRange().getValues();

    // Find and update rate factor rows
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const firstCell = String(row[0]).toLowerCase().trim();

      if (firstCell === '1' || firstCell === 'tier 1' || firstCell === 'tier1') {
        if (newRates.tier1.rate36 !== null && newRates.tier1.rate36 !== '') {
          sheet.getRange(i + 1, 2).setValue(parseFloat(newRates.tier1.rate36));
        }
        if (newRates.tier1.rate60 !== null && newRates.tier1.rate60 !== '') {
          sheet.getRange(i + 1, 3).setValue(parseFloat(newRates.tier1.rate60));
        }
      } else if (firstCell === '2' || firstCell === 'tier 2' || firstCell === 'tier2') {
        if (newRates.tier2.rate36 !== null && newRates.tier2.rate36 !== '') {
          sheet.getRange(i + 1, 2).setValue(parseFloat(newRates.tier2.rate36));
        }
        if (newRates.tier2.rate60 !== null && newRates.tier2.rate60 !== '') {
          sheet.getRange(i + 1, 3).setValue(parseFloat(newRates.tier2.rate60));
        }
      } else if (firstCell === '3' || firstCell === 'tier 3' || firstCell === 'tier3') {
        if (newRates.tier3.rate60 !== null && newRates.tier3.rate60 !== '') {
          sheet.getRange(i + 1, 3).setValue(parseFloat(newRates.tier3.rate60));
        }
        if (newRates.tier3.rate72 !== null && newRates.tier3.rate72 !== '') {
          sheet.getRange(i + 1, 4).setValue(parseFloat(newRates.tier3.rate72));
        }
      }
    }

    return { success: true };

  } catch (error) {
    Logger.log('updateRateFactors error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Validate rate factor values
 * @param {Object} rates - Rate factors to validate
 * @returns {string|null} - Error message or null if valid
 */
function validateRateFactors(rates) {
  const validateRate = (value, tierName, termName) => {
    if (value === null || value === '' || value === undefined) return null;
    const num = parseFloat(value);
    if (isNaN(num)) return tierName + ' ' + termName + ' must be a number';
    if (num <= 0) return tierName + ' ' + termName + ' must be a positive number';
    if (num >= 1) return tierName + ' ' + termName + ' seems too high (should be decimal like 0.0327348)';
    return null;
  };

  // Tier 1: 36 and 60 month
  let error = validateRate(rates.tier1.rate36, 'Tier 1', '36-Month');
  if (error) return error;
  error = validateRate(rates.tier1.rate60, 'Tier 1', '60-Month');
  if (error) return error;

  // Tier 2: 36 and 60 month
  error = validateRate(rates.tier2.rate36, 'Tier 2', '36-Month');
  if (error) return error;
  error = validateRate(rates.tier2.rate60, 'Tier 2', '60-Month');
  if (error) return error;

  // Tier 3: 60 and 72 month
  error = validateRate(rates.tier3.rate60, 'Tier 3', '60-Month');
  if (error) return error;
  error = validateRate(rates.tier3.rate72, 'Tier 3', '72-Month');
  if (error) return error;

  return null;
}

// ============================================
// SETTINGS MANAGEMENT
// ============================================

/**
 * Get admin settings (valid until days, admin email)
 * @returns {Object} - Settings data
 */
function getAdminSettings() {
  try {
    const ss = SpreadsheetApp.openById(ADMIN_SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Settings');
    const data = sheet.getDataRange().getValues();

    let validUntilDays = 30;
    let adminEmail = 'mboyerchurch@gmail.com';

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const firstCell = String(row[0]).toLowerCase().trim();

      if (firstCell === 'validuntildays' || firstCell === 'valid until days' || firstCell === 'valid_until_days') {
        validUntilDays = parseInt(row[1]) || 30;
      } else if (firstCell === 'adminemail' || firstCell === 'admin email' || firstCell === 'admin_email') {
        adminEmail = row[1] || 'mboyerchurch@gmail.com';
      }
    }

    return {
      success: true,
      settings: {
        validUntilDays: validUntilDays,
        adminEmail: adminEmail
      }
    };

  } catch (error) {
    Logger.log('getAdminSettings error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Update admin settings
 * @param {Object} newSettings - {validUntilDays: number, adminEmail: string}
 * @returns {Object} - {success: boolean, error: string}
 */
function updateAdminSettings(newSettings) {
  try {
    // Validate settings
    if (newSettings.validUntilDays !== undefined) {
      const days = parseInt(newSettings.validUntilDays);
      if (isNaN(days) || days < 1 || days > 365) {
        return { success: false, error: 'Valid Until Days must be between 1 and 365' };
      }
    }

    if (newSettings.adminEmail !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newSettings.adminEmail)) {
        return { success: false, error: 'Invalid email address format' };
      }
    }

    const ss = SpreadsheetApp.openById(ADMIN_SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Settings');
    const data = sheet.getDataRange().getValues();

    let foundValidUntil = false;
    let foundAdminEmail = false;

    // Update existing settings rows
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const firstCell = String(row[0]).toLowerCase().trim();

      if (firstCell === 'validuntildays' || firstCell === 'valid until days' || firstCell === 'valid_until_days') {
        if (newSettings.validUntilDays !== undefined) {
          sheet.getRange(i + 1, 2).setValue(parseInt(newSettings.validUntilDays));
        }
        foundValidUntil = true;
      } else if (firstCell === 'adminemail' || firstCell === 'admin email' || firstCell === 'admin_email') {
        if (newSettings.adminEmail !== undefined) {
          sheet.getRange(i + 1, 2).setValue(newSettings.adminEmail);
        }
        foundAdminEmail = true;
      }
    }

    // Create settings rows if they don't exist
    const lastRow = sheet.getLastRow();

    if (!foundValidUntil && newSettings.validUntilDays !== undefined) {
      sheet.getRange(lastRow + 1, 1).setValue('ValidUntilDays');
      sheet.getRange(lastRow + 1, 2).setValue(parseInt(newSettings.validUntilDays));
    }

    if (!foundAdminEmail && newSettings.adminEmail !== undefined) {
      const newRow = !foundValidUntil ? lastRow + 2 : lastRow + 1;
      sheet.getRange(newRow, 1).setValue('AdminEmail');
      sheet.getRange(newRow, 2).setValue(newSettings.adminEmail);
    }

    return { success: true };

  } catch (error) {
    Logger.log('updateAdminSettings error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Send test email to verify admin email configuration
 * @returns {Object} - {success: boolean, error: string}
 */
function sendTestAdminEmail() {
  try {
    const settingsResult = getAdminSettings();
    if (!settingsResult.success) {
      return { success: false, error: 'Could not retrieve admin email setting' };
    }

    const adminEmail = settingsResult.settings.adminEmail;
    const subject = 'PSI Quote Tool - Test Email';
    const body = 'This is a test email from the PSI Quote Tool Admin Panel.\n\n' +
                 'If you received this email, your admin email configuration is working correctly.\n\n' +
                 'Sent: ' + new Date().toLocaleString();

    const htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px;">' +
                     '<h2 style="color: #0066CC;">PSI Quote Tool - Test Email</h2>' +
                     '<p>This is a test email from the PSI Quote Tool Admin Panel.</p>' +
                     '<p>If you received this email, your admin email configuration is working correctly.</p>' +
                     '<hr style="border: 1px solid #ddd;">' +
                     '<p style="color: #666; font-size: 12px;">Sent: ' + new Date().toLocaleString() + '</p>' +
                     '</div>';

    GmailApp.sendEmail(adminEmail, subject, body, {
      htmlBody: htmlBody,
      name: 'PSI Quote Tool'
    });

    return { success: true, sentTo: adminEmail };

  } catch (error) {
    Logger.log('sendTestAdminEmail error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

// ============================================
// ALL QUOTES VIEW (Admin Only)
// ============================================

/**
 * Get ALL quote history (both brands) for admin view
 * @returns {Object} - {success: boolean, quotes: Array}
 */
function getAllQuoteHistory() {
  try {
    const ss = SpreadsheetApp.openById(ADMIN_SPREADSHEET_ID);
    const sheet = ss.getSheetByName('QuoteLog');

    if (!sheet) {
      return {
        success: true,
        quotes: [],
        message: 'QuoteLog tab not found - no quotes logged yet'
      };
    }

    const data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return { success: true, quotes: [], message: 'No quotes logged yet' };
    }

    const quotes = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0] && !row[1]) continue;

      quotes.push({
        brand: row[0] || '',
        quoteNumber: row[1] || '',
        quoteDate: row[2] ? formatAdminDate(row[2]) : '',
        expiresDate: row[3] ? formatAdminDate(row[3]) : '',
        customerName: row[4] || '',
        repName: row[5] || '',
        equipmentFinanced: row[6] || 0,
        savingsPercent: row[7] || 0,
        panelsMeters: row[8] || 0,
        savingsPerMonth: row[9] || 0,
        pdfFileId: row[10] || ''
      });
    }

    return { success: true, quotes: quotes };

  } catch (error) {
    Logger.log('getAllQuoteHistory error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Format date for display
 */
function formatAdminDate(date) {
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
 * Get PDF download URL by file ID
 * @param {string} fileId - Google Drive file ID
 * @returns {Object} - {success: boolean, url: string}
 */
function getAdminPDFUrl(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    return {
      success: true,
      url: file.getDownloadUrl(),
      fileName: file.getName()
    };
  } catch (error) {
    Logger.log('getAdminPDFUrl error: ' + error.toString());
    return { success: false, error: 'Could not find PDF file' };
  }
}

// ============================================
// SETUP FUNCTIONS
// ============================================

/**
 * One-time setup: Initialize Settings tab with ValidUntilDays and AdminEmail
 * Run this function once from Apps Script editor: Run > initializeAdminSettings
 */
function initializeAdminSettings() {
  const result = updateAdminSettings({
    validUntilDays: 30,
    adminEmail: 'mboyerchurch@gmail.com'
  });

  if (result.success) {
    Logger.log('Settings initialized successfully!');
    Logger.log('- ValidUntilDays: 30');
    Logger.log('- AdminEmail: mboyerchurch@gmail.com');
    Logger.log('You can now modify these values in the Admin Panel.');
  } else {
    Logger.log('Error initializing settings: ' + result.error);
  }

  return result;
}

/**
 * One-time setup: Create QuoteLog tab if it doesn't exist
 * Run this function once from Apps Script editor: Run > initializeQuoteLog
 */
function initializeQuoteLog() {
  try {
    const ss = SpreadsheetApp.openById(ADMIN_SPREADSHEET_ID);
    let sheet = ss.getSheetByName('QuoteLog');

    if (!sheet) {
      sheet = ss.insertSheet('QuoteLog');

      // Set up header row
      const headers = [
        'Brand', 'Quote #', 'Quote Date', 'Expires', 'Customer',
        'Rep', 'Equipment Financed', 'Savings %', 'Panels/Meters',
        'Savings/Month', 'PDF File ID'
      ];

      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);

      Logger.log('QuoteLog tab created successfully with headers!');
    } else {
      Logger.log('QuoteLog tab already exists.');
    }

    return { success: true };

  } catch (error) {
    Logger.log('Error creating QuoteLog: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Run all setup functions at once
 * Run from Apps Script editor: Run > runFullSetup
 */
function runFullSetup() {
  Logger.log('=== Running Full Phase D Setup ===');
  Logger.log('');

  Logger.log('Step 1: Initializing Admin Settings...');
  initializeAdminSettings();
  Logger.log('');

  Logger.log('Step 2: Creating QuoteLog tab...');
  initializeQuoteLog();
  Logger.log('');

  Logger.log('=== Setup Complete ===');
  Logger.log('You can now access:');
  Logger.log('- Admin Panel: [your-web-app-url]?admin=true');
  Logger.log('- Tune History: [your-web-app-url]?history=tune');
  Logger.log('- Exact History: [your-web-app-url]?history=exact');
}

// ============================================
// TEST FUNCTIONS
// ============================================

function testAdminAuth() {
  const result = checkAdminAuth();
  Logger.log('Auth result: ' + JSON.stringify(result));
}

function testGetRateFactors() {
  const result = getRateFactors();
  Logger.log('Rate factors: ' + JSON.stringify(result));
}

function testGetAdminSettings() {
  const result = getAdminSettings();
  Logger.log('Admin settings: ' + JSON.stringify(result));
}

function testGetAllQuoteHistory() {
  const result = getAllQuoteHistory();
  Logger.log('All quotes: ' + JSON.stringify(result));
}
