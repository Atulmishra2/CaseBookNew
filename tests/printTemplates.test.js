import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/print/print-templates.js';
import '../components/tabs/undated/tab-undated.js';
import '../components/tabs/all/tab-all.js';

describe('components/print/print-templates.js - DOM Mounting & Structure', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('ensurePrintTemplatesMounted should auto-create container and mount print templates', () => {
    expect(window.ensurePrintTemplatesMounted).toBeDefined();
    const dossierEl = window.ensurePrintTemplatesMounted();
    expect(dossierEl).not.toBeNull();
    expect(dossierEl.id).toBe('printableCaseDossier');

    const causeListEl = document.getElementById('printableCauseList');
    expect(causeListEl).not.toBeNull();
  });
});

describe('components/print/print-templates.js - populatePrintableCaseDossier for Different Case Types', () => {
  beforeEach(() => {
    window.ensurePrintTemplatesMounted();
  });

  it('populates Civil suit details accurately', () => {
    const civilCase = {
      caseNo: 'CS/55/2025',
      caseYear: '2025',
      caseType: 'civil',
      courtName: 'Civil Judge Senior Division',
      plaintiff: 'Rameshwar',
      defendant: 'Someshwar',
      filingDate: '2025-01-15',
      nextHearing: '2026-11-20',
      hearingProcess: 'Evidence',
      previousHearing: '2026-08-10',
      previousProcess: 'Framing of Issues',
      clientName: 'Rameshwar Dayal',
      clientNumber: '9988776655',
      remarks: 'Injunction application pending disposal.'
    };

    window.populatePrintableCaseDossier(civilCase);

    expect(document.getElementById('casePrintTypeBadge').textContent).toBe('CIVIL CASE');
    expect(document.getElementById('casePrintNo').textContent).toBe('CS/55/2025');
    expect(document.getElementById('casePrintTitle').textContent).toBe('Rameshwar vs Someshwar');
    expect(document.getElementById('casePrintCourt').textContent).toBe('Civil Judge Senior Division');
    expect(document.getElementById('casePrintClientName').textContent).toBe('Rameshwar Dayal');
    expect(document.getElementById('casePrintClientPhone').textContent).toBe('9988776655');
    expect(document.getElementById('casePrintRemarks').textContent).toContain('Injunction application');
  });

  it('populates Criminal case particulars including FIR and IPC sections', () => {
    const criminalCase = {
      criminalCaseNumber: 'ST/108/2026',
      crimeYear: '2026',
      caseType: 'criminal',
      criminalCourtName: 'Additional Sessions Court',
      victimName: 'State',
      accusedName: 'Kuldeep Singh',
      policeStation: 'Kotwali Nagar',
      crimeNumber: '420',
      crimeSection: '302, 120B IPC',
      custodyStatus: 'In Judicial Custody',
      clientName: 'Smt. Kamla Devi',
      clientNumber: '9876501234'
    };

    window.populatePrintableCaseDossier(criminalCase);

    expect(document.getElementById('casePrintTypeBadge').textContent).toBe('CRIMINAL CASE');
    expect(document.getElementById('casePrintNo').textContent).toBe('ST/108/2026');
    expect(document.getElementById('casePrintTitle').textContent).toBe('State vs Kuldeep Singh');

    const partiesContent = document.getElementById('casePrintPartiesContent').innerHTML;
    expect(partiesContent).toContain('Kotwali Nagar');
    expect(partiesContent).toContain('302, 120B IPC');
    expect(partiesContent).toContain('In Judicial Custody');
  });

  it('does not duplicate crimeYear when crimeNumber already includes a slash year', () => {
    const stateCase = {
      caseNo: '405/2025',
      caseType: 'state',
      courtName: 'ADJ EC Act',
      victimName: 'State of U.P.',
      accusedName: 'Aasharam',
      crimeNumber: '1064/2025',
      crimeYear: '2025'
    };

    window.populatePrintableCaseDossier(stateCase);
    const partiesContent = document.getElementById('casePrintPartiesContent').innerHTML;
    expect(partiesContent).toContain('1064/2025');
    expect(partiesContent).not.toContain('1064/2025 / 2025');
  });

  it('populates Family dispute particulars including marriage date and maintenance', () => {
    const familyCase = {
      caseNo: 'MAT/12/2025',
      caseType: 'family',
      courtName: 'Principal Judge Family Court',
      petitioner: 'Priya Sharma',
      respondent: 'Amit Sharma',
      marriageDate: '2020-02-14',
      maintenance: '₹15,000 / Month claimed under Sec 125 CrPC',
      clientName: 'Priya Sharma'
    };

    window.populatePrintableCaseDossier(familyCase);

    expect(document.getElementById('casePrintTypeBadge').textContent).toBe('FAMILY CASE');
    expect(document.getElementById('casePrintTitle').textContent).toBe('Priya Sharma vs Amit Sharma');

    const partiesContent = document.getElementById('casePrintPartiesContent').innerHTML;
    expect(partiesContent).toContain('14/02/2020');
    expect(partiesContent).toContain('15,000');
  });

  it('populates Revenue matter particulars including village and Khata/Gata numbers', () => {
    const revenueCase = {
      caseNo: 'REV/77/2026',
      caseType: 'revenue',
      courtName: 'SDM Court',
      applicant: 'Balram',
      respondent: 'Gram Sabha',
      village: 'Behta',
      khataNo: '142',
      gataNo: '588',
      clientName: 'Balram Yadav'
    };

    window.populatePrintableCaseDossier(revenueCase);

    expect(document.getElementById('casePrintTypeBadge').textContent).toBe('REVENUE CASE');

    const partiesContent = document.getElementById('casePrintPartiesContent').innerHTML;
    expect(partiesContent).toContain('Behta');
    expect(partiesContent).toContain('Khata: 142');
    expect(partiesContent).toContain('Gata: 588');
  });

  it('handles disposed case status and disposal comment properly', () => {
    const disposedCase = {
      caseNo: 'CS/01/2020',
      caseType: 'civil',
      status: 'disposed',
      disposalComment: 'Suit decreed with costs in favor of plaintiff.'
    };

    window.populatePrintableCaseDossier(disposedCase);

    expect(document.getElementById('casePrintStatus').textContent).toBe('Disposed Off');
    const dispRow = document.getElementById('casePrintDisposalRow');
    expect(dispRow.style.display).not.toBe('none');
    expect(document.getElementById('casePrintDisposalComment').textContent).toContain('decreed with costs');
  });
});

