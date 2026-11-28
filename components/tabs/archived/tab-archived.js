/**
 * CaseBook Dedicated Archived Cases Tab Module
 * Location: components/tabs/archived/tab-archived.js
 * Multi-Tab Parity: Conforms 100% to DESIGN.md and ui-rules.md
 */

window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['archived'] = `<div class="archived-dashboard-wrapper" data-archived-scope id="archivedDashboardWrapper">
    <div class="board archived-board-shell" id="archivedBoardShell">
        <header class="board-head archived-master-head">
            <div class="head-left">
                <nav class="breadcrumb-bar archived-breadcrumb" aria-label="Breadcrumb">
                    <button type="button" class="crumb-link archived-crumb-link" onclick="showTab('all', event)" title="Return to Cases Register">
                        <svg class="lucide lucide-briefcase" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        <span>Cases Register</span>
                    </button>
                    <svg class="lucide lucide-chevron-right crumb-sep archived-crumb-sep" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="crumb-current archived-crumb-current">Archived Cases</span>
                </nav>
                <h1 class="h1">
                    <span class="crest archived-crest" aria-hidden="true">
                        <svg class="lucide lucide-archive" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <rect width="20" height="5" x="2" y="3" rx="1"/>
                            <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
                            <path d="M10 12h4"/>
                        </svg>
                    </span>
                    <span class="h1-text" id="archivedMainTitle">Archived Cases</span>
                </h1>
                <div class="sub" id="archivedHeaderSubline">
                    <b id="archivedTotalBadge">0 Cases</b><span id="archivedSrCount" class="sr-only">0</span> · <span class="archived-stat-pill">Inactive Matters: Client Stopped Coming or Advocate Changed</span>
                </div>
            </div>
            <div class="head-actions" id="archivedHeadActions">
                <button
                    type="button"
                    class="archived-refresh-btn"
                    id="archivedRefreshBtn"
                    onclick="refreshArchivedFromSupabase(true)"
                    title="Sync Archived Cases from Supabase"
                    aria-label="Sync Archived Cases from Supabase"
                >
                    <svg class="lucide lucide-refresh-cw" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                    </svg>
                </button>

                <div class="archived-view-toggle view-toggle" id="archivedViewToggle" role="group" aria-label="Switch display mode">
                    <button type="button" class="view-btn active" id="archivedViewToggleTable" onclick="setArchivedViewMode('table', true)" title="Switch to Docket Table View" aria-label="Switch to Docket Table View">
                        <svg class="lucide lucide-table-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg> <span>Docket Table</span>
                    </button>
                    <button type="button" class="view-btn" id="archivedViewToggleCards" onclick="setArchivedViewMode('cards', true)" title="Switch to Cards View" aria-label="Switch to Cards View">
                        <svg class="lucide lucide-layout-grid" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> <span>Cards</span>
                    </button>
                </div>
            </div>
        </header>

        <div class="toolbar archived-toolbar">
            <div class="archived-controls-row" id="archivedControlsRow">
                <div class="archived-search-wrap">
                    <svg class="lucide lucide-search archived-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input
                        type="text"
                        id="archivedSearchInput"
                        class="archived-search-input"
                        placeholder="Search case number, parties, client, reason, court..."
                        oninput="handleArchivedSearchInput(this.value)"
                        autocomplete="off"
                        spellcheck="false"
                    />
                    <button type="button" id="archivedClearSearchBtn" class="archived-clear-btn hidden" onclick="clearArchivedSearch()" title="Clear Search">
                        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <div class="custom-dropdown archived-court-custom-dropdown" id="archivedCourtDropdown">
                    <select id="archivedCourtFilterSelect" class="sr-only" tabindex="-1" aria-hidden="true" onchange="renderArchivedCasesTable()">
                        <option value="">All Courts</option>
                    </select>
                    <button
                        type="button"
                        class="custom-dropdown-trigger dropdown-trigger"
                        id="archivedCourtDropdownTrigger"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        onclick="toggleArchivedCourtDropdown()"
                        title="Filter by Court Forum"
                    >
                        <svg class="lucide lucide-landmark custom-dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                        <span class="custom-dropdown-label dropdown-label" id="archivedCourtDropdownLabel">All Courts</span>
                        <svg class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="archivedCourtDropdownMenu">
                        <div class="custom-dropdown-search-wrap">
                            <div class="custom-dropdown-search-inner">
                                <svg class="lucide lucide-search custom-dropdown-search-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                <input type="text" id="archivedCourtDropdownSearch" class="custom-dropdown-search-input" placeholder="Search courts..." autocomplete="off" oninput="filterArchivedCourtDropdown(this.value)">
                            </div>
                        </div>
                        <ul class="custom-dropdown-list options-list custom-scrollbar" id="archivedCourtDropdownList" role="listbox"></ul>
                        <div id="archivedCourtDropdownEmpty" class="custom-dropdown-empty empty-state hidden">No courts found.</div>
                    </div>
                </div>
            </div>

            <div class="archived-chips-row">
                <div class="chips reason-chips" role="group" aria-label="Archive Reason Filter">
                    <button type="button" class="chip active" id="archivedReasonAll" onclick="setArchivedReasonFilter('')">All Archived (<span id="archivedChipCountAll">0</span>)</button>
                    <button type="button" class="chip" id="archivedReasonClientLeft" onclick="setArchivedReasonFilter('client_left')">Client Stopped Coming (<span id="archivedChipCountClientLeft">0</span>)</button>
                    <button type="button" class="chip" id="archivedReasonAdvocateChanged" onclick="setArchivedReasonFilter('advocate_changed')">Advocate Changed (<span id="archivedChipCountAdvocateChanged">0</span>)</button>
                </div>
                <div class="chips category-chips" role="group" aria-label="Category Filter">
                    <button type="button" class="chip active" id="archivedCatAll" onclick="setArchivedCategoryFilter('')">All Types</button>
                    <button type="button" class="chip" id="archivedCatCivil" onclick="setArchivedCategoryFilter('civil')">Civil</button>
                    <button type="button" class="chip" id="archivedCatState" onclick="setArchivedCategoryFilter('state')">Criminal / State</button>
                    <button type="button" class="chip" id="archivedCatFamily" onclick="setArchivedCategoryFilter('family')">Family</button>
                    <button type="button" class="chip" id="archivedCatRevenue" onclick="setArchivedCategoryFilter('revenue')">Revenue</button>
                </div>
            </div>
        </div>

        <div id="archivedTableViewContainer" class="archived-table-view-container">
            <div class="archived-table-card">
                <div class="archived-table-scroll custom-scrollbar">
                    <table class="archived-docket-table min-w-full text-left text-sm case-table" id="archivedCasesTable">
                        <thead>
                            <tr>
                                <th scope="col" class="col-case">CASE NUMBER / YEAR</th>
                                <th scope="col" class="col-title">CASE NAME</th>
                                <th scope="col" class="col-court">COURT</th>
                                <th scope="col" class="col-reason">ARCHIVE REASON</th>
                                <th scope="col" class="col-note">ARCHIVE NOTE</th>
                                <th scope="col" class="col-action">ACTION</th>
                            </tr>
                        </thead>
                        <tbody id="archivedTableBody">
                            <tr class="archived-loading-row">
                                <td colspan="6">
                                    <div class="archived-loading-inner">
                                        <svg class="lucide lucide-loader-2 archived-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                                        <span>Loading archived cases...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="archivedCardsViewContainer" class="archived-cards-grid hidden"></div>

        <footer class="foot archived-foot">
            <span class="live">
                <i aria-hidden="true"></i>
                <span id="archivedFooterCount">SHOWING 0 OF 0 CASES</span>
            </span>
            <span class="foot-sync" id="archivedFootSync">UPDATED LIVE <span class="sep">·</span> SYNC OK</span>
        </footer>
    </div>
</div>
`;

