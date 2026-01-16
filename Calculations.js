// CALCULATIONS.GS - Lease Calculation Engine
// PSI Quote Tool - Step 6

/**
 * Main calculation function - receives location data, returns all calculated values
 * @param {Array} locations - Array of location objects from the form
 * @returns {Object} - All calculated values for quote display
 */
function calculateQuote(locations) {
  
  // STEP 1: Portfolio Totaling
  let totalEquipment = 0;
  let totalMonthlySpend = 0;
  let totalPanelsMeters = 0;
  let savingsPercentages = [];
  
  for (let i = 0; i < locations.length; i++) {
    totalEquipment += locations[i].equipmentCost;
    totalMonthlySpend += locations[i].monthlySpend;
    totalPanelsMeters += locations[i].panelsMeters;
    savingsPercentages.push(locations[i].savingsPercent);
  }
  
  // STEP 2: Average Savings Percentage
  let avgSavingsPercent = savingsPercentages.reduce((a, b) => a + b, 0) / savingsPercentages.length;
  
  // STEP 3: Calculate Gross Monthly Savings
  let grossMonthlySavings = totalMonthlySpend * (avgSavingsPercent / 100);
  
  // STEP 4: Determine Tier
  let tier = determineTier(totalEquipment);
  
  // STEP 5: Get Rate Factors
  let rateFactors = getRateFactors(tier);
  
  // STEP 6: Calculate for each applicable term
  let results = {
    // Portfolio totals
    totalEquipment: totalEquipment,
    totalMonthlySpend: totalMonthlySpend,
    totalPanelsMeters: totalPanelsMeters,
    avgSavingsPercent: avgSavingsPercent,
    grossMonthlySavings: grossMonthlySavings,
    tier: tier,
    locationCount: locations.length,
    locations: locations
  };
  
  // Add term calculations based on tier
  if (tier === 1 || tier === 2) {
    results.term36 = calculate36Month(totalEquipment, grossMonthlySavings, rateFactors.rate36);
    results.term60 = calculate60Month(totalEquipment, grossMonthlySavings, rateFactors.rate60);
  } else {
    // Tier 3
    results.term60 = calculate60Month(totalEquipment, grossMonthlySavings, rateFactors.rate60);
    results.term72 = calculate72Month(totalEquipment, grossMonthlySavings, rateFactors.rate72);
  }
  
  return results;
}

/**
 * Determine pricing tier based on total equipment cost
 * Tier 1: $0 - $99,999.99
 * Tier 2: $100,000 - $499,999.99
 * Tier 3: $500,000+
 */
function determineTier(totalEquipment) {
  if (totalEquipment < 100000) {
    return 1;
  } else if (totalEquipment < 500000) {
    return 2;
  } else {
    return 3;
  }
}

/**
 * Get rate factors for the given tier
 * Returns object with applicable rates (rate36, rate60, rate72)
 */
function getRateFactors(tier) {
  // Rate factors with 7 decimal precision
  const rateTable = {
    1: { rate36: 0.0327348, rate60: 0.0211993, rate72: null },
    2: { rate36: 0.0327439, rate60: 0.0213861, rate72: null },
    3: { rate36: null, rate60: 0.0208989, rate72: 0.0180061 }
  };
  
  return rateTable[tier];
}

/**
 * 36-Month Term Calculations (Tier 1 & 2 only)
 * Item IDs from spec: F through T
 */
