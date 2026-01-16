// PDF.JS - PDF Generation Engine
// PSI Quote Tool - Phase C

// Base64 encoded logos (same as Index.html)
const TUNE_LOGO_BASE64 = 'data:image/jpeg;base64,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онд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';

const EXACT_LOGO_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATsAAAA0CAYAAAGC+q8wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAFSpJREFUeNpiYBgp4D8Q0EI9E7piGBtIBWAzCEn+P5p8IjZzYGwk9e9xORaZBoL5yAoCsClGs2Q/ECugi6NZNB9KJwDxeTwO2Y/FgwxIev8TFQUw3+IKDWyhdfzl9/cnXn4H80E0jI3Fs/9xRTWyGAtMgBEIkKJAAMTH4pD56OLoauIOvBQAUgtA7NgDL4lJZoJAIwqAxk4AhR6QXkBuJhCgQkYywCPngE0cIIBGRPHyngw9+0kqXkihQekFSUwAS8YqQNOjQKC4gpUMDXA1WBQ34DIESU6BiLILXcwBLcfuR09vyHYw4MnW55EMuY+mOQBXMQArQkDg5Mvv86F0P7oZ+KIVp+OQNCbgKJj/44saEFBd+QCDjVwD4Kl1MEOOgkxA8+wPEID5arlhGAahUifwKN2gGaXdIO0E3qAjpJs4t4zhATIEbSJbeqUYcE5FiqJgwID4vPxb1w+9wOIIcPFMiiOGEzHSVqywknNLH7ch/VIQeJLuqOAQUuyfMQagyOMDStinLYy0z3nLKWmKWVVSx2uHvImHFP5kVFuUKs8AhoTJ46PgVN6hkX1CaAE4a8dc9VvQrSsh42pBecHRrynPZYu9F/hwxQA/7BvzI9VOKCYujnaWYk/g03zohwSh9RZoR0sPnjskG49lfd6XleqDZxLf8CP1Vp7Utu7Mswuzp820udUQGXGecZ1tXeP6Bv5UzqLjDjFhCJQaOkFL3lsA9qwYR2EYCCq8IBT0eQItXfgBHa2fwBPuB3kCT+AJ6Wh5AEWupAsdpY9IRFpNZtdrwekQOiSkyHa8Xnu9OzP5/32S/jFG4rtoLB8rHv21jVkiXxygrzI4EsNqfUZVi9DfeIqKaA+J+WtDz/py5Oqa2h+gCBaFsaICPor4DhhoyIIqsBGJ3RKqubVJ0cBjAQubxi8R4xJ2jb5xLCxPDto7jXhq73ghQmpjMgCyWQlRvbRIubYeFc7Iq5fimuKUtCu5k2jfDHfH5sniIU/fwURaKa8YGvfB8H0Dm9d58V0Sq6FAiuyCnFzn2LzgiUTjeW+tw4tNlfWHp1SGHG455D8w3uZWQably/bj5RZkO3NSqoce/mz4PZG4CsENC49z8vsAcl2ip7VsvDY/9kvq1awWBWuXfWwO8v0jIid3+r6ecFuRk0rtxEjoV+QEl0bCrZXo7K3IG6mZQs8m7SwXKzmydMKfaEXe7LGb1/u/h2tZa1Fzf/wmDp+0a/2wMbwTYExpOXreVkUmbp0Pc4KNKxnXs9uD609F5MuV4DdiK8vftvEjAPtWr9s2EIOlxkM7RR3aqYOXIqvzBurewXkD6Q3iJ4jyBHafQEa3TvbQXXoDZQ0yOEO79AdBURRtADvpnXEnMAzvjifJSAKIgKFEongSyeORH0899dTTI8MophjWe8JA1W56Xjt+8DHK1QtXRdv1EqTqBt2XWymniDzljJQcnVNUtvawrYf3QHYYqveGOc3CtSw2cbwuba70Xjj1CDdpMemKgjhcRjPxtR3fUGxz6ZjL6FPHMvlhhM25hbehOR0zeDMDLtfo/ZE9Yy+dIb7YoajIAhKMLdciSlm+yS2akZlFfsWQlUM+KJvgM6LcBCzHdr42ERYNM/SJePhZGWNBB01sSLxzVbI5ESMkk46KIxehoEXbygs7gQaM2y6RjpnNieYmSna1rJsczOZ4SIeVx1iVqwXUZMY0pYwrm/E8K8Z4lQmMb5uXMaKEl2PCSOmIOLmp++KgcUPH64JywvEyl44H6H8Jen1oYqwwDDMqLBvANg4GvxQyjwzLsJydIwsOVrZwugV4p3cUz8/rzVw86DZ6ffu7Tl6/GMz13z+uN1ueV88HEPhMv/9bb/nF8RZeE/z1ki3Op3AVkoAjGPZIyFlSuaE4tFo9FJ02vO+SOOfUf4gMXpqU7Wk8OQsSoHj8ncS9PgC8zkFuAb/cq5fqXomPDJfz22Tk579qvhuh/FB+D6IQcXGcJwf7qe2ezW1Q7oVBPVnSg/2wI33csaHNtsppdVs3bfxdSVDvbj8x2dcV8WQ1MhI3nTEGko41FbwvYV4XqE2gig61LOR8Mnk/paIk8yWvYDRRxxLtEK7EuUNONSn4Jr7PIB0l/vxFD3gnoS/fv0mpez5e/K4jpdQ1mP2zlhOdA3XExCo1AfsJZDogP6aaMcaTq00Bbe9Lz8CM0r2lCuBlMcLTFiBXkVEtQjNrBaJQiB1YjaND8wnKO85Q7pETeB7ZazPIh4lzpoqdIVHFHTtyvVzfj69//bOeiV8Af8LpjNGpEA6J+eVPnJ8Y3gXnYmMKwlC2MNESyanUfQkYR0+UKdJZBIrPDOhMpjpRp8A6hkJsG3pxhcNN6qEDEzhg4SpgbMk45ai2pJgLh5h43366LEBHntXjtHXwGdCRSycFs2ArLNBSkyIy40JxPfX0YPRfAPaunTdqIAjbASQCEtw1RAIKXwG0pgI60yNxV1Hi+wfhHxy/IKEHHZRUCRK900HnK5AIorgrCBLiYUcICIRg4suaTOZmd2fXviMCrxQpuXhfs988djwzV7e61a1u/35zaxKUc6fUe7C8ydatbjXoDldbq0kwQ9ABXw304/VnGQQp3Bil48Ak47Qlz8Kr/6NDoipDYv29Kc2Fz3zJ9sxF34TzYMB8EYyTI/olYtN8tGlOa2vG58bwLRHrsY65I8byGM8PiSAC7jkMFXNz4+a4cYqebr/GWMBOX9NFcOP2DCrl2BIhMg0aNXg2MAR7bAJSIJmtgl4tMlN9w7lCzXn2TQI9E44kwV5uQo1lmopBiexAQJhPIgv4ZHAt3seQUg+IOEMZAMRnbZlk4TCu5nlfA56ewmSQgoEZG+hZvrHwmdI1UG080oWKKw42VCwgVBxIUsLukIE+tlBtJmW7jCKFOetATAxrxHLW3i6zXk4QqkwiavYc6xZuG1ksW0CgC3SsMAgz081bYuxIwWieoR0Zm9KxgnPQaZxF0yQfJJzaXO2jk1pe2c1SNpuKIysEHdvu0twSZVK6rQORyiZmgDSZMeiszoNhR4alwFMCdA3urVdxGDBNMSJqy0DD26tIyq2UOShsH+n2jUDaZroxYtnla8ags0sjsLglmXDx0MLN0WZMt0iALjLiNEsGRFqhoWA0SvWslJxPe+suwSClzt0UdNEUQRdyY9kUqikSP4kmaWRqtqKCKVY4UjIjqn0RIB0yQRGpzsxAE/l/C3R5+Dq0fSpL2hBXagwyld8uP0B4DW+6rptSnO8cjCKe6RuDPGnm/dbP4s8DUvvD953x3y6q9vPx+043E0k1G1+2G+dOHhv//8PWTr8IuZhzDiYnIfsulYWKl2CyEfp9ZnR0pxGJQGQ4wdYqykXJiMctegafrWofnMSl5+++/QH+1k7WDM6eSNfefm0cP+Ime/M7nStn5ldRnz0zwHEeXluY78LP8nZ1Yd6tkh6cMcD/0zL5D6brPTolMEPAFbkARQre0EEhVSij/k4VoKekJOf1H0eCvtrcvv5r//aa3F/fXBt+3v7Tt3vp9EQK4cv0RyqAGj5Y3/TnXMff/YzUFGgdyzMQPjMtKJSDbrVQE7m9QuVc2iJeSItlDKxs8quVQsAltkQeAPWcq/WOxRg3we9SOty+eGpw59l7mdlAgv3Fpx/dX/t5qwe8+UfcibXC8TYN927SCkYY3/4pDTQt9eo5II2Qq5qo2pbI3kpRumKRPK1UA44mjxKrbqBepePrvOxFBptwkAac/sHTNznNJnyau5060Y3zq5I+pP2Fs8nQXka7S2lZqtcIAHjCrClx9jn970IBYaJe54iFxAz/Gcxn9cAGG2DiJjLAB1AKoJsslHo6z3hC9cOpjzp/YLb/9T63Jf9X3rQ3vvzsSFILVxV9UqLPiLiswL14mfo771TrhCZCTMwzQmeSMQGX03XJ1jVVxNNBgBRX6SVUnHYR5bmOzZd84cJRGTCQ3pKo1C4BGPxCuU8QBdtd2BhOhBsmKGylbL+4eKHuYQ4sLLURCj9jj6ri9PqWN5CoK1WjkrJlZgD0JMTEKzlPACBU3LQhMzfAufZkwkGR/xyj/OOBbZUAV6b+GG3s0iD6NVVGvJCkPlYdgmv6JvaL5EZmso+UIjo1J1U94MLjEVaxnV0wKm1inPOqKsiMaKVzf3gUTVAJCEcmGAhXlKpRZSv46hWKdPHwmo5bRSZ/KiRhjOyxVOPnuoxURwNwZUtj9OYAeaIZn7OPVNg4Tclh4D3I5oR7SXWAI26jXQatrjNock8xRk8zBpR4LcbFo1lFDZxD26rKGBfed7+myf9Lt7r95+23AO1dvW4bRxA+GUkqA6FcudMJSJo0OT6BKdcBTBdGECCAT08QqUlKU2UqKk9AukkQJMDRRdpQfgIyQJAgdpA7da58FOwAsWzrcmfNWavlzuzvHWV7B2BDkPs3M9/O7O7MePLkydM7QT7I35OJuTdAnNoDvzor50Nmk/PSkydPZwoWmwRnemqEF9Jskp7OyCc18aRLtxFrwlt1njzYeXprLInq+lJkwd31q+PpbRX6nkJybowSFZdHErw0cqG4RJx0LskK0S/OVwDVzdvjNPsavHoaKFbCwsYTCtp1EjgIPHc536EgdU3fYfsRIxu5LEMbU0ViZrg+KRviTehcY5XXiHkNDeU8MTnaIBK49QTrMTVNsiYDhmHhnlLJO9lQtdKF5nxGqomxmFSRedEMxYZzaGpMKSh76Ljd3BEQUYCy46B9LPw/4eRy1JA85EhytlbAjgP6RudkAnYqY8PalgVZvioUFdDPTLPgNJzqfnD67DZjXJ4I3J7qnCck2phjxb6gnRQZg1alPcmT5TH/lp61cAI8enwB8z8Mll+TVmO+FpyG4FHzR/s24MfrNYXxHAVncY/VGDZgLqHC/xfcXCKE/xn3XYi0v29SrI2ZfwVmQ8nPNm1C3SD9gmjsr0tWMi+aQ8na/yZYm1omYgkfz+kE8J6few+RR6oA4F3Rba2ibM3hyGLORenV8nQj4LISCIiskIg9fw9OYzruqMis1stjsGZSF6awputIRXWlKnl4CQsxJywZlexSOfw2tkgGHZtYeJLx12u3YzimUMCT2NS94NZLRJHFOFVoZgF0Q51jE1i31DKRU0SslSxi04nH04S1DBay9rw08pDPdNIdorsnoVBOntITSp9I/jfVBbzifFHGlT+XINykqaYCFg2c/Y0I8Eo1171vujkZKKS1ghJnxHlLcoHJdr8psAPjI3dp0NjKgQLYpU5knlCspAHmDk12fuKsJOdCxykrahiskFSFlFDwtGi3vEzP8Pxn5AKMDNN6ho7AtN/SGke6l3EOwC5twwgg5CfRBLuZqwHtNHXz6VKBJAuSy8znNkFCc6cbKO70oxWMeWCqFAQvQsW+TS9Kkosq+67AywbsiDkPGpqbknEjAbvQxUDCtk14G7Az2O2duOBgLZrcVCV1/4RbHSrMLVkRQM9M3VFdt13xGGKmaMXHbci+xY19Dv/rrADsMKuus0p9J8AucTWQpq7RTainMW6lKgEW69KRnPm5oqmCEBersEoJ92rgQL5ig7PdXFMWOgZgquS+tqQ3TYHdRaGpItgNXAn0hSHHQBdbgNxM4SFuJAEJ1beJA4UdcCUxjzYuLEvHL0/yZy9PCv7z7/MTIRhV34t+X7bTJ/oYLf3nxQlqEfz34iRG+hhaehVTycVC/Qg5XQXYOXyz1ybY9ZoEuwsZUCy5QbLeESQganoNH0nGHCq4ZKsCu6mLG9W/j477D4+OC/7zYHEsPBd7cHSc8L8t25CeoZW/y/n//bU4XgKe3x8/64jGU35SQ/A3PiqRgGeblt30Auh3Y2D3XvAGEfjt2I5ZPVatHh3ylsKd8n8bGo92RZZAVn66JgVUKqpS2JZtVw8dRbdJB9wj2AxpZhUubAXCIiHTjoX96MMPJr8cPh0Xy4m843vZ0+BGePkVf37+50nn/UtrwwfLALX4bOOylIclSG6X/gHPw2SSPt3ub14eQx9h+uT5VPSi/tLa2k2JfIgetkrLNEjkY79sO0Nkryk6EPC2svg6pnJ+0amuFSKu3eGovJgDpaNezp+LPiBewEujLYhIiS5f2sLUghZ8vQf5q2W/q+imbREk3V0WUe4t0ywn384fp4U8ekMAQsHNrz+9MlHsY1QQ1REIZdj/Jrqya7AeSzw0vQgKlqNUULlF5EQpqgjcbBG4TtYIwH8TZY4HOwxMlMKYDCZULfRcFtYjCWGZB0jhAQK0SAsNAxkXoE8wUVR0qeIF5jJvtZVOCVtHm/X4cvooelloVTmphHT8/fWrWnL4xa+PdKppvJKNH65flRXR6gXiOlBWYXCm4IX8XrkOJjytiU0B01DvM8pwaBzsJACBgoojhV+KlYMbtGmAl5mRWloEI+uKJzogaQX6JkIlice13oTARR1BH9tIvCQ2BivB++Snw2GBg/kSv/68tbFu0Ee/0HALS0Xo/nFrY66wbhiI7lqU/qTKKlEygsmV8lgkG+u2i6zHiNEygfYXbYEdW+JpKxDXR60GmutkLmAVir2eRyaxEDAwRxi/B+WlpEIJYLCHnH1hh8lYqaQY5t/TnHtdOA9bt/vE+DF+1OOp35v1FMfTgcuPFMaUMkB2W3N8U5snPSWo7L44KbLyEyh8tg37mJT/HSv2sa8CdPVGi3w/1NUR4MkI+GFyubFHjGWmcmECFilmxY2Y2+Wepu6/TsEUnJ5V8xtE62eDa5quoytaAFLPmX7jAM9IgmZFUVh0qt2lMzDCVRHNgVeQnubwNi1deVdEWQ9a7qCqi/vxj5lKscvxw89DKwu27Ec2/qzsY9NArlQLXPLZY8JA78ySdCkL/eKnFK8pXXFFpKfYimXHCOucKeTo8mwoA3CpaJ0pgh6BQo0QQOmaAh3MZ0zsXAn/NKVaUFDY7YAuO1xn7WU/wjNCZAc+UElFxPBjnbD0TGgMYLtGKRP0rerKKI8PyjzvSUDIxXmx7LB9y1CuuiAnMncx4mQkRACgq7HOvHyojENJV6CtdZOxSAyDXZC17qpue5UPmmEHqQ4YrwEDOwSozcEFmlAKzeS8Ey6QixtQxb7mkpLelYB+xQguNu9qc7gvOIMU7eaZZd41lh+URXlQ88P2Jrc4S8seQb/8/L8z4RlYeaw8zUugc6oQZR88DyowzVz2AXyueHKD0JEF8OQe6MdCIqPaesDIxoZA7u7qnsPBuFjdj5qSN0RXpDrqyZMnT548efLk6V2i/wHW0SN50y96XwAAAABJRU5ErkJggg==';