// --- Global Filter States ---
var currentArchivedSearchQuery = '';
var currentArchivedCourtFilter = '';
var currentArchivedReasonFilter = ''; // '' | 'client_left' | 'advocate_changed'
var currentArchivedCategoryFilter = '';
var currentArchivedViewMode = 'table'; // 'table' | 'cards'

if (typeof window !== 'undefined') {
  window.currentArchivedSearchQuery = currentArchivedSearchQuery;
  window.currentArchivedCourtFilter = currentArchivedCourtFilter;
  window.currentArchivedReasonFilter = currentArchivedReasonFilter;
  window.currentArchivedCategoryFilter = currentArchivedCategoryFilter;
  window.currentArchivedViewMode = currentArchivedViewMode;
}

function _isArchivedRecord(c) {
  if (typeof isCaseArchived === 'function') return isCaseArchived(c);
  if (typeof window !== 'undefined' && typeof window.isCaseArchived === 'function') return window.isCaseArchived(c);
  const s = String((c && (c.caseStatus || c.case_status || c.status)) || '').trim().toLowerCase();
  return s.includes('archive') || s.includes('client left') || s.includes('client stopped') || s.includes('advocate changed') || s.includes('noc issued');
}

function _getArchivedReason(c) {
  if (typeof getArchivedReasonMeta === 'function') return getArchivedReasonMeta(c);
  if (typeof window !== 'undefined' && typeof window.getArchivedReasonMeta === 'function') return window.getArchivedReasonMeta(c);
  const raw = String((c && (c.caseStatus || c.status || c.case_status)) || '').trim().toLowerCase();
  if (raw.includes('advocate') || raw.includes('counsel') || raw.includes('noc')) {
    return { key: 'advocate_changed', label: 'Advocate Changed', badgeClass: 'badge-archived-advocate' };
  }
  if (raw.includes('client') || raw.includes('stopped') || raw.includes('left')) {
    return { key: 'client_left', label: 'Client Stopped Coming', badgeClass: 'badge-archived-client' };
  }
  return { key: 'other', label: 'Archived', badgeClass: 'badge-archived' };
}

