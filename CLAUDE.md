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
├── appsscript.json      # Apps Script project config
├── .clasp.json          # clasp config (not in Git - contains script ID)
├── CLAUDE.md            # This file
└── .claude/
    └── Reference - Apps Script Documents/
        ├── Build plan v 9.md                    # Detailed build plan & status
        ├── Quote Tool Requirements - Dec 2 2025.txt
        ├── quote_tool_calculations.csv
        ├── PSI_Quote_Tool_Calculator_Complete.csv
        └── Steve Proposal - Nov 14.txt
```

## Google Resources

- **Apps Script Project ID**: `1-47VWwAe7cf4ZXVXlmMJhqHPWEdLG3el6e-JrBZ0wrWT1qhi9v2WG0Dc`
- **Google Sheet**: `1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw`
  - Tabs: Settings (rate factors), QuoteNumbers (tracking), QuoteLog (history)
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
| **C** | PDF Generation & Email | ⏳ Not Started |
| **D** | Admin Panel | ⏳ Not Started |

## Current Focus

**Phase C: PDF Generation & Email Delivery**
- Generate PDF from Screen 3 HTML content
- Email to customer (editable template), rep (CC), and Steve (separate)
- Post-send options: download PDF, generate another quote, save to log

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
