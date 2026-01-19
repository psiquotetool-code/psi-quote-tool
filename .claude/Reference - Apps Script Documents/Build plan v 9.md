PSI Quote Tool - Milestone 2 Build Plan
Web-Based Data Entry System

Version: 2.2 | Created: December 23, 2025 | Updated: January 16, 2026 | Spec Reference: Quote-Tool-Specification-v3.4

═══════════════════════════════════════════════════════════════════════════════

1. Build Approach Overview

This build follows a phased approach: get core functionality working first, then add styling, then PDF generation, then admin functionality.

Architecture Note: After discovering that Apps Script template processing only works on fresh page loads (document.write doesn't work for passing data between screens), we implemented a single-page app architecture using show/hide divs. All three screens are in one Index.html file, with data persisting via JavaScript variables throughout the user session.

═══════════════════════════════════════════════════════════════════════════════

2. File Structure

Single-page app architecture with backend logic in .gs files.

Files:
✓ Code.gs - Backend functions (quote numbers, includes)
✓ Calculations.gs - Financial calculation engine
✓ Index.html - Complete UI (all 3 screens + JavaScript)
✓ Styles.html - CSS stylesheet (900+ lines, organized into 10 sections)

Google Sheet Integration:
✓ Spreadsheet ID: 1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw
✓ Tabs: Settings (rate factors), QuoteNumbers (tracking), QuoteLog (history)

═══════════════════════════════════════════════════════════════════════════════

3. Phase A: Core Functionality

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: Project Setup ✓ COMPLETE

□ Created Apps Script project
□ Set up file structure (Code.gs, Calculations.gs, Index.html, Styles.html)
□ Configured doGet() for web app deployment
□ Added include() function for loading Styles.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 2: Screen 1 - Quote Setup ✓ COMPLETE

□ Created basic form layout in Index.html
□ Added brand detection (TUNE vs EXACT via URL parameter)
□ Auto-generated fields: Quote Date, Quote Number
□ User input fields: Rep info (name, phone, email), Customer info (company, contact, phone, email)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 3: Data Storage Setup ✓ COMPLETE

□ Created Google Sheet with three tabs:
  - Settings (rate factors by tier)
  - QuoteNumbers (separate sequences for TUNE and EXACT, starting at 01000)
  - QuoteLog (quote history - placeholder for Phase D)
□ Implemented getNextQuoteNumber() function
□ Added auto-increment logic with 5-digit padding

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 4: Screen 1 Functionality ✓ COMPLETE

□ Implemented goToScreen2() navigation
□ Added comprehensive validation:
  - All fields required
  - Email format validation
  - Phone format validation (10 digits)
□ Added phone auto-formatting (XXX-XXX-XXXX on blur)
□ Screen switching via show/hide divs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 5: Screen 2 - Location Entry ✓ COMPLETE

□ Created dynamic table for location entry
□ Implemented addLocationRow() - unlimited locations supported
□ Added removeRow() with renumbering
□ Dynamic field labels based on brand (Panels vs Meters)
□ Real-time input formatting:
  - Currency fields: format on blur, remove format on focus
  - Percent fields: add % on blur, remove on focus
  - Number fields: comma formatting while typing
□ Comprehensive field validation with specific error messages
□ "Start Over" button (clears locations, preserves rep/customer info)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 6: Calculations Engine ✓ COMPLETE

□ Built calculateQuote() in Calculations.gs
□ Portfolio totaling: equipment cost, monthly spend, panels/meters
□ Average savings percentage calculation
□ Tier determination based on total equipment:
  - Tier 1: < $100k (36/60 month options)
  - Tier 2: $100k - $500k (36/60 month options)
  - Tier 3: ≥ $500k (60/72 month options)
□ Rate factors (7 decimal precision):
  - Tier 1: 36mo=0.0327348, 60mo=0.0211993
  - Tier 2: 36mo=0.0327439, 60mo=0.0213861
  - Tier 3: 60mo=0.0208989, 72mo=0.0180061
□ Term calculations: 36-month, 60-month, 72-month
□ ROI calculations: Monthly, 3/5/6-year, 10-year
□ Test function validates against Excel model

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 7: Quote Preview ✓ COMPLETE

□ Screen 3: Quote Preview implementation
□ Dynamic term display (36/60 for Tiers 1-2, 60/72 for Tier 3)
□ Two-column layout matching template
□ Financial comparison tables with proper formatting
□ Negative cash flow warning (toast message when payment > savings)
□ Currency formatting: $X,XXX (no decimals)
□ Percentage formatting: XX% (no decimals)
□ Navigation: Back to Screen 2 to edit

Bug Fix (Step 7): Fixed roi3Year calculation in Calculations.gs - was incorrectly returning roi5Year variable. Updated to use roi3Year for accurate 36-month term ROI.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Phase A Complete! All core functionality is working and validated.

═══════════════════════════════════════════════════════════════════════════════

4. Phase B: Styling & Polish

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 8: Screen 1 Professional Styling ✓ COMPLETE

□ Added CSS variables for brand colors and spacing
□ Styled app header with brand colors
□ Created card-based layout for form sections
□ Professional button styling with hover effects
□ Responsive form groups (horizontal and wide-label layouts)
□ Input field styling with focus states
□ Quote metadata display bar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 9: Screen 2 Professional Styling ✓ COMPLETE

□ Wider container for table layout (1100px)
□ Professional table styling with hover effects
□ Styled header matching Screen 1
□ Color-coded buttons (Add=green, Remove=red, Navigation=blue/gray)
□ Clean input field styling within table cells
□ Responsive table with fixed column widths

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 10: Screen 3 Professional Styling ✓ COMPLETE

COMPLETED ITEMS:

□ Quote header section with dynamic brand name and title
□ Two-column layout (45% left, 55% right) matching Google Sheets template
□ Info boxes with proper borders and spacing
□ Box headers with brand-specific colors:
  - Blue (#0000ff): "Rental Quote Presented To", "Presented by [Brand]"
  - Teal (#007d7d): "Quote Highlights", "Sites in this Quote", "Rental Term Options"
□ Quote Highlights box styling:
  - Blue text (#0000ff)
  - Light blue backgrounds (#d9edff)
  - Labels left-aligned, values centered
  - 12px bold font
□ Sites table with 40 fixed rows:
  - Actual locations populate first
  - Remaining rows filled with empty placeholders
  - All rows have consistent #d9edff background
  - Creates balanced, professional appearance
□ Financial comparison tables:
  - Term headers: Blue background (#3978b8) with yellow text (#ffff00)
  - Table headers: Light blue (#7fd0fc)
  - Table rows: Light blue (#d9edff)
  - Compact spacing matching Google Sheets standard (~18-21px row height)
  - Full cell borders (1px solid #d0d0d0)
□ Compact styling throughout:
  - Reduced padding (3-6px typical)
  - Dotted borders (1px dotted #d0d0d0) between elements
  - Font sizes: 10-14px depending on element
  - Tight line heights for space efficiency
□ Dynamic term display (36/60 vs 60/72 based on equipment tier)
□ ROI metrics with footnotes (update dynamically based on term)
□ Metadata box with Date, Quote #, Valid Until (30 days calculation)

STYLING FIXES COMPLETED:

□ Fixed border display issues:
  - Removed duplicate CSS rules causing double-thick borders
  - Simplified border logic: cells have bottom borders throughout
  - Box outer border provides final containment
  - Result: Clean single-pixel borders everywhere
□ Removed white space between rows and box borders:
  - Set .box-content padding to 0px
  - Rows now touch box edges with no gaps
□ CSS organization:
  - 900+ lines organized into 10 collapsible sections
  - Clear comments marking each section
  - Easy to navigate and maintain

TESTING IMPROVEMENTS:

□ Added dummy data for faster testing:
  - Screen 1: customerCompany auto-filled with "ABC Solar Corporation"
  - Screen 2: First location row auto-fills with test data:
    * Address: "123 Main Street, Irvine CA"
    * Utility: "SCE"
    * Monthly Spend: 8630
    * Equipment Cost: 17000
    * Savings %: 10
    * Panels/Meters: 13
  - Significantly speeds up testing workflow

COMPLETED SINCE BUILD PLAN v1.9:

✓ Logo display implementation:
  - Base64 embedding implemented for both Tune and Exact logos
  - Logos display correctly without CORS issues
  - Exact Water header gets blue background dynamically
✓ Steve sign-off received on Phase B styling

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 11: Final Polish & Refinement ✓ COMPLETE

✓ Logo implementation finalized (base64)
✓ Steve sign-off received on Milestone 2 / Phase B
□ Cross-browser testing (deferred - primary browser working)
□ Mobile responsiveness (deferred - desktop-focused tool)
□ Print-friendly CSS (will be addressed in Phase C with PDF generation)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Phase B Complete! Steve approved Milestone 2 styling. Ready for Phase C.

═══════════════════════════════════════════════════════════════════════════════

5. Phase C: PDF Generation & Email Delivery (IN PROGRESS)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

APPROACH HISTORY:

❌ ABANDONED: HTML to Blob Direct Conversion
Why it was abandoned:
- Background colors DO NOT render in Google's HTML-to-PDF converter
- Tried CSS classes with background-color - FAILED
- Tried CSS with !important - FAILED
- Tried inline styles on every element - FAILED
- Google's converter fundamentally does not support background colors reliably
- PDF Output V1-V4 all had missing backgrounds (see .claude/PDF Refinement/)

✅ SELECTED: Google Sheets Template-Based PDF Generation
Why this approach:
- Pre-formatted Google Sheets preserve ALL styling when exported to PDF
- Background colors, borders, fonts all render correctly
- User already created the layout in Google Sheets (proof it works)
- Native Google service, no external APIs needed
- Clean workflow: copy template → populate cells → export PDF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 12: PDF Generation (IN PROGRESS - 90% COMPLETE)

Google Sheets Resources:
- PDF Template Sheet ID: 1leM4TF00VjJ9Y9DBv_KqOJeJJAwy6ONp21Rvh-m6PGw
- Tab to use: "Dec 2 Version"
- Template has 37 rows in sites table

COMPLETED (January 16, 2026):
✓ PDF.js completely rewritten with Google Sheets template approach
✓ Cell mapping completed from 5 zoomed-in screenshots
✓ testPDFGeneration() works - PDF generates with test data
✓ OAuth scopes updated (added script.external_request permission)
✓ Index.html generatePDF() already wired correctly to pass quoteData

BLOCKING ISSUE - RESOLVED (January 19, 2026):
✅ Added roi6Year calculation to Calculations.js for 72-month term

What was changed in calculate72Month() function:
- Removed incorrect roi5Year calculation (spec item AQ was mislabeled)
- Added correct roi6Year calculation: netSavings6Year / (monthlyPayment * 72)
- Updated return object to return roi6Year instead of roi5Year
- Added detailed comments for traceability (lines 221-226)

The ROI pattern for all terms:
- 36-month: roi3Year = netSavings3Year / (monthlyPayment * 36)
- 60-month: roi5Year = netSavings5Year / (monthlyPayment * 60)
- 72-month: roi6Year = netSavings6Year / (monthlyPayment * 72)

Files Modified:
✓ PDF.js - Complete rewrite (525 lines)
✓ appsscript.json - Added script.external_request OAuth scope
✓ Calculations.js - Added roi6Year calculation (1/19/2026)

PDF.js Function Structure (IMPLEMENTED):
```
PDF.js
├── createPDFQuote(quoteData)        # Main entry point
├── populateCells(sheet, quoteData)  # Map quote data to cells
├── populateSitesTable(sheet, locs)  # Fill 37-row sites table
├── populateTermBlock(sheet, ...)    # Fill financial data for a term
├── populateFootnotes(sheet, ...)    # Dynamic footnotes based on term
├── exportSheetAsPDF(ss, sheet)      # Export via UrlFetchApp
├── generateFileName(quoteData)      # Create PDF filename
├── getOrCreateQuoteFolder()         # Drive folder management
├── formatNumber(num)                # Number formatting helper
├── formatDate(date)                 # Date formatting helper
├── authorizeDrive()                 # Authorization test function
├── testPDFGeneration()              # Test with sample data
└── testCellMapping()                # Verify cell references
```

Cell Mapping (COMPLETED):
```
Header/Metadata:
- I4: Date, I5: Quote #, I6: Valid Until

Customer Info:
- D9: Company, D10: Contact, D11: Email, D12: Phone

Rep Info (merged H:I cells):
- H9: Name, H10: Email, H11: Phone

Quote Highlights:
- D15: # Panels/Meters, D16: Equipment Financed
- D17: Gross Savings/Month, D18: Gross Savings %

Sites Table (37 rows):
- C22:C58: Location addresses
- D22:D58: Utility names

36-Month Term Block:
- G18-G21: Cash flow during ($ values, merged G:H)
- I19, I21: Percentage values
- G23-G26: Cash flow after
- I24, I26: Percentage values
- G28-G30: Annual savings analysis
- I28-I30: Percentage values
- H31-H33: ROI metrics (merged H:I)
- F34-F36: Footnotes (merged F:I)

60-Month Term Block:
- G40-G43: Cash flow during
- I41, I43: Percentage values
- G45-G48: Cash flow after
- I46, I48: Percentage values
- G50-G52: Annual savings analysis
- I50-I52: Percentage values
- H53-H55: ROI metrics
- F56-F58: Footnotes
```

Reference Files (in .claude/PDF Refinement/):
- Zoom in Screenshot #1.jpg through #5.jpg - Detailed cell mapping reference
- Google Sheets Exported to PDF.pdf - Target output (colors work!)
- Screen 3.jpg - Web app layout for comparison

Remaining Tasks:
✓ Fix Calculations.js - Add roi6Year for 72-month term (DONE 1/19/2026)
✓ Test with actual quote data (not just test function) (DONE 1/19/2026)
✓ Test Tier 3 quote (60/72 month terms) to verify roi6Year works (DONE 1/19/2026)
✓ Fix dynamic labels in Index.html for 72-month terms (DONE 1/19/2026)
✓ Fix dynamic labels in PDF.js for Tier 3 PDFs (DONE 1/19/2026)
✓ Add SpreadsheetApp.flush() before PDF export (DONE 1/19/2026)
✓ Add loading spinner overlay for PDF generation (DONE 1/19/2026)
✓ Test Tier 1, 2, and 3 - All working (DONE 1/19/2026)
□ Test both brands (Tune Energy, Exact Water) - FUTURE

File Naming: Quote_[CustomerName]_[QuoteNumber]_[Date].pdf

Brand Handling: Currently using Tune template - may need Exact Water template tab later

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 13: Email Delivery (PLANNED)

□ Email 1 - To Customer (editable template):
  - From: System account (Tune/Exact branding)
  - Reply-To: Rep's email
  - To: Customer email
  - CC: Rep email
  - Subject: "Your [Brand] Rental Quote - [Customer] - [Quote #]"
  - Body: Editable by rep before sending
  - Attachment: PDF quote (locked, cannot be removed)
  - "Reset to Default" button to restore template
□ Email 2 - To Steve Olsen (separate, not CC):
  - From: System account
  - To: Steve's email (admin-configurable)
  - Subject: "New Quote Sent: [Brand], [Rep], [Customer]"
  - Body: System-generated with quote details
  - Attachment: PDF quote
  - Non-editable template
□ Email sending using GmailApp or MailApp
□ Confirmation message after successful send
□ Error handling for failed sends

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 14: Post-Send Options (PLANNED)

□ Download PDF button
□ Generate another quote button
□ Exit tool option
□ Save quote record to QuoteLog tab

═══════════════════════════════════════════════════════════════════════════════

6. Phase D: Admin Panel (NOT STARTED)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 15: Admin Authentication (PLANNED)

□ Create separate admin URL/page
□ Google account authentication: psiquotetool@gmail.com
□ Access control (Matt and Steve only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 16: Rate Factor Management (PLANNED)

□ Display current rate factor table
□ Edit rate factors for all tiers and terms
□ Validation: positive numbers only
□ Save changes to Settings sheet
□ Confirmation message
□ Changes apply to future quotes only (not retroactive)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 17: Quote Valid Until Setting (PLANNED)

□ Display current "Valid Until" period (default: 30 calendar days)
□ Edit field with validation (1-365 days)
□ Save to Settings sheet
□ Changes apply to future quotes immediately

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 18: Steve's Email Configuration (PLANNED)

□ Display current email address
□ Edit field with email validation
□ Save to Settings sheet
□ Test email button (sends sample notification)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 19: Quote History View (PLANNED)

□ Read-only table showing all generated quotes
□ Columns (fixed position):
  1. Tune/Exact (brand identifier)
  2. Quote Number (clickable link to PDF)
  3. Quote Date
  4. Quote Expires (valid until date)
  5. Customer Name
  6. Rep Name
  7. Equipment Financed
  8. Gross Savings %
  9. # Panels/Meters
  10. Gross Savings Per Month
□ Column filtering capability
□ Click Quote Number to view/download PDF
□ No editing capability (read-only)
□ Sort by any column

═══════════════════════════════════════════════════════════════════════════════

7. Key Technical Learnings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITICAL: Single-Page App Architecture

Discovery: Apps Script template processing with document.write() does NOT work for passing data between screens.

Problem: When using separate HTML files for each screen and trying to pass data via template variables, data was lost when navigating between screens.

Solution: Implemented single-page app architecture - all screens in one Index.html file using show/hide divs. Data persists via JavaScript variables throughout the user session.

Implementation:
- All 3 screens in Index.html
- CSS classes: .screen (display: none) and .screen.active (display: block)
- Navigation functions toggle .active class
- Data stored in JavaScript variables and passed to backend via google.script.run

This is now the REQUIRED architecture for Apps Script web apps that need data persistence.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Calculation Bug: ROI 3-Year Variable

Bug: In calculate36Month() function, roi3Year was incorrectly returning the roi5Year variable.

Impact: 36-month term 3-year ROI was showing wrong value (5-year ROI instead).

Fix: Changed return statement to use roi3Year variable. Now correctly calculates: netSavings3Year / totalLeasePayments.

Lesson: Always test calculated values against expected results from Excel model. Variable naming must match the calculation period.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CSS Organization for Large Stylesheets

Challenge: Styles.html grew to 900+ lines, becoming difficult to navigate.

Solution: Organized CSS into 10 clearly-marked sections with comment headers:
1. CSS Variables (Brand Colors & Spacing)
2. Global Reset & Base Styles
3. Shared Components (Buttons, Cards, Forms)
4. Screen 1: Quote Setup
5. Screen 2: Location Entry
6. Screen 3: Quote Preview (Main Container & Layout)
7. Screen 3: Info Boxes (General Styles)
8. Screen 3: Specific Box Customization
9. Screen 3: Sites Table
10. Screen 3: Financial Tables

Benefits:
- Easy to find specific styles
- Can collapse sections in editor (Ctrl+Shift+[ on Windows)
- Clear separation of concerns
- Maintainable even at 900+ lines

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Border Display Issues - Duplicate CSS Rules

Problem: Info boxes showing double-thick borders on some edges.

Root Cause: Duplicate CSS rules for .info-row .label and .info-row .value (lines appeared twice in stylesheet).

Impact: Borders stacking, causing thick lines and missing bottom borders on last rows.

Fix: 
- Removed duplicate CSS rules
- Simplified border logic: cells have bottom borders throughout
- Box outer border provides final containment
- Result: Clean single-pixel borders everywhere

Lesson: Watch for copy-paste errors that create duplicate CSS rules. They can cause subtle visual bugs that are hard to track down.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Logo Implementation - Google Drive CORS Issues

Attempted: Using Google Drive URLs with uc?export=view format for logo display.

Problem: Google Drive blocks direct embedding via CORS (Cross-Origin Resource Sharing) restrictions. Images showed as failed to load (naturalWidth = 0).

Solution Prepared: Convert logos to base64 strings and embed directly in JavaScript code.

Benefits of Base64:
- No external dependencies
- No CORS issues
- No broken links ever
- Images become part of the app code
- Most reliable method for Apps Script

Status: Base64 strings prepared but not yet implemented in code. Ready for next session.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dummy Data for Faster Testing

Challenge: Testing workflow slow - entering data on every test iteration.

Solution: Added dummy data that auto-populates:
- Screen 1: customerCompany = "ABC Solar Corporation"
- Screen 2: First location auto-fills with complete test data
  * Triggers via addLocationRow(true) parameter
  * Uses realistic values matching Excel test case
  * Address: "123 Main Street, Irvine CA"
  * Utility: "SCE"
  * All numeric fields: 8630, 17000, 10%, 13

Impact: Testing speed increased dramatically. Can now test entire flow in seconds instead of minutes.

Implementation Pattern: Optional parameter controls whether to use dummy data:
```javascript
function addLocationRow(useDummyData = false) {
  const address = (useDummyData && rowNum === 1) ? 'dummy value' : '';
  // ... etc
}
```

Lesson: For development, always implement quick test data. Remove or disable before production deployment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITICAL: Google HTML-to-PDF Does NOT Render Background Colors

Discovery: Google Apps Script's HTML-to-PDF conversion (Utilities.newBlob + getAs) fundamentally does NOT support background colors.

What Was Tried:
1. CSS classes with background-color - FAILED
2. CSS with !important - FAILED
3. Inline styles on every element - FAILED
4. Table cell backgrounds - FAILED

Impact: Four PDF iterations (V1-V4) all produced PDFs with white backgrounds where colors should appear.

Root Cause: Google's HTML-to-PDF converter has limited CSS support. Background colors are simply ignored regardless of how they're specified.

Solution: Use Google Sheets template-based PDF generation instead:
- Create a pre-formatted Google Sheets template with all colors/styling
- Copy template to temp sheet
- Populate cells with data
- Export sheet as PDF (preserves all formatting)
- Delete temp sheet

Why Sheets Works: Google Sheets to PDF conversion is a different code path that properly preserves cell formatting including background colors.

Lesson: For PDF generation requiring background colors in Apps Script, always use Google Sheets templates. Do not attempt HTML-to-PDF conversion for styled documents.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fixed-Row Tables for Balanced Appearance

Design Decision: Sites table always displays 40 rows regardless of location count.

Why: Creates balanced, professional appearance even for quotes with few locations.

Implementation:
```javascript
// Add actual locations
for (let loc of results.locations) {
  html += '<tr><td>' + loc.address + '</td><td>' + loc.utility + '</td></tr>';
}

// Add empty placeholder rows to reach 40 total
const totalRows = 40;
const emptyRowsNeeded = totalRows - results.locations.length;
for (let i = 0; i < emptyRowsNeeded; i++) {
  html += '<tr class="empty-row"><td>&nbsp;</td><td>&nbsp;</td></tr>';
}
```

CSS ensures empty rows look identical to filled rows (same background color).

Result: Professional appearance with consistent layout regardless of data volume.

═══════════════════════════════════════════════════════════════════════════════

8. Testing & Quality Control

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test Cases Completed

✓ Single location quote (Tier 1: $17,000 equipment)
  - 36-month calculations validated against Excel
  - 60-month calculations validated against Excel
  - All ROI metrics match expected values

✓ Multi-location quote (tested aggregation logic)
  - Portfolio totaling working correctly
  - Average savings percentage calculated properly
  - Tier determination based on total equipment cost

✓ Tier boundary testing:
  - $99,999 → Tier 1 (36/60 options)
  - $100,000 → Tier 2 (36/60 options)
  - $499,999 → Tier 2 (36/60 options)
  - $500,000 → Tier 3 (60/72 options)

✓ Negative cash flow warning
  - Toast message displays when payment > savings
  - Quote still generates (allowed per spec)

✓ Validation testing:
  - All required fields enforced
  - Email format validation working
  - Phone number validation (10 digits)
  - Numeric field ranges enforced
  - Error messages clear and specific

✓ Navigation testing:
  - Screen 1 → Screen 2 → Screen 3 flow
  - Back navigation preserves data
  - "Start Over" clears locations only (preserves rep/customer info)

✓ Formatting testing:
  - Phone auto-formatting (XXX-XXX-XXXX)
  - Currency formatting with commas
  - Percentage formatting
  - Number formatting with commas
  - All format/unformat on focus/blur working

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Known Issues (RESOLVED)

1. Logo Display - ✅ RESOLVED
   - Base64 embedding implemented
   - Both Tune and Exact logos working

2. Metadata Box Position - ✅ RESOLVED (Accepted)
   - Current position approved by Steve in Milestone 2 sign-off

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Browser Testing Status

✓ Chrome/Chromium - Primary testing browser
□ Firefox - Not yet tested
□ Safari - Not yet tested
□ Edge - Not yet tested
□ Mobile browsers - Not yet tested

Note: Phase B Step 11 will include comprehensive browser testing.

═══════════════════════════════════════════════════════════════════════════════

9. Next Session Priorities

1. **Map Cell References** (HIGH PRIORITY - NEXT TASK)
   - Review Google Sheets Screenshot Top.jpg and Bottom.jpg
   - Document exact cell addresses for all quote data fields
   - Create mapping object in PDF.js

2. **Rewrite PDF.js for Google Sheets Approach**
   - Complete rewrite using SpreadsheetApp
   - Copy template tab, populate cells, export PDF
   - Delete temp sheet after PDF creation

3. **Test Google Sheets PDF Generation**
   - Test with various quote scenarios
   - Sync to Apps Script with clasp push
   - Verify PDF output matches Google Sheets template

4. **Update Index.html if Needed**
   - Adjust generatePDF() if data format changes
   - Add success/error handlers

═══════════════════════════════════════════════════════════════════════════════

10. Reference Documentation

Related Files:
- Quote_Tool_Code_Snapshot_Step_10_Dec_23_2025.docx (complete current code)
- Quote-Tool-Specification-v3_4.md (requirements)
- Quote_Tool_Requirements_-_Dec_2_2025.docx (detailed specs)
- Quote_Tool_Calculations__Dec_2_2025.xlsx (Excel calculation model)
- Quote_Template_Dec_2__12_PM.pdf (approved visual template)

Google Resources:
- Apps Script Project: [Link to be added when deployed]
- Google Sheet: https://docs.google.com/spreadsheets/d/1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw/edit
- Tune URL: [To be configured in deployment]
- Exact URL: [To be configured in deployment]

═══════════════════════════════════════════════════════════════════════════════

11. Session History

Version 1.8 - December 19, 2025
- Completed Phase A (Steps 1-7)
- Completed Step 8 (Screen 1 styling)
- Completed Step 9 (Screen 2 styling)
- Started Step 10 (Screen 3 styling)

Version 1.9 - December 23, 2025
- Advanced Step 10 to 95% completion
- Implemented complete Screen 3 styling matching Google Sheets template
- Fixed border display issues (duplicate CSS rules)
- Implemented 40-row Sites table for balanced appearance
- Added dummy data for faster testing
- Attempted logo implementation (Google Drive URLs failed)
- Prepared base64 logo solution for next session
- Organized 900+ lines of CSS into 10 clear sections
- Updated comprehensive documentation

Version 2.0 - January 16, 2026
- Completed logo base64 embedding (both Tune and Exact)
- Added dynamic blue header for Exact Water brand
- Steve approved Milestone 2 / Phase B styling
- Phase B marked COMPLETE
- Set up Git version control and GitHub backup
- Transitioned to Claude Code for development workflow
- Disabled dummy test data for Steve's Milestone 2 review

Version 2.1 - January 16, 2026
- Entered plan mode for Phase C PDF generation
- Researched PDF generation options (HTML to Blob, Google Docs, external services)
- Selected HTML to Blob Direct Conversion approach (free, native Google services)
- Created detailed implementation plan with function structure
- Plan approved - ready to begin coding PDF.js
- GitHub repo: https://github.com/maddsdad/psi-quote-tool

Version 2.2 - January 16, 2026 (Morning)
- Created PDF.js with HTML-to-Blob approach
- Tested PDF Output V1-V4 - ALL FAILED to render background colors
- Tried CSS classes, !important, and inline styles - none worked
- Discovered: Google's HTML-to-PDF converter fundamentally doesn't support background colors
- PIVOTED to Google Sheets template-based PDF generation
- User provided pre-formatted template: Sheet ID 1leM4TF00VjJ9Y9DBv_KqOJeJJAwy6ONp21Rvh-m6PGw
- Tab to use: "Dec 2 Version" (37 rows in sites table)
- Added reference files to .claude/PDF Refinement/:
  * Google Sheets Screenshot Top.jpg
  * Google Sheets Screenshot Bottom.jpg
  * Google Sheets Exported to PDF.pdf (proof colors work!)
- Re-enabled dummy data on Screens 1 and 2 for faster testing
- Updated CLAUDE.md and Build Plan documentation
- Committed and pushed all changes to GitHub

Version 2.3 - January 16, 2026 (Evening)
- Completely rewrote PDF.js with Google Sheets template approach
- Created 5 zoomed-in screenshots for accurate cell mapping (Zoom in Screenshot #1-5.jpg)
- Mapped ALL cell references from template:
  * Header/metadata: I4-I6
  * Customer info: D9-D12
  * Rep info: H9-H11 (merged cells)
  * Quote highlights: D15-D18
  * Sites table: C22-D58 (37 rows)
  * 36-month term: G18-G30, I19-I30, H31-H33, F34-F36
  * 60-month term: G40-G52, I41-I52, H53-H55, F56-F58
- Added populateFootnotes() for dynamic footnote text based on term length
- Added script.external_request OAuth scope to appsscript.json
- testPDFGeneration() runs successfully - PDF generates!
- DISCOVERED: Missing roi6Year calculation in Calculations.js for 72-month term
- Session ended with outstanding question about roi6Year formula

Version 2.4 - January 19, 2026 (Morning)
- Fixed roi6Year calculation in Calculations.js for 72-month term (Tier 3)
- Original spec item AQ had "ROI 5-Year" but 72-month term requires 6-year ROI
- Added detailed code comments for traceability (lines 221-226)
- Updated CLAUDE.md and Build plan documentation
- ROI pattern now consistent across all terms:
  * 36-month: roi3Year = netSavings3Year / (monthlyPayment * 36)
  * 60-month: roi5Year = netSavings5Year / (monthlyPayment * 60)
  * 72-month: roi6Year = netSavings6Year / (monthlyPayment * 72)

Version 2.5 - January 19, 2026 (PDF Generation Complete)
- PDF GENERATION NOW 100% COMPLETE AND TESTED
- Fixed Index.html buildTermBlock() for 72-month terms:
  * Added else if (months === 72) conditions for ROI labels
  * Now shows "6-Year Return on Rental Payment" for 72-month terms
  * Footnotes correctly reference 6-Year for 72-month terms
- Fixed PDF.js for Tier 3 PDFs - added dynamic label cell references:
  * term1_header (F16), term2_header (F38) - "XX-Month Term Rental Option"
  * term1_cashFlowDuringHeader (F17), term2_cashFlowDuringHeader (F39)
  * term1_paymentLabel (F20), term2_paymentLabel (F42) - "XX-Month Rental Payment"
  * term1_cashFlowAfterHeader (F22), term2_cashFlowAfterHeader (F44)
  * term1_termYearLabel (F29), term2_termYearLabel (F51) - "X-Year Total Net Savings"
  * term1_termROILabel (F32), term2_termROILabel (F54) - "X-Year Return on Rental Payment"
- Added SpreadsheetApp.flush() before PDF export to ensure data writes
- Added loading spinner overlay (Styles.html + Index.html):
  * Centered modal with spinning animation
  * Shows "Generating PDF... Please wait"
  * Improves UX during PDF generation delay
- TESTED: Tier 1 (36/60), Tier 2 (36/60), Tier 3 (60/72) - ALL WORKING
- Ready for GitHub commit before starting Step 13: Email Delivery

═══════════════════════════════════════════════════════════════════════════════

END OF BUILD PLAN v2.5
Last Updated: January 19, 2026
Current Phase: C (PDF Generation & Email Delivery)
Step 12: PDF Generation - ✅ COMPLETE (100%)
Step 13: Email Delivery - ⏳ NEXT
Step 14: Post-Send Options - ⏳ PLANNED