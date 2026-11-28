/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Courts Module Tests (components/tabs/courts/tab-courts.js)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.courts = ['High Court of Delhi', 'District Court, Saket', 'Patiala House Court'];
    window.allCaseRecords = [
      { caseNo: 'CV-101', courtName: 'District Court, Saket' },
      { caseNo: 'CR-202', criminalCourtName: 'District Court, Saket' },
      { caseNo: 'CV-303', courtName: 'High Court of Delhi' }
    ];
    window.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    window.getDeletedCourtsSet = () => new Set();

    // Load courts.js
    const courtsJsPath = path.resolve(__dirname, '../components/tabs/courts/tab-courts.js');
    const courtsJsCode = fs.readFileSync(courtsJsPath, 'utf8');
    eval(courtsJsCode);

    // Mount tab HTML into document
    document.body.innerHTML = window.__casebook_tabs['courts'];
  });

  it('renders courts list with assigned cases count', () => {
    window.renderCourtsTable();

    const grid = document.getElementById('courtsCardsGrid');
    expect(grid.innerHTML).toContain('District Court, Saket');
    expect(grid.innerHTML).toContain('2 Cases Assigned');
    expect(grid.innerHTML).toContain('High Court of Delhi');
    expect(grid.innerHTML).toContain('1 Case Assigned');

    const countBadge = document.getElementById('courtsTotalCountBadge');
    expect(countBadge.textContent).toBe('3 Courts Configured');
  });

  it('filters courts correctly based on search query', () => {
    window.filterCourtsTable('Saket');

    const grid = document.getElementById('courtsCardsGrid');
    expect(grid.innerHTML).toContain('District Court, Saket');
    expect(grid.innerHTML).not.toContain('Patiala House Court');

    const countBadge = document.getElementById('courtsTotalCountBadge');
    expect(countBadge.textContent).toBe('1 of 3 Courts');
  });

  it('opens and closes edit court modal', () => {
    window.openEditCourtModal('District Court, Saket', 2);

    const modal = document.getElementById('editCourtModal');
    expect(modal.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('editCourtOriginalName').value).toBe('District Court, Saket');
    expect(document.getElementById('editCourtNameInput').value).toBe('District Court, Saket');

    window.closeEditCourtModal();
    expect(modal.classList.contains('hidden')).toBe(true);
  });

  it('confirms and cascades court rename', async () => {
    window.cascadeUpdateCourtName = vi.fn().mockResolvedValue(2);
    window.showToastNotification = vi.fn();

    window.openEditCourtModal('District Court, Saket', 2);
    document.getElementById('editCourtNameInput').value = 'District Court, South Saket';

    await window.confirmSaveEditedCourt();

    expect(window.cascadeUpdateCourtName).toHaveBeenCalledWith('District Court, Saket', 'District Court, South Saket');
    expect(window.showToastNotification).toHaveBeenCalled();
    expect(document.getElementById('editCourtModal').classList.contains('hidden')).toBe(true);
  });

  it('opens delete court modal and executes delete', async () => {
    window.deleteCourtFromSupabase = vi.fn().mockResolvedValue(true);
    window.showToastNotification = vi.fn();

    window.openDeleteCourtModal('Patiala House Court', 0);
    const modal = document.getElementById('deleteCourtModal');
    expect(modal.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('deleteCourtTargetName').value).toBe('Patiala House Court');

    await window.executeDeleteCourtConfirm();

    expect(window.deleteCourtFromSupabase).toHaveBeenCalledWith('Patiala House Court');
    expect(modal.classList.contains('hidden')).toBe(true);
  });

  it('renders assigned cases badge with cases-text span and verifies CSS hover contrast rules', () => {
    window.renderCourtsTable();
    const badge = document.querySelector('.zen-cases-badge.has-cases');
    expect(badge).toBeTruthy();
    const casesTextSpan = badge.querySelector('.cases-text');
    expect(casesTextSpan).toBeTruthy();
    expect(casesTextSpan.textContent).toContain('Cases Assigned');

    // Verify tab-courts.css contains the hover rule ensuring #ffffff text visibility
    const cssPath = path.resolve(__dirname, '../components/tabs/courts/tab-courts.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    expect(cssContent).toContain('.zen-cases-badge.has-cases:hover .cases-text');
    expect(cssContent).toContain('color: #ffffff !important');
  });

  it('verifies mobile responsive layout rules for court-master-head banner', () => {
    const head = document.querySelector('.court-master-head');
    expect(head).toBeTruthy();
    expect(head.querySelector('.head-left')).toBeTruthy();
    expect(head.querySelector('.court-header-actions')).toBeTruthy();
    expect(head.querySelector('.court-refresh-btn')).toBeTruthy();
    expect(head.querySelector('#openAddCourtBtn')).toBeTruthy();

    const cssPath = path.resolve(__dirname, '../components/tabs/courts/tab-courts.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Must have max-width: 768px media query with inline row layout for .court-master-head.board-head
    expect(cssContent).toMatch(/@media screen and \(max-width:\s*768px\)/);
    expect(cssContent).toContain('.court-master-head.board-head');
    expect(cssContent).toContain('flex-direction: row !important');

    // Must make action buttons icon-only and hide text spans on mobile
    expect(cssContent).toContain('.court-master-head .court-header-actions');
    expect(cssContent).toContain('flex: 0 0 auto !important');
    expect(cssContent).toContain('.court-master-head .court-header-actions .court-refresh-btn span');
    expect(cssContent).toContain('display: none !important');
  });

  it('toggles mobile collapsible accordion and expands court details', () => {
    window.renderCourtsTable();
    const row = document.getElementById('court-row-0');
    expect(row).toBeTruthy();
    expect(row.classList.contains('expanded')).toBe(false);

    const toggleBtn = row.querySelector('.zen-expand-toggle');
    expect(toggleBtn).toBeTruthy();
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');

    // Trigger toggle
    window.toggleCourtRow(0);
    expect(row.classList.contains('expanded')).toBe(true);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

    // Trigger toggle again to collapse
    window.toggleCourtRow(0);
    expect(row.classList.contains('expanded')).toBe(false);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders VACANT badge, remarks, and sorts by sort_order', () => {
    window.courts = ['Junior Court B', 'District Judge Court A'];
    window.courtsList = [
      {
        court_name: 'Junior Court B',
        short_code: 'AJM-1',
        civil_title: 'Junior Court B',
        criminal_title: 'Junior Court B',
        cadre: 'Junior Division',
        status: 'VACANT',
        remarks: 'Vacant Presiding Officer',
        sort_order: 2
      },
      {
        court_name: 'District Judge Court A',
        short_code: 'DJ',
        civil_title: 'District Judge',
        criminal_title: 'Sessions Judge',
        cadre: 'District Judge',
        status: 'ACTIVE',
        remarks: '',
        sort_order: 1
      }
    ];

    window.renderCourtsTable();
    const rows = document.querySelectorAll('.zen-court-row');
    expect(rows.length).toBe(2);
    expect(rows[0].getAttribute('data-court')).toBe('District Judge Court A');
    expect(rows[1].getAttribute('data-court')).toBe('Junior Court B');
    expect(rows[1].querySelector('.zen-status-vacant')).toBeTruthy();
    expect(rows[1].innerHTML).toContain('Vacant Presiding Officer');
  });

  it('matches DB cadre in Edit Modal and avoids false rename cascade when civil_title differs', async () => {
    window.cascadeUpdateCourtName = vi.fn().mockResolvedValue(0);
    window.updateCourtMetadata = vi.fn().mockResolvedValue(true);
    window.showToastNotification = vi.fn();
    window.courts = ['District and Sessions Judge, Lakhimpur Kheri'];
    window.courtsList = [
      {
        court_name: 'District and Sessions Judge, Lakhimpur Kheri',
        short_code: 'DJ',
        civil_title: 'District and Sessions Judge',
        criminal_title: 'Sessions Judge',
        cadre: 'District Judge',
        status: 'ACTIVE',
        remarks: ''
      }
    ];

    window.openEditCourtModal('District and Sessions Judge, Lakhimpur Kheri', 1);
    expect(document.getElementById('editCourtNameInput').value).toBe('District and Sessions Judge, Lakhimpur Kheri');
    expect(document.getElementById('editCourtCadreSelect').value).toBe('District Judge');

    document.getElementById('editCourtStatusSelect').value = 'VACANT';
    document.getElementById('editCourtRemarksInput').value = 'Temporarily vacant';
    await window.confirmSaveEditedCourt();

    expect(window.cascadeUpdateCourtName).not.toHaveBeenCalled();
    expect(window.courtsList[0]).toMatchObject({
      court_name: 'District and Sessions Judge, Lakhimpur Kheri',
      cadre: 'District Judge',
      status: 'VACANT',
      remarks: 'Temporarily vacant'
    });
  });

  it('syncAllCourtsFromDatabase filters DELETED rows and populates courtsList', async () => {
    window.allCaseRecords = [];
    window.supabaseClient = {
      from: () => ({
        select: () => ({
          order: async () => ({
            data: [
              { id: '1', court_name: 'Deleted Court', status: 'DELETED', sort_order: 1 },
              { id: '2', court_name: 'Court Two', short_code: 'C2', cadre: 'Senior Division', status: 'VACANT', remarks: 'Vacant', sort_order: 2 },
              { id: '3', court_name: 'Court One', short_code: 'C1', cadre: 'District Judge', status: 'ACTIVE', remarks: '', sort_order: 1 }
            ]
          })
        })
      })
    };
    window.showToastNotification = vi.fn();

    await window.syncAllCourtsFromDatabase();

    expect(window.courts).toEqual(['Court One', 'Court Two']);
    expect(window.courtsList.length).toBe(2);
    expect(window.courtsList[0].court_name).toBe('Court One');
    expect(window.courtsList[1].status).toBe('VACANT');
  });

  it('getUnlinkedCourts excludes courts linked in cases or transfers and respects includeCustom', () => {
    window.courts = [
      'District and Sessions Judge, Lakhimpur Kheri',
      'Addl. District and Sessions Judge Court No. 1',
      'Addl. District and Sessions Judge Court No. 2',
      'Custom Empty Court'
    ];
    window.auditedCourtsData = [
      { court_name: 'District and Sessions Judge, Lakhimpur Kheri' },
      { court_name: 'Addl. District and Sessions Judge Court No. 1' },
      { court_name: 'Addl. District and Sessions Judge Court No. 2' }
    ];
    window.allCaseRecords = [
      { caseNo: 'CV-1', courtName: 'District and Sessions Judge, Lakhimpur Kheri' }
    ];
    window.allCaseTransfers = [
      { fromCourt: 'Addl. District and Sessions Judge Court No. 1', toCourt: 'Other Court' }
    ];

    expect(window.getUnlinkedCourts({ includeCustom: false })).toEqual([
      'Addl. District and Sessions Judge Court No. 2'
    ]);
    expect(window.getUnlinkedCourts({ includeCustom: true })).toEqual([
      'Addl. District and Sessions Judge Court No. 2',
      'Custom Empty Court'
    ]);
  });

  it('opens prune modal and calls bulkDeleteUnlinkedCourts on confirm', async () => {
    window.courts = ['Hardcoded Unused', 'Hardcoded Used'];
    window.auditedCourtsData = [
      { court_name: 'Hardcoded Unused' },
      { court_name: 'Hardcoded Used' }
    ];
    window.allCaseRecords = [{ caseNo: 'CV-1', courtName: 'Hardcoded Used' }];
    window.allCaseTransfers = [];
    window.bulkDeleteUnlinkedCourts = vi.fn().mockResolvedValue(1);
    window.showToastNotification = vi.fn();

    window.openPruneCourtsModal();
    const modal = document.getElementById('pruneCourtsModal');
    expect(modal.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('pruneCourtsListBox').innerHTML).toContain('Hardcoded Unused');
    expect(document.getElementById('pruneCourtsListBox').innerHTML).not.toContain('Hardcoded Used');

    await window.executePruneUnlinkedCourts();
    expect(window.bulkDeleteUnlinkedCourts).toHaveBeenCalledWith(['Hardcoded Unused']);
    expect(modal.classList.contains('hidden')).toBe(true);
  });
});
