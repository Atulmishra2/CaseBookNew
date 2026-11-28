window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["courts"] = /*html*/ `
<!-- Manage Courts Directory Header Banner (Master Calendar Style) -->
<header class="board-head court-master-head" data-courts-scope>
  <div class="head-left">
    <h1 class="h1">
      <span class="crest" aria-hidden="true">
        <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
      </span>
      <span class="h1-text court-main-title" id="courtMainTitle">Manage Courts Directory</span>
    </h1>
    <div class="sub" id="courtHeaderSubline">
      <b id="courtsTotalCountBadge">Loading Courts...</b>
    </div>
  </div>
  <div class="head-actions court-header-actions">
    <button
      type="button"
      class="secondary-btn court-refresh-btn court-prune-btn"
      onclick="openPruneCourtsModal()"
      title="Remove unlinked hardcoded courts"
      aria-label="Remove unlinked hardcoded courts"
    >
      <svg class="lucide lucide-filter-x" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"/><path d="m22 3-5 5"/><path d="m17 3 5 5"/></svg>
      <span>Prune Unused</span>
    </button>
    <button
      type="button"
      class="secondary-btn court-refresh-btn"
      onclick="syncAllCourtsFromDatabase()"
      title="Sync all courts from database"
      aria-label="Sync all courts from database"
    >
      <svg class="lucide lucide-rotate-cw" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
      <span>Sync Courts</span>
    </button>
    <button
      type="button"
      id="openAddCourtBtn"
      class="court-header-add-btn court-btn-primary primary-btn"
      onclick="openAddCourtModal()"
      title="Add New Court"
      aria-label="Add New Court"
    >
      <svg class="lucide lucide-plus" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      <span>Add Court</span>
    </button>
  </div>
</header>

<!-- Court Directory Search Bar (Top of Table) -->
<div class="court-table-toolbar court-table-search-bar">
  <div class="search-field-box court-search-box">
    <span class="search-field-prefix-icon">
      <svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </span>
    <input
      type="text"
      id="courtSearchInput"
      placeholder="Search configured courts by name, code or cadre..."
      oninput="filterCourtsTable(this.value)"
      enterkeyhint="search"
      autocomplete="off"
    />
  </div>
</div>

<div id="courtsCardsGrid" class="courts-cards-grid">
  <div class="courts-cards-empty">No courts configured yet. Add a court using the form above.</div>
</div>

<!-- ================= ADD COURT MODAL ================= -->
<div
  id="addCourtModal"
  class="court-modal-overlay hidden"
  role="dialog"
  aria-modal="true"
  aria-labelledby="addCourtModalTitle"
>
  <div class="court-modal-card">
    <div class="court-modal-header">
      <div class="court-modal-header-info">
        <div class="court-modal-icon">
          <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
        </div>
        <div>
          <h3 id="addCourtModalTitle">Add New Court</h3>
          <p class="court-modal-subtitle">
            Configure court complexes, bench rooms, and judicial forums
          </p>
        </div>
      </div>
      <button
        type="button"
        id="closeAddCourtModalBtn"
        class="court-modal-close-btn"
        aria-label="Close dialog"
        onclick="closeAddCourtModal()"
      >
        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>

    <div class="court-modal-body">
      <!-- 1. Court Name (Required) -->
      <div class="court-modal-field">
        <label for="courtInput" class="court-modal-label">
          Court / Judicial Forum Name
          <span class="required-star" aria-hidden="true">*</span>
          <span class="sr-only">(required)</span>
        </label>
        <div class="court-input-action-row">
          <div class="search-field-box">
            <span class="search-field-prefix-icon" aria-hidden="true">
              <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
            </span>
            <input
              type="text"
              id="courtInput"
              placeholder="e.g. Add. Civil Judge Senior Division Court No. 5"
              autocomplete="off"
              required
              aria-required="true"
            />
          </div>
        </div>
      </div>

      <!-- 2. Two-Column Row: Short Code & Cadre / Forum -->
      <div class="court-modal-grid-2">
        <div class="court-modal-field">
          <label for="courtShortCodeInput" class="court-modal-label">Short Code / Acronym</label>
          <div class="search-field-box">
            <span class="search-field-prefix-icon" aria-hidden="true">
              <svg class="lucide lucide-hash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
            </span>
            <input
              type="text"
              id="courtShortCodeInput"
              placeholder="e.g. ACJM-5, ADJ-01"
              aria-describedby="courtShortCodeHint"
              autocomplete="off"
            />
          </div>
          <span class="court-field-hint" id="courtShortCodeHint">Used on compact badges &amp; calendar tags</span>
        </div>

        <div class="court-modal-field">
          <label for="courtCadreSelect" class="court-modal-label">Cadre / Forum</label>
          <div class="custom-dropdown" id="courtCadreDropdown">
            <select id="courtCadreSelect" class="sr-only" aria-describedby="courtCadreHint" tabindex="-1" aria-hidden="true">
              <option value="District Judge">District Judge</option>
              <option value="ADJ / Sessions">ADJ / Sessions</option>
              <option value="Senior Division">Senior Division</option>
              <option value="Senior Division / FTC">Senior Division / FTC</option>
              <option value="Junior Division">Junior Division</option>
              <option value="Junior Division / FTC">Junior Division / FTC</option>
              <option value="Family Court">Family Court</option>
              <option value="Commercial Court">Commercial Court</option>
              <option value="Special Courts (POCSO / NDPS / CBI)">Special Courts (POCSO / NDPS / CBI)</option>
              <option value="Motor Accident Claims Tribunal (MACT)">MACT Tribunal</option>
              <option value="Revenue / Collectorate">Revenue / Collectorate</option>
              <option value="High Court">High Court</option>
              <option value="General" selected>General</option>
            </select>
            <button type="button" class="custom-dropdown-trigger dropdown-trigger" id="courtCadreTrigger" aria-haspopup="listbox" aria-expanded="false">
              <span class="custom-dropdown-label dropdown-label" id="courtCadreLabel">General</span>
              <svg class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="courtCadreMenu">
              <ul class="custom-dropdown-list options-list custom-scrollbar" id="courtCadreList" role="listbox"></ul>
            </div>
          </div>
          <span class="court-field-hint" id="courtCadreHint">Forum grouping for cause list filtering</span>
        </div>
      </div>

      <!-- 2b. Status & Remarks -->
      <div class="court-modal-grid-2">
        <div class="court-modal-field">
          <label for="courtStatusSelect" class="court-modal-label">Court Status</label>
          <div class="custom-dropdown" id="courtStatusDropdown">
            <select id="courtStatusSelect" class="sr-only" tabindex="-1" aria-hidden="true">
              <option value="ACTIVE" selected>Active</option>
              <option value="VACANT">Vacant</option>
            </select>
            <button type="button" class="custom-dropdown-trigger dropdown-trigger" id="courtStatusTrigger" aria-haspopup="listbox" aria-expanded="false">
              <span class="custom-dropdown-label dropdown-label" id="courtStatusLabel">Active</span>
              <svg class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="courtStatusMenu">
              <ul class="custom-dropdown-list options-list custom-scrollbar" id="courtStatusList" role="listbox"></ul>
            </div>
          </div>
        </div>

        <div class="court-modal-field">
          <label for="courtRemarksInput" class="court-modal-label">Remarks <span class="court-modal-opt-label">(Optional)</span></label>
          <div class="search-field-box">
            <span class="search-field-prefix-icon" aria-hidden="true">
              <svg class="lucide lucide-message-square" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </span>
            <input
              type="text"
              id="courtRemarksInput"
              placeholder="e.g. Vacant Presiding Officer"
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <!-- 3. Dual Jurisdiction Section (Progressive Disclosure) -->
      <div class="court-modal-dual-box">
        <label class="court-checkbox-label" for="courtDualJurisdictionToggle">
          <input type="checkbox" id="courtDualJurisdictionToggle" class="court-checkbox-input" />
          <span class="court-checkbox-custom" aria-hidden="true">
            <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </span>
          <span class="court-checkbox-text">
            <span class="court-checkbox-title">Dual Jurisdiction Court</span>
            <span class="court-checkbox-desc">Enable if this court also presides under a separate criminal magistrate title.</span>
          </span>
        </label>

        <div id="courtCriminalTitleFieldWrap" class="court-modal-field court-dual-expand hidden">
          <label for="courtCriminalTitleInput" class="court-modal-label">
            Criminal Jurisdiction Title
            <span class="court-modal-opt-label">(Optional)</span>
          </label>
          <div class="search-field-box">
            <span class="search-field-prefix-icon" aria-hidden="true">
              <svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
            </span>
            <input
              type="text"
              id="courtCriminalTitleInput"
              placeholder="e.g. ACJM-5 / Addl. Chief Judicial Magistrate 5th"
              aria-describedby="courtCrimTitleHint"
              autocomplete="off"
            />
          </div>
          <span class="court-field-hint" id="courtCrimTitleHint">Specifies magistrate designation for criminal cases &amp; cause lists</span>
        </div>
      </div>

      <div class="court-modal-notice" role="note">
        <svg class="lucide lucide-info" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span>
          <strong>Pro-Tip:</strong> Short codes and cadres are auto-detected from the court name and can be fine-tuned anytime.
        </span>
      </div>

      <div id="addCourtErrorMsg" class="court-modal-error hidden"></div>
    </div>

    <div class="court-modal-footer">
      <button type="button" class="court-btn-cancel" onclick="closeAddCourtModal()">Cancel</button>
      <button
        type="button"
        id="saveCourtBtn"
        class="court-btn-primary"
      >
        <svg class="lucide lucide-send" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        <span>Submit Court</span>
      </button>
    </div>
  </div>
</div>

<!-- ================= EDIT COURT MODAL ================= -->
<div
  id="editCourtModal"
  class="court-modal-overlay hidden"
  role="dialog"
  aria-modal="true"
  aria-labelledby="editCourtModalTitle"
>
  <div class="court-modal-card">
    <div class="court-modal-header">
      <div class="court-modal-header-info">
        <div class="court-modal-icon">
          <svg class="lucide lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
        </div>
        <div>
          <h3 id="editCourtModalTitle">Edit Court Name</h3>
          <p id="editCourtModalSubtitle" class="court-modal-subtitle">
            Rename this judicial forum and sync all associated case filings.
          </p>
        </div>
      </div>
      <button
        type="button"
        id="closeEditCourtModalBtn"
        class="court-modal-close-btn"
        aria-label="Close dialog"
        onclick="closeEditCourtModal()"
      >
        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>

    <div class="court-modal-body">
      <input type="hidden" id="editCourtOriginalName" value="" />
      
      <!-- 1. Court Name (Required) -->
      <div class="court-modal-field">
        <label for="editCourtNameInput" class="court-modal-label">
          Court / Judicial Forum Name
          <span class="required-star" aria-hidden="true">*</span>
          <span class="sr-only">(required)</span>
        </label>
        <div class="court-input-action-row">
          <div class="search-field-box">
            <span class="search-field-prefix-icon" aria-hidden="true">
              <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
            </span>
            <input
              type="text"
              id="editCourtNameInput"
              placeholder="Enter updated court name..."
              autocomplete="off"
              required
              aria-required="true"
            />
          </div>
        </div>
      </div>

      <!-- 2. Two-Column Row: Short Code & Cadre / Forum -->
      <div class="court-modal-grid-2">
        <div class="court-modal-field">
          <label for="editCourtShortCodeInput" class="court-modal-label">Short Code / Acronym</label>
          <div class="search-field-box">
            <span class="search-field-prefix-icon" aria-hidden="true">
              <svg class="lucide lucide-hash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
            </span>
            <input
              type="text"
              id="editCourtShortCodeInput"
              placeholder="e.g. ACJM-5, ADJ-01"
              aria-describedby="editCourtShortCodeHint"
              autocomplete="off"
            />
          </div>
          <span class="court-field-hint" id="editCourtShortCodeHint">Used on compact badges &amp; calendar tags</span>
        </div>

        <div class="court-modal-field">
          <label for="editCourtCadreSelect" class="court-modal-label">Cadre / Forum</label>
          <div class="custom-dropdown" id="editCourtCadreDropdown">
            <select id="editCourtCadreSelect" class="sr-only" aria-describedby="editCourtCadreHint" tabindex="-1" aria-hidden="true">
              <option value="District Judge">District Judge</option>
              <option value="ADJ / Sessions">ADJ / Sessions</option>
              <option value="Senior Division">Senior Division</option>
              <option value="Senior Division / FTC">Senior Division / FTC</option>
              <option value="Junior Division">Junior Division</option>
              <option value="Junior Division / FTC">Junior Division / FTC</option>
              <option value="Family Court">Family Court</option>
              <option value="Commercial Court">Commercial Court</option>
              <option value="Special Courts (POCSO / NDPS / CBI)">Special Courts (POCSO / NDPS / CBI)</option>
              <option value="Motor Accident Claims Tribunal (MACT)">MACT Tribunal</option>
              <option value="Revenue / Collectorate">Revenue / Collectorate</option>
              <option value="High Court">High Court</option>
              <option value="General" selected>General</option>
            </select>
            <button type="button" class="custom-dropdown-trigger dropdown-trigger" id="editCourtCadreTrigger" aria-haspopup="listbox" aria-expanded="false">
              <span class="custom-dropdown-label dropdown-label" id="editCourtCadreLabel">General</span>
              <svg class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="editCourtCadreMenu">
              <ul class="custom-dropdown-list options-list custom-scrollbar" id="editCourtCadreList" role="listbox"></ul>
            </div>
          </div>
          <span class="court-field-hint" id="editCourtCadreHint">Forum grouping for cause list filtering</span>
        </div>
      </div>

      <!-- 2b. Status & Remarks -->
      <div class="court-modal-grid-2">
        <div class="court-modal-field">
          <label for="editCourtStatusSelect" class="court-modal-label">Court Status</label>
          <div class="custom-dropdown" id="editCourtStatusDropdown">
            <select id="editCourtStatusSelect" class="sr-only" tabindex="-1" aria-hidden="true">
              <option value="ACTIVE">Active</option>
              <option value="VACANT">Vacant</option>
            </select>
            <button type="button" class="custom-dropdown-trigger dropdown-trigger" id="editCourtStatusTrigger" aria-haspopup="listbox" aria-expanded="false">
              <span class="custom-dropdown-label dropdown-label" id="editCourtStatusLabel">Active</span>
              <svg class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="editCourtStatusMenu">
              <ul class="custom-dropdown-list options-list custom-scrollbar" id="editCourtStatusList" role="listbox"></ul>
            </div>
          </div>
        </div>

        <div class="court-modal-field">
          <label for="editCourtRemarksInput" class="court-modal-label">Remarks <span class="court-modal-opt-label">(Optional)</span></label>
          <div class="search-field-box">
            <span class="search-field-prefix-icon" aria-hidden="true">
              <svg class="lucide lucide-message-square" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </span>
            <input
              type="text"
              id="editCourtRemarksInput"
              placeholder="e.g. Vacant Presiding Officer"
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <!-- 3. Dual Jurisdiction Section (Progressive Disclosure) -->
      <div class="court-modal-dual-box">
        <label class="court-checkbox-label" for="editCourtDualJurisdictionToggle">
          <input type="checkbox" id="editCourtDualJurisdictionToggle" class="court-checkbox-input" />
          <span class="court-checkbox-custom" aria-hidden="true">
            <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </span>
          <span class="court-checkbox-text">
            <span class="court-checkbox-title">Dual Jurisdiction Court</span>
            <span class="court-checkbox-desc">Enable if this court also presides under a separate criminal magistrate title.</span>
          </span>
        </label>

        <div id="editCourtCriminalTitleFieldWrap" class="court-modal-field court-dual-expand hidden">
          <label for="editCourtCriminalTitleInput" class="court-modal-label">
            Criminal Jurisdiction Title
            <span class="court-modal-opt-label">(Optional)</span>
          </label>
          <div class="search-field-box">
            <span class="search-field-prefix-icon" aria-hidden="true">
              <svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
            </span>
            <input
              type="text"
              id="editCourtCriminalTitleInput"
              placeholder="e.g. ACJM-5 / Addl. Chief Judicial Magistrate 5th"
              aria-describedby="editCourtCrimTitleHint"
              autocomplete="off"
            />
          </div>
          <span class="court-field-hint" id="editCourtCrimTitleHint">Specifies magistrate designation for criminal cases &amp; cause lists</span>
        </div>
      </div>

      <div id="editCourtWarningNotice" class="court-modal-notice" role="note">
        <svg class="lucide lucide-info" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span id="editCourtNoticeText">
          Renaming will automatically update all associated case filings across all tables.
        </span>
      </div>

      <div id="editCourtErrorMsg" class="court-modal-error hidden"></div>
    </div>

    <div class="court-modal-footer">
      <button type="button" class="court-btn-cancel" onclick="closeEditCourtModal()">Cancel</button>
      <button
        type="button"
        id="saveEditCourtBtn"
        class="court-btn-primary"
        onclick="confirmSaveEditedCourt()"
      >
        <svg class="lucide lucide-save" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        <span id="saveEditCourtBtnText">Save Changes</span>
      </button>
    </div>
  </div>
</div>

<!-- ================= DELETE COURT MODAL ================= -->
<div
  id="deleteCourtModal"
  class="court-modal-overlay hidden"
  role="dialog"
  aria-modal="true"
  aria-labelledby="deleteCourtModalTitle"
>
  <div class="court-modal-card court-modal-card-danger">
    <div class="court-modal-header">
      <div class="court-modal-header-info">
        <div class="court-modal-icon court-modal-icon-danger">
          <svg class="lucide lucide-alert-triangle" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
        </div>
        <div>
          <h3 id="deleteCourtModalTitle">Delete Court</h3>
          <p class="court-modal-subtitle">
            Permanent removal of judicial forum from system
          </p>
        </div>
      </div>
      <button
        type="button"
        id="closeDeleteCourtModalBtn"
        class="court-modal-close-btn"
        aria-label="Close"
        onclick="closeDeleteCourtModal()"
      >
        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>

    <div class="court-modal-body">
      <input type="hidden" id="deleteCourtTargetName" value="" />
      <input type="hidden" id="deleteCourtActiveCount" value="0" />

      <p id="deleteCourtConfirmPrompt" class="court-modal-prompt">
        Are you sure you want to remove <strong id="deleteCourtDisplayName">this court</strong> from the directory?
      </p>

      <div id="deleteCourtActiveCasesNotice" class="court-modal-notice court-modal-notice-danger hidden">
        <svg class="lucide lucide-alert-triangle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
        <span id="deleteCourtCasesNoticeText"></span>
      </div>

      <div id="deleteCourtErrorMsg" class="court-modal-error hidden"></div>
    </div>

    <div class="court-modal-footer">
      <button type="button" class="court-btn-cancel" onclick="closeDeleteCourtModal()">Cancel</button>
      <button
        type="button"
        id="confirmDeleteCourtBtn"
        class="court-btn-danger"
        onclick="executeDeleteCourtConfirm()"
      >
        <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        <span id="confirmDeleteCourtBtnText">Delete Court</span>
      </button>
    </div>
  </div>
</div>

<!-- ================= PRUNE UNLINKED COURTS MODAL ================= -->
<div
  id="pruneCourtsModal"
  class="court-modal-overlay hidden"
  role="dialog"
  aria-modal="true"
  aria-labelledby="pruneCourtsModalTitle"
>
  <div class="court-modal-card court-modal-card-danger">
    <div class="court-modal-header">
      <div class="court-modal-header-info">
        <div class="court-modal-icon court-modal-icon-danger">
          <svg class="lucide lucide-filter-x" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"/><path d="m22 3-5 5"/><path d="m17 3 5 5"/></svg>
        </div>
        <div>
          <h3 id="pruneCourtsModalTitle">Prune Unlinked Courts</h3>
          <p class="court-modal-subtitle">
            Remove hardcoded courts with 0 linked cases across all tables
          </p>
        </div>
      </div>
      <button
        type="button"
        id="closePruneCourtsModalBtn"
        class="court-modal-close-btn"
        aria-label="Close"
        onclick="closePruneCourtsModal()"
      >
        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>

    <div class="court-modal-body">
      <p id="pruneCourtsSummaryText" class="court-modal-prompt">
        Checking for unlinked hardcoded courts...
      </p>

      <label class="court-checkbox-label" for="pruneIncludeCustomToggle">
        <input type="checkbox" id="pruneIncludeCustomToggle" class="court-checkbox-input" onchange="refreshPruneCourtsPreview()" />
        <span class="court-checkbox-custom" aria-hidden="true">
          <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <span class="court-checkbox-text">
          <span class="court-checkbox-title">Include custom courts with 0 cases</span>
          <span class="court-checkbox-desc">Also remove manually added courts that are not linked to any case.</span>
        </span>
      </label>

      <div id="pruneCourtsListBox" class="prune-courts-list hidden"></div>
      <div id="pruneCourtsErrorMsg" class="court-modal-error hidden"></div>
    </div>

    <div class="court-modal-footer">
      <button type="button" class="court-btn-cancel" onclick="closePruneCourtsModal()">Cancel</button>
      <button
        type="button"
        id="confirmPruneCourtsBtn"
        class="court-btn-danger"
        onclick="executePruneUnlinkedCourts()"
      >
        <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        <span id="confirmPruneCourtsBtnText">Delete Unlinked Courts</span>
      </button>
    </div>
  </div>
</div>
`;

