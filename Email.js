// EMAIL.JS - Email Delivery Engine
// PSI Quote Tool - Phase C Step 13 (Updated Phase D)
//
// This file handles sending quote emails:
// 1. Email to customer with PDF attachment (CC to rep)
// 2. Separate notification email to admin
// 3. Logging quote to QuoteLog tab (added in Phase D)

// Configuration - Spreadsheet ID for reading admin email from Settings
const EMAIL_SPREADSHEET_ID = '1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw';

// Default admin email (fallback if not found in Settings)
const DEFAULT_ADMIN_EMAIL = 'mboyerchurch@gmail.com';

/**
 * Get admin email from Settings tab
 * @returns {string} - Admin email address
 */
function getAdminEmailFromSettings() {
  try {
    const ss = SpreadsheetApp.openById(EMAIL_SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Settings');
    const data = sheet.getDataRange().getValues();

    for (let i = 0; i < data.length; i++) {
      const firstCell = String(data[i][0]).toLowerCase().trim();
      if (firstCell === 'adminemail' || firstCell === 'admin email' || firstCell === 'admin_email') {
        return data[i][1] || DEFAULT_ADMIN_EMAIL;
      }
    }
    return DEFAULT_ADMIN_EMAIL;
  } catch (error) {
    Logger.log('Error reading admin email from Settings: ' + error.toString());
    return DEFAULT_ADMIN_EMAIL;
  }
}

/**
 * Main entry point - sends quote emails
 * @param {Object} emailData - Email data from frontend
 * @returns {Object} - {success: boolean, error: string}
 */
function sendQuoteEmails(emailData) {
  try {
    // Get the PDF file from Drive
    const pdfFile = DriveApp.getFileById(emailData.pdfFileId);
    const pdfBlob = pdfFile.getBlob();

    // Send Email 1: To customer, CC rep
    sendCustomerEmail(emailData, pdfBlob);

    // Send Email 2: To admin (separate notification)
    sendAdminNotification(emailData, pdfBlob);

    // Log quote to QuoteLog tab (Phase D addition)
    logQuoteAfterSend(emailData);

    return {
      success: true
    };

  } catch (error) {
    Logger.log('Email error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Log quote to QuoteLog tab after successful email send
 * @param {Object} emailData - Email data containing quote info
 */
function logQuoteAfterSend(emailData) {
  try {
    // Prepare quote data for logging
    const quoteData = {
      companyName: emailData.companyName,
      quoteNumber: emailData.quoteNumber,
      quoteDate: emailData.quoteDate,
      customerCompany: emailData.customerCompany,
      repName: emailData.repName,
      totalEquipment: emailData.totalEquipment,
      avgSavingsPercent: emailData.avgSavingsPercent || 0,
      totalPanelsMeters: emailData.totalPanelsMeters || 0,
      grossMonthlySavings: emailData.grossMonthlySavings || 0,
      pdfFileId: emailData.pdfFileId
    };

    // Call the logging function from History.js
    const result = logQuoteToHistory(quoteData);

    if (result.success) {
      Logger.log('Quote logged to history: ' + emailData.quoteNumber);
    } else {
      Logger.log('Failed to log quote: ' + result.error);
    }
  } catch (error) {
    // Don't fail the email send if logging fails
    Logger.log('Error logging quote (non-fatal): ' + error.toString());
  }
}

/**
 * Sends the quote email to the customer with PDF attachment
 * @param {Object} emailData - Email data from frontend
 * @param {Blob} pdfBlob - PDF file blob
 */
function sendCustomerEmail(emailData, pdfBlob) {
  // Build the HTML email body (convert plain text to HTML with line breaks)
  const htmlBody = emailData.body.replace(/\n/g, '<br>');

  // Send email to customer
  GmailApp.sendEmail(
    emailData.to,           // To: Customer email
    emailData.subject,       // Subject
    emailData.body,          // Plain text body
    {
      cc: emailData.cc,      // CC: Rep email
      htmlBody: htmlBody,    // HTML body with proper line breaks
      attachments: [pdfBlob],
      name: emailData.companyName,  // From name (Tune Energy or Exact Water)
      replyTo: emailData.repEmail   // Reply-To: Rep's email
    }
  );

  Logger.log('Customer email sent to: ' + emailData.to + ' (CC: ' + emailData.cc + ')');
}

/**
 * Sends notification email to admin (separate from customer email)
 * @param {Object} emailData - Email data from frontend
 * @param {Blob} pdfBlob - PDF file blob
 */
function sendAdminNotification(emailData, pdfBlob) {
  // Get admin email from Settings (dynamic, configurable via Admin Panel)
  const adminEmail = getAdminEmailFromSettings();

  // Build admin notification subject
  const adminSubject = 'New Quote Sent: ' + emailData.companyName + ', ' + emailData.repName + ', ' + emailData.customerCompany;

  // Format currency
  const equipmentFormatted = '$' + Math.round(emailData.totalEquipment).toLocaleString('en-US');

  // Build admin notification body
  const adminBody = `
A new quote has been sent to a customer.

QUOTE DETAILS
─────────────────────────────────
Quote Number: ${emailData.quoteNumber}
Quote Date: ${emailData.quoteDate}
Brand: ${emailData.companyName}

CUSTOMER INFORMATION
─────────────────────────────────
Company: ${emailData.customerCompany}
Contact: ${emailData.customerContact}
Email: ${emailData.to}

REP INFORMATION
─────────────────────────────────
Name: ${emailData.repName}
Email: ${emailData.repEmail}

QUOTE SUMMARY
─────────────────────────────────
Total Equipment Financed: ${equipmentFormatted}
Number of Locations: ${emailData.locationCount}

─────────────────────────────────
The PDF quote is attached to this email.
This is an automated notification from the PSI Quote Tool.
`.trim();

  // Build HTML version for better formatting
  const adminHtmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <h2 style="color: #0066CC; margin-bottom: 20px;">New Quote Sent</h2>

  <h3 style="color: #333; border-bottom: 2px solid #0066CC; padding-bottom: 5px;">Quote Details</h3>
  <table style="margin-bottom: 20px;">
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Quote Number:</td><td>${emailData.quoteNumber}</td></tr>
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Quote Date:</td><td>${emailData.quoteDate}</td></tr>
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Brand:</td><td>${emailData.companyName}</td></tr>
  </table>

  <h3 style="color: #333; border-bottom: 2px solid #0066CC; padding-bottom: 5px;">Customer Information</h3>
  <table style="margin-bottom: 20px;">
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Company:</td><td>${emailData.customerCompany}</td></tr>
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Contact:</td><td>${emailData.customerContact}</td></tr>
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Email:</td><td><a href="mailto:${emailData.to}">${emailData.to}</a></td></tr>
  </table>

  <h3 style="color: #333; border-bottom: 2px solid #0066CC; padding-bottom: 5px;">Rep Information</h3>
  <table style="margin-bottom: 20px;">
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Name:</td><td>${emailData.repName}</td></tr>
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Email:</td><td><a href="mailto:${emailData.repEmail}">${emailData.repEmail}</a></td></tr>
  </table>

  <h3 style="color: #333; border-bottom: 2px solid #0066CC; padding-bottom: 5px;">Quote Summary</h3>
  <table style="margin-bottom: 20px;">
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Total Equipment Financed:</td><td>${equipmentFormatted}</td></tr>
    <tr><td style="padding: 5px 15px 5px 0; font-weight: bold;">Number of Locations:</td><td>${emailData.locationCount}</td></tr>
  </table>

  <hr style="border: 1px solid #ddd; margin: 20px 0;">
  <p style="color: #666; font-size: 12px;">The PDF quote is attached to this email.<br>This is an automated notification from the PSI Quote Tool.</p>
</div>
`.trim();

  // Send admin notification
  GmailApp.sendEmail(
    adminEmail,
    adminSubject,
    adminBody,
    {
      htmlBody: adminHtmlBody,
      attachments: [pdfBlob],
      name: 'PSI Quote Tool'
    }
  );

  Logger.log('Admin notification sent to: ' + adminEmail);
}

/**
 * Run this FIRST to authorize Gmail permissions
 * Run from Apps Script editor: Run > authorizeGmail
 */
function authorizeGmail() {
  // This triggers the Gmail authorization prompt
  var drafts = GmailApp.getDrafts();
  Logger.log('Gmail authorization successful! Found ' + drafts.length + ' drafts.');
  Logger.log('You can now use the email feature in the web app.');
}

/**
 * Test function for email sending
 * Run from Apps Script editor: Run > testEmailSending
 */
function testEmailSending() {
  const testEmailData = {
    to: 'test@example.com',
    cc: 'rep@example.com',
    subject: 'Test Quote Email',
    body: 'This is a test email body.',
    pdfFileId: '', // Would need a real file ID
    pdfFileName: 'Test_Quote.pdf',
    customerCompany: 'Test Company',
    customerContact: 'John Doe',
    repName: 'Jane Rep',
    repEmail: 'rep@example.com',
    companyName: 'Tune Energy',
    quoteNumber: 'TUNE-00001',
    quoteDate: '1/19/2026',
    totalEquipment: 50000,
    locationCount: 2
  };

  Logger.log('Test email data prepared.');
  Logger.log('To test actual sending, provide a valid pdfFileId and uncomment the sendQuoteEmails call.');
  // Uncomment to test: const result = sendQuoteEmails(testEmailData);
  // Logger.log('Result: ' + JSON.stringify(result));
}