describe('components/print/print-templates.js - printCurrentCaseDossier Execution', () => {
  beforeEach(() => {
    window.ensurePrintTemplatesMounted();
  });

  it('printCurrentCaseDossier adds printing class and invokes window.print()', () => {
    const printMock = vi.fn();
    window.print = printMock;

    const caseObj = {
      caseNo: 'CS/88/2026',
      caseName: 'Test Print Matter',
      caseType: 'civil'
    };

    window.printCurrentCaseDossier(caseObj);

    expect(printMock).toHaveBeenCalled();
    expect(document.body.classList.contains('printing-case-dossier')).toBe(true);
  });

  it('alerts when printCurrentCaseDossier is called with no case', () => {
    const alertMock = vi.fn();
    window.alert = alertMock;
    const origToast = window.showToast;
    const origGlobalToast = globalThis.showToast;
    delete window.showToast;
    delete globalThis.showToast;
    window.currentSelectedCase = null;

    try {
      window.printCurrentCaseDossier(null);
      expect(alertMock).toHaveBeenCalledWith('Please select a case to print.');
    } finally {
      if (origToast) window.showToast = origToast;
      if (origGlobalToast) globalThis.showToast = origGlobalToast;
    }
  });
});

describe('components/print/print-templates.js - Undated & Complete Cases Register Print', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.ensurePrintTemplatesMounted();
  });

  it('printUndatedCasesList renders exact 5 columns with blank Next Date cell', () => {
    const printMock = vi.fn();
    window.print = printMock;

    const sampleRecords = [
      {
        caseNo: '405/2025',
        caseName: 'State vs Aasharam',
        caseType: 'state',
        courtName: 'ADJ EC Act',
        previousHearing: '2025-01-01',
        nextHearing: ''
      },
      {
        caseNo: '88/2025',
        caseName: 'Mohan vs Sohan',
        caseType: 'civil',
        courtName: 'ACJM',
        previousHearing: '2025-09-04',
        nextHearing: '2099-12-31'
      }
    ];

    window.printUndatedCasesList({ records: sampleRecords });

    expect(printMock).toHaveBeenCalled();
    expect(document.body.classList.contains('printing-cases-report')).toBe(true);

    const headers = Array.from(document.querySelectorAll('#casesReportTableHead th')).map(th => th.textContent.trim());
    expect(headers).toEqual(['Case Number', 'Case Name', 'Court', 'Last Date', 'Next Date']);

    const rows = document.querySelectorAll('#casesReportTableBody tr');
    expect(rows.length).toBe(1);
    const cells = rows[0].querySelectorAll('td');
    expect(cells[0].textContent).toBe('405/2025');
    expect(cells[1].textContent).toBe('State vs Aasharam');
    expect(cells[2].textContent).toBe('ADJ EC Act');
    expect(cells[4].textContent).toBe('');
  });

  it('printAllCasesRegister renders court heading, group headers, and exact 5 columns', () => {
    const printMock = vi.fn();
    window.print = printMock;

    const sampleRecords = [
      {
        caseNo: '88/2025',
        caseName: 'Mohan vs Sohan',
        caseType: 'civil',
        courtName: 'ACJM',
        previousHearing: '2026-09-04',
        hearingProcess: 'Evidence'
      },
      {
        caseNo: '142/2024',
        caseName: 'State vs Raju',
        caseType: 'state',
        courtName: 'ACJM',
        previousHearing: '2026-10-12',
        hearingProcess: 'Appearance'
      }
    ];

    window.printAllCasesRegister('court', { records: sampleRecords, filterLabel: 'Court: ACJM' });

    expect(printMock).toHaveBeenCalled();
    expect(document.getElementById('casesReportMainTitle').textContent).toContain('COURT: ACJM');

    const headers = Array.from(document.querySelectorAll('#casesReportTableHead th')).map(th => th.textContent.trim());
    expect(headers).toEqual(['Case Number', 'Case Name', 'Court', 'Last Date', 'Stage']);

    const groupRows = document.querySelectorAll('#casesReportTableBody tr.print-group-header');
    expect(groupRows.length).toBe(1);
    expect(groupRows[0].textContent).toContain('ACJM (2 Cases)');
  });
});