async function refreshArchivedFromSupabase() {
  const syncBtn = document.getElementById('archivedRefreshBtn');
  const footSync = document.getElementById('archivedFootSync');
  if (syncBtn) {
    syncBtn.classList.add('loading');
    const icon = syncBtn.querySelector('.lucide-refresh-cw');
    if (icon) icon.classList.add('archived-spin');
  }
  if (footSync) {
    footSync.innerHTML = '<span class="archived-spin-icon">⟳</span> SYNCING WITH SUPABASE...';
  }

  try {
    if (typeof fetchAllDataFromSupabase === 'function') {
      await fetchAllDataFromSupabase();
    } else if (typeof window !== 'undefined' && typeof window.fetchAllDataFromSupabase === 'function') {
      await window.fetchAllDataFromSupabase();
    }
  } catch (err) {
    console.warn('[Archived] Supabase fetch error:', err);
  } finally {
    if (syncBtn) {
      syncBtn.classList.remove('loading');
      const icon = syncBtn.querySelector('.lucide-refresh-cw');
      if (icon) icon.classList.remove('archived-spin');
    }
    if (footSync) {
      footSync.textContent = 'UPDATED LIVE · SYNC OK';
    }
    renderArchivedCasesTable();
  }
}

function setArchivedViewMode(mode, save = true) {
  currentArchivedViewMode = mode;
  if (typeof window !== 'undefined') window.currentArchivedViewMode = mode;
  if (save && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('casebook_archived_view_mode', mode);
    } catch (e) {}
  }

  const tableContainer = document.getElementById('archivedTableViewContainer');
  const cardsContainer = document.getElementById('archivedCardsViewContainer');
  const toggleTableBtn = document.getElementById('archivedViewToggleTable');
  const toggleCardsBtn = document.getElementById('archivedViewToggleCards');

  if (mode === 'cards') {
    if (tableContainer) tableContainer.classList.add('hidden');
    if (cardsContainer) cardsContainer.classList.remove('hidden');
    if (toggleTableBtn) toggleTableBtn.classList.remove('active');
    if (toggleCardsBtn) toggleCardsBtn.classList.add('active');
  } else {
    if (tableContainer) tableContainer.classList.remove('hidden');
    if (cardsContainer) cardsContainer.classList.add('hidden');
    if (toggleTableBtn) toggleTableBtn.classList.add('active');
    if (toggleCardsBtn) toggleCardsBtn.classList.remove('active');
  }
}

