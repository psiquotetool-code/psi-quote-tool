# PSI Quote Tool - Comprehensive Testing Checklist

**Tester:** ___________________
**Date:** ___________________
**Browser:** ___________________

---

## How To Use This Document

1. Go through each section in order
2. Mark each item: ✅ Pass | ❌ Fail | ⏭️ Skipped
3. For failures, note the issue in the "Notes" column
4. After testing, summarize all failures at the bottom

---

## SECTION 1: Basic Access & Loading

### 1.1 Quote Tool Access

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 1.1.1 | Open Tune Energy URL | Page loads, shows "Tune Energy" branding, blue theme | | |
| 1.1.2 | Open Exact Water URL | Page loads, shows "Exact Water" branding, teal theme | | |
| 1.1.3 | Open base URL (no parameters) | Defaults to Tune Energy | | |
| 1.1.4 | Check quote number format (Tune) | Shows "TUNE-#####" format | | |
| 1.1.5 | Check quote number format (Exact) | Shows "EXACT-#####" format | | |
| 1.1.6 | Check quote date | Shows today's date | | |

### 1.2 Admin Panel Access

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 1.2.1 | Open Admin URL while logged into psiquotetool@gmail.com | Admin panel loads, shows all tabs | | |
| 1.2.2 | Open Admin URL while logged into mboyerchurch@gmail.com | Admin panel loads, shows all tabs | | |
| 1.2.3 | Open Admin URL while logged into different account | Access denied message | | |
| 1.2.4 | Open Admin URL while not logged in | Prompted to log in or denied | | |

### 1.3 Quote History Access

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 1.3.1 | Open Tune History URL | Page loads, shows "Tune Energy Quote History" | | |
| 1.3.2 | Open Exact History URL | Page loads, shows "Exact Water Quote History" | | |
| 1.3.3 | History pages load without login | Should work (public access) | | |

---

## SECTION 2: Screen 1 - Quote Setup

### 2.1 Rep Information

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 2.1.1 | Rep Name field accepts text | Text entered successfully | | |
| 2.1.2 | Rep Email validates format | Invalid email shows error | | |
| 2.1.3 | Rep Phone accepts 10 digits | Formatted as (XXX) XXX-XXXX | | |
| 2.1.4 | Rep Phone rejects non-numeric | Only numbers accepted | | |
| 2.1.5 | All rep fields required | Cannot proceed without all fields | | |

### 2.2 Customer Information

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 2.2.1 | Company Name field accepts text | Text entered successfully | | |
| 2.2.2 | Contact Name field accepts text | Text entered successfully | | |
| 2.2.3 | Customer Email validates format | Invalid email shows error | | |
| 2.2.4 | Customer Phone accepts 10 digits | Formatted as (XXX) XXX-XXXX | | |
| 2.2.5 | All customer fields required | Cannot proceed without all fields | | |

### 2.3 Navigation

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 2.3.1 | Click "Next" with valid data | Advances to Screen 2 | | |
| 2.3.2 | Click "Next" with missing data | Shows validation errors | | |

---

## SECTION 3: Screen 2 - Location Entry

### 3.1 Location Table

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 3.1.1 | Default shows 1 empty row | Single row visible | | |
| 3.1.2 | "Add Location" adds new row | New row appears below | | |
| 3.1.3 | Can add up to 33 locations | All rows work | | |
| 3.1.4 | Delete button removes row | Row removed, others renumber | | |
| 3.1.5 | Cannot delete last remaining row | Delete disabled or prevented | | |

