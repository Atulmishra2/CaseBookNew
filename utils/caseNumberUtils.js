/**
 * Shared Case Number & Year Normalization / Formatting Utilities
 * Ensures consistent canonical representation (e.g. "1075/2016") across
 * Case Operations, Duplicate Checks, and all Case Tables.
 */
(function (globalScope) {
  function defaultEscapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Parse a raw case number and optional year into structured parts.
   * Prevents double-year concatenation like "1075/2016/2016".
   */
  function parseCaseNumberAndYear(rawCaseNo, rawYear = '') {
    const cleanedNo = String(rawCaseNo ?? '').trim().replace(/\s+/g, ' ');
    const cleanedYear = String(rawYear ?? '').trim();

    if (!cleanedNo || cleanedNo === '—') {
      return {
        baseNumber: cleanedNo,
        year: cleanedYear,
        formattedCaseNumber: cleanedNo,
      };
    }

    // Trailing year pattern like "1075/2016", "OS/1075/2016", "1075-2016"
    const trailingMatch = cleanedNo.match(/^(.+?)\s*([/\-])\s*((?:19|20|21)\d{2})$/);
    if (trailingMatch) {
      const baseNumber = trailingMatch[1].trim();
      const sep = trailingMatch[2];
      const extractedYear = trailingMatch[3];
      const effectiveYear = /^\d{4}$/.test(cleanedYear) ? cleanedYear : extractedYear;
      return {
        baseNumber,
        year: effectiveYear,
        formattedCaseNumber: `${baseNumber}${sep}${effectiveYear}`,
      };
    }

    // Embedded year pattern like "CIV-2026-089" or "ST-2026-001"
    const embeddedMatch = cleanedNo.match(/(?:^|[/\- ])((?:19|20|21)\d{2})(?:$|[/\- ])/);
    if (embeddedMatch) {
      const extractedYear = embeddedMatch[1];
      const effectiveYear = /^\d{4}$/.test(cleanedYear) ? cleanedYear : extractedYear;
      return {
        baseNumber: cleanedNo,
        year: effectiveYear,
        formattedCaseNumber: cleanedNo,
      };
    }

    // Plain serial/prefix without year (e.g. "1075" + "2016" -> "1075/2016")
    const effectiveYear = /^\d{4}$/.test(cleanedYear) ? cleanedYear : '';
    return {
      baseNumber: cleanedNo,
      year: effectiveYear,
      formattedCaseNumber: effectiveYear ? `${cleanedNo}/${effectiveYear}` : cleanedNo,
    };
  }

  /**
   * Returns canonical combined case number (e.g. "1075/2016").
   */
  function formatCanonicalCaseNumber(rawCaseNo, rawYear = '') {
    return parseCaseNumberAndYear(rawCaseNo, rawYear).formattedCaseNumber;
  }

  /**
   * Splits a case number into { base, year } for two-tone UI rendering.
   */
  function formatCaseNumberParts(rawCaseNo, rawYear = '') {
    const cleanedNo = String(rawCaseNo ?? '').trim();
    const cleanedYear = String(rawYear ?? '').trim();

    if (!cleanedNo || cleanedNo === '—') {
      return { base: '—', year: '' };
    }

    const trailingSlash = cleanedNo.match(/^(.+?)\s*\/\s*((?:19|20|21)\d{2})$/);
    if (trailingSlash) {
      return {
        base: trailingSlash[1].trim(),
        year: trailingSlash[2],
      };
    }

    if (cleanedYear && !cleanedNo.includes(cleanedYear)) {
      return {
        base: cleanedNo,
        year: cleanedYear,
      };
    }

    return { base: cleanedNo, year: '' };
  }

  /**
   * Renders consistent HTML: <strong>1075</strong><span class="case-year-subtext">/2016</span>
   */
  function formatCaseNumberHtml(rawCaseNo, rawYear = '', escapeFn = null) {
    const esc =
      typeof escapeFn === 'function'
        ? escapeFn
        : typeof globalScope.escapeHtml === 'function'
          ? globalScope.escapeHtml
          : defaultEscapeHtml;

    const { base, year } = formatCaseNumberParts(rawCaseNo, rawYear);
    if (year) {
      return `<strong>${esc(base)}</strong><span class="case-year-subtext">/${esc(year)}</span>`;
    }
    return `<strong>${esc(base)}</strong>`;
  }

  /**
   * Normalizes a case number (+ optional year) into a lowercase comparison key.
   */
  function buildCanonicalCaseKey(rawCaseNo, rawYear = '') {
    return formatCanonicalCaseNumber(rawCaseNo, rawYear)
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  globalScope.parseCaseNumberAndYear = parseCaseNumberAndYear;
  globalScope.formatCanonicalCaseNumber = formatCanonicalCaseNumber;
  globalScope.formatCaseNumberParts = formatCaseNumberParts;
  globalScope.formatCaseNumberHtml = formatCaseNumberHtml;
  globalScope.buildCanonicalCaseKey = buildCanonicalCaseKey;
})(typeof window !== 'undefined' ? window : globalThis);
