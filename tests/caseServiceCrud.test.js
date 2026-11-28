import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../admin.js';
import '../services/caseService.js';

describe('services/caseService.js - Duplicate Case Number Validation', () => {
  beforeEach(() => {
    window.performPostCrudRefresh = async () => {};
    window.allCaseRecords = [];
    window.supabaseClient = null;
  });

  it('checkCaseNumberExists should detect existing in-memory case', async () => {
    expect(window.checkCaseNumberExists).toBeDefined();

    window.allCaseRecords.push({
      caseNo: 'CIVIL/101/2026',
      caseName: 'Ramesh vs Suresh',
      caseType: 'civil'
    });

    // Exact match
    const res1 = await window.checkCaseNumberExists('CIVIL/101/2026');
    expect(res1.exists).toBe(true);
    expect(res1.source).toBe('local');
    expect(res1.caseNumber).toBe('CIVIL/101/2026');

    // Case-insensitive & extra space match
    const res2 = await window.checkCaseNumberExists('  civil/101/2026 ');
    expect(res2.exists).toBe(true);

    // Non-existent case
    const res3 = await window.checkCaseNumberExists('CRIMINAL/999/2026');
    expect(res3.exists).toBe(false);
  });

  it('checkCaseNumberExists should ignore self when excludeCaseNo is passed (edit mode)', async () => {
    window.allCaseRecords.push({
      caseNo: '55/2026',
      caseName: 'State vs Vikas',
      caseType: 'state'
    });

    // Editing same case: exclude '55/2026'
    const res = await window.checkCaseNumberExists('55/2026', '55/2026');
    expect(res.exists).toBe(false);

    // Editing another case but entering colliding number: should be detected
    const resCollide = await window.checkCaseNumberExists('55/2026', '99/2026');
    expect(resCollide.exists).toBe(true);
  });

  it('checkCaseNumberExists should query database when local match not found', async () => {
    window.allCaseRecords = []; // Empty local cache

    // Mock Supabase client
    const mockSelect = vi.fn().mockReturnValue({
      ilike: vi.fn().mockReturnValue({
        limit: vi.fn().mockResolvedValue({
          data: [{ id: 'db-1', case_number: 'DB-CASE-88', case_name: 'Sharma vs Verma' }],
          error: null
        })
      })
    });

    window.supabaseClient = {
      from: vi.fn().mockReturnValue({
        select: mockSelect
      })
    };

    const res = await window.checkCaseNumberExists('DB-CASE-88');
    expect(res.exists).toBe(true);
    expect(res.source).toBe('database');
    expect(res.caseNumber).toBe('DB-CASE-88');

    // Restore client
    window.supabaseClient = null;
  });
});

describe('services/caseService.js - Cascading Case Deletion', () => {
  beforeEach(() => {
    window.performPostCrudRefresh = async () => {};
    window.allCaseRecords = [
      { id: 'c1', caseNo: 'DEL-100', caseType: 'civil' },
      { id: 'c2', caseNo: 'KEEP-200', caseType: 'criminal' }
    ];
    window.allHearingRecords = [
      { id: 'h1', case_number: 'DEL-100', hearing_date: '2026-11-01' },
      { id: 'h2', case_number: 'KEEP-200', hearing_date: '2026-11-05' }
    ];
    window.caseTasks = [
      { id: 't1', caseNo: 'DEL-100', title: 'File paper book' },
      { id: 't2', caseNo: 'KEEP-200', title: 'Cross examine witness' }
    ];
  });

  it('deleteCaseFromSupabase should cascade delete case, hearings, and tasks in-memory', async () => {
    expect(window.deleteCaseFromSupabase).toBeDefined();

    // Mock supabase calls
    const mockDelete = vi.fn().mockReturnValue({
      ilike: vi.fn().mockResolvedValue({ data: null, error: null })
    });
    window.supabaseClient = {
      from: vi.fn().mockReturnValue({ delete: mockDelete })
    };

    await window.deleteCaseFromSupabase('DEL-100');

    // 1. Case removed
    expect(window.allCaseRecords.length).toBe(1);
    expect(window.allCaseRecords[0].caseNo).toBe('KEEP-200');

    // 2. Hearings cascaded
    expect(window.allHearingRecords.length).toBe(1);
    expect(window.allHearingRecords[0].case_number).toBe('KEEP-200');

    // 3. Tasks cascaded
    expect(window.caseTasks.length).toBe(1);
    expect(window.caseTasks[0].caseNo).toBe('KEEP-200');

    window.supabaseClient = null;
  });
});