let currentCourtsPage = 1;
const COURTS_PER_PAGE = 10;

function getCourtsList() {
  if (typeof window !== 'undefined' && Array.isArray(window.courts) && window.courts.length > 0) {
    return window.courts;
  }
  if (typeof courts !== 'undefined' && Array.isArray(courts) && courts.length > 0) {
    return courts;
  }
  return (typeof window !== 'undefined' && Array.isArray(window.courts)) ? window.courts : (typeof courts !== 'undefined' && Array.isArray(courts) ? courts : []);
}

function getCourtsAllCaseRecords() {
  if (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) && window.allCaseRecords.length > 0) {
    return window.allCaseRecords;
  }
  if (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) && allCaseRecords.length > 0) {
    return allCaseRecords;
  }
  return (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords)) ? window.allCaseRecords : (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) ? allCaseRecords : []);
}

function goToCourtsPage(page) {
  currentCourtsPage = page;
  renderCourtsTable();
}
window.goToCourtsPage = goToCourtsPage;

function getEnrichedCourtRecord(courtName) {
  const list = (typeof window !== 'undefined' && Array.isArray(window.courtsList) && window.courtsList.length > 0)
    ? window.courtsList
    : (typeof courtsList !== 'undefined' && Array.isArray(courtsList) ? courtsList : (typeof window !== 'undefined' && window.auditedCourtsData ? window.auditedCourtsData : []));

  const lower = (courtName || '').trim().toLowerCase();
  const match = list.find(c => (c.court_name || '').trim().toLowerCase() === lower);
  if (match) return match;

  return {
    court_name: courtName,
    short_code: (courtName || '').substring(0, 10),
    civil_title: courtName,
    criminal_title: courtName,
    cadre: 'General',
    status: 'ACTIVE',
    remarks: ''
  };
}