function calculate36Month(equipmentCost, grossMonthlySavings, rateFactor) {
  // F: Monthly Rental Payment
  const monthlyPayment = equipmentCost * rateFactor;
  
  // G: Net Savings / Month (during lease)
  const netMonthlySavings = grossMonthlySavings - monthlyPayment;
  
  // H: Net Savings / Year (during lease)
  const netYearlySavings = netMonthlySavings * 12;
  
  // I: Net Savings / 3 Years (end of lease term)
  const netSavings3Year = netYearlySavings * 3;
  
  // K: Net Savings / Month (post-lease) - equals gross savings
  const postLeaseMonthly = grossMonthlySavings;
  
  // L: Net Savings Months 37-60 (24 months of full savings)
  const savings37to60 = postLeaseMonthly * 24;
  
  // N: Net Savings / 5 Years
  const netSavings5Year = netSavings3Year + savings37to60;
  
  // P: Net Savings / 10 Years (36 months lease + 84 months post-lease)
  const netSavings10Year = netSavings3Year + (postLeaseMonthly * 84);
  
  // R: ROI Month 1 (monthly return)
  const roiMonth1 = netMonthlySavings / monthlyPayment;
  
  // S: ROI 3-Year (vs total lease payments)
  const totalLeasePayments = monthlyPayment * 36;
  const roi3Year = netSavings3Year / totalLeasePayments;
  
  // T: ROI 10-Year (vs total lease payments)
  const roi10Year = netSavings10Year / totalLeasePayments;
  
  return {
    monthlyPayment: monthlyPayment,
    netMonthlySavings: netMonthlySavings,
    netYearlySavings: netYearlySavings,
    netSavings3Year: netSavings3Year,
    netSavings10Year: netSavings10Year,
    roiMonth1: roiMonth1,
    roi3Year: roi3Year,  
    roi10Year: roi10Year
  };
}

/**
 * 60-Month Term Calculations (All tiers)
 * Item IDs from spec: U through AF
 */
function calculate60Month(equipmentCost, grossMonthlySavings, rateFactor) {
  // U: Monthly Rental Payment
  const monthlyPayment = equipmentCost * rateFactor;
  
  // V: Net Savings / Month (during lease)
  const netMonthlySavings = grossMonthlySavings - monthlyPayment;
  
  // W: Net Savings / Year (during lease)
  const netYearlySavings = netMonthlySavings * 12;
  
  // X: Net Savings / 5 Years (end of lease term)
  const netSavings5Year = netYearlySavings * 5;
  
  // Z: Net Savings / Month (post-lease) - equals gross savings
  const postLeaseMonthly = grossMonthlySavings;
  
  // AA: Net Savings Months 61-120 (60 months of full savings)
  const savings61to120 = postLeaseMonthly * 60;
  
  // AB: Net Savings / 10 Years
  const netSavings10Year = netSavings5Year + savings61to120;
  
  // AD: ROI Month 1 (monthly return)
  const roiMonth1 = netMonthlySavings / monthlyPayment;
  
  // AE: ROI 5-Year (vs total lease payments)
  const totalLeasePayments = monthlyPayment * 60;
  const roi5Year = netSavings5Year / totalLeasePayments;
  
  // AF: ROI 10-Year (vs total lease payments)
  const roi10Year = netSavings10Year / totalLeasePayments;
  
  return {
    monthlyPayment: monthlyPayment,
    netMonthlySavings: netMonthlySavings,
    netYearlySavings: netYearlySavings,
    netSavings5Year: netSavings5Year,
    netSavings10Year: netSavings10Year,
    roiMonth1: roiMonth1,
    roi5Year: roi5Year,
    roi10Year: roi10Year
  };
}

/**
 * 72-Month Term Calculations (Tier 3 only)
 * Item IDs from spec: AG through AR
 */
