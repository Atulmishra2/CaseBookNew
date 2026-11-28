/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import '../utils/caseNumberUtils.js';
import '../services/caseService.js';

describe('utils/caseNumberUtils.js - Canonical Case Number & Year Handling', () => {
  it('combines plain case number and year cleanly into 1075/2016', () => {
    const parsed = window.parseCaseNumberAndYear('1075', '2016');
    expect(parsed.baseNumber).toBe('1075');
    expect(parsed.year).toBe('2016');
    expect(parsed.formattedCaseNumber).toBe('1075/2016');
    expect(window.formatCanonicalCaseNumber('1075', '2016')).toBe('1075/2016');
  });

  it('prevents double-year concatenation when year is already present', () => {
    expect(window.formatCanonicalCaseNumber('1075/2016', '2016')).toBe('1075/2016');
    expect(window.formatCanonicalCaseNumber('OS/1075/2016', '2016')).toBe('OS/1075/2016');
    expect(window.formatCanonicalCaseNumber('CIV-2026-089', '2026')).toBe('CIV-2026-089');
  });

  it('synchronizes trailing year when year is updated', () => {
    expect(window.formatCanonicalCaseNumber('1075/2016', '2017')).toBe('1075/2017');
    expect(window.formatCanonicalCaseNumber('OS/1075/2016', '2018')).toBe('OS/1075/2018');
  });

  it('renders two-tone HTML with bold base and muted .case-year-subtext', () => {
    const html1 = window.formatCaseNumberHtml('1075/2016', '2016');
    expect(html1).toBe('<strong>1075</strong><span class="case-year-subtext">/2016</span>');

    const html2 = window.formatCaseNumberHtml('1075', '2016');
    expect(html2).toBe('<strong>1075</strong><span class="case-year-subtext">/2016</span>');

    const html3 = window.formatCaseNumberHtml('CIV-2026-089', '2026');
    expect(html3).toBe('<strong>CIV-2026-089</strong>');
  });

  it('detects canonical duplicates across 1075+2016 and 1075/2016 in checkCaseNumberExists', async () => {
    window.supabaseClient = null;
    window.allCaseRecords = [
      { caseNo: '1075/2016', caseYear: '2016', caseName: 'Ramesh vs Suresh', caseType: 'civil' },
    ];

    const res = await window.checkCaseNumberExists('1075', null, '2016');
    expect(res.exists).toBe(true);
    expect(res.caseNumber).toBe('1075/2016');

    const resDiffYear = await window.checkCaseNumberExists('1075', null, '2017');
    expect(resDiffYear.exists).toBe(false);
  });

  it('auto-splits pasted 1075/2016 and updates live Case ID preview in Case Operations', () => {
    window.courts = ['District Court'];
    window.allCaseRecords = [];
    window.getDeletedCourtsSet = () => new Set();
    window.escapeHtml = (s) => String(s ?? '');
    window.showToastNotification = vi.fn();

    const manageJsPath = path.resolve(__dirname, '../components/tabs/manage/tab-manage.js');
    eval(fs.readFileSync(manageJsPath, 'utf8'));
    document.body.innerHTML = window.__casebook_tabs['manage'];

    window.renderCaseHubAddForm('civil');
    const noInput = document.getElementById('hubAdd_caseNo');
    const yearInput = document.getElementById('hubAdd_year');
    const previewEl = document.getElementById('hubAdd_caseNoPreview');

    noInput.value = '1075/2016';
    window.syncCaseHubNumberPreview('add', { autoSplit: true });

    expect(noInput.value).toBe('1075');
    expect(yearInput.value).toBe('2016');
    expect(previewEl.innerHTML).toContain('<strong>1075</strong>');
    expect(previewEl.innerHTML).toContain('/2016');
  });
});