function renderCourtsTable(filterQuery = "") {
  // Ensure DOM is bound if not already
  bindCourtsTabEvents();
  const countBadge = document.getElementById("courtsTotalCountBadge");
  const searchInput = document.getElementById("courtSearchInput");
  const query = (
    filterQuery !== undefined && filterQuery !== null && filterQuery !== ""
      ? filterQuery
      : (searchInput ? searchInput.value : "") || ""
  )
    .trim()
    .toLowerCase();

  const deletedSet = typeof getDeletedCourtsSet === "function" ? getDeletedCourtsSet() : new Set();
  const seen = new Set();
  const allCourtsList = [];
  const rawCourts = getCourtsList();

  rawCourts.forEach((c) => {
    const t = (c || "").trim();
    if (t && !deletedSet.has(t.toLowerCase()) && !seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase());
      allCourtsList.push(t);
    }
  });

  allCourtsList.sort((a, b) => {
    const recA = getEnrichedCourtRecord(a);
    const recB = getEnrichedCourtRecord(b);
    const orderA = (typeof recA.sort_order === "number" && recA.sort_order > 0) ? recA.sort_order : 9999;
    const orderB = (typeof recB.sort_order === "number" && recB.sort_order > 0) ? recB.sort_order : 9999;
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });

  const filteredCourts = query
    ? allCourtsList.filter((c) => {
        const rec = getEnrichedCourtRecord(c);
        return (
          c.toLowerCase().includes(query) ||
          (rec.short_code && rec.short_code.toLowerCase().includes(query)) ||
          (rec.civil_title && rec.civil_title.toLowerCase().includes(query)) ||
          (rec.criminal_title && rec.criminal_title.toLowerCase().includes(query)) ||
          (rec.cadre && rec.cadre.toLowerCase().includes(query)) ||
          (rec.status && rec.status.toLowerCase().includes(query))
        );
      })
    : allCourtsList;

  if (countBadge) {
    if (query) {
      countBadge.textContent = `${filteredCourts.length} of ${allCourtsList.length} Courts`;
    } else {
      countBadge.textContent = `${allCourtsList.length} Court${allCourtsList.length === 1 ? "" : "s"} Configured`;
    }
  }

  const grid = document.getElementById("courtsCardsGrid");
  if (!grid) return;

  if (filteredCourts.length === 0) {
    grid.innerHTML = `<div class="courts-cards-empty">${query ? `No courts matching "${escapeHtml(query)}".` : "No courts configured yet. Add a court using the form above."}</div>`;
    return;
  }

  const totalPages = Math.ceil(filteredCourts.length / COURTS_PER_PAGE) || 1;
  if (currentCourtsPage > totalPages) {
    currentCourtsPage = totalPages;
  }
  if (currentCourtsPage < 1) {
    currentCourtsPage = 1;
  }

  const startIndex = (currentCourtsPage - 1) * COURTS_PER_PAGE;
  const endIndex = Math.min(startIndex + COURTS_PER_PAGE, filteredCourts.length);
  const pagedCourts = filteredCourts.slice(startIndex, endIndex);

  // =========================================================
  // Build Zen Minimalist Rows
  // Crisp single-row on desktop, organized compact card on mobile
  // =========================================================
  let rowsHTML = "";
  pagedCourts.forEach((court, pIndex) => {
    const actualIndex = startIndex + pIndex;
    const casesInCourt = getCourtsAllCaseRecords().filter(
      (c) =>
        (c.courtName || "").trim().toLowerCase() === court.trim().toLowerCase() ||
        (c.criminalCourtName || "").trim().toLowerCase() === court.trim().toLowerCase(),
    );
    const count = casesInCourt.length;
    const rec = getEnrichedCourtRecord(court);
    const hasDualName = rec.civil_title && rec.criminal_title && rec.civil_title.trim().toLowerCase() !== rec.criminal_title.trim().toLowerCase();
    const isVacant = (rec.status || 'ACTIVE').toUpperCase() === 'VACANT';

    rowsHTML += `
      <div class="zen-court-row" id="court-row-${actualIndex}" data-court="${escapeHtml(court)}">
        <!-- Col 1: Serial -->
        <div class="zen-col zen-col-idx">
          <span class="zen-idx-badge" title="Serial Number">#${String(actualIndex + 1).padStart(2, '0')}</span>
        </div>

        <!-- Col 2: Court Info (Title + Subtitle) -->
        <div class="zen-col zen-col-main">
          <div class="zen-court-name-line" onclick="if (window.innerWidth <= 768) toggleCourtRow(${actualIndex})">
            <span class="court-card-title zen-court-name" title="${escapeHtml(rec.civil_title || court)}">${escapeHtml(rec.civil_title || court)}</span>
            ${isVacant ? `
            <span class="zen-status-vacant" title="Presiding Officer Vacant">
              <svg class="lucide lucide-alert-circle" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              <span>Vacant</span>
            </span>
            ` : ''}
            <button type="button" class="zen-expand-toggle zen-mobile-only" aria-expanded="false" aria-label="Toggle court details" onclick="event.stopPropagation(); toggleCourtRow(${actualIndex})">
              <svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
          <div class="zen-court-subinfo">
            <span class="zen-cadre-tag" title="Cadre / Forum">
              <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
              <span>${escapeHtml(rec.cadre || 'General')}</span>
            </span>
            ${hasDualName ? `
            <span class="zen-meta-dot zen-desktop-only">•</span>
            <span class="zen-criminal-tag" title="Criminal Jurisdiction Title">
              <svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
              <span class="criminal-val">Crim: ${escapeHtml(rec.criminal_title)}</span>
            </span>
            ` : ''}
            ${rec.remarks ? `
            <span class="zen-meta-dot zen-desktop-only">•</span>
            <span class="zen-remarks-tag" title="Remarks">
              <svg class="lucide lucide-message-square" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>${escapeHtml(rec.remarks)}</span>
            </span>
            ` : ''}
            ${rec.short_code ? `
            <span class="zen-code-detail zen-mobile-only" title="Short Code: ${escapeHtml(rec.short_code)}">
              <svg class="lucide lucide-hash" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
              <span>Code: ${escapeHtml(rec.short_code)}</span>
            </span>
            ` : ''}
          </div>
        </div>

        <!-- Col 3: Short Code (Desktop) -->
        <div class="zen-col zen-col-code zen-desktop-only">
          ${rec.short_code ? `
            <span class="zen-code-chip" title="Short Code: ${escapeHtml(rec.short_code)}">${escapeHtml(rec.short_code)}</span>
          ` : `
            <span class="zen-empty-dash" title="No short code">—</span>
          `}
        </div>

        <!-- Col 4: Assigned Cases Badge (Clickable to view cases) -->
        <div class="zen-col zen-col-cases">
          <button type="button" 
                  class="court-tag tag-cases court-card-cases-badge zen-cases-badge ${count > 0 ? 'has-cases view-court-cases' : 'zero-cases'}" 
                  data-court="${escapeHtml(court)}" 
                  title="${count > 0 ? 'Click to view assigned cases' : 'No cases assigned'}">
            <svg class="lucide lucide-briefcase" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span class="cases-text">${count} Case${count === 1 ? '' : 's'} Assigned</span>
          </button>
        </div>

        <!-- Col 5: Actions (View, Edit, Delete) -->
        <div class="zen-col zen-col-actions action-buttons">
          ${count > 0 ? `
          <button type="button" 
                  class="zen-icon-btn view-court-cases view-cases-btn" 
                  data-court="${escapeHtml(court)}" 
                  title="View Cases" 
                  aria-label="View Cases">
            <svg class="lucide lucide-external-link" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
          </button>
          ` : ''}

          <button type="button" 
                  class="zen-icon-btn edit-court edit-btn" 
                  data-court="${escapeHtml(court)}" 
                  data-count="${count}" 
                  title="Edit Court" 
                  aria-label="Edit Court">
            <svg class="lucide lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </button>

          <button type="button" 
                  class="zen-icon-btn delete-court delete-btn zen-btn-danger" 
                  data-court="${escapeHtml(court)}" 
                  data-count="${count}" 
                  title="Delete Court" 
                  aria-label="Delete Court">
            <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </button>
        </div>
      </div>
    `;
  });

  // =========================================================
  // Build pagination
  // =========================================================
  let paginationHTML = `
    <div class="courts-pagination">
      <div class="courts-pagination-info">
        Showing ${startIndex + 1} to ${endIndex} of ${filteredCourts.length} courts
      </div>
      <div class="courts-pagination-controls">
        <button type="button" class="court-page-btn" ${currentCourtsPage <= 1 ? "disabled" : ""} onclick="goToCourtsPage(${currentCourtsPage - 1})">
          <svg class="lucide lucide-chevron-left" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg> Prev
        </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentCourtsPage - 1 && i <= currentCourtsPage + 1)) {
      paginationHTML += `
        <button type="button" class="court-page-btn ${i === currentCourtsPage ? "active" : ""}" onclick="goToCourtsPage(${i})">
          ${i}
        </button>
      `;
    } else if (i === currentCourtsPage - 2 || i === currentCourtsPage + 2) {
      paginationHTML += `<span class="court-page-dots">…</span>`;
    }
  }

  paginationHTML += `
        <button type="button" class="court-page-btn" ${currentCourtsPage >= totalPages ? "disabled" : ""} onclick="goToCourtsPage(${currentCourtsPage + 1})">
          Next <svg class="lucide lucide-chevron-right" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  `;

  // Wrap inside Zen Courts Container
  const tableHTML = `
    <div class="courts-card-wrapper zen-courts-wrapper">
      <div class="zen-courts-card" role="region" aria-label="Courts Directory">
        <!-- Desktop Header -->
        <div class="zen-courts-head" aria-hidden="true">
          <div class="zen-th zen-col-idx">#</div>
          <div class="zen-th zen-col-main">Court &amp; Forum</div>
          <div class="zen-th zen-col-code">Code</div>
          <div class="zen-th zen-col-cases">Assigned Cases</div>
          <div class="zen-th zen-col-actions">Actions</div>
        </div>

        <!-- Body Rows -->
        <div class="zen-courts-body" role="list">
          ${rowsHTML}
        </div>

        <!-- Pagination -->
        ${paginationHTML}
      </div>
    </div>
  `;

  grid.innerHTML = tableHTML;

  // Attach button event listeners with e.stopPropagation()
  grid.querySelectorAll(".view-court-cases").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const courtName = btn.getAttribute("data-court");
      if (typeof showTab === "function") {
        showTab("all");
      }
      setTimeout(() => {
        const allSearchInput = document.getElementById("allSearchInput") || document.getElementById("searchInput");
        if (allSearchInput) {
          allSearchInput.value = courtName;
          if (typeof filterUnifiedTable === "function") {
            filterUnifiedTable(courtName);
          } else if (typeof filterAllCasesTable === "function") {
            filterAllCasesTable(courtName);
          }
        }
      }, 150);
    });
  });

  grid.querySelectorAll(".edit-court").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const courtName = btn.getAttribute("data-court");
      const count = parseInt(btn.getAttribute("data-count")) || 0;
      openEditCourtModal(courtName, count);
    });
  });

  grid.querySelectorAll(".delete-court").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const courtName = btn.getAttribute("data-court");
      const count = parseInt(btn.getAttribute("data-count")) || 0;
      openDeleteCourtModal(courtName, count);
    });
  });
}

function toggleCourtRow(index) {
  const row = document.getElementById(`court-row-${index}`);
  if (!row) return;

  const isExpanded = row.classList.contains("expanded");

  // Single-open accordion: close other open rows in this grouped table
  const group = row.closest(".zen-courts-body, .ios-courts-group");
  if (group) {
    group.querySelectorAll(".zen-court-row.expanded, .ios-court-row.expanded").forEach((openRow) => {
      if (openRow !== row) {
        openRow.classList.remove("expanded");
        const btn = openRow.querySelector(".zen-expand-toggle, .ios-court-summary");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (isExpanded) {
    row.classList.remove("expanded");
    const btn = row.querySelector(".zen-expand-toggle, .ios-court-summary");
    if (btn) btn.setAttribute("aria-expanded", "false");
  } else {
    row.classList.add("expanded");
    const btn = row.querySelector(".zen-expand-toggle, .ios-court-summary");
    if (btn) btn.setAttribute("aria-expanded", "true");
  }
}
if (typeof toggleCourtRow !== "undefined") window.toggleCourtRow = toggleCourtRow;


function generateSuggestedShortCode(name) {
  const str = (name || '').trim();
  if (!str) return '';

  // Specific common patterns
  const lower = str.toLowerCase();
  const numMatch = str.match(/(\d+)/);
  const num = numMatch ? `-${numMatch[1]}` : '';

  if (lower.includes('commercial')) return `COMM${num}`;
  if (lower.includes('family')) return `FC${num}`;
  if (lower.includes('senior division') || lower.includes('acjm')) return `ACJM${num || '-FTC'}`;
  if (lower.includes('junior division') || lower.includes('ftc')) return `JM${num || '-FTC'}`;
  if (lower.includes('district') && lower.includes('session')) return `DJ${num}`;
  if (lower.includes('additional district') || lower.includes('adj')) return `ADJ${num}`;
  if (lower.includes('high court')) return 'HC';
  if (lower.includes('cbi')) return `CBI${num}`;
  if (lower.includes('pocso')) return `POCSO${num}`;
  if (lower.includes('ndps')) return `NDPS${num}`;

  // Acronym of capital letters or words
  const words = str.split(/[\s,-]+/).filter(w => w.length > 0 && !['of', 'and', 'the', 'court', 'room', 'bench', 'in'].includes(w.toLowerCase()));
  if (words.length >= 2) {
    const letters = words.map(w => w[0].toUpperCase()).slice(0, 4).join('');
    return num ? `${letters}${num}` : letters;
  }
  return str.substring(0, 8).toUpperCase();
}

function autoDetectCadre(name) {
  const lower = (name || '').toLowerCase();
  if (lower.includes('family')) return 'Family Court';
  if (lower.includes('commercial')) return 'Commercial Court';
  if (lower.includes('pocso') || lower.includes('ndps') || lower.includes('cbi')) return 'Special Courts (POCSO / NDPS / CBI)';
  if ((lower.includes('senior division') || lower.includes('acjm') || lower.includes('cjm')) && lower.includes('ftc')) return 'Senior Division / FTC';
  if (lower.includes('senior division') || lower.includes('acjm') || lower.includes('cjm')) return 'Senior Division';
  if ((lower.includes('junior division') || lower.includes('ajm')) && lower.includes('ftc')) return 'Junior Division / FTC';
  if (lower.includes('junior division') || lower.includes('ajm')) return 'Junior Division';
  if (lower.includes('addl. district') || lower.includes('additional district') || lower.includes('adj') || lower.includes('special judge')) return 'ADJ / Sessions';
  if (lower.includes('district')) return 'District Judge';
  if (lower.includes('mact') || lower.includes('accident')) return 'Motor Accident Claims Tribunal (MACT)';
  if (lower.includes('revenue') || lower.includes('collector')) return 'Revenue / Collectorate';
  if (lower.includes('high court')) return 'High Court';
  return 'General';
}

function openAddCourtModal() {
  const modal = document.getElementById("addCourtModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  
  const input = document.getElementById("courtInput");
  const codeInput = document.getElementById("courtShortCodeInput");
  const cadreSelect = document.getElementById("courtCadreSelect");
  const crimInput = document.getElementById("courtCriminalTitleInput");
  const err = document.getElementById("addCourtErrorMsg");

  if (input) input.value = "";
  if (codeInput) {
    codeInput.value = "";
    delete codeInput.dataset.manual;
  }
  if (cadreSelect) cadreSelect.value = "General";
  const statusSelect = document.getElementById("courtStatusSelect");
  const remarksInput = document.getElementById("courtRemarksInput");
  if (statusSelect) statusSelect.value = "ACTIVE";
  if (remarksInput) remarksInput.value = "";
  syncCourtModalDropdowns(["courtCadreDropdown", "courtStatusDropdown"]);
  if (crimInput) crimInput.value = "";
  const dualToggle = document.getElementById("courtDualJurisdictionToggle");
  const crimWrap = document.getElementById("courtCriminalTitleFieldWrap");
  if (dualToggle) dualToggle.checked = false;
  if (crimWrap) crimWrap.classList.add("hidden");
  if (err) err.classList.add("hidden");

  // Wire up dual jurisdiction toggle
  if (dualToggle && !dualToggle.dataset.bound) {
    dualToggle.dataset.bound = "true";
    dualToggle.addEventListener("change", () => {
      const wrap = document.getElementById("courtCriminalTitleFieldWrap");
      const cInput = document.getElementById("courtCriminalTitleInput");
      if (wrap) {
        if (dualToggle.checked) {
          wrap.classList.remove("hidden");
          setTimeout(() => cInput?.focus(), 50);
        } else {
          wrap.classList.add("hidden");
          if (cInput) cInput.value = "";
        }
      }
    });
  }

  // Attach live auto-suggest listeners
  if (input && !input.dataset.suggestBound) {
    input.dataset.suggestBound = "true";
    input.addEventListener("input", () => {
      const val = input.value.trim();
      const codeEl = document.getElementById("courtShortCodeInput");
      const cadreEl = document.getElementById("courtCadreSelect");
      if (codeEl && !codeEl.dataset.manual) {
        codeEl.value = generateSuggestedShortCode(val);
      }
      if (cadreEl && val) {
        cadreEl.value = autoDetectCadre(val);
      }
    });
  }

  if (codeInput && !codeInput.dataset.manualBound) {
    codeInput.dataset.manualBound = "true";
    codeInput.addEventListener("input", () => {
      codeInput.dataset.manual = "true";
    });
  }

  if (input) {
    setTimeout(() => input.focus(), 80);
  }
}
window.openAddCourtModal = openAddCourtModal;

function closeAddCourtModal() {
  const modal = document.getElementById("addCourtModal");
  if (!modal) return;
  modal.classList.add("hidden");
  const input = document.getElementById("courtInput");
  if (input) input.value = "";
  const codeInput = document.getElementById("courtShortCodeInput");
  if (codeInput) {
    codeInput.value = "";
    delete codeInput.dataset.manual;
  }
  const crimInput = document.getElementById("courtCriminalTitleInput");
  if (crimInput) crimInput.value = "";
  const statusSelect = document.getElementById("courtStatusSelect");
  if (statusSelect) statusSelect.value = "ACTIVE";
  const remarksInput = document.getElementById("courtRemarksInput");
  if (remarksInput) remarksInput.value = "";
  const dualToggle = document.getElementById("courtDualJurisdictionToggle");
  if (dualToggle) dualToggle.checked = false;
  const crimWrap = document.getElementById("courtCriminalTitleFieldWrap");
  if (crimWrap) crimWrap.classList.add("hidden");
  const err = document.getElementById("addCourtErrorMsg");
  if (err) err.classList.add("hidden");
}
window.closeAddCourtModal = closeAddCourtModal;

function bindCourtsTabEvents() {
  const saveBtn = document.getElementById("saveCourtBtn");
  const courtInput = document.getElementById("courtInput");

  if (saveBtn && !saveBtn.dataset.bound) {
    saveBtn.dataset.bound = "true";
    saveBtn.addEventListener("click", () => {
      if (typeof handleAddCourtSubmit === "function") {
        handleAddCourtSubmit();
      }
    });
  }

  // Global ESC key listener for modal accessibility
  if (!document.body.dataset.courtsModalEscBound) {
    document.body.dataset.courtsModalEscBound = "true";
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const addM = document.getElementById("addCourtModal");
        const editM = document.getElementById("editCourtModal");
        const delM = document.getElementById("deleteCourtModal");
        if (addM && !addM.classList.contains("hidden")) {
          closeAddCourtModal();
        } else if (editM && !editM.classList.contains("hidden")) {
          closeEditCourtModal();
        } else if (delM && !delM.classList.contains("hidden")) {
          closeDeleteCourtModal();
        } else {
          const pruneM = document.getElementById("pruneCourtsModal");
          if (pruneM && !pruneM.classList.contains("hidden")) {
            closePruneCourtsModal();
          }
        }
      }
    });
  }

  if (courtInput && !courtInput.dataset.bound) {
    courtInput.dataset.bound = "true";
    courtInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (typeof handleAddCourtSubmit === "function") {
          handleAddCourtSubmit();
        }
      }
    });
  }

  const editNameInput = document.getElementById("editCourtNameInput");
  if (editNameInput && !editNameInput.dataset.bound) {
    editNameInput.dataset.bound = "true";
    editNameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        confirmSaveEditedCourt();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeEditCourtModal();
      }
    });
  }

  const addModal = document.getElementById("addCourtModal");
  if (addModal && !addModal.dataset.bound) {
    addModal.dataset.bound = "true";
    addModal.addEventListener("click", (e) => {
      if (e.target === addModal) {
        closeAddCourtModal();
      }
    });
  }
  const editModal = document.getElementById("editCourtModal");
  if (editModal && !editModal.dataset.bound) {
    editModal.dataset.bound = "true";
    editModal.addEventListener("click", (e) => {
      if (e.target === editModal) {
        closeEditCourtModal();
      }
    });
  }

  const delModal = document.getElementById("deleteCourtModal");
  if (delModal && !delModal.dataset.bound) {
    delModal.dataset.bound = "true";
    delModal.addEventListener("click", (e) => {
      if (e.target === delModal) {
        closeDeleteCourtModal();
      }
    });
  }

  const pruneModal = document.getElementById("pruneCourtsModal");
  if (pruneModal && !pruneModal.dataset.bound) {
    pruneModal.dataset.bound = "true";
    pruneModal.addEventListener("click", (e) => {
      if (e.target === pruneModal) {
        closePruneCourtsModal();
      }
    });
  }
}

function syncCourtModalDropdowns(dropdownIds = []) {
  const pairs = {
    courtCadreDropdown: "courtCadreSelect",
    courtStatusDropdown: "courtStatusSelect",
    editCourtCadreDropdown: "editCourtCadreSelect",
    editCourtStatusDropdown: "editCourtStatusSelect"
  };
  dropdownIds.forEach((ddId) => {
    const selId = pairs[ddId];
    const container = document.getElementById(ddId);
    const select = document.getElementById(selId);
    if (!container || !select) return;
    if (typeof window.initCaseHubDropdown === "function" && !container.dataset.init) {
      container.dataset.init = "true";
      window.initCaseHubDropdown(ddId, selId);
    } else if (!container.dataset.init) {
      container.dataset.init = "true";
      const trigger = container.querySelector(".custom-dropdown-trigger");
      const menu = container.querySelector(".custom-dropdown-menu");
      const listEl = container.querySelector(".custom-dropdown-list");
      const labelEl = container.querySelector(".custom-dropdown-label");
      const chevron = container.querySelector(".custom-dropdown-chevron");
      const close = () => {
        menu?.classList.remove("open", "opacity-100", "visible", "scale-100");
        menu?.classList.add("opacity-0", "invisible", "scale-95");
        chevron?.classList.remove("rotate-180");
        trigger?.setAttribute("aria-expanded", "false");
      };
      const render = () => {
        if (!listEl) return;
        listEl.innerHTML = "";
        Array.from(select.options).forEach((opt) => {
          const li = document.createElement("li");
          const isSel = opt.value === select.value;
          li.className = `custom-dropdown-item ${isSel ? "selected" : ""}`;
          li.setAttribute("role", "option");
          li.setAttribute("aria-selected", isSel ? "true" : "false");
          li.setAttribute("data-value", opt.value);
          li.innerHTML = `<span class="truncate">${opt.textContent}</span>${isSel ? '<svg class="lucide lucide-check w-4 h-4 checkmark custom-dropdown-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ""}`;
          li.addEventListener("click", (ev) => {
            ev.stopPropagation();
            select.value = opt.value;
            if (labelEl) labelEl.textContent = opt.textContent;
            close();
            render();
            select.dispatchEvent(new Event("change", { bubbles: true }));
          });
          listEl.appendChild(li);
        });
        const cur = select.options[select.selectedIndex];
        if (labelEl && cur) labelEl.textContent = cur.textContent;
      };
      container._syncFromSelect = render;
      trigger?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (menu?.classList.contains("open")) close();
        else {
          menu?.classList.remove("opacity-0", "invisible", "scale-95");
          menu?.classList.add("open", "opacity-100", "visible", "scale-100");
          chevron?.classList.add("rotate-180");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
      document.addEventListener("click", (ev) => { if (!container.contains(ev.target)) close(); });
      document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") close(); });
      render();
    }
    if (typeof container._syncFromSelect === "function") {
      container._syncFromSelect();
    }
  });
}

