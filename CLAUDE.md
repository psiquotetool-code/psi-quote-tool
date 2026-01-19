# PSI Quote Tool

## Project Overview

A lease quote generation tool for PSI (equipment financing company). Sales reps from partner companies (Tune Energy or Exact Water) use this tool to:

1. Enter customer and location data
2. Calculate lease payments based on equipment cost tiers
3. Show savings projections and ROI over 3, 5, and 10 years
4. Generate a professional PDF quote
5. Email the quote to customer, rep, and Steve Olsen (admin)

**Two Brands (same codebase, different URLs):**
- **Tune Energy** - Electrical panels
- **Exact Water** - Water meters

## Tech Stack

- **Platform**: Google Apps Script
- **Frontend**: HTML, CSS, JavaScript (single-page app)
- **Backend**: Google Apps Script (.gs files)
- **Data Storage**: Google Sheets
- **Version Control**: Git + GitHub
- **Sync Tool**: clasp (Google's CLI for Apps Script)

## Project Structure

```
Quote Tool Via Claude Code/
├── Code.js              # Web app entry point, quote number generation
├── Calculations.js      # All lease calculation formulas (Items A-AR)
├── Index.html           # Complete UI (3 screens in single-page app)
├── Styles.html          # CSS stylesheet (900+ lines, 10 sections)
├── PDF.js               # PDF generation (being rewritten to use Google Sheets)
├── appsscript.json      # Apps Script project config
├── .clasp.json          # clasp config (not in Git - contains script ID)
├── CLAUDE.md            # This file
└── .claude/
    ├── Reference - Apps Script Documents/
    │   ├── Build plan v 9.md                    # Detailed build plan & status
    │   ├── Quote Tool Requirements - Dec 2 2025.txt
    │   ├── quote_tool_calculations.csv
    │   ├── PSI_Quote_Tool_Calculator_Complete.csv
    │   └── Steve Proposal - Nov 14.txt
    └── PDF Refinement/
        ├── Screen 3.jpg                         # Target layout from web app
        ├── PDF Output V1-V4.pdf                 # Test iterations (HTML approach - failed)
        ├── Google Sheets Screenshot Top.jpg     # Template layout reference
        ├── Google Sheets Screenshot Bottom.jpg  # Template layout reference
        └── Google Sheets Exported to PDF.pdf    # Working PDF from Sheets (target)
```

## Google Resources

- **Apps Script Project ID**: `1-47VWwAe7cf4ZXVXlmMJhqHPWEdLG3el6e-JrBZ0wrWT1qhi9v2WG0Dc`
- **Data Google Sheet**: `1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw`
  - Tabs: Settings (rate factors), QuoteNumbers (tracking), QuoteLog (history)
- **PDF Template Google Sheet**: `1leM4TF00VjJ9Y9DBv_KqOJeJJAwy6ONp21Rvh-m6PGw`
  - Tab to use: `Dec 2 Version`
  - This is a pre-formatted spreadsheet template for PDF generation
- **GitHub Repo**: https://github.com/maddsdad/psi-quote-tool

## Common Commands

```bash
# Pull latest code from Apps Script to local files
clasp pull

# Push local changes to Apps Script
clasp push

# Sync and commit (after making changes in Apps Script browser)
clasp pull && git add . && git commit -m "description" && git push

# View Apps Script project in browser
clasp open
```

## Architecture

**Single-Page App** with 3 screens using show/hide divs:
- **Screen 1**: Quote setup (rep info, customer info)
- **Screen 2**: Location entry (dynamic table, add/remove rows)
- **Screen 3**: Quote preview (two-column layout, financial tables)

**Why SPA?** Apps Script template processing doesn't work for passing data between separate HTML files. Data persists via JavaScript variables.

## Rate Factor Tiers

| Tier | Equipment Cost | Available Terms |
|------|---------------|-----------------|
| 1 | $0 - $99,999.99 | 36-month & 60-month |
| 2 | $100,000 - $499,999.99 | 36-month & 60-month |
| 3 | $500,000+ | 60-month & 72-month |

## Current Status

| Phase | Description | Status |
|-------|-------------|--------|
| **A** | Core Functionality (Steps 1-7) | ✅ Complete |
| **B** | Styling & Polish (Steps 8-11) | ✅ Complete (Steve approved) |
| **C** | PDF Generation & Email | 🔄 In Progress |
| **D** | Admin Panel | ⏳ Not Started |

## Current Focus

**Phase C: PDF Generation & Email Delivery**

**Approach Selected**: Google Sheets Template-Based PDF Generation

**Status as of January 19, 2026:**

### Step 12: PDF Generation ✅ COMPLETE
- ✅ PDF.js completely rewritten with Google Sheets template approach
- ✅ Cell mapping completed from 5 zoomed-in screenshots
- ✅ All tiers tested and working (Tier 1, 2, and 3)
- ✅ Dynamic labels for term headers (36/60/72-Month) added to PDF.js
- ✅ Dynamic labels for ROI rows (3/5/6-Year) added to PDF.js
- ✅ roi6Year calculation added to Calculations.js for 72-month terms
- ✅ 6-Year labels fixed in Index.html buildTermBlock() for Screen 3
- ✅ SpreadsheetApp.flush() added to ensure data writes before PDF export
- ✅ Loading spinner overlay added for better UX during PDF generation
- ✅ OAuth scopes updated (added script.external_request permission)

### Step 13: Email Delivery ⏳ NEXT
- Email composition modal with editable message
- Send to customer (with PDF attachment), CC rep
- Separate notification email to admin
- Post-send options (download PDF, generate another, exit)

**Changes Made on January 19, 2026:**

1. **Calculations.js** - Added roi6Year for 72-month terms:
   - Formula: `roi6Year = netSavings6Year / (monthlyPayment * 72)`
   - Updated return object to return `roi6Year` instead of `roi5Year`
   - Added traceability comments (lines 221-226)

2. **Index.html** - Fixed 72-month display in buildTermBlock():
   - Added `else if (months === 72)` conditions for ROI labels
   - Now shows "6-Year Return on Rental Payment" for 72-month terms
   - Footnotes correctly reference 6-Year for 72-month terms

3. **PDF.js** - Added dynamic label cell references:
   - term1_header (F16), term2_header (F38) - Term option headers
   - term1_paymentLabel (F20), term2_paymentLabel (F42) - Rental payment labels
   - term1_termYearLabel (F29), term2_termYearLabel (F51) - X-Year savings labels
   - term1_termROILabel (F32), term2_termROILabel (F54) - X-Year ROI labels
   - Added SpreadsheetApp.flush() before PDF export

4. **Styles.html & Index.html** - Added loading spinner:
   - Centered overlay with spinning animation
   - Shows "Generating PDF... Please wait"
   - Displays during PDF generation, hides on completion

**PDF Generation Flow (IMPLEMENTED):**
```
Frontend: generatePDF()
→ Backend: createPDFQuote(quoteData)
→ Open PDF Template spreadsheet (ID: 1leM4TF00VjJ9Y9DBv_KqOJeJJAwy6ONp21Rvh-m6PGw)
→ Copy "Dec 2 Version" tab to temporary sheet
→ Populate cells with quote data (see CELL_MAP in PDF.js)
→ Export via UrlFetchApp with PDF parameters
→ Save to Drive folder "PSI Quote PDFs"
→ Delete temp sheet
→ Return download URL
```

**Cell Mapping (COMPLETED):** All cells mapped in PDF.js CELL_MAP object:
- Header: I4 (date), I5 (quote#), I6 (valid until)
- Customer info: D9-D12
- Rep info: H9-H11 (merged H:I cells)
- Quote Highlights: D15-D18
- Sites table: C22-D58 (37 rows)
- 36-month term: G18-G30, I19-I30, H31-H33 (ROI values)
- 60-month term: G40-G52, I41-I52, H53-H55 (ROI values)
- Dynamic footnotes: F34-F36, F56-F58

## Key Decisions & Learnings

1. **Single-page app architecture required** - Apps Script template processing with document.write() doesn't work for multi-page data passing

2. **Base64 logos** - Google Drive URLs fail due to CORS; embed logos as base64 strings

3. **Fixed 33-row sites table** - Creates balanced appearance regardless of location count

4. **Rate factors use 7 decimal precision** - Matches Steve's Excel calculations exactly

5. **Dummy test data** - Implemented but disabled for production; toggle via `addLocationRow(true)` parameter

## Validation Rules

| Field | Rule |
|-------|------|
| Monthly Spend | $1 - $250,000 |
| Equipment Cost | $1 - $1,000,000 |
| Savings % | 0% - 50% |
| Panels/Meters | 1 - 2,000 |
| Phone | 10 digits |
| Email | Valid format |

## Development Workflow

1. **Option A** (Recommended): Edit in Apps Script browser, then run `clasp pull` to sync locally
2. **Option B**: Edit local files with Claude Code, then run `clasp push` to deploy

After changes:
```bash
clasp pull                    # Get latest from Apps Script
git add .                     # Stage changes
git commit -m "description"   # Create snapshot
git push                      # Backup to GitHub
```

## Reference Documents

See `.claude/Reference - Apps Script Documents/` for:
- Detailed build plan with step-by-step progress
- Business requirements and specifications
- Calculation formulas and test cases
- Original project proposal