describe('UI Print Buttons Integration (Undated Tab & All Cases Tab)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.allCaseRecords = [];
    window.allCases = [];
    window.ensurePrintTemplatesMounted();
  });

  it('clicking #undatedPrintBtn in Undated tab prints only undated cases', () => {
    const printMock = vi.fn();
    window.print = printMock;

    window.allCases = [];
    window.allCaseRecords = [
      {
        caseNo: '101/2025',
        caseName: 'Alpha vs Beta',
        caseType: 'civil',
        courtName: 'ACJM',
        previousHearing: '2026-05-01',
        nextHearing: ''
      },
      {
        caseNo: '102/2025',
        caseName: 'Gamma vs Delta',
        caseType: 'civil',
        courtName: 'ACJM',
        previousHearing: '2026-05-01',
        nextHearing: '2099-12-31'
      }
    ];

    const host = document.createElement('div');
    host.id = 'undated';
    host.innerHTML = window.__casebook_tabs.undated;
    document.body.appendChild(host);

    const btn = document.getElementById('undatedPrintBtn');
    expect(btn).not.toBeNull();
    btn.click();

    expect(printMock).toHaveBeenCalledTimes(1);
    const rows = document.querySelectorAll('#casesReportTableBody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('101/2025');
    expect(rows[0].textContent).not.toContain('102/2025');
  });

  it('clicking #allCasesPrintBtn opens sort menu and clicking sort options prints sorted register', () => {
    const printMock = vi.fn();
    window.print = printMock;

    window.allCases = [
      {
        caseNo: '10/2023',
        caseYear: '2023',
        caseName: 'Old Case',
        caseType: 'civil',
        courtName: 'Civil Judge',
        previousHearing: '2025-01-10',
        hearingProcess: 'Evidence'
      },
      {
        caseNo: '50/2025',
        caseYear: '2025',
        caseName: 'New Case',
        caseType: 'state',
        courtName: 'ACJM',
        previousHearing: '2026-02-15',
        hearingProcess: 'Appearance'
      }
    ];

    const host = document.createElement('div');
    host.id = 'all';
    host.innerHTML = window.__casebook_tabs.all;
    document.body.appendChild(host);

    const printBtn = document.getElementById('allCasesPrintBtn');
    const menu = document.getElementById('allCasesPrintMenu');
    expect(printBtn).not.toBeNull();
    expect(menu).not.toBeNull();

    // Open menu
    printBtn.click();
    expect(menu.classList.contains('open')).toBe(true);
    expect(printBtn.getAttribute('aria-expanded')).toBe('true');

    // Click "Year-wise (Newest First)"
    const yearDescBtn = Array.from(menu.querySelectorAll('.all-print-item'))
      .find(b => b.textContent.includes('Year-wise (Newest First)'));
    expect(yearDescBtn).toBeDefined();
    yearDescBtn.click();

    expect(menu.classList.contains('open')).toBe(false);
    expect(printBtn.getAttribute('aria-expanded')).toBe('false');
    expect(printMock).toHaveBeenCalledTimes(1);

    const groupHeaders = Array.from(document.querySelectorAll('#casesReportTableBody tr.print-group-header'))
      .map(tr => tr.textContent.trim());
    expect(groupHeaders[0]).toContain('Year: 2025');
    expect(groupHeaders[1]).toContain('Year: 2023');

    // Test Case Type-wise option
    printBtn.click();
    const caseTypeBtn = Array.from(menu.querySelectorAll('.all-print-item'))
      .find(b => b.textContent.includes('Case Type-wise'));
    caseTypeBtn.click();
    expect(printMock).toHaveBeenCalledTimes(2);
    const typeHeaders = Array.from(document.querySelectorAll('#casesReportTableBody tr.print-group-header'))
      .map(tr => tr.textContent.trim());
    expect(typeHeaders).toContain('Case Type: Civil (1 Case)');
    expect(typeHeaders).toContain('Case Type: State / Criminal (1 Case)');
  });

  it('respects #allCasesPrintUseFilters checkbox when active search/court filter is set', () => {
    const printMock = vi.fn();
    window.print = printMock;

    window.allCases = [
      { caseNo: '1/2025', caseName: 'ACJM Matter', caseType: 'state', courtName: 'ACJM' },
      { caseNo: '2/2025', caseName: 'SDM Matter', caseType: 'revenue', courtName: 'SDM Court' }
    ];

    const host = document.createElement('div');
    host.id = 'all';
    host.innerHTML = window.__casebook_tabs.all;
    document.body.appendChild(host);

    // Simulate active search filter for "ACJM"
    const searchInput = document.getElementById('allCasesSearchInput');
    if (searchInput) searchInput.value = 'ACJM';

    const checkbox = document.getElementById('allCasesPrintUseFilters');
    expect(checkbox.checked).toBe(true);

    // Print with filters active -> only 1 row
    window.handleAllCasesPrint('court');
    expect(document.querySelectorAll('#casesReportTableBody tr:not(.print-group-header)').length).toBe(1);
    expect(document.getElementById('casesReportMainTitle').textContent).toContain('COURT: ACJM');

    // Uncheck filters -> all 2 rows print
    checkbox.checked = false;
    window.handleAllCasesPrint('court');
    expect(document.querySelectorAll('#casesReportTableBody tr:not(.print-group-header)').length).toBe(2);
  });
});