function openEditCourtModal(courtName, count = 0) {
  const modal = document.getElementById("editCourtModal");
  const origInput = document.getElementById("editCourtOriginalName");
  const nameInput = document.getElementById("editCourtNameInput");
  const noticeText = document.getElementById("editCourtNoticeText");
  const errorDiv = document.getElementById("editCourtErrorMsg");
  const saveBtn = document.getElementById("saveEditCourtBtn");
  const saveBtnText = document.getElementById("saveEditCourtBtnText");

  if (!modal || !nameInput) {
    const newCourt = prompt(
      `Edit court name "${courtName}"\n(${count} case(s) currently assigned):`,
      courtName,
    );
    if (newCourt && newCourt.trim() && newCourt.trim().toLowerCase() !== courtName.toLowerCase()) {
      if (courts.some((c) => c.trim().toLowerCase() === newCourt.trim().toLowerCase())) {
        alert(`A court named "${newCourt.trim()}" already exists.`);
        return;
      }
      cascadeUpdateCourtName(courtName, newCourt.trim()).then((updatedCount) => {
        alert(
          `✅ Court renamed to "${newCourt.trim()}".\nUpdated ${updatedCount || 0} associated case(s) across the database.`,
        );
      });
    }
    return;
  }

  const rec = getEnrichedCourtRecord(courtName);

  if (origInput) origInput.value = courtName;
  nameInput.value = courtName;

  const codeInput = document.getElementById("editCourtShortCodeInput");
  const cadreSelect = document.getElementById("editCourtCadreSelect");
  const statusSelect = document.getElementById("editCourtStatusSelect");
  const remarksInput = document.getElementById("editCourtRemarksInput");
  const crimInput = document.getElementById("editCourtCriminalTitleInput");

  if (codeInput) codeInput.value = rec.short_code || "";
  if (cadreSelect) cadreSelect.value = rec.cadre || "General";
  if (statusSelect) statusSelect.value = (rec.status || "ACTIVE").toUpperCase() === "VACANT" ? "VACANT" : "ACTIVE";
  if (remarksInput) remarksInput.value = rec.remarks || "";
  syncCourtModalDropdowns(["editCourtCadreDropdown", "editCourtStatusDropdown"]);
  const dualToggle = document.getElementById("editCourtDualJurisdictionToggle");
  const crimWrap = document.getElementById("editCourtCriminalTitleFieldWrap");
  const hasDual = !!(rec.criminal_title && rec.criminal_title !== rec.civil_title);
  if (crimInput) crimInput.value = hasDual ? rec.criminal_title : "";
  if (dualToggle) dualToggle.checked = hasDual;
  if (crimWrap) crimWrap.classList.toggle("hidden", !hasDual);

  if (dualToggle && !dualToggle.dataset.bound) {
    dualToggle.dataset.bound = "true";
    dualToggle.addEventListener("change", () => {
      const wrap = document.getElementById("editCourtCriminalTitleFieldWrap");
      const cInput = document.getElementById("editCourtCriminalTitleInput");
      if (wrap) {
        if (dualToggle.checked) {
          wrap.classList.remove("hidden");
          setTimeout(() => cInput?.focus(), 50);
        } else {
          wrap.classList.add("hidden");
          if (cInput) cInput.value = "";
        }
      }
    });
  }
  if (errorDiv) {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
  }
  if (noticeText) {
    if (count > 0) {
      noticeText.innerHTML = `<strong>${count} active case(s)</strong> currently assigned to this court will be automatically updated across all tables and filings.`;
    } else {
      noticeText.textContent =
        "This court currently has no active cases assigned. Renaming will update the court directory.";
    }
  }
  if (saveBtn) saveBtn.disabled = false;
  if (saveBtnText) saveBtnText.textContent = "Save Changes";

  modal.classList.remove("hidden");
  setTimeout(() => {
    nameInput.focus();
    nameInput.select();
  }, 100);
}