### 3.2 Location Fields - Tune Energy

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 3.2.1 | Site Name accepts text | Text entered | | |
| 3.2.2 | Monthly Spend accepts $1-$250,000 | Values in range accepted | | |
| 3.2.3 | Monthly Spend rejects < $1 | Error shown | | |
| 3.2.4 | Monthly Spend rejects > $250,000 | Error shown | | |
| 3.2.5 | Equipment Cost accepts $1-$1,000,000 | Values in range accepted | | |
| 3.2.6 | Equipment Cost rejects out of range | Error shown | | |
| 3.2.7 | Savings % accepts 0-50% | Values in range accepted | | |
| 3.2.8 | Savings % rejects > 50% | Error shown | | |
| 3.2.9 | # of Panels accepts 1-2,000 | Values in range accepted | | |
| 3.2.10 | # of Panels label shows "Panels" | Label correct for Tune | | |

### 3.3 Location Fields - Exact Water

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 3.3.1 | # of Meters label shows "Meters" | Label correct for Exact | | |
| 3.3.2 | All other fields same as Tune | Validation works same | | |

### 3.4 Navigation

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 3.4.1 | "Back" returns to Screen 1 | Screen 1 shown, data preserved | | |
| 3.4.2 | "Calculate Quote" with valid data | Advances to Screen 3 | | |
| 3.4.3 | "Calculate Quote" with invalid data | Shows validation errors | | |

---

## SECTION 4: Screen 3 - Quote Preview & Calculations

### 4.1 Display Elements

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 4.1.1 | Quote number displayed | Matches Screen 1 | | |
| 4.1.2 | Quote date displayed | Matches Screen 1 | | |
| 4.1.3 | Customer info displayed | Matches Screen 1 input | | |
| 4.1.4 | Rep info displayed | Matches Screen 1 input | | |
| 4.1.5 | All locations listed | All entered locations shown | | |
| 4.1.6 | Brand name correct (Tune/Exact) | Matches URL parameter | | |

### 4.2 Tier 1 Calculations ($0 - $99,999.99)

**Test Data:** Equipment Cost = $50,000

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 4.2.1 | Shows 36-month and 60-month terms | Both columns visible | | |
| 4.2.2 | Does NOT show 72-month term | 72-month not visible | | |
| 4.2.3 | 36-month payment calculated | $50,000 × 0.0327348 = $1,636.74 | | |
| 4.2.4 | 60-month payment calculated | $50,000 × 0.0211993 = $1,059.97 | | |
| 4.2.5 | Total payments correct (36-mo) | $1,636.74 × 36 = $58,922.64 | | |
| 4.2.6 | Total payments correct (60-mo) | $1,059.97 × 60 = $63,598.20 | | |

### 4.3 Tier 2 Calculations ($100,000 - $499,999.99)

**Test Data:** Equipment Cost = $250,000

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 4.3.1 | Shows 36-month and 60-month terms | Both columns visible | | |
| 4.3.2 | Does NOT show 72-month term | 72-month not visible | | |
| 4.3.3 | 36-month payment calculated | $250,000 × 0.0327439 = $8,185.98 | | |
| 4.3.4 | 60-month payment calculated | $250,000 × 0.0213861 = $5,346.53 | | |

### 4.4 Tier 3 Calculations ($500,000+)

**Test Data:** Equipment Cost = $600,000

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 4.4.1 | Shows 60-month and 72-month terms | Both columns visible | | |
| 4.4.2 | Does NOT show 36-month term | 36-month not visible | | |
| 4.4.3 | 60-month payment calculated | $600,000 × 0.0208989 = $12,539.34 | | |
| 4.4.4 | 72-month payment calculated | $600,000 × 0.0180061 = $10,803.66 | | |

### 4.5 Savings & ROI Calculations

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 4.5.1 | Monthly savings calculated | Monthly Spend × Savings % | | |
| 4.5.2 | Annual savings calculated | Monthly savings × 12 | | |
| 4.5.3 | 3-year projection shown | Calculated correctly | | |
| 4.5.4 | 5-year projection shown | Calculated correctly | | |
| 4.5.5 | 10-year projection shown | Calculated correctly | | |
| 4.5.6 | Net cash flow calculated | Savings - Lease payment | | |

