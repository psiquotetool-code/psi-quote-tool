# PSI Quote Tool

## Project Overview

A lease quote generation tool for PSI (equipment financing company). Sales reps from partner companies (Tune Energy or On Track Technology Solutions) use this tool to:

1. Enter customer and location data
2. Calculate lease payments based on equipment cost tiers
3. Show savings projections and ROI over 3, 5, and 10 years
4. Generate a professional PDF quote
5. Email the quote to customer, rep, and Steve Olsen (admin)

**Two Brands (same codebase, different URLs):**
- **Tune Energy** - Electrical panels
- **On Track Technology Solutions** - Water meters (formerly "Exact Water"; internal code identifier: `otts`)

## Tech Stack

- **Platform**: Google Apps Script
- **Frontend**: HTML, CSS, JavaScript (single-page app)
- **Backend**: Google Apps Script (.gs files)
- **Data Storage**: Google Sheets
- **PDF Storage**: Google Drive folder
- **Version Control**: Git + GitHub
- **Sync Tool**: clasp (Google's CLI for Apps Script)

## Project Structure

```
Quote Tool Via Claude Code/
├── Code.js                  # Web app entry point, URL routing
├── Calculations.js          # All lease calculation formulas (Items A-AR)
├── Index.html               # Quote Tool UI (3 screens in single-page app)
├── Styles.html              # Quote Tool CSS stylesheet (1100+ lines)
├── PDF.js                   # PDF generation using Google Sheets template
├── Email.js                 # Email delivery + quote logging
├── Admin.js                 # Admin panel backend (auth, settings, all quotes)
├── AdminPanel.html          # Admin panel UI
├── AdminPanelStyles.html    # Admin panel CSS
├── History.js               # Quote history backend (read-only, by brand)
├── QuoteHistory.html        # Public quote history UI
├── QuoteHistoryStyles.html  # Quote history CSS
├── appsscript.json          # Apps Script project config
├── .clasp.json              # clasp config (not in Git - contains script ID)
├── CLAUDE.md                # This file
├── READ ME FIRST - How To Use This Tool.md  # Handoff document for Steve
├── TESTING CHECKLIST.md     # Comprehensive testing checklist (150+ tests)
└── .claude/
    └── Reference - Apps Script Documents/
        ├── Build Plan.md
        └── [other reference docs]
```

## Google Resources

- **Apps Script Project ID**: `1-47VWwAe7cf4ZXVXlmMJhqHPWEdLG3el6e-JrBZ0wrWT1qhi9v2WG0Dc`
- **Data Google Sheet**: `1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw`
  - Tabs: Settings (rate factors + config), QuoteNumbers (tracking), QuoteLog (history)
- **PDF Template Google Sheet**: `1leM4TF00VjJ9Y9DBv_KqOJeJJAwy6ONp21Rvh-m6PGw`
  - **DO NOT DELETE** - This template is used every time a PDF is generated
  - Tabs: `Tune Template` (Tune Energy), `OTTS Template` (On Track Technology Solutions), `Exact Template` (legacy backup — do not delete)
- **PDF Storage Folder**: `GENERATED PDF QUOTES - DON'T DELETE OR MODIFY!!`
  - Located in psiquotetool@gmail.com Google Drive
  - All generated quote PDFs are stored here
- **GitHub Repo**: https://github.com/maddsdad/psi-quote-tool

## Current Status

| Phase | Description | Status |
|-------|-------------|--------|
| **A** | Core Functionality (Steps 1-7) | ✅ Complete |
| **B** | Styling & Polish (Steps 8-11) | ✅ Complete |
| **C** | PDF Generation & Email | ✅ Complete |
| **D** | Admin Panel & Quote History | ✅ Complete |
| **Testing** | Comprehensive testing & bug fixes | ✅ Complete |

**Project Status: READY FOR FINAL DEPLOYMENT**

## URL Structure

| URL Parameter | Access | Description |
|---------------|--------|-------------|
| `?brand=tune` | Public | Tune Energy Quote Tool (default) |
| `?brand=otts` | Public | On Track Technology Solutions Quote Tool |
| `?brand=exact` | Public | Legacy alias — redirects internally to `otts` |
| `?history=tune` | Public | Tune Energy Quote History (read-only) |
| `?history=otts` | Public | On Track Technology Solutions Quote History (read-only) |
| `?history=exact` | Public | Legacy alias — redirects internally to `otts` |
| `?admin=true` | Admin Only | Admin Panel (settings, all quotes) |

**Admin Access:** psiquotetool@gmail.com only (Session.getActiveUser() limitation)

## Rate Factor Tiers

| Tier | Equipment Cost | Available Terms |
|------|---------------|-----------------|
| 1 | $0 - $99,999.99 | 36-month & 60-month |
| 2 | $100,000 - $499,999.99 | 36-month & 60-month |
| 3 | $500,000+ | 60-month & 72-month |

## QuoteLog Column Structure

| Column | Field |
|--------|-------|
| A | Brand |
| B | QuoteNumber |
| C | QuoteDate |
| D | QuoteExpires |
| E | CustomerName |
| F | CustomerContact |
| G | CustomerEmail |
| H | RepName |
| I | EquipmentFinanced |
| J | GrossSavingsPercent |
| K | PDFFileID |

## Validation Rules

| Field | Rule |
|-------|------|
| Monthly Spend | $1 - $250,000 |
| Equipment Cost | $1 - $1,000,000 |
| Savings % | 1% - 50% |
| Panels/Meters | 1 - 2,000 |
| Phone | 10 digits |
| Email | Valid format + common TLD (.com, .org, .net, .io, etc.) |

## Key Features

### Quote Tool (Index.html)
- 3-screen single-page app
- Brand-specific theming (Tune = blue, OTTS = teal)
- Dynamic Panels/Meters labels based on brand
- Real-time validation with clear error messages
- Loading overlays during quote generation, PDF generation, and email sending
- Modified quotes automatically get new quote numbers (prevents duplicate quote numbers)
- Maximum 33 locations per quote

### PDF Generation (PDF.js)
- Uses Google Sheets template approach (preserves formatting)
- Dynamic content based on brand:
  - "# of Panels" vs "# of Meters" in Quote Highlights
  - "Energy cost is assumed..." vs "Water cost is assumed..." in Terms
- PDFs stored in Drive folder with warning name
- Valid Until days configurable via Admin Panel

### Email Delivery (Email.js)
- Customer email with PDF attachment (CC: rep)
- Admin notification to Steve Olsen
- Reply-To set to rep's email address
- Quote logged to history after successful send
- Loading overlay during send

### Admin Panel (AdminPanel.html)
- Google account authentication
- **Settings Tab**: ValidUntilDays, AdminEmail, Test Email button
- **Rate Factors Tab**: View mode (read-only) → Edit mode → Save → View mode
- **All Quotes Tab**: Combined view of both brands with filtering

### Quote History (QuoteHistory.html)
- Public access (no login required)
- Filtered by brand
- Columns: Quote#, Date, Expires, Customer, Contact, Email, Rep, Equipment, Savings%
- Click quote number to open PDF

## Common Commands

```bash
# Pull latest code from Apps Script to local files
clasp pull

# Push local changes to Apps Script
clasp push --force

# Sync and commit
clasp pull && git add . && git commit -m "description" && git push
```

## Deployment

To create a new deployment after code changes:
1. Open Apps Script editor
2. Click **Deploy** → **New deployment**
3. Select **Web app**
4. Set description, Execute as: Me, Who has access: Anyone
5. Click **Deploy**
6. Copy the new URL

## Files in psiquotetool@gmail.com Google Drive

```
⚠️ PSI QUOTE TOOL - DO NOT DELETE OR EDIT ⚠️/
├── Quote Tool Code (Apps Script project)
├── Quote Tool Data (Google Sheet - Settings, QuoteNumbers, QuoteLog)
├── PDF Template (Google Sheet - Tune Template, OTTS Template, Exact Template backup)
├── GENERATED PDF QUOTES - DON'T DELETE OR MODIFY!!/
│   └── [All generated quote PDFs]
└── 📋 READ ME FIRST - How To Use This Tool (Google Doc)
```

## Development History

- **Phase A** (Complete): Core functionality - calculations, 3-screen flow
- **Phase B** (Complete): Styling and polish - Steve approved
- **Phase C** (Complete): PDF generation (Sheets template approach) + Email delivery
- **Phase D** (Complete): Admin Panel + Quote History + Documentation
- **Testing** (Complete): Bug fixes, validation improvements, UI polish
- **Vendor Swap** (Complete): Exact Water → On Track Technology Solutions (April 2026)

## Contact

**Developer:** Matt Boyer (mboyerchurch@gmail.com)
**GitHub:** https://github.com/maddsdad/psi-quote-tool