function closeEditCourtModal() {
  const modal = document.getElementById("editCourtModal");
  if (modal) modal.classList.add("hidden");
}

async function confirmSaveEditedCourt() {
  const origInput = document.getElementById("editCourtOriginalName");
  const nameInput = document.getElementById("editCourtNameInput");
  const codeInput = document.getElementById("editCourtShortCodeInput");
  const cadreSelect = document.getElementById("editCourtCadreSelect");
  const statusSelect = document.getElementById("editCourtStatusSelect");
  const remarksInput = document.getElementById("editCourtRemarksInput");
  const crimInput = document.getElementById("editCourtCriminalTitleInput");
  const errorDiv = document.getElementById("editCourtErrorMsg");
  const saveBtn = document.getElementById("saveEditCourtBtn");
  const saveBtnText = document.getElementById("saveEditCourtBtnText");

  const oldName = (origInput?.value || "").trim();
  const newName = (nameInput?.value || "").trim();
  const shortCode = (codeInput?.value || "").trim();
  const cadre = (cadreSelect?.value || "General").trim();
  const status = (statusSelect?.value || "ACTIVE").trim().toUpperCase();
  const remarks = (remarksInput?.value || "").trim();
  const criminalTitle = (crimInput?.value || "").trim() || newName;

  if (!newName) {
    if (errorDiv) {
      errorDiv.textContent = "Please enter a valid court name.";
      errorDiv.classList.remove("hidden");
    }
    return;
  }

  const updatedMetadata = {
    short_code: shortCode || newName.substring(0, 10).toUpperCase(),
    cadre: cadre,
    civil_title: newName,
    criminal_title: criminalTitle,
    status: status,
    remarks: remarks
  };

  // If name unchanged, update metadata directly
  if (oldName.toLowerCase() === newName.toLowerCase()) {
    try {
      if (saveBtn) saveBtn.disabled = true;
      if (saveBtnText) saveBtnText.innerHTML = '<svg class="lucide lucide-loader-2 courts-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving...';
      if (errorDiv) errorDiv.classList.add("hidden");

      if (typeof updateCourtMetadata === "function") {
        await updateCourtMetadata(oldName, updatedMetadata);
      } else if (typeof window !== "undefined" && typeof window.updateCourtMetadata === "function") {
        await window.updateCourtMetadata(oldName, updatedMetadata);
      } else if (typeof cascadeUpdateCourtName === "function") {
        await cascadeUpdateCourtName(oldName, newName, updatedMetadata);
      }

      closeEditCourtModal();
      renderCourtsTable();
      if (typeof showToastNotification === "function") {
        showToastNotification(`✅ Court details for "${newName}" updated successfully.`, 3000);
      }
      return;
    } catch (err) {
      console.error("Error updating court details:", err);
      if (errorDiv) {
        errorDiv.textContent = `Error saving changes: ${err.message || err}`;
        errorDiv.classList.remove("hidden");
      }
      return;
    } finally {
      if (saveBtn) saveBtn.disabled = false;
      if (saveBtnText) saveBtnText.textContent = "Save Changes";
    }
  }

  const rawCourts = getCourtsList();
  const alreadyExists = rawCourts.some(
    (c) =>
      c.trim().toLowerCase() === newName.toLowerCase() &&
      c.trim().toLowerCase() !== oldName.toLowerCase(),
  );
  if (alreadyExists) {
    if (errorDiv) {
      errorDiv.textContent = `A court named "${newName}" already exists. Please choose a different name.`;
      errorDiv.classList.remove("hidden");
    }
    return;
  }

  try {
    if (saveBtn) saveBtn.disabled = true;
    if (saveBtnText)
      saveBtnText.innerHTML = '<svg class="lucide lucide-loader-2 courts-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving...';
    if (errorDiv) errorDiv.classList.add("hidden");

    const updatedCount = (typeof cascadeUpdateCourtName === "function")
      ? await cascadeUpdateCourtName(oldName, newName)
      : (typeof window !== "undefined" && typeof window.cascadeUpdateCourtName === "function"
          ? await window.cascadeUpdateCourtName(oldName, newName)
          : 0);

    if (typeof updateCourtMetadata === "function") {
      await updateCourtMetadata(newName, updatedMetadata);
    } else if (typeof window !== "undefined" && typeof window.updateCourtMetadata === "function") {
      await window.updateCourtMetadata(newName, updatedMetadata);
    }
    closeEditCourtModal();
    if (typeof performPostCrudRefresh === "function") {
      await performPostCrudRefresh();
    } else if (typeof window !== "undefined" && typeof window.performPostCrudRefresh === "function") {
      await window.performPostCrudRefresh();
    }
    if (typeof showToastNotification === "function") {
      showToastNotification(
        `✅ Court renamed to "${newName}". Updated ${updatedCount || 0} associated case(s).`,
        3000,
      );
    } else {
      alert(
        `✅ Court renamed to "${newName}".\nUpdated ${updatedCount || 0} associated case(s) across the database.`,
      );
    }
  } catch (err) {
    console.error("Error renaming court:", err);
    if (errorDiv) {
      errorDiv.textContent = `Error saving changes: ${err.message || err}`;
      errorDiv.classList.remove("hidden");
    }
  } finally {
    if (saveBtn) saveBtn.disabled = false;
    if (saveBtnText) saveBtnText.textContent = "Save Changes";
  }
}

