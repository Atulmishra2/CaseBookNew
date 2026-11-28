/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Archived Cases Tab Module Tests (components/tabs/archived/tab-archived.js)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.allCaseRecords = [];
    window.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    window.remarksToPlainText = (r) => String(r || '');

    // Load caseService helpers first
    const caseServicePath = path.resolve(__dirname, '../services/caseService.js');
    const caseServiceCode = fs.readFileSync(caseServicePath, 'utf8');
    eval(caseServiceCode);

    // Load archived tab module
    const archivedJsPath = path.resolve(__dirname, '../components/tabs/archived/tab-archived.js');
    const archivedJsCode = fs.readFileSync(archivedJsPath, 'utf8');
    eval(archivedJsCode);

    // Mount tab HTML into document
    document.body.innerHTML = window.__casebook_tabs['archived'];
    const badge = document.createElement('span');
    badge.id = 'archivedCount';
    document.body.appendChild(badge);
  });

  it('renders empty state when there are no archived cases', () => {
    window.allCaseRecords = [
      {
        caseNo: 'CV-101',
        caseStatus: 'Pending',
        plaintiff: 'A',
        defendant: 'B'
      },
      {
        caseNo: 'CV-102',
        caseStatus: 'Disposed',
        plaintiff: 'C',
        defendant: 'D'
      }
    ];

    window.renderArchivedCasesTable();

    const tbody = document.querySelector('#archivedCasesTable tbody');
    expect(tbody.innerHTML).toContain('No archived cases recorded yet.');
    expect(document.getElementById('archivedCount').textContent).toBe('0');
  });

  it('renders archived cases (Client Stopped Coming & Advocate Changed) and excludes Pending/Disposed', () => {
    window.allCaseRecords = [
      {
        caseNo: 'CV-201',
        caseType: 'civil',
        plaintiff: 'Ramesh',
        defendant: 'Suresh',
        courtName: 'Civil Judge (SD)',
        caseStatus: 'Archived: Client Left',
        disposalComment: 'Client stopped coming after 3 dates'
      },
      {
        caseNo: 'CR-305',
        caseType: 'state',
        victimName: 'State',
        accusedName: 'Mohan',
        criminalCourtName: 'Sessions Court',
        caseStatus: 'Archived: Advocate Changed',
        disposalComment: 'NOC issued to new counsel'
      },
      {
        caseNo: 'CV-400',
        caseType: 'civil',
        plaintiff: 'Active Party',
        defendant: 'Other Party',
        caseStatus: 'Pending'
      },
      {
        caseNo: 'CV-401',
        caseType: 'civil',
        plaintiff: 'Closed Party',
        defendant: 'Other Party',
        caseStatus: 'Disposed'
      }
    ];

    window.initArchivedTab();

    const tbody = document.querySelector('#archivedCasesTable tbody');
    expect(document.getElementById('archivedCount').textContent).toBe('2');
    expect(document.getElementById('archivedChipCountAll').textContent).toBe('2');
    expect(document.getElementById('archivedChipCountClientLeft').textContent).toBe('1');
    expect(document.getElementById('archivedChipCountAdvocateChanged').textContent).toBe('1');

    const content = tbody.innerHTML;
    expect(content).toContain('CV-201');
    expect(content).toContain('Client Stopped Coming');
    expect(content).toContain('Client stopped coming after 3 dates');
    expect(content).toContain('CR-305');
    expect(content).toContain('Advocate Changed');
    expect(content).toContain('NOC issued to new counsel');
    expect(content).not.toContain('CV-400');
    expect(content).not.toContain('CV-401');
  });

  it('filters by Archive Reason chips (Client Stopped Coming vs Advocate Changed)', () => {
    window.allCaseRecords = [
      { caseNo: 'CV-201', caseType: 'civil', plaintiff: 'A', defendant: 'B', caseStatus: 'Archived: Client Left' },
      { caseNo: 'CR-305', caseType: 'state', victimName: 'State', accusedName: 'M', caseStatus: 'Archived: Advocate Changed' }
    ];

    window.setArchivedReasonFilter('client_left');
    let tbody = document.querySelector('#archivedCasesTable tbody');
    expect(tbody.innerHTML).toContain('CV-201');
    expect(tbody.innerHTML).not.toContain('CR-305');

    window.setArchivedReasonFilter('advocate_changed');
    tbody = document.querySelector('#archivedCasesTable tbody');
    expect(tbody.innerHTML).toContain('CR-305');
    expect(tbody.innerHTML).not.toContain('CV-201');
  });

  it('never classifies archived cases as Disposed or Undated in caseService helpers', () => {
    const archivedCase = {
      caseNo: 'CV-555',
      caseStatus: 'Archived: Client Left',
      nextHearing: '',
      disposalComment: 'Client stopped coming'
    };

    expect(window.isCaseArchived(archivedCase)).toBe(true);
    expect(window.isCaseDisposed(archivedCase)).toBe(false);
    expect(window.isCaseUndated(archivedCase)).toBe(false);
    expect(window.getCaseStatusMeta(archivedCase).key).toBe('archived');
  });

  it('archiveCaseInSupabase and restoreArchivedCaseInSupabase update Supabase cleanly with minimal payload', async () => {
    const updateCalls = [];
    const mockClient = {
      from: (tbl) => ({
        update: (payload) => {
          updateCalls.push({ tbl, payload });
          return {
            eq: () => ({
              select: async () => ({ data: [{ id: 12, case_status: payload.case_status }], error: null })
            }),
            ilike: () => ({
              select: async () => ({ data: [{ id: 12, case_status: payload.case_status }], error: null })
            })
          };
        }
      })
    };
    window.ensureSupabaseClient = () => mockClient;
    window.allCaseRecords = [
      { id: 12, caseNo: 'FC-23-2024', caseType: 'family', caseStatus: 'Pending', nextHearing: '2026-12-01' }
    ];

    await window.archiveCaseInSupabase('FC-23-2024', 'client_left', 'Stopped coming');
    expect(updateCalls[0].tbl).toBe('familycases');
    expect(updateCalls[0].payload.case_status).toBe('Archived: Client Left');
    expect(updateCalls[0].payload.next_hearing).toBeNull();
    expect(updateCalls[0].payload.disposal_comment).toBe('Stopped coming');
    expect(window.allCaseRecords[0].caseStatus).toBe('Archived: Client Left');

    await window.restoreArchivedCaseInSupabase('FC-23-2024');
    expect(updateCalls[1].payload.case_status).toBe('Pending');
    expect(window.allCaseRecords[0].caseStatus).toBe('Pending');
  });
});