/**
 * Main entry point - creates PDF from quote data
 * @param {Object} quoteData - Complete quote data object
 * @returns {Object} - {success: boolean, url: string, error: string}
 */
function createPDFQuote(quoteData) {
  try {
    // Build complete HTML document
    const html = buildPDFHTML(quoteData);

    // Create blob from HTML
    const blob = Utilities.newBlob(html, MimeType.HTML, 'quote.html');

    // Convert to PDF
    const pdfBlob = blob.getAs(MimeType.PDF);
    pdfBlob.setName(quoteData.quoteNumber + '.pdf');

    // Get or create the quotes folder
    const folder = getOrCreateQuoteFolder();

    // Save to Drive
    const file = folder.createFile(pdfBlob);

    // Get download URL
    const url = file.getDownloadUrl();

    return {
      success: true,
      url: url,
      fileId: file.getId()
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Builds complete HTML document for PDF conversion
 * @param {Object} quoteData - Complete quote data
 * @returns {string} - Complete HTML string
 */
function buildPDFHTML(quoteData) {
  const brand = quoteData.companyName === 'Exact Water' ? 'EXACT' : 'TUNE';
  const styles = getPDFStyles(brand);

  let html = '<!DOCTYPE html><html><head>';
  html += '<meta charset="UTF-8">';
  html += '<title>' + quoteData.quoteNumber + '</title>';
  html += '<style>' + styles + '</style>';
  html += '</head><body>';

  // Header section
  html += buildPDFHeader(quoteData);

  // Two-column layout
  html += '<div class="two-column">';
  html += buildPDFLeftColumn(quoteData);
  html += buildPDFRightColumn(quoteData);
  html += '</div>';

  html += '</body></html>';

  return html;
}

/**
 * Returns print-optimized CSS for PDF
 * @param {string} brand - 'TUNE' or 'EXACT'
 * @returns {string} - CSS string
 */
function getPDFStyles(brand) {
  const primaryColor = brand === 'EXACT' ? '#0077c7' : '#0066CC';
  const headerBg = brand === 'EXACT' ? '#0077c7' : '#ffffff';
  const titleColor = brand === 'EXACT' ? '#ffffff' : '#0066CC';

  return `
    @page {
      size: letter;
      margin: 0.4in;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, Calibri, sans-serif;
      font-size: 10px;
      line-height: 1.3;
      color: #000;
    }

    /* Header Section */
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      padding: 12px;
      background: ${headerBg};
      border-radius: 4px;
    }

    .title-block {
      flex: 1;
    }

    .main-title {
      font-size: 28px;
      font-weight: 700;
      color: ${titleColor};
      line-height: 1.1;
      margin: 0;
    }

    .logo-block {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .logo-block img {
      max-width: 160px;
      max-height: 60px;
      margin-bottom: 8px;
    }

    /* Metadata Box */
    .metadata-box {
      border: 1px solid ${primaryColor};
      border-radius: 3px;
      overflow: hidden;
    }

    .meta-row {
      display: flex;
      font-size: 9px;
      border-bottom: 1px solid #ccc;
    }

    .meta-row:last-child {
      border-bottom: none;
    }

    .meta-label {
      font-weight: 600;
      background: #E6F2FF;
      padding: 2px 6px;
      width: 70px;
      border-right: 1px solid #ccc;
    }

    .meta-value {
      font-weight: 700;
      color: ${primaryColor};
      text-align: right;
      padding: 2px 6px;
      flex: 1;
      background: white;
    }

    /* Two Column Layout */
    .two-column {
      display: flex;
      gap: 10px;
    }

    .left-column {
      width: 48%;
    }

    .right-column {
      width: 52%;
    }

    /* Info Boxes */
    .info-box {
      border: 0.5px solid #000;
      margin-bottom: 6px;
      overflow: hidden;
    }

    .box-header {
      background: #0000ff;
      color: white;
      padding: 2px 6px;
      font-weight: 700;
      font-size: 12px;
      text-align: center;
    }

    .box-header.teal {
      background: #007d7d;
    }

    .box-content {
      background: white;
    }

    .info-row {
      display: flex;
      border-bottom: 0.5px solid #000;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .info-row .label {
      width: 55%;
      font-weight: 700;
      font-size: 9px;
      text-align: right;
      background: #bfeaf9;
      padding: 2px 4px;
      border-right: 0.5px solid #000;
    }

    .info-row .value {
      width: 45%;
      font-size: 9px;
      text-align: right;
      background: #dbf3fc;
      padding: 2px 4px;
    }

    /* Highlights styling */
    .highlights .info-row .label {
      font-size: 10px;
      color: #0000ff;
      text-align: left;
      background: #d9edff;
    }

    .highlights .info-row .value {
      font-size: 10px;
      font-weight: 700;
      color: #0000ff;
      text-align: center;
      background: #d9edff;
    }

    /* Sites Table */
    .sites-table {
      width: 100%;
      border-collapse: collapse;
      border: 0.5px solid #000;
    }

    .sites-table th {
      background: #7fd0fc;
      padding: 2px 4px;
      font-size: 9px;
      font-weight: 600;
      border: 0.5px solid #000;
      text-align: center;
    }

    .sites-table td {
      padding: 2px 4px;
      font-size: 9px;
      border: 0.5px solid #000;
      background: #d9edff;
      color: #0000ff;
    }

    /* Term Blocks */
    .term-block {
      margin-bottom: 8px;
    }

    .term-header {
      background: #3978b8;
      color: #ffff00;
      padding: 2px 6px;
      font-size: 11px;
      font-weight: 700;
      text-align: center;
    }

    /* Financial Tables */
    .financial-table {
      width: 100%;
      border-collapse: collapse;
      border: 0.5px solid #000;
      margin-bottom: 0;
    }

    .financial-table th {
      background: #7fd0fc;
      padding: 2px 4px;
      font-size: 9px;
      font-weight: 600;
      border: 0.5px solid #000;
      text-align: left;
    }

    .financial-table td {
      padding: 2px 4px;
      font-size: 9px;
      border: 0.5px solid #000;
      background: #d9edff;
    }

    .financial-table td:nth-child(2),
    .financial-table td:nth-child(3) {
      text-align: center;
      font-weight: 600;
    }

    /* ROI Table */
    .roi-table td.roi-label {
      background: #7fd0fc;
      font-weight: bold;
      text-align: center;
      width: 60%;
    }

    .roi-table td.roi-value {
      font-weight: bold;
      font-size: 12px;
      color: #0000ff;
      text-align: center;
      width: 40%;
    }

    /* Footnotes */
    .footnotes {
      font-size: 8px;
      color: #666;
      font-style: italic;
      line-height: 1.2;
      margin-top: 2px;
    }

    .footnotes p {
      margin: 0;
    }

    /* Warning Banner */
    .warning-banner {
      background: #fff3cd;
      border: 1px solid #ffc107;
      padding: 6px;
      margin-bottom: 10px;
      font-size: 10px;
      color: #856404;
    }
  `;
}

/**
 * Builds PDF header section with logo, title, and metadata
 * @param {Object} quoteData - Quote data
 * @returns {string} - HTML string
 */
function buildPDFHeader(quoteData) {
  const brand = quoteData.companyName;
  const logo = brand === 'Exact Water' ? EXACT_LOGO_BASE64 : TUNE_LOGO_BASE64;

  // Calculate valid until date (30 days)
  const quoteDateObj = new Date(quoteData.quoteDate);
  quoteDateObj.setDate(quoteDateObj.getDate() + 30);
  const validUntil = (quoteDateObj.getMonth() + 1) + '/' + quoteDateObj.getDate() + '/' + quoteDateObj.getFullYear();

  let html = '<div class="header-section">';

  // Title block
  html += '<div class="title-block">';
  html += '<h1 class="main-title">' + brand + '<br>Equipment Rental Quote</h1>';
  html += '</div>';

  // Logo and metadata block
  html += '<div class="logo-block">';
  html += '<img src="' + logo + '" alt="Logo">';
  html += '<div class="metadata-box">';
  html += '<div class="meta-row"><span class="meta-label">Date:</span><span class="meta-value">' + quoteData.quoteDate + '</span></div>';
  html += '<div class="meta-row"><span class="meta-label">Quote #:</span><span class="meta-value">' + quoteData.quoteNumber + '</span></div>';
  html += '<div class="meta-row"><span class="meta-label">Valid Until:</span><span class="meta-value">' + validUntil + '</span></div>';
  html += '</div>';
  html += '</div>';

  html += '</div>';

  return html;
}

/**
 * Builds left column: customer info, highlights, sites table
 * @param {Object} quoteData - Quote data
 * @returns {string} - HTML string
 */
function buildPDFLeftColumn(quoteData) {
  const results = quoteData.results;
  const panelsLabel = quoteData.companyName === 'Tune Energy' ? '# of Panels' : '# of Meters';

  let html = '<div class="left-column">';

  // Rental Quote Presented To
  html += '<div class="info-box">';
  html += '<div class="box-header">Rental Quote Presented To</div>';
  html += '<div class="box-content">';
  html += '<div class="info-row"><span class="label">Company</span><span class="value">' + quoteData.customerCompany + '</span></div>';
  html += '<div class="info-row"><span class="label">Contact Name</span><span class="value">' + quoteData.customerContact + '</span></div>';
  html += '<div class="info-row"><span class="label">Contact Email</span><span class="value">' + quoteData.customerEmail + '</span></div>';
  html += '<div class="info-row"><span class="label">Contact Phone</span><span class="value">' + quoteData.customerPhone + '</span></div>';
  html += '</div></div>';

  // Quote Highlights
  html += '<div class="info-box highlights">';
  html += '<div class="box-header teal">Quote Highlights</div>';
  html += '<div class="box-content">';
  html += '<div class="info-row"><span class="label">' + panelsLabel + '</span><span class="value">' + results.totalPanelsMeters.toLocaleString() + '</span></div>';
  html += '<div class="info-row"><span class="label">Equipment Financed</span><span class="value">$' + Math.round(results.totalEquipment).toLocaleString() + '</span></div>';
  html += '<div class="info-row"><span class="label">Gross Savings Per Month</span><span class="value">$' + Math.round(results.grossMonthlySavings).toLocaleString() + '</span></div>';
  html += '<div class="info-row"><span class="label">Gross Savings Percent Per Month</span><span class="value">' + Math.round(results.avgSavingsPercent) + '%</span></div>';
  html += '</div></div>';

  // Sites Table
  html += '<div class="info-box">';
  html += '<div class="box-header teal">Sites in this Quote</div>';
  html += '<div class="box-content">';
  html += '<table class="sites-table"><thead><tr><th>Location</th><th>Utility</th></tr></thead><tbody>';

  // Add actual locations
  for (let i = 0; i < results.locations.length; i++) {
    html += '<tr><td>' + results.locations[i].address + '</td><td>' + results.locations[i].utility + '</td></tr>';
  }

  // Add empty rows to reach 33 total
  const totalRows = 33;
  const emptyRowsNeeded = totalRows - results.locations.length;
  for (let i = 0; i < emptyRowsNeeded; i++) {
    html += '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>';
  }

  html += '</tbody></table>';
  html += '</div></div>';

  html += '</div>';

  return html;
}

/**
 * Builds right column: rep info, term blocks with financial tables
 * @param {Object} quoteData - Quote data
 * @returns {string} - HTML string
 */
function buildPDFRightColumn(quoteData) {
  const results = quoteData.results;

  let html = '<div class="right-column">';

  // Presented By
  html += '<div class="info-box">';
  html += '<div class="box-header">Presented by ' + quoteData.companyName + '</div>';
  html += '<div class="box-content">';
  html += '<div class="info-row"><span class="label">Sales Rep</span><span class="value">' + quoteData.repName + '</span></div>';
  html += '<div class="info-row"><span class="label">Sales Rep Email</span><span class="value">' + quoteData.repEmail + '</span></div>';
  html += '<div class="info-row"><span class="label">Sales Rep Phone</span><span class="value">' + quoteData.repPhone + '</span></div>';
  html += '</div></div>';

  // Rental Term Options
  html += '<div class="info-box">';
  html += '<div class="box-header teal">Rental Term Options & Monthly ROI</div>';
  html += '<div class="box-content" style="padding: 4px;">';

  if (results.tier === 1 || results.tier === 2) {
    html += buildTermBlockPDF('36-Month', results.term36, results.totalMonthlySpend, results.grossMonthlySavings, results.avgSavingsPercent, 36);
    html += buildTermBlockPDF('60-Month', results.term60, results.totalMonthlySpend, results.grossMonthlySavings, results.avgSavingsPercent, 60);
  } else {
    html += buildTermBlockPDF('60-Month', results.term60, results.totalMonthlySpend, results.grossMonthlySavings, results.avgSavingsPercent, 60);
    html += buildTermBlockPDF('72-Month', results.term72, results.totalMonthlySpend, results.grossMonthlySavings, results.avgSavingsPercent, 72);
  }

  html += '</div></div>';

  html += '</div>';

  return html;
}

/**
 * Builds a term block with financial tables
 * @param {string} termLabel - e.g., '36-Month'
 * @param {Object} termData - Calculated term data
 * @param {number} monthlySpend - Total monthly spend
 * @param {number} grossSavings - Gross monthly savings
 * @param {number} savingsPercent - Average savings percentage
 * @param {number} months - Term length in months
 * @returns {string} - HTML string
 */
function buildTermBlockPDF(termLabel, termData, monthlySpend, grossSavings, savingsPercent, months) {
  const netPercent = Math.round((termData.netMonthlySavings / monthlySpend) * 100);

  let html = '<div class="term-block">';
  html += '<div class="term-header">' + termLabel + ' Term Rental Option</div>';

  // Cash Flow During Term Table
  html += '<table class="financial-table">';
  html += '<thead><tr><th colspan="2">Cash Flow During ' + termLabel + ' Term</th><th>$</th><th>Monthly Savings %</th></tr></thead>';
  html += '<tbody>';
  html += '<tr><td colspan="2">Current Monthly Spend</td><td>$' + Math.round(monthlySpend).toLocaleString() + '</td><td></td></tr>';
  html += '<tr><td colspan="2">Gross Monthly Savings</td><td>$' + Math.round(grossSavings).toLocaleString() + '</td><td>' + Math.round(savingsPercent) + '%</td></tr>';
  html += '<tr><td colspan="2">' + termLabel + ' Rental Payment</td><td>$' + Math.round(termData.monthlyPayment).toLocaleString() + '</td><td></td></tr>';
  html += '<tr><td colspan="2">Net Monthly Savings</td><td>$' + Math.round(termData.netMonthlySavings).toLocaleString() + '</td><td>' + netPercent + '%</td></tr>';
  html += '</tbody></table>';

  // Cash Flow After Term Table
  html += '<table class="financial-table">';
  html += '<thead><tr><th colspan="2">Cash Flow After ' + termLabel + ' Term</th><th>$</th><th>Monthly Savings %</th></tr></thead>';
  html += '<tbody>';
  html += '<tr><td colspan="2">Current Monthly Spend</td><td>$' + Math.round(monthlySpend).toLocaleString() + '</td><td></td></tr>';
  html += '<tr><td colspan="2">Gross Monthly Savings</td><td>$' + Math.round(grossSavings).toLocaleString() + '</td><td>' + Math.round(savingsPercent) + '%</td></tr>';
  html += '<tr><td colspan="2">Rental Payment</td><td>$0</td><td></td></tr>';
  html += '<tr><td colspan="2">Net Monthly Savings</td><td>$' + Math.round(grossSavings).toLocaleString() + '</td><td>' + Math.round(savingsPercent) + '%</td></tr>';
  html += '</tbody></table>';

  // Annual Savings Analysis Table
  html += '<table class="financial-table">';
  html += '<thead><tr><th colspan="2">Annual Savings Analysis</th><th>$</th><th>Annual Savings %</th></tr></thead>';
  html += '<tbody>';
  html += '<tr><td colspan="2">1-Year Total Net Savings</td><td>$' + Math.round(termData.netYearlySavings).toLocaleString() + '</td><td>' + netPercent + '%</td></tr>';

  if (months === 36) {
    html += '<tr><td colspan="2">3-Year Total Net Savings</td><td>$' + Math.round(termData.netSavings3Year).toLocaleString() + '</td><td>' + netPercent + '%</td></tr>';
  } else if (months === 60) {
    html += '<tr><td colspan="2">5-Year Total Net Savings</td><td>$' + Math.round(termData.netSavings5Year).toLocaleString() + '</td><td>' + netPercent + '%</td></tr>';
  } else if (months === 72) {
    html += '<tr><td colspan="2">6-Year Total Net Savings</td><td>$' + Math.round(termData.netSavings6Year).toLocaleString() + '</td><td>' + netPercent + '%</td></tr>';
  }

  const tenYearPercent = Math.round((termData.netSavings10Year / (monthlySpend * 120)) * 100);
  html += '<tr><td colspan="2">10-Year Total Net Savings</td><td>$' + Math.round(termData.netSavings10Year).toLocaleString() + '</td><td>' + tenYearPercent + '%</td></tr>';
  html += '</tbody></table>';

  // ROI Metrics Table
  html += '<table class="financial-table roi-table">';
  html += '<tbody>';
  html += '<tr><td class="roi-label">Monthly Return on Rental Payment *</td><td class="roi-value">' + Math.round(termData.roiMonth1 * 100) + '%</td></tr>';

  if (months === 36) {
    html += '<tr><td class="roi-label">3-Year Return on Rental Payment **</td><td class="roi-value">' + Math.round(termData.roi3Year * 100) + '%</td></tr>';
  } else {
    html += '<tr><td class="roi-label">5-Year Return on Rental Payment **</td><td class="roi-value">' + Math.round(termData.roi5Year * 100) + '%</td></tr>';
  }

  html += '<tr><td class="roi-label">10-Year Return on Rental Payment ***</td><td class="roi-value">' + Math.round(termData.roi10Year * 100) + '%</td></tr>';
  html += '</tbody></table>';

  // Footnotes
  html += '<div class="footnotes">';
  html += '<p>* Monthly Return on Rental Payment = Monthly Net Savings / Monthly Rental Payment.</p>';

  if (months === 36) {
    html += '<p>** 3-Year Return on Rental Payment = 3-Year Total Net Savings / 3 Years of Rental Payments.</p>';
  } else {
    html += '<p>** 5-Year Return on Rental Payment = 5-Year Total Net Savings / 5 Years of Rental Payments.</p>';
  }

  html += '<p>*** 10-Year Return on Rental Payment = 10-Year Total Net Savings / ' + (months === 36 ? '3' : months === 60 ? '5' : '6') + ' Years of Rental Payments.</p>';
  html += '</div>';

  html += '</div>';

  return html;
}

/**
 * Gets or creates the Drive folder for storing quote PDFs
 * @returns {Folder} - Google Drive Folder object
 */
function getOrCreateQuoteFolder() {
  const folderName = 'PSI Quote PDFs';
  const folders = DriveApp.getFoldersByName(folderName);

  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

/**
 * Run this FIRST to authorize Drive permissions
 * Run from Apps Script editor: Run > authorizeDrive
 */
function authorizeDrive() {
  // This will trigger the authorization prompt for read
  var folders = DriveApp.getFoldersByName('PSI Quote PDFs');

  // Also authorize folder creation
  if (!folders.hasNext()) {
    var folder = DriveApp.createFolder('PSI Quote PDFs');
    Logger.log('Created folder: ' + folder.getName());
  } else {
    Logger.log('Folder already exists');
  }

  Logger.log('Authorization successful! Drive access granted.');
}

/**
 * Test function for PDF generation
 * Run from Apps Script editor: Run > testPDFGeneration
 */
function testPDFGeneration() {
  const testQuoteData = {
    companyName: 'Tune Energy',
    quoteNumber: 'TUNE-00001',
    quoteDate: '1/15/2026',
    customerCompany: 'Test Company Inc.',
    customerContact: 'John Smith',
    customerEmail: 'john@test.com',
    customerPhone: '555-123-4567',
    repName: 'Jane Doe',
    repEmail: 'jane@tuneenergy.com',
    repPhone: '555-987-6543',
    results: {
      totalEquipment: 17000,
      totalMonthlySpend: 8630,
      totalPanelsMeters: 13,
      avgSavingsPercent: 10,
      grossMonthlySavings: 863,
      tier: 1,
      locationCount: 1,
      locations: [
        { address: '123 Main St, Irvine CA', utility: 'SCE' }
      ],
      term36: {
        monthlyPayment: 556.49,
        netMonthlySavings: 306.51,
        netYearlySavings: 3678.12,
        netSavings3Year: 11034.36,
        netSavings10Year: 83526.36,
        roiMonth1: 0.55,
        roi3Year: 0.55,
        roi10Year: 4.17
      },
      term60: {
        monthlyPayment: 360.39,
        netMonthlySavings: 502.61,
        netYearlySavings: 6031.32,
        netSavings5Year: 30156.60,
        netSavings10Year: 81936.60,
        roiMonth1: 1.39,
        roi5Year: 1.39,
        roi10Year: 3.79
      }
    }
  };

  const result = createPDFQuote(testQuoteData);
  Logger.log(result);
}