function openDeleteCourtModal(courtName, count = 0) {
  const modal = document.getElementById("deleteCourtModal");
  const targetInput = document.getElementById("deleteCourtTargetName");
  const displaySpan = document.getElementById("deleteCourtDisplayName");
  const casesNotice = document.getElementById("deleteCourtActiveCasesNotice");
  const casesNoticeText = document.getElementById("deleteCourtCasesNoticeText");
  const errorDiv = document.getElementById("deleteCourtErrorMsg");
  const confirmBtn = document.getElementById("confirmDeleteCourtBtn");
  const confirmBtnText = document.getElementById("confirmDeleteCourtBtnText");

  if (!modal) {
    if (
      confirm(
        `Delete court: "${courtName}"?${count > 0 ? `\n\n⚠️ Note: ${count} case(s) currently belong to this court and will be unlinked.` : ""}`,
      )
    ) {
      if (typeof deleteCourtFromSupabase === "function") deleteCourtFromSupabase(courtName);
    }
    return;
  }

  if (targetInput) targetInput.value = courtName;
  if (displaySpan) displaySpan.textContent = `"${courtName}"`;

  if (errorDiv) {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
  }

  if (casesNotice && casesNoticeText) {
    if (count > 0) {
      casesNoticeText.innerHTML = `<strong>⚠️ Warning:</strong> <strong>${count} active case(s)</strong> are currently assigned to this court and will have their court reference unlinked.`;
      casesNotice.classList.remove("hidden");
    } else {
      casesNotice.classList.add("hidden");
      casesNoticeText.textContent = "";
    }
  }

  if (confirmBtn) confirmBtn.disabled = false;
  if (confirmBtnText) confirmBtnText.textContent = "Delete Court";

  modal.classList.remove("hidden");
}