function handleArchivedSearchInput(val) {
  currentArchivedSearchQuery = String(val || '');
  if (typeof window !== 'undefined') window.currentArchivedSearchQuery = currentArchivedSearchQuery;
  const clearBtn = document.getElementById('archivedClearSearchBtn');
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !currentArchivedSearchQuery.trim());
  }
  renderArchivedCasesTable();
}

function clearArchivedSearch() {
  currentArchivedSearchQuery = '';
  if (typeof window !== 'undefined') window.currentArchivedSearchQuery = '';
  const input = document.getElementById('archivedSearchInput');
  if (input) input.value = '';
  const clearBtn = document.getElementById('archivedClearSearchBtn');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderArchivedCasesTable();
}

function setArchivedReasonFilter(reasonKey) {
  currentArchivedReasonFilter = reasonKey || '';
  if (typeof window !== 'undefined') window.currentArchivedReasonFilter = currentArchivedReasonFilter;

  ['archivedReasonAll', 'archivedReasonClientLeft', 'archivedReasonAdvocateChanged'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove('active');
  });

  const activeId = reasonKey === 'client_left'
    ? 'archivedReasonClientLeft'
    : reasonKey === 'advocate_changed'
      ? 'archivedReasonAdvocateChanged'
      : 'archivedReasonAll';

  const activeBtn = document.getElementById(activeId);
  if (activeBtn) activeBtn.classList.add('active');

  renderArchivedCasesTable();
}

function setArchivedCategoryFilter(category) {
  currentArchivedCategoryFilter = category;
  if (typeof window !== 'undefined') window.currentArchivedCategoryFilter = category;

  ['archivedCatAll', 'archivedCatCivil', 'archivedCatState', 'archivedCatFamily', 'archivedCatRevenue'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove('active');
  });

  const activeId = category === 'civil' ? 'archivedCatCivil' :
    (category === 'state' || category === 'criminal') ? 'archivedCatState' :
    category === 'family' ? 'archivedCatFamily' :
    category === 'revenue' ? 'archivedCatRevenue' : 'archivedCatAll';

  const activeBtn = document.getElementById(activeId);
  if (activeBtn) activeBtn.classList.add('active');

  renderArchivedCasesTable();
}

function toggleArchivedCourtDropdown() {
  const menu = document.getElementById('archivedCourtDropdownMenu');
  const trigger = document.getElementById('archivedCourtDropdownTrigger');
  if (!menu || !trigger) return;
  const isOpen = menu.classList.contains('invisible') === false;
  if (isOpen) {
    menu.classList.add('invisible', 'opacity-0', 'scale-95');
    trigger.setAttribute('aria-expanded', 'false');
  } else {
    menu.classList.remove('invisible', 'opacity-0', 'scale-95');
    trigger.setAttribute('aria-expanded', 'true');
    const search = document.getElementById('archivedCourtDropdownSearch');
    if (search) {
      search.value = '';
      filterArchivedCourtDropdown('');
      search.focus();
    }
  }
}