### 4.6 Navigation

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 4.6.1 | "Back" returns to Screen 2 | Screen 2 shown, data preserved | | |
| 4.6.2 | "Generate PDF" button works | PDF generation starts | | |

---

## SECTION 5: PDF Generation

### 5.1 PDF Creation

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 5.1.1 | Loading spinner appears | Spinner shown during generation | | |
| 5.1.2 | PDF opens in new tab | New browser tab with PDF | | |
| 5.1.3 | PDF generation completes | No errors, PDF displays | | |

### 5.2 PDF Content - Header

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 5.2.1 | Brand name correct | "Tune Energy" or "Exact Water" | | |
| 5.2.2 | Quote number matches | Same as Screen 3 | | |
| 5.2.3 | Quote date matches | Same as Screen 3 | | |
| 5.2.4 | Valid Until date correct | Quote date + ValidUntilDays (default 30) | | |

### 5.3 PDF Content - Customer/Rep Info

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 5.3.1 | Customer company name | Matches input | | |
| 5.3.2 | Customer contact name | Matches input | | |
| 5.3.3 | Customer email | Matches input | | |
| 5.3.4 | Customer phone | Matches input | | |
| 5.3.5 | Rep name | Matches input | | |
| 5.3.6 | Rep email | Matches input | | |
| 5.3.7 | Rep phone | Matches input | | |

### 5.4 PDF Content - Locations Table

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 5.4.1 | All locations listed | Every location from Screen 2 | | |
| 5.4.2 | Site names correct | Match input | | |
| 5.4.3 | Equipment costs correct | Match input | | |
| 5.4.4 | Panels/Meters label correct | "Panels" for Tune, "Meters" for Exact | | |

### 5.5 PDF Content - Financial Tables

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 5.5.1 | Term columns match tier | Correct terms for equipment total | | |
| 5.5.2 | Monthly payments match Screen 3 | Same calculations | | |
| 5.5.3 | Savings projections match | Same as Screen 3 | | |
| 5.5.4 | All numbers formatted | Currency with commas, % signs | | |

### 5.6 PDF Formatting

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 5.6.1 | Background colors visible | Blue/teal headers show | | |
| 5.6.2 | Text is readable | No cut-off or overflow | | |
| 5.6.3 | Professional appearance | Matches template design | | |
| 5.6.4 | Fits on expected pages | Not too many blank pages | | |

---

## SECTION 6: Email Delivery

### 6.1 Email Modal

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 6.1.1 | Email modal appears after PDF | Modal displays | | |
| 6.1.2 | "To" field pre-filled | Customer email | | |
| 6.1.3 | "CC" field pre-filled | Rep email | | |
| 6.1.4 | Subject line pre-filled | Contains brand and customer name | | |
| 6.1.5 | Body pre-filled | Professional template text | | |
| 6.1.6 | All fields editable | Can modify any field | | |
| 6.1.7 | "Reset to Default" works | Restores original values | | |

### 6.2 Email Sending

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 6.2.1 | "Send Email" button works | Email sends | | |
| 6.2.2 | Loading indicator during send | Shows progress | | |
| 6.2.3 | Success message appears | Confirmation shown | | |

### 6.3 Customer Email Received

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 6.3.1 | Email arrives at customer address | Check inbox | | |
| 6.3.2 | CC arrives at rep address | Check rep inbox | | |
| 6.3.3 | Subject line correct | Matches modal | | |
| 6.3.4 | Body content correct | Matches modal | | |
| 6.3.5 | PDF attached | Attachment present | | |
| 6.3.6 | PDF opens correctly | Can view attached PDF | | |
| 6.3.7 | From name shows brand | "Tune Energy" or "Exact Water" | | |
| 6.3.8 | Reply-To is rep email | Replies go to rep | | |