function closeDeleteCourtModal() {
  const modal = document.getElementById("deleteCourtModal");
  if (modal) modal.classList.add("hidden");
}

async function executeDeleteCourtConfirm() {
  const targetInput = document.getElementById("deleteCourtTargetName");
  const errorDiv = document.getElementById("deleteCourtErrorMsg");
  const confirmBtn = document.getElementById("confirmDeleteCourtBtn");
  const confirmBtnText = document.getElementById("confirmDeleteCourtBtnText");

  const courtName = (targetInput?.value || "").trim();
  if (!courtName) {
    closeDeleteCourtModal();
    return;
  }

  if (confirmBtn) confirmBtn.disabled = true;
  if (confirmBtnText) confirmBtnText.textContent = "Deleting...";

  try {
    if (typeof deleteCourtFromSupabase === "function") {
      await deleteCourtFromSupabase(courtName);
    } else if (typeof window !== "undefined" && typeof window.deleteCourtFromSupabase === "function") {
      await window.deleteCourtFromSupabase(courtName);
    }
    closeDeleteCourtModal();
    if (typeof performPostCrudRefresh === "function") {
      await performPostCrudRefresh();
    } else if (typeof window !== "undefined" && typeof window.performPostCrudRefresh === "function") {
      await window.performPostCrudRefresh();
    }
    if (typeof showToastNotification === "function") {
      showToastNotification(`✅ Court "${courtName}" deleted successfully.`, 2500);
    } else if (typeof M !== "undefined" && M.toast) {
      M.toast({ html: `✅ Court "${courtName}" deleted successfully.` });
    }
  } catch (err) {
    console.error("Error deleting court:", err);
    if (errorDiv) {
      errorDiv.textContent = `Error deleting court: ${err.message || err}`;
      errorDiv.classList.remove("hidden");
    }
    if (confirmBtn) confirmBtn.disabled = false;
    if (confirmBtnText) confirmBtnText.textContent = "Delete Court";
  }
}

if (typeof openEditCourtModal !== "undefined") window.openEditCourtModal = openEditCourtModal;
if (typeof closeEditCourtModal !== "undefined") window.closeEditCourtModal = closeEditCourtModal;
if (typeof confirmSaveEditedCourt !== "undefined")
  window.confirmSaveEditedCourt = confirmSaveEditedCourt;
window.editCourtPrompt = openEditCourtModal;
if (typeof openDeleteCourtModal !== "undefined") window.openDeleteCourtModal = openDeleteCourtModal;
if (typeof closeDeleteCourtModal !== "undefined")
  window.closeDeleteCourtModal = closeDeleteCourtModal;
if (typeof executeDeleteCourtConfirm !== "undefined")
  window.executeDeleteCourtConfirm = executeDeleteCourtConfirm;
window.deleteCourtFromList = function (courtName) {
  openDeleteCourtModal(courtName);
};

function filterCourtsTable(query) {
  currentCourtsPage = 1;
  renderCourtsTable(query);
}
if (typeof filterCourtsTable !== "undefined") window.filterCourtsTable = filterCourtsTable;
if (typeof renderCourtsTable !== "undefined") window.renderCourtsTable = renderCourtsTable;
if (typeof bindCourtsTabEvents !== "undefined") window.bindCourtsTabEvents = bindCourtsTabEvents;

async function syncAllCourtsFromDatabase() {
  const syncBtn = document.querySelector(".court-refresh-btn");
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '<svg class="lucide lucide-loader-2 courts-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> <span>Syncing...</span>';
  }
  try {
    const deletedSet =
      typeof getDeletedCourtsSet === "function" ? getDeletedCourtsSet() : new Set();
    const sb = (typeof supabaseClient !== "undefined") ? supabaseClient : (typeof window !== "undefined" ? window.supabaseClient : null);
    const curCourts = getCourtsList();
    if (sb) {
      const { data: courtsData } = await sb
        .from("courts")
        .select("*")
        .order("court_name");
      if (courtsData && courtsData.length > 0) {
        const sortedData = [...courtsData].sort((a, b) => {
          if (a.sort_order != null && b.sort_order != null && a.sort_order !== b.sort_order) {
            return a.sort_order - b.sort_order;
          }
          return (a.court_name || "").localeCompare(b.court_name || "");
        });
        const seen = new Set();
        const syncedList = [];
        const auditedMaster = (typeof window !== "undefined" && Array.isArray(window.auditedCourtsData)) ? window.auditedCourtsData : [];
        curCourts.length = 0;
        sortedData.forEach((c) => {
          const name = (c.court_name || "").trim();
          const status = (c.status || "ACTIVE").toUpperCase();
          if (name && status !== "DELETED" && !deletedSet.has(name.toLowerCase()) && !seen.has(name.toLowerCase())) {
            seen.add(name.toLowerCase());
            curCourts.push(name);
            const auditedMatch = auditedMaster.find((ac) => (ac.court_name || "").toLowerCase() === name.toLowerCase());
            syncedList.push({
              id: c.id || (auditedMatch ? auditedMatch.id : null),
              court_name: name,
              short_code: c.short_code || (auditedMatch ? auditedMatch.short_code : ""),
              civil_title: c.civil_title || (auditedMatch ? auditedMatch.civil_title : name),
              criminal_title: c.criminal_title || (auditedMatch ? auditedMatch.criminal_title : name),
              cadre: c.cadre || (auditedMatch ? auditedMatch.cadre : "General"),
              status: status,
              remarks: c.remarks || (auditedMatch ? auditedMatch.remarks : ""),
              sort_order: c.sort_order != null ? c.sort_order : 0
            });
          }
        });
        if (typeof courtsList !== "undefined" && Array.isArray(courtsList)) {
          courtsList.length = 0;
          courtsList.push(...syncedList);
        }
        if (typeof window !== "undefined") {
          window.courtsList = syncedList;
        }
      }
    }
    // Also include any courts referenced in cases if not deleted
    getCourtsAllCaseRecords().forEach((item) => {
      const cName = (item.courtName || item.criminalCourtName || "").trim();
      if (
        cName &&
        cName !== "—" &&
        !deletedSet.has(cName.toLowerCase()) &&
        !curCourts.some((c) => c.trim().toLowerCase() === cName.toLowerCase())
      ) {
        curCourts.push(cName);
      }
    });
    if (typeof saveCourtsToBackup === "function") saveCourtsToBackup();
    if (typeof renderCourtOptions === "function") renderCourtOptions();
    if (typeof renderCriminalCourtOptions === "function") renderCriminalCourtOptions();
    if (typeof renderSearchCourtFilterOptions === "function") renderSearchCourtFilterOptions();
    renderCourtsTable();
    if (typeof showToastNotification === "function") {
      showToastNotification("✅ Courts synchronized from database.", 2500);
    }
  } catch (err) {
    console.error("Error syncing courts:", err);
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = '<svg class="lucide lucide-rotate-cw" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg> <span>Sync All Courts</span>';
    }
  }
}
if (typeof syncAllCourtsFromDatabase !== "undefined")
  window.syncAllCourtsFromDatabase = syncAllCourtsFromDatabase;