function calculate72Month(equipmentCost, grossMonthlySavings, rateFactor) {
  // AG: Monthly Rental Payment
  const monthlyPayment = equipmentCost * rateFactor;
  
  // AH: Net Savings / Month (during lease)
  const netMonthlySavings = grossMonthlySavings - monthlyPayment;
  
  // AI: Net Savings / Year (during lease)
  const netYearlySavings = netMonthlySavings * 12;
  
  // AJ: Net Savings / 6 Years (end of lease term)
  const netSavings6Year = netYearlySavings * 6;
  
  // AL: Net Savings / Month (post-lease) - equals gross savings
  const postLeaseMonthly = grossMonthlySavings;
  
  // AM: Net Savings Months 73-120 (48 months of full savings)
  const savings73to120 = postLeaseMonthly * 48;
  
  // AN: Net Savings / 10 Years
  const netSavings10Year = netSavings6Year + savings73to120;
  
  // AP: ROI Month 1 (monthly return)
  const roiMonth1 = netMonthlySavings / monthlyPayment;
  
  // AQ: ROI 5-Year (vs payments through month 60)
  const payments5Year = monthlyPayment * 60;
  const roi5Year = (netYearlySavings * 5) / payments5Year;
  
  // AR: ROI 10-Year (vs total lease payments)
  const totalLeasePayments = monthlyPayment * 72;
  const roi10Year = netSavings10Year / totalLeasePayments;
  
  return {
    monthlyPayment: monthlyPayment,
    netMonthlySavings: netMonthlySavings,
    netYearlySavings: netYearlySavings,
    netSavings6Year: netSavings6Year,
    netSavings10Year: netSavings10Year,
    roiMonth1: roiMonth1,
    roi5Year: roi5Year,
    roi10Year: roi10Year
  };
}

/**
 * TEST FUNCTION - Validates calculations against Excel test case
 * Run this from Apps Script editor: Run > testCalculations
 */
function testCalculations() {
  // Test case from spec (single location, Tier 1)
  const testLocations = [{
    address: 'Test Location',
    utility: 'Test Utility',
    monthlySpend: 8630,
    equipmentCost: 17000,
    savingsPercent: 10,
    panelsMeters: 1
  }];
  
  const results = calculateQuote(testLocations);
  
  Logger.log('=== CALCULATION TEST RESULTS ===');
  Logger.log('');
  Logger.log('INPUT VALUES:');
  Logger.log('Monthly Spend: $' + results.totalMonthlySpend);
  Logger.log('Equipment Cost: $' + results.totalEquipment);
  Logger.log('Savings %: ' + results.avgSavingsPercent + '%');
  Logger.log('Tier: ' + results.tier);
  Logger.log('');
  Logger.log('CALCULATED VALUES:');
  Logger.log('Gross Monthly Savings: $' + results.grossMonthlySavings.toFixed(2));
  Logger.log('');
  Logger.log('36-MONTH TERM:');
  Logger.log('Monthly Payment: $' + results.term36.monthlyPayment.toFixed(2) + ' (Expected: $556.49)');
  Logger.log('Net Monthly Savings: $' + results.term36.netMonthlySavings.toFixed(2) + ' (Expected: $306.51)');
  Logger.log('Month 1 ROI: ' + (results.term36.roiMonth1 * 100).toFixed(1) + '% (Expected: 55.1%)');
  Logger.log('3-Year Net Savings: $' + results.term36.netSavings3Year.toFixed(2) + ' (Expected: $11,034.32)');
  Logger.log('10-Year Net Savings: $' + results.term36.netSavings10Year.toFixed(2) + ' (Expected: $83,526.30)');
  Logger.log('');
  Logger.log('60-MONTH TERM:');
  Logger.log('Monthly Payment: $' + results.term60.monthlyPayment.toFixed(2) + ' (Expected: $360.39)');
  Logger.log('Net Monthly Savings: $' + results.term60.netMonthlySavings.toFixed(2) + ' (Expected: $502.61)');
  Logger.log('Month 1 ROI: ' + (results.term60.roiMonth1 * 100).toFixed(1) + '% (Expected: 139.5%)');
  Logger.log('5-Year Net Savings: $' + results.term60.netSavings5Year.toFixed(2) + ' (Expected: $30,156.71)');
  Logger.log('10-Year Net Savings: $' + results.term60.netSavings10Year.toFixed(2) + ' (Expected: $81,936.71)');
}