### 6.4 Admin Notification Email

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 6.4.1 | Admin email arrives | Check admin inbox | | |
| 6.4.2 | Subject contains key info | Brand, rep, customer | | |
| 6.4.3 | Body has quote details | Quote #, date, amounts | | |
| 6.4.4 | PDF attached | Attachment present | | |
| 6.4.5 | Sent to correct admin email | Address from Settings | | |

### 6.5 Post-Send Modal

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 6.5.1 | Post-send modal appears | 4 button options shown | | |
| 6.5.2 | "Modify quote" returns to Screen 3 | Can edit and resend | | |
| 6.5.3 | "Download PDF" works | PDF downloads | | |
| 6.5.4 | "New Quote" resets form | Confirmation prompt, fresh form | | |
| 6.5.5 | "Exit" closes/redirects | Confirmation prompt, exits | | |

---

## SECTION 7: Quote Logging & History

### 7.1 Quote Logging (After Email Send)

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 7.1.1 | Quote logged to QuoteLog tab | New row appears in spreadsheet | | |
| 7.1.2 | Brand column correct | "TUNE" or "EXACT" | | |
| 7.1.3 | Quote number correct | Matches quote | | |
| 7.1.4 | Quote date correct | Date quote was created | | |
| 7.1.5 | Expires date correct | Quote date + ValidUntilDays | | |
| 7.1.6 | Customer name correct | Matches input | | |
| 7.1.7 | Rep name correct | Matches input | | |
| 7.1.8 | Equipment financed correct | Total from quote | | |
| 7.1.9 | PDF File ID saved | Non-empty value | | |

### 7.2 Tune History Page

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 7.2.1 | Page loads | History table displayed | | |
| 7.2.2 | Only Tune quotes shown | No Exact quotes visible | | |
| 7.2.3 | Quote count accurate | Matches Tune rows in QuoteLog | | |
| 7.2.4 | Search works | Filters by quote #, customer, rep | | |
| 7.2.5 | Sort by date works | Newest/oldest first | | |
| 7.2.6 | Sort by customer works | Alphabetical | | |
| 7.2.7 | Sort by equipment works | High/low amounts | | |
| 7.2.8 | Click quote # opens PDF | PDF displays in new tab | | |
| 7.2.9 | Column header says "Panels" | Not "Meters" | | |

### 7.3 Exact History Page

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 7.3.1 | Page loads | History table displayed | | |
| 7.3.2 | Only Exact quotes shown | No Tune quotes visible | | |
| 7.3.3 | Column header says "Meters" | Not "Panels" | | |
| 7.3.4 | All other features work | Same as Tune history | | |

---

## SECTION 8: Admin Panel

### 8.1 Settings Tab

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 8.1.1 | ValidUntilDays displays | Shows current value (default 30) | | |
| 8.1.2 | Can edit ValidUntilDays | Field is editable | | |
| 8.1.3 | Validates 1-365 range | Rejects invalid values | | |
| 8.1.4 | Save updates spreadsheet | Check Settings tab | | |
| 8.1.5 | AdminEmail displays | Shows current value | | |
| 8.1.6 | Can edit AdminEmail | Field is editable | | |
| 8.1.7 | Validates email format | Rejects invalid emails | | |
| 8.1.8 | Save updates spreadsheet | Check Settings tab | | |
| 8.1.9 | "Send Test Email" works | Test email received | | |

### 8.2 Rate Factors Tab

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 8.2.1 | All rate factors display | 6 values shown (Tier 1-3, various terms) | | |
| 8.2.2 | Tier 1: 36-mo and 60-mo editable | Can change values | | |
| 8.2.3 | Tier 2: 36-mo and 60-mo editable | Can change values | | |
| 8.2.4 | Tier 3: 60-mo and 72-mo editable | Can change values | | |
| 8.2.5 | Validates positive decimals | Rejects invalid values | | |
| 8.2.6 | Save updates spreadsheet | Check Settings tab | | |
| 8.2.7 | Changed rate affects calculations | Generate quote, verify new rate used | | |

