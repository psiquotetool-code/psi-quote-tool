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
├── Styles.html          # CSS stylesheet (1100+ lines, 11 sections)
├── PDF.js               # PDF generation using Google Sheets template
├── Email.js             # Email delivery (customer email + admin notification)
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
  - **DO NOT DELETE** - This template is used every time a PDF is generated
  - Tabs: `Tune Template` (Tune Energy), `Exact Template` (Exact Water)
  - Code selects correct tab based on brand
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
| **C** | PDF Generation & Email | ✅ Complete |
| **D** | Admin Panel | ⏳ Not Started |

## Phase C Summary (Completed January 19, 2026)

### Step 12: PDF Generation ✅ COMPLETE
- ✅ PDF.js using Google Sheets template approach
- ✅ Two template tabs: "Tune Template" and "Exact Template"
- ✅ Dynamic brand selection based on URL parameter
- ✅ All tiers tested and working (Tier 1, 2, and 3)
- ✅ Dynamic labels for term headers (36/60/72-Month)
- ✅ Loading spinner overlay during PDF generation
- ✅ OAuth scopes: spreadsheets, drive, script.external_request, mail.google.com

### Step 13: Email Delivery ✅ COMPLETE
- ✅ Email.js created with GmailApp integration
- ✅ Email composition modal with editable To, CC, Subject, and Body
- ✅ Pre-filled email template with customer/rep info
- ✅ "Reset to Default" button to restore original template
- ✅ PDF opens in new tab before email modal appears (for review)
- ✅ Email 1: To customer, CC rep, with PDF attachment
- ✅ Email 2: Separate admin notification to mboyerchurch@gmail.com (testing)
- ✅ Post-send modal with 4 options:
  - "← Modify the quote you just sent" (blue, returns to Screen 3)
  - "Download Quote PDF" (gray)
  - "Generate New Quote →" (green, with confirmation warning)
  - "Exit Quote Tool" (red, with confirmation warning)
- ✅ Email address changes sync back to form fields

**PDF Generation Flow:**
```
Frontend: generatePDF()
→ Backend: createPDFQuote(quoteData)
→ Open PDF Template spreadsheet
→ Select correct tab based on brand (Tune Template or Exact Template)
→ Copy tab to temporary sheet
→ Populate cells with quote data (see CELL_MAP in PDF.js)
→ Export via UrlFetchApp with PDF parameters
→ Save to Drive folder "PSI Quote PDFs"
→ Delete temp sheet
→ Return download URL + fileId
→ Frontend: Open PDF in new tab, show email modal
```

**Email Flow:**
```
Frontend: sendQuoteEmail()
→ Sync any email address changes back to form
→ Backend: sendQuoteEmails(emailData)
→ Get PDF blob from Drive using fileId
→ Send customer email (To: customer, CC: rep, attach PDF)
→ Send admin notification (To: admin, attach PDF)
→ Return success
→ Frontend: Show post-send modal with options
```

**Cell Mapping (PDF.js CELL_MAP):**
- Header: I4 (date), I5 (quote#), I6 (valid until)
- Brand: C2 (main title), F9 (presented by header)
- Customer info: D10-D13
- Rep info: H10-H12 (merged H:I cells)
- Quote Highlights: D16-D19
- Sites table: C23+ (37 rows available)
- Term 1 (rows 17-37): Cash flow, savings analysis, ROI metrics, footnotes
- Term 2 (rows 39-59): Cash flow, savings analysis, ROI metrics, footnotes

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