describe('services/caseService.js - Hearing Update & Upsert', () => {
  beforeEach(() => {
    window.performPostCrudRefresh = async () => {};
    window.supabaseClient = null;
  });

  it('updateHearingInSupabase should formulate payload and upsert hearing record', async () => {
    expect(window.updateHearingInSupabase).toBeDefined();

    window.allCaseRecords = [
      { caseNo: 'CR-777', caseType: 'criminal', clientName: 'Ramesh' }
    ];

    let upsertedData = null;
    const mockSelect = vi.fn().mockReturnValue({
      ilike: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ data: [], error: null }) // no existing hearing on this date
      })
    });
    const mockInsert = vi.fn().mockImplementation((payload) => {
      upsertedData = payload;
      return Promise.resolve({ data: payload, error: null });
    });

    window.supabaseClient = {
      from: vi.fn().mockImplementation((table) => {
        if (table === 'hearings') {
          return {
            select: mockSelect,
            insert: mockInsert,
            update: vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) })
          };
        }
        return {
          update: vi.fn().mockReturnValue({
            ilike: vi.fn().mockReturnValue({
              select: vi.fn().mockResolvedValue({ data: [{ id: 'updated-1' }], error: null })
            })
          })
        };
      })
    };

    await window.updateHearingInSupabase('CR-777', '2026-11-20', 'Evidence', 'P.W. 1 Examined');

    expect(window.supabaseClient.from).toHaveBeenCalledWith('hearings');
    expect(mockInsert).toHaveBeenCalled();
    expect(upsertedData[0].case_number).toBe('CR-777');
    expect(upsertedData[0].hearing_date).toBe('2026-11-20');
    expect(upsertedData[0].process).toBe('Evidence');
    expect(upsertedData[0].action_taken).toBe('P.W. 1 Examined');

    window.supabaseClient = null;
  });

  it('correctHearingDateInSupabase should replace mistaken hearing date in-place without overwriting previousHearing', async () => {
    expect(window.correctHearingDateInSupabase).toBeDefined();

    window.allCaseRecords = [
      {
        caseNo: 'CIV-101',
        caseType: 'civil',
        nextHearing: '2027-01-11',
        hearingProcess: 'Evidence',
        previousHearing: '2026-11-26',
        previousProcess: 'Arguments'
      }
    ];
    window.allHearingRecords = [
      { id: 'h-wrong', case_number: 'CIV-101', hearing_date: '2027-01-11', process: 'Evidence' }
    ];

    let updatedHearingPayload = null;
    let updatedCasePayload = null;
    window.supabaseClient = {
      from: vi.fn().mockImplementation((table) => {
        if (table === 'hearings') {
          return {
            select: vi.fn().mockReturnValue({
              ilike: vi.fn().mockReturnValue({
                eq: vi.fn().mockImplementation((_col, dateVal) => {
                  if (dateVal === '2027-01-11') return Promise.resolve({ data: [{ id: 'h-wrong' }], error: null });
                  return Promise.resolve({ data: [], error: null });
                })
              })
            }),
            update: vi.fn().mockImplementation((payload) => {
              updatedHearingPayload = payload;
              return { eq: vi.fn().mockResolvedValue({ error: null }) };
            }),
            delete: vi.fn().mockReturnValue({ in: vi.fn().mockResolvedValue({ error: null }) })
          };
        }
        return {
          update: vi.fn().mockImplementation((payload) => {
            updatedCasePayload = payload;
            return {
              ilike: vi.fn().mockReturnValue({
                select: vi.fn().mockResolvedValue({ data: [{ id: 'c-1' }], error: null })
              })
            };
          })
        };
      })
    };

    await window.correctHearingDateInSupabase('CIV-101', '2027-01-11', '2026-12-11', 'Evidence', 'Fixed wrong year');

    expect(updatedHearingPayload.hearing_date).toBe('2026-12-11');
    expect(updatedCasePayload.next_hearing).toBe('2026-12-11');
    expect(updatedCasePayload.previous_hearing).toBeUndefined();
    expect(window.allCaseRecords[0].nextHearing).toBe('2026-12-11');
    expect(window.allCaseRecords[0].previousHearing).toBe('2026-11-26');
    expect(window.allHearingRecords.some(h => h.hearing_date === '2027-01-11')).toBe(false);
    expect(window.allHearingRecords.some(h => h.hearing_date === '2026-12-11')).toBe(true);

    window.supabaseClient = null;
  });

  it('deleteOrRevertHearingInSupabase should remove mistaken hearing and restore previousHearing', async () => {
    expect(window.deleteOrRevertHearingInSupabase).toBeDefined();

    window.allCaseRecords = [
      {
        caseNo: 'CIV-102',
        caseType: 'civil',
        nextHearing: '2027-01-11',
        hearingProcess: 'Evidence',
        previousHearing: '2026-11-26',
        previousProcess: 'Arguments'
      }
    ];
    window.allHearingRecords = [
      { id: 'h-wrong', case_number: 'CIV-102', hearing_date: '2027-01-11', process: 'Evidence' }
    ];

    window.supabaseClient = {
      from: vi.fn().mockImplementation((table) => {
        if (table === 'hearings') {
          return {
            delete: vi.fn().mockReturnValue({
              ilike: vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({ error: null })
              })
            })
          };
        }
        return {
          update: vi.fn().mockReturnValue({
            ilike: vi.fn().mockReturnValue({
              select: vi.fn().mockResolvedValue({ data: [{ id: 'c-2' }], error: null })
            })
          })
        };
      })
    };

    await window.deleteOrRevertHearingInSupabase('CIV-102', '2027-01-11');

    expect(window.allHearingRecords.length).toBe(0);
    expect(window.allCaseRecords[0].nextHearing).toBe('2026-11-26');
    expect(window.allCaseRecords[0].hearingProcess).toBe('Arguments');

    window.supabaseClient = null;
  });
});