### 8.3 All Quotes Tab

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 8.3.1 | Shows ALL quotes | Both Tune and Exact | | |
| 8.3.2 | Brand column visible | Can see which brand | | |
| 8.3.3 | Filter by brand works | Can show only Tune or only Exact | | |
| 8.3.4 | Search works | Filters results | | |
| 8.3.5 | Sort works | All sort options function | | |
| 8.3.6 | Click quote # opens PDF | PDF displays | | |

---

## SECTION 9: Settings Propagation Tests

### 9.1 ValidUntilDays Change

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 9.1.1 | Change ValidUntilDays to 45 | Saves successfully | | |
| 9.1.2 | Generate new quote | PDF shows date + 45 days | | |
| 9.1.3 | Change back to 30 | Saves successfully | | |

### 9.2 AdminEmail Change

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 9.2.1 | Change AdminEmail to test address | Saves successfully | | |
| 9.2.2 | Send a quote email | Admin notification goes to new address | | |
| 9.2.3 | Change back to original | Saves successfully | | |

### 9.3 Rate Factor Change

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 9.3.1 | Note current Tier 1 36-mo rate | Record value: ________ | | |
| 9.3.2 | Change to different value | Saves successfully | | |
| 9.3.3 | Generate Tier 1 quote | New rate used in calculation | | |
| 9.3.4 | Restore original rate | Saves successfully | | |

---

## SECTION 10: Edge Cases & Error Handling

### 10.1 Boundary Values

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 10.1.1 | Equipment = $99,999.99 | Uses Tier 1 rates | | |
| 10.1.2 | Equipment = $100,000.00 | Uses Tier 2 rates | | |
| 10.1.3 | Equipment = $499,999.99 | Uses Tier 2 rates | | |
| 10.1.4 | Equipment = $500,000.00 | Uses Tier 3 rates | | |
| 10.1.5 | Single location quote | Works correctly | | |
| 10.1.6 | Maximum locations (33) | All display in PDF | | |

### 10.2 Error Scenarios

| # | Test | Expected Result | Status | Notes |
|---|------|-----------------|--------|-------|
| 10.2.1 | Invalid email in customer field | Clear error message | | |
| 10.2.2 | Empty required field | Clear error message | | |
| 10.2.3 | Network interruption during PDF | Graceful error handling | | |
| 10.2.4 | Network interruption during email | Graceful error handling | | |

---

## SECTION 11: Cross-Browser Testing (Optional)

| # | Browser | Quote Tool | PDF | Email | Admin | Notes |
|---|---------|------------|-----|-------|-------|-------|
| 11.1 | Chrome | | | | | |
| 11.2 | Firefox | | | | | |
| 11.3 | Edge | | | | | |
| 11.4 | Safari | | | | | |

---

## TEST SUMMARY

**Date Completed:** ___________________

**Total Tests:** 150+

| Section | Passed | Failed | Skipped |
|---------|--------|--------|---------|
| 1. Basic Access | | | |
| 2. Screen 1 | | | |
| 3. Screen 2 | | | |
| 4. Screen 3 | | | |
| 5. PDF Generation | | | |
| 6. Email Delivery | | | |
| 7. Quote Logging | | | |
| 8. Admin Panel | | | |
| 9. Settings Propagation | | | |
| 10. Edge Cases | | | |
| 11. Cross-Browser | | | |
| **TOTAL** | | | |

---

## FAILED TESTS - DETAIL

| Test # | Description | Expected | Actual | Priority |
|--------|-------------|----------|--------|----------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

---

## NOTES & OBSERVATIONS

_Use this space for general observations, suggestions, or questions that arise during testing:_

```




```

---

## SIGN-OFF

**Tester Signature:** ___________________

**Date:** ___________________

**Recommendation:** [ ] Ready for Steve's Review  [ ] Needs Fixes First