function filterArchivedCourtDropdown(query) {
  const list = document.getElementById('archivedCourtDropdownList');
  const emptyEl = document.getElementById('archivedCourtDropdownEmpty');
  if (!list) return;
  const q = String(query || '').toLowerCase().trim();
  let visibleCount = 0;
  list.querySelectorAll('.custom-dropdown-option').forEach(li => {
    const txt = (li.textContent || '').toLowerCase();
    const show = !q || txt.includes(q);
    li.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });
  if (emptyEl) {
    emptyEl.classList.toggle('hidden', visibleCount > 0);
  }
}

function selectArchivedCourtFilter(courtName) {
  currentArchivedCourtFilter = courtName;
  if (typeof window !== 'undefined') window.currentArchivedCourtFilter = courtName;

  const label = document.getElementById('archivedCourtDropdownLabel');
  if (label) label.textContent = courtName || 'All Courts';

  const select = document.getElementById('archivedCourtFilterSelect');
  if (select) select.value = courtName;

  const menu = document.getElementById('archivedCourtDropdownMenu');
  const trigger = document.getElementById('archivedCourtDropdownTrigger');
  if (menu) menu.classList.add('invisible', 'opacity-0', 'scale-95');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');

  renderArchivedCasesTable();
}

function populateArchivedCourtDropdown(courtNames) {
  const list = document.getElementById('archivedCourtDropdownList');
  const select = document.getElementById('archivedCourtFilterSelect');
  if (!list) return;

  const esc = (typeof escapeHtml === 'function') ? escapeHtml : (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const unique = Array.from(new Set((courtNames || []).map(c => String(c).trim()).filter(Boolean))).sort();

  list.innerHTML = `
    <li class="custom-dropdown-option ${!currentArchivedCourtFilter ? 'selected' : ''}" role="option" onclick="selectArchivedCourtFilter('')">
      <span>All Courts (${unique.length})</span>
      ${!currentArchivedCourtFilter ? '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
    </li>
  ` + unique.map(c => {
    const isSelected = currentArchivedCourtFilter.toLowerCase() === c.toLowerCase();
    return `
      <li class="custom-dropdown-option ${isSelected ? 'selected' : ''}" role="option" onclick="selectArchivedCourtFilter('${esc(c).replace(/'/g, "\\'")}')">
        <span>${esc(c)}</span>
        ${isSelected ? '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
      </li>
    `;
  }).join('');

  if (select) {
    select.innerHTML = '<option value="">All Courts</option>' + unique.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
    select.value = currentArchivedCourtFilter;
  }
}

async function handleRestoreArchivedCase(caseNumber) {
  if (!caseNumber) return;
  const confirmed = typeof window !== 'undefined' && typeof window.confirm === 'function'
    ? window.confirm(`Restore case "${caseNumber}" back to Active (Pending) cases?`)
    : true;
  if (!confirmed) return;

  try {
    if (typeof restoreArchivedCaseInSupabase === 'function') {
      await restoreArchivedCaseInSupabase(caseNumber);
    } else if (typeof window !== 'undefined' && typeof window.restoreArchivedCaseInSupabase === 'function') {
      await window.restoreArchivedCaseInSupabase(caseNumber);
    }
    if (typeof showToast === 'function') {
      showToast(`Case ${caseNumber} restored to Pending.`, 'success');
    } else if (typeof showToastNotification === 'function') {
      showToastNotification(`Case ${caseNumber} restored to Pending.`, 'success');
    }
  } catch (err) {
    console.error('[Archived] Restore error:', err);
    if (typeof showToast === 'function') {
      showToast('Failed to restore case: ' + (err.message || err), 'error');
    }
  }
}

function renderArchivedCasesTable(records) {
  const caseRecords = records || (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) ? allCaseRecords : (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) ? window.allCaseRecords : []));

  const archivedCases = caseRecords.filter(_isArchivedRecord);

  // Reason counts
  let clientLeftCount = 0;
  let advocateChangedCount = 0;
  archivedCases.forEach(c => {
    const r = _getArchivedReason(c);
    if (r.key === 'client_left') clientLeftCount++;
    else if (r.key === 'advocate_changed') advocateChangedCount++;
  });

  // Sync count badges
  const archivedCountEl = document.getElementById('archivedCount');
  if (archivedCountEl) archivedCountEl.textContent = String(archivedCases.length);

  const archivedSrCountEl = document.getElementById('archivedSrCount');
  if (archivedSrCountEl) archivedSrCountEl.textContent = String(archivedCases.length);

  const totalBadge = document.getElementById('archivedTotalBadge');
  if (totalBadge) totalBadge.textContent = `${archivedCases.length} Cases`;

  const chipAll = document.getElementById('archivedChipCountAll');
  if (chipAll) chipAll.textContent = String(archivedCases.length);

  const chipClientLeft = document.getElementById('archivedChipCountClientLeft');
  if (chipClientLeft) chipClientLeft.textContent = String(clientLeftCount);

  const chipAdvChanged = document.getElementById('archivedChipCountAdvocateChanged');
  if (chipAdvChanged) chipAdvChanged.textContent = String(advocateChangedCount);

  // Populate court dropdown
  populateArchivedCourtDropdown(archivedCases.map(c => c.courtName || c.criminalCourtName || c.court_name || c.court || '').filter(Boolean));

  // Filter by Reason, Category, Court, and Search Query
  const searchQ = (currentArchivedSearchQuery || '').toLowerCase().trim();
  const courtF = (currentArchivedCourtFilter || '').toLowerCase().trim();
  const catF = (currentArchivedCategoryFilter || '').toLowerCase().trim();
  const reasonF = (currentArchivedReasonFilter || '').toLowerCase().trim();

  const filtered = archivedCases.filter((c) => {
    if (reasonF) {
      const r = _getArchivedReason(c);
      if (r.key !== reasonF) return false;
    }

    if (catF) {
      const type = (c.caseType || c.case_type || 'civil').toLowerCase();
      if (catF === 'state' || catF === 'criminal') {
        if (type !== 'state' && type !== 'criminal' && type !== 'misc_criminal' && type !== 'misccriminal' && type !== 'complaint') return false;
      } else if (catF === 'civil') {
        if (type !== 'civil' && type !== 'misc_civil' && type !== 'misccivil') return false;
      } else if (type !== catF) {
        return false;
      }
    }

    if (courtF) {
      const courtName = (c.courtName || c.criminalCourtName || c.court_name || c.court || '').toLowerCase().trim();
      if (courtName !== courtF) return false;
    }

    if (searchQ) {
      const caseNo = (c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '').toLowerCase();
      const caseName = (c.caseName || c.case_name || '').toLowerCase();
      const firstParty = (c.firstParty || c.plaintiff || c.first_party || c.petitioner || '').toLowerCase();
      const secondParty = (c.accusedName || c.defendant || c.second_party || c.respondent || '').toLowerCase();
      const client = (c.clientName || c.criminalClientName || c.client_name || '').toLowerCase();
      const court = (c.courtName || c.criminalCourtName || c.court_name || c.court || '').toLowerCase();
      const reasonLabel = _getArchivedReason(c).label.toLowerCase();
      const note = (c.disposalComment || c.disposal_comment || c.remark || c.remarks || '').toLowerCase();

      const matches = caseNo.includes(searchQ) ||
        caseName.includes(searchQ) ||
        firstParty.includes(searchQ) ||
        secondParty.includes(searchQ) ||
        client.includes(searchQ) ||
        court.includes(searchQ) ||
        reasonLabel.includes(searchQ) ||
        note.includes(searchQ);

      if (!matches) return false;
    }

    return true;
  });

  const footerCount = document.getElementById('archivedFooterCount');
  if (footerCount) {
    footerCount.textContent = `SHOWING ${filtered.length} OF ${archivedCases.length} CASES`;
  }

  const esc = (typeof escapeHtml === 'function') ? escapeHtml : (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const rToPlain = (typeof remarksToPlainText === 'function') ? remarksToPlainText : (r) => String(r || '');

  // 1. Render Docket Table View
  const archivedTable = document.querySelector('#archivedCasesTable tbody');
  if (archivedTable) {
    if (filtered.length === 0) {
      archivedTable.innerHTML = '<tr><td colspan="6" class="no-results">No archived cases recorded yet.</td></tr>';
    } else {
      archivedTable.innerHTML = filtered.map((c) => {
        const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '—';
        const caseYear = c.caseYear || c.case_year || (c.year ? String(c.year) : '');
        const caseNumberDisplay =
          typeof window.formatCaseNumberHtml === 'function'
            ? window.formatCaseNumberHtml(caseNumber, caseYear, esc)
            : caseYear && !caseNumber.includes(String(caseYear))
              ? `<strong>${esc(caseNumber)}</strong><span class="case-year-subtext">/${esc(caseYear)}</span>`
              : `<strong>${esc(caseNumber)}</strong>`;

        const caseName = c.caseName || c.case_name || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
        const courtName = c.courtName || c.criminalCourtName || c.court_name || c.court || 'District Court';

        const reasonMeta = _getArchivedReason(c);
        const reasonIcon = reasonMeta.key === 'advocate_changed'
          ? '<svg class="lucide lucide-user-cog" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 13.8 1-.4"/></svg>'
          : '<svg class="lucide lucide-user-x" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/></svg>';
        const reasonHtml = `<span class="archived-reason-badge ${esc(reasonMeta.badgeClass)}">${reasonIcon} ${esc(reasonMeta.label)}</span>`;

        const archiveNote = c.disposalComment || c.disposal_comment || rToPlain(c.remark || c.remarks || '') || '';
        const archiveNoteHtml = archiveNote
          ? `<span class="case-archived-note-clamp">${esc(archiveNote)}</span>`
          : '<span>—</span>';

        const clientNum = String(c.clientNumber || c.criminalClientNumber || c.client_number || c.phone || '').trim();

        return `
          <tr class="archived-row-clickable" onclick="openCaseDetailsFullModal('${esc(caseNumber)}', null, '${esc(c.caseType || c.case_type || '')}', '${esc(c.id || '')}')" title="Click to view Case Dossier">
            <td class="case-number-cell">${caseNumberDisplay}</td>
            <td class="case-name-cell"><span class="case-title-main">${esc(caseName)}</span></td>
            <td class="case-court-cell"><span class="court-badge">${esc(courtName)}</span></td>
            <td class="case-reason-cell">${reasonHtml}</td>
            <td class="case-note-cell">${archiveNoteHtml}</td>
            <td class="case-action-cell" onclick="event.stopPropagation()">
              <div class="archived-action-wrap">
                <button type="button" class="act act-dossier" onclick="openCaseDetailsFullModal('${esc(caseNumber)}', null, '${esc(c.caseType || c.case_type || '')}', '${esc(c.id || '')}')" title="Open Case Dossier">
                  <svg class="lucide lucide-folder-open" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
                  <span>Dossier</span>
                </button>
                <button type="button" class="act act-restore" onclick="handleRestoreArchivedCase('${esc(caseNumber).replace(/'/g, "\\'")}')" title="Restore Case to Pending">
                  <svg class="lucide lucide-rotate-ccw" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  <span>Restore</span>
                </button>
                ${clientNum ? `
                  <a href="https://wa.me/91${clientNum.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="act act-whatsapp" title="WhatsApp Client">
                    <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                    <span>WhatsApp</span>
                  </a>
                ` : ''}
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 2. Render Cards Grid View
  const cardsContainer = document.getElementById('archivedCardsViewContainer');
  if (cardsContainer) {
    if (filtered.length === 0) {
      cardsContainer.innerHTML = `
        <div class="archived-empty-card">
          <svg class="lucide lucide-archive" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
          <h4>No Archived Cases Found</h4>
          <p>Cases where the client stopped coming or changed their advocate will appear here.</p>
        </div>
      `;
    } else {
      cardsContainer.innerHTML = filtered.map((c) => {
        const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '—';
        const caseName = c.caseName || c.case_name || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
        const courtName = c.courtName || c.criminalCourtName || c.court_name || c.court || 'District Court';
        const reasonMeta = _getArchivedReason(c);
        const archiveNote = c.disposalComment || c.disposal_comment || rToPlain(c.remark || c.remarks || '') || '';
        const clientNum = String(c.clientNumber || c.criminalClientNumber || c.client_number || c.phone || '').trim();

        return `
          <div class="archived-card" onclick="openCaseDetailsFullModal('${esc(caseNumber)}', null, '${esc(c.caseType || c.case_type || '')}', '${esc(c.id || '')}')">
            <div class="archived-card-header">
              <span class="archived-card-caseno">${esc(caseNumber)}</span>
              <span class="archived-reason-badge ${esc(reasonMeta.badgeClass)}">${esc(reasonMeta.label)}</span>
            </div>
            <div class="archived-card-name">${esc(caseName)}</div>
            <div class="archived-card-meta">
              <span class="court-tag"><svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg> ${esc(courtName)}</span>
            </div>
            ${archiveNote ? `
              <div class="archived-card-note">
                <svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                <span>${esc(archiveNote)}</span>
              </div>
            ` : ''}
            <div class="archived-card-actions" onclick="event.stopPropagation()">
              <button type="button" class="act act-dossier" onclick="openCaseDetailsFullModal('${esc(caseNumber)}', null, '${esc(c.caseType || c.case_type || '')}', '${esc(c.id || '')}')">
                <svg class="lucide lucide-folder-open" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
                <span>Dossier</span>
              </button>
              <button type="button" class="act act-restore" onclick="handleRestoreArchivedCase('${esc(caseNumber).replace(/'/g, "\\'")}')">
                <svg class="lucide lucide-rotate-ccw" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                <span>Restore</span>
              </button>
              ${clientNum ? `
                <a href="https://wa.me/91${clientNum.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="act act-whatsapp">
                  <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                  <span>WhatsApp</span>
                </a>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  return archivedCases;
}

function initArchivedTab() {
  if (typeof localStorage !== 'undefined') {
    try {
      const savedMode = localStorage.getItem('casebook_archived_view_mode');
      if (savedMode === 'cards' || savedMode === 'table') {
        currentArchivedViewMode = savedMode;
      }
    } catch (e) {}
  }
  setArchivedViewMode(currentArchivedViewMode, false);
  renderArchivedCasesTable();
}

if (typeof window !== 'undefined') {
  window.renderArchivedCasesTable = renderArchivedCasesTable;
  window.initArchivedTab = initArchivedTab;
  window.refreshArchivedFromSupabase = refreshArchivedFromSupabase;
  window.setArchivedViewMode = setArchivedViewMode;
  window.handleArchivedSearchInput = handleArchivedSearchInput;
  window.clearArchivedSearch = clearArchivedSearch;
  window.setArchivedReasonFilter = setArchivedReasonFilter;
  window.setArchivedCategoryFilter = setArchivedCategoryFilter;
  window.toggleArchivedCourtDropdown = toggleArchivedCourtDropdown;
  window.filterArchivedCourtDropdown = filterArchivedCourtDropdown;
  window.selectArchivedCourtFilter = selectArchivedCourtFilter;
  window.handleRestoreArchivedCase = handleRestoreArchivedCase;
}