async function updateCourtMetadata(courtName, metadata) {
  const trimmed = (courtName || '').trim();
  if (!trimmed || !metadata) return false;

  const lower = trimmed.toLowerCase();

  // 1. Update in-memory courtsList
  if (typeof courtsList !== 'undefined' && Array.isArray(courtsList)) {
    const listIdx = courtsList.findIndex(c => (c.court_name || '').trim().toLowerCase() === lower);
    if (listIdx >= 0) {
      if (metadata.short_code !== undefined) courtsList[listIdx].short_code = metadata.short_code;
      if (metadata.cadre !== undefined) courtsList[listIdx].cadre = metadata.cadre;
      if (metadata.civil_title !== undefined) courtsList[listIdx].civil_title = metadata.civil_title;
      if (metadata.criminal_title !== undefined) courtsList[listIdx].criminal_title = metadata.criminal_title;
      if (metadata.status !== undefined) courtsList[listIdx].status = metadata.status;
      if (metadata.remarks !== undefined) courtsList[listIdx].remarks = metadata.remarks;
    } else {
      courtsList.push({
        court_name: trimmed,
        civil_title: metadata.civil_title || trimmed,
        short_code: metadata.short_code || trimmed.substring(0, 10).toUpperCase(),
        cadre: metadata.cadre || 'General',
        criminal_title: metadata.criminal_title || trimmed,
        status: metadata.status || 'ACTIVE',
        remarks: metadata.remarks || ''
      });
    }
    window.courtsList = courtsList;
  }

  // 2. Persist to backup
  if (typeof saveCourtsToBackup === 'function') {
    saveCourtsToBackup();
  }

  // 3. Update Supabase if available
  if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    try {
      const updatePayload = {
        short_code: metadata.short_code,
        cadre: metadata.cadre,
        civil_title: metadata.civil_title,
        criminal_title: metadata.criminal_title,
        updated_at: new Date().toISOString()
      };
      if (metadata.status !== undefined) updatePayload.status = metadata.status;
      if (metadata.remarks !== undefined) updatePayload.remarks = metadata.remarks;

      await supabaseClient
        .from('courts')
        .update(updatePayload)
        .ilike('court_name', trimmed);
    } catch (e) {
      console.warn('[METADATA] Note on updating Supabase court record:', e);
    }
  }

  return true;
}
if (typeof updateCourtMetadata !== 'undefined') window.updateCourtMetadata = updateCourtMetadata;

function getUnlinkedCourts({ includeCustom = false } = {}) {
  const records = getCourtsAllCaseRecords();
  const transfers = (typeof window !== "undefined" && Array.isArray(window.allCaseTransfers))
    ? window.allCaseTransfers
    : (typeof allCaseTransfers !== "undefined" && Array.isArray(allCaseTransfers) ? allCaseTransfers : []);

  const linkedSet = new Set();
  records.forEach((r) => {
    if (r.courtName) linkedSet.add(String(r.courtName).trim().toLowerCase());
    if (r.criminalCourtName) linkedSet.add(String(r.criminalCourtName).trim().toLowerCase());
  });
  transfers.forEach((t) => {
    if (t.fromCourt) linkedSet.add(String(t.fromCourt).trim().toLowerCase());
    if (t.toCourt) linkedSet.add(String(t.toCourt).trim().toLowerCase());
  });

  const hardcodedSet = new Set(
    ((typeof window !== "undefined" && Array.isArray(window.auditedCourtsData)) ? window.auditedCourtsData : [])
      .map((c) => (c.court_name || "").trim().toLowerCase())
      .filter(Boolean)
  );

  return getCourtsList().filter((name) => {
    const lower = (name || "").trim().toLowerCase();
    if (!lower || linkedSet.has(lower)) return false;
    return includeCustom ? true : hardcodedSet.has(lower);
  });
}

function refreshPruneCourtsPreview() {
  const toggle = document.getElementById("pruneIncludeCustomToggle");
  const includeCustom = !!(toggle && toggle.checked);
  const targets = getUnlinkedCourts({ includeCustom });

  const summary = document.getElementById("pruneCourtsSummaryText");
  const listBox = document.getElementById("pruneCourtsListBox");
  const confirmBtn = document.getElementById("confirmPruneCourtsBtn");
  const confirmBtnText = document.getElementById("confirmPruneCourtsBtnText");

  if (targets.length === 0) {
    if (summary) {
      summary.textContent = includeCustom
        ? "All configured courts are currently linked to at least one case."
        : "No unlinked hardcoded courts found. Check the option below to include custom 0-case courts.";
    }
    if (listBox) {
      listBox.innerHTML = "";
      listBox.classList.add("hidden");
    }
    if (confirmBtn) confirmBtn.disabled = true;
    if (confirmBtnText) confirmBtnText.textContent = "Nothing to Delete";
    return;
  }

  if (summary) {
    summary.innerHTML = `<strong>${targets.length}</strong> unlinked court${targets.length === 1 ? "" : "s"} with <strong>0 cases</strong> will be removed from the directory and database:`;
  }
  if (listBox) {
    listBox.innerHTML = targets
      .map((name) => `<div class="prune-court-chip"><span>${escapeHtml(name)}</span><span class="prune-court-chip-tag">0 Cases</span></div>`)
      .join("");
    listBox.classList.remove("hidden");
  }
  if (confirmBtn) confirmBtn.disabled = false;
  if (confirmBtnText) confirmBtnText.textContent = `Delete ${targets.length} Court${targets.length === 1 ? "" : "s"}`;
}

function openPruneCourtsModal() {
  const modal = document.getElementById("pruneCourtsModal");
  if (!modal) return;
  const toggle = document.getElementById("pruneIncludeCustomToggle");
  if (toggle) toggle.checked = false;
  const errDiv = document.getElementById("pruneCourtsErrorMsg");
  if (errDiv) {
    errDiv.textContent = "";
    errDiv.classList.add("hidden");
  }
  refreshPruneCourtsPreview();
  modal.classList.remove("hidden");
}

function closePruneCourtsModal() {
  const modal = document.getElementById("pruneCourtsModal");
  if (modal) modal.classList.add("hidden");
}

async function executePruneUnlinkedCourts() {
  const toggle = document.getElementById("pruneIncludeCustomToggle");
  const includeCustom = !!(toggle && toggle.checked);
  const targets = getUnlinkedCourts({ includeCustom });

  if (targets.length === 0) {
    closePruneCourtsModal();
    return;
  }

  const confirmBtn = document.getElementById("confirmPruneCourtsBtn");
  const confirmBtnText = document.getElementById("confirmPruneCourtsBtnText");
  const errDiv = document.getElementById("pruneCourtsErrorMsg");

  if (confirmBtn) confirmBtn.disabled = true;
  if (confirmBtnText) confirmBtnText.textContent = "Deleting...";

  try {
    let removedCount = 0;
    if (typeof bulkDeleteUnlinkedCourts === "function") {
      removedCount = await bulkDeleteUnlinkedCourts(targets);
    } else if (typeof window !== "undefined" && typeof window.bulkDeleteUnlinkedCourts === "function") {
      removedCount = await window.bulkDeleteUnlinkedCourts(targets);
    } else if (typeof deleteCourtFromSupabase === "function") {
      for (const name of targets) {
        await deleteCourtFromSupabase(name);
        removedCount++;
      }
    }
    closePruneCourtsModal();
    renderCourtsTable();
    if (typeof showToastNotification === "function") {
      showToastNotification(`✅ Removed ${removedCount} unlinked court${removedCount === 1 ? "" : "s"}.`, 3000);
    }
  } catch (err) {
    console.error("Error pruning unlinked courts:", err);
    if (errDiv) {
      errDiv.textContent = `Error pruning courts: ${err.message || err}`;
      errDiv.classList.remove("hidden");
    }
    if (confirmBtn) confirmBtn.disabled = false;
    if (confirmBtnText) confirmBtnText.textContent = `Delete ${targets.length} Court${targets.length === 1 ? "" : "s"}`;
  }
}

window.getUnlinkedCourts = getUnlinkedCourts;
window.refreshPruneCourtsPreview = refreshPruneCourtsPreview;
window.openPruneCourtsModal = openPruneCourtsModal;
window.closePruneCourtsModal = closePruneCourtsModal;
window.executePruneUnlinkedCourts = executePruneUnlinkedCourts;
