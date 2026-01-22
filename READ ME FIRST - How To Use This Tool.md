# READ ME FIRST - PSI Quote Tool

## What Is This?

This is the PSI Quote Tool - a web application that generates professional lease quotes for **Tune Energy** and **Exact Water** sales reps.

**You don't need to understand the technical stuff.** Just use the links below.

---

## YOUR IMPORTANT LINKS

Bookmark these! These are the only links you need:

### Quote Tools (Give these to sales reps)

| Brand | Link |
|-------|------|
| **Tune Energy** | https://script.google.com/macros/s/AKfycbws15vYTrS75gzv9Fk2rXCJGcYDmm8IGaRFpwaNAvuvB6vqA30SwWt99D_Ae22k7_g2YQ/exec?brand=tune |
| **Exact Water** | https://script.google.com/macros/s/AKfycbws15vYTrS75gzv9Fk2rXCJGcYDmm8IGaRFpwaNAvuvB6vqA30SwWt99D_Ae22k7_g2YQ/exec?brand=exact |

### Quote History (View past quotes)

| Brand | Link |
|-------|------|
| **Tune Energy History** | https://script.google.com/macros/s/AKfycbws15vYTrS75gzv9Fk2rXCJGcYDmm8IGaRFpwaNAvuvB6vqA30SwWt99D_Ae22k7_g2YQ/exec?history=tune |
| **Exact Water History** | https://script.google.com/macros/s/AKfycbws15vYTrS75gzv9Fk2rXCJGcYDmm8IGaRFpwaNAvuvB6vqA30SwWt99D_Ae22k7_g2YQ/exec?history=exact |

### Admin Panel (For you only - manage settings)

| Page | Link |
|------|------|
| **Admin Panel** | https://script.google.com/macros/s/AKfycbws15vYTrS75gzv9Fk2rXCJGcYDmm8IGaRFpwaNAvuvB6vqA30SwWt99D_Ae22k7_g2YQ/exec?admin=true |

**Admin Panel Login:** You must be logged into Google as `psiquotetool@gmail.com` to access the Admin Panel.

---

## HOW TO USE THE ADMIN PANEL

The Admin Panel lets you change settings without touching any code. Here's what you can do:

### 1. Change Rate Factors
- Click the "Rate Factors" tab
- Edit the rates for each tier
- Click "Save Changes"

### 2. Change How Long Quotes Are Valid
- Click the "Settings" tab
- Change "Quote Valid Until Days" (default is 30)
- Click "Save"

### 3. Change Admin Notification Email
- Click the "Settings" tab
- Enter the new email address
- Click "Send Test Email" to verify it works
- Click "Save"

### 4. View All Quotes
- Click the "All Quotes" tab
- See every quote from both Tune Energy and Exact Water
- Click any quote number to view/download the PDF

---

## WHAT'S IN THIS GOOGLE DRIVE FOLDER?

| File/Folder | What It Is | Can I Edit It? |
|-------------|------------|----------------|
| **Quote Tool Code** | The application code | NO - DO NOT TOUCH |
| **Quote Tool Data** | Database (settings, quote history) | NO - Use Admin Panel instead |
| **PDF Template** | The quote PDF layout | NO - DO NOT DELETE |
| **PSI Quote PDFs** | All generated quote PDFs | Safe to view, don't delete |

---

## THINGS YOU SHOULD NEVER DO

1. **DO NOT delete any files** in this folder
2. **DO NOT edit the Google Sheets directly** - use the Admin Panel
3. **DO NOT edit the code** unless you're a developer who knows what they're doing
4. **DO NOT rename files** - it will break the tool

---

## IF SOMETHING BREAKS

### Step 1: Don't Panic
Most issues can be fixed. Don't delete or change anything trying to fix it - that usually makes it worse.

### Step 2: Check If It's Really Broken
- Try refreshing the page
- Try a different browser
- Make sure you're logged into the right Google account

### Step 3: Contact Support

**Original Developer:** Matt Boyer
**Email:** mboyerchurch@gmail.com
**GitHub Backup:** https://github.com/maddsdad/psi-quote-tool

### Step 4: If You Need to Hire a New Developer

Tell them:
- This is a **Google Apps Script** web application
- The code is backed up on **GitHub** (link above)
- Give them access to the `psiquotetool@gmail.com` Google account
- Show them this document

---

## BACKUP INFORMATION

### Where Is Everything Backed Up?

| What | Where |
|------|-------|
| All code | GitHub: https://github.com/maddsdad/psi-quote-tool |
| Quote history | Google Sheet "Quote Tool Data" → QuoteLog tab |
| Generated PDFs | Google Drive folder "PSI Quote PDFs" |

### How to Restore From Backup

If the code gets messed up, a developer can:
1. Download the code from GitHub
2. Use `clasp push` to restore it to Apps Script
3. Create a new deployment

All your quote history and settings are in the Google Sheet - the code doesn't store any of that, so even if the code needs to be restored, you won't lose your data.

---

## ACCOUNT INFORMATION

**Google Account:** psiquotetool@gmail.com
**Password:** [Store securely - do not write here]

This account owns:
- The quote tool application
- The data spreadsheet
- The PDF templates
- All generated PDFs

**Keep this password safe.** If you lose access to this account, you lose access to everything.

---

## QUICK REFERENCE CARD

| I want to... | Go here |
|--------------|---------|
| Generate a Tune Energy quote | Tune Energy link (above) |
| Generate an Exact Water quote | Exact Water link (above) |
| See past Tune quotes | Tune History link (above) |
| See past Exact quotes | Exact History link (above) |
| Change rate factors | Admin Panel → Rate Factors |
| Change quote expiration days | Admin Panel → Settings |
| Change admin email | Admin Panel → Settings |
| View all quotes (both brands) | Admin Panel → All Quotes |

---

## TECHNICAL DETAILS (For Future Developers)

- **Platform:** Google Apps Script
- **Database:** Google Sheets
- **Deployment:** Web app (Apps Script)
- **Version Control:** Git + GitHub
- **Sync Tool:** clasp (Google's CLI for Apps Script)

**Key Files:**
- `Code.js` - Web app routing
- `Calculations.js` - Lease payment formulas
- `PDF.js` - PDF generation
- `Email.js` - Email delivery
- `Admin.js` - Admin panel backend
- `History.js` - Quote history backend

**Spreadsheet IDs:**
- Data Sheet: `1dHGcFftseIx_IKV8ULetIfPI5sE35JWQfEOIW05KhSw`
- PDF Template: `1leM4TF00VjJ9Y9DBv_KqOJeJJAwy6ONp21Rvh-m6PGw`

---

*Last Updated: January 22, 2026*
