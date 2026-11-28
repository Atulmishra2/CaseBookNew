/**
 * CaseBook Print Templates - Companion Script Loader
 * Fallback for file:// or environments where fetch is blocked
 */
window.__casebook_templates = window.__casebook_templates || {};
window.__casebook_templates['print-templates'] = "    <article id=\"printableCauseList\" class=\"printable-cause-list\" aria-label=\"Daily Cause List Print Document\">\n      <h1 class=\"sr-only\">Daily Cause List — Court Appearance Board</h1>\n      <div class=\"cause-list-header\">\n        <div class=\"cause-crest\"><svg class=\"lucide lucide-scale\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"M7 21h10\"></path><path d=\"M12 3v18\"></path><path d=\"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2\"></path></svg></div>\n        <div class=\"cause-header-text\">\n          <h2>CHAMBERS OF ATUL KUMAR MISHRA</h2>\n          <div class=\"cause-advocate-title\">Advocate &amp; Legal Consultant</div>\n          <div class=\"cause-main-title\">\n            DAILY CAUSE LIST / COURT APPEARANCE BOARD\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cause-meta-box\">\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\">DATE OF PROCEEDING:</span>\n          <span class=\"cause-meta-val\" id=\"causeListPrintDate\"></span>\n        </div>\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\">DAY:</span>\n          <span class=\"cause-meta-val\" id=\"causeListPrintDay\"></span>\n        </div>\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\">TOTAL MATTERS:</span>\n          <span class=\"cause-meta-val\" id=\"causeListPrintTotal\"\n            >0 Cases Listed</span\n          >\n        </div>\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\">PRINTED ON:</span>\n          <span class=\"cause-meta-val\" id=\"causeListPrintTimestamp\">—</span>\n        </div>\n      </div>\n\n      <table class=\"cause-print-table\" aria-label=\"Daily Cause List\">\n        <caption class=\"sr-only\">Daily Cause List — Case Items for the Selected Date</caption>\n        <thead>\n          <tr>\n            <th scope=\"col\" style=\"width: 45px; text-align: center\">Item</th>\n            <th scope=\"col\" style=\"width: 140px\">Case Number &amp; Type</th>\n            <th scope=\"col\">Case Title / Parties</th>\n            <th scope=\"col\" style=\"width: 130px\">Court / Forum</th>\n            <th scope=\"col\" style=\"width: 150px\">Stage / Purpose</th>\n            <th scope=\"col\" style=\"width: 140px\">Client &amp; Contact</th>\n            <th scope=\"col\" style=\"width: 90px; text-align: center\">Notes</th>\n          </tr>\n        </thead>\n        <tbody id=\"causePrintTableBody\">\n          <!-- Rows injected dynamically -->\n        </tbody>\n      </table>\n\n      <div class=\"cause-list-footer\">\n        <div class=\"cause-footer-note\">\n          Generated via Case Management System &bull; Atul Kumar Mishra, Advocate &amp;\n          Developer\n        </div>\n        <div class=\"cause-signature-line\">\n          <span>Advocate Signature: _______________________</span>\n        </div>\n      </div>\n    </article>\n\n    <!-- Printable Full Case Dossier Document (Simple Infographic A4 Print/PDF) -->\n    <article\n      id=\"printableCaseDossier\"\n      class=\"printable-case-dossier infographic-dossier\"\n      aria-label=\"Case Dossier Print Document\"\n    >\n      <h1 class=\"sr-only\">Case Dossier — Full Case Summary</h1>\n      <!-- Infographic Header -->\n      <div class=\"dossier-info-header\">\n        <div class=\"dossier-info-crest\"><svg class=\"lucide lucide-scale\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"M7 21h10\"></path><path d=\"M12 3v18\"></path><path d=\"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2\"></path></svg></div>\n        <div class=\"dossier-info-brand\">\n          <h2>CHAMBERS OF ATUL KUMAR MISHRA</h2>\n          <div class=\"dossier-info-sub\">\n            Advocate &amp; Legal Consultant &bull; High Court &amp; District Courts\n          </div>\n        </div>\n        <div class=\"dossier-info-badge\" id=\"casePrintTypeBadge\">CIVIL CASE</div>\n      </div>\n\n      <!-- Case Title & Identification Banner -->\n      <div class=\"dossier-info-title-strip\">\n        <div class=\"dossier-info-case-title\" id=\"casePrintTitle\">\n          Case Title\n        </div>\n        <div class=\"dossier-info-case-num-wrap\">\n          <span class=\"dossier-info-label\">CASE NO:</span>\n          <span class=\"dossier-info-num\" id=\"casePrintNo\">—</span>\n        </div>\n      </div>\n\n      <!-- Infographic 4-Metric Strip -->\n      <div class=\"dossier-info-metrics-grid\">\n        <div class=\"dossier-info-metric-card next-hearing-card\">\n          <div class=\"metric-icon\"><svg class=\"lucide lucide-calendar-clock\" xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5\"/><path d=\"M16 2v4\"/><path d=\"M8 2v4\"/><path d=\"M3 10h5\"/><path d=\"M17.5 17.5 16 16.25V14\"/><circle cx=\"16\" cy=\"16\" r=\"6\"/></svg></div>\n          <div class=\"metric-body\">\n            <span class=\"metric-lbl\">Next Hearing</span>\n            <span class=\"metric-val\" id=\"casePrintNextHearing\">—</span>\n            <span class=\"metric-sub\" id=\"casePrintNextProcess\">—</span>\n          </div>\n        </div>\n\n        <div class=\"dossier-info-metric-card court-card\">\n          <div class=\"metric-icon\"><svg class=\"lucide lucide-landmark\" xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><line x1=\"2\" x2=\"22\" y1=\"22\" y2=\"22\"/><line x1=\"4\" x2=\"4\" y1=\"18\" y2=\"18\"/><line x1=\"8\" x2=\"8\" y1=\"18\" y2=\"18\"/><line x1=\"12\" x2=\"12\" y1=\"18\" y2=\"18\"/><line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"18\"/><line x1=\"20\" x2=\"20\" y1=\"18\" y2=\"18\"/><path d=\"m2 7 10-5 10 5\"/><rect width=\"20\" height=\"2\" x=\"2\" y=\"7\"/></svg></div>\n          <div class=\"metric-body\">\n            <span class=\"metric-lbl\">Court / Forum</span>\n            <span class=\"metric-val\" id=\"casePrintCourt\">—</span>\n            <span class=\"metric-sub\" id=\"casePrintCourtFull\">—</span>\n          </div>\n        </div>\n\n        <div class=\"dossier-info-metric-card status-card\">\n          <div class=\"metric-icon\"><svg class=\"lucide lucide-activity\" xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2\"/></svg></div>\n          <div class=\"metric-body\">\n            <span class=\"metric-lbl\">Case Status</span>\n            <span class=\"metric-val\" id=\"casePrintStatus\">—</span>\n            <span class=\"metric-sub\" id=\"casePrintCaseType\">Civil</span>\n          </div>\n        </div>\n\n        <div class=\"dossier-info-metric-card filing-card\">\n          <div class=\"metric-icon\"><svg class=\"lucide lucide-calendar-days\" xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M3 10h18\"/><path d=\"M8 14h.01\"/><path d=\"M12 14h.01\"/><path d=\"M16 14h.01\"/><path d=\"M8 18h.01\"/><path d=\"M12 18h.01\"/><path d=\"M16 18h.01\"/></svg></div>\n          <div class=\"metric-body\">\n            <span class=\"metric-lbl\">Filing &amp; Year</span>\n            <span class=\"metric-val\" id=\"casePrintFilingDate\">—</span>\n            <span class=\"metric-sub\"\n              >Year: <span id=\"casePrintYear\">—</span></span\n            >\n          </div>\n        </div>\n      </div>\n\n      <!-- Two-Column Particulars & Representation Infographic Cards -->\n      <div class=\"dossier-info-two-col\">\n        <!-- Left: Parties & Particulars -->\n        <div class=\"dossier-info-panel\">\n          <div class=\"dossier-panel-header\">\n            <span class=\"panel-icon\"><svg class=\"lucide lucide-users\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/></svg></span>\n            <span>Parties &amp; Case Particulars</span>\n          </div>\n          <div\n            id=\"casePrintPartiesContent\"\n            class=\"dossier-info-particulars-list\"\n          >\n            <!-- Populated dynamically -->\n          </div>\n        </div>\n\n        <!-- Right: Client, Representation & Notes -->\n        <div class=\"dossier-info-panel\">\n          <div class=\"dossier-panel-header\">\n            <span class=\"panel-icon\"><svg class=\"lucide lucide-briefcase\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect width=\"20\" height=\"14\" x=\"2\" y=\"7\" rx=\"2\" ry=\"2\"/><path d=\"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"/></svg></span>\n            <span>Client Representation &amp; Matter Notes</span>\n          </div>\n          <div class=\"dossier-info-client-body\">\n            <div class=\"info-row\">\n              <span class=\"info-row-lbl\">Client Name:</span>\n              <span class=\"info-row-val font-bold\" id=\"casePrintClientName\"\n                >—</span\n              >\n            </div>\n            <div class=\"info-row\">\n              <span class=\"info-row-lbl\">Client Contact:</span>\n              <span class=\"info-row-val\" id=\"casePrintClientPhone\">—</span>\n            </div>\n            <div class=\"info-row\">\n              <span class=\"info-row-lbl\">Previous Stage:</span>\n              <span class=\"info-row-val\"\n                ><span id=\"casePrintPrevHearing\">—</span> (<span\n                  id=\"casePrintPrevProcess\"\n                  >—</span\n                >)</span\n              >\n            </div>\n            <div class=\"info-row\" style=\"border-bottom: none\">\n              <span class=\"info-row-lbl\">Remarks / Notes:</span>\n              <span class=\"info-row-val\" id=\"casePrintRemarks\">—</span>\n            </div>\n            <div\n              class=\"info-row disposal-info-row\"\n              id=\"casePrintDisposalRow\"\n              style=\"display: none\"\n            >\n              <span class=\"info-row-lbl print-text-urgent\"\n                >Disposal Details:</span\n              >\n              <span\n                class=\"info-row-val print-text-urgent-bold\"\n                id=\"casePrintDisposalComment\"\n                >—</span\n              >\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Proceedings Timeline Infographic -->\n      <div class=\"dossier-info-panel proceedings-panel\">\n        <div class=\"dossier-panel-header\">\n          <span class=\"panel-icon\"><svg class=\"lucide lucide-history\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/><path d=\"M12 7v5l4 2\"/></svg></span>\n          <span>Proceedings &amp; Appearance Timeline</span>\n        </div>\n        <table class=\"dossier-info-timeline-table\" aria-label=\"Proceedings and Appearance Timeline\">\n          <caption class=\"sr-only\">Proceedings &amp; Appearance Timeline — Hearing History</caption>\n          <thead>\n            <tr>\n              <th scope=\"col\" style=\"width: 30px; text-align: center\">#</th>\n              <th scope=\"col\" style=\"width: 85px\">Date</th>\n              <th scope=\"col\" style=\"width: 130px\">Stage / Purpose</th>\n              <th scope=\"col\" style=\"width: 90px\">Milestone</th>\n              <th scope=\"col\">Action Conducted / Court Orders</th>\n            </tr>\n          </thead>\n          <tbody id=\"casePrintHistoryBody\">\n            <!-- Populated dynamically -->\n          </tbody>\n        </table>\n      </div>\n\n      <!-- Footer -->\n      <div class=\"dossier-info-footer\">\n        <div class=\"info-footer-meta\">\n          <svg class=\"lucide lucide-scale\" xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"M7 21h10\"></path><path d=\"M12 3v18\"></path><path d=\"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2\"></path></svg>\n          <span\n            >Confidential Case Dossier &bull; Printed:\n            <strong id=\"casePrintTimestamp\">—</strong></span\n          >\n        </div>\n        <div class=\"info-footer-sig\">\n          <span>Advocate Signature: _______________________</span>\n        </div>\n      </div>\n    </article>\n\n    <!-- Printable Cases Report (Undated Cases Register & Complete Cases Register) -->\n    <article\n      id=\"printableCasesReport\"\n      class=\"printable-cases-report\"\n      aria-label=\"Cases Register Print Document\"\n    >\n      <h1 class=\"sr-only\" id=\"casesReportSrTitle\">Cases Register</h1>\n      <div class=\"cause-list-header\">\n        <div class=\"cause-crest\">\n          <svg class=\"lucide lucide-scale\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"M7 21h10\"></path><path d=\"M12 3v18\"></path><path d=\"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2\"></path></svg>\n        </div>\n        <div class=\"cause-header-text\">\n          <h2>CHAMBERS OF ATUL KUMAR MISHRA</h2>\n          <div class=\"cause-advocate-title\">Advocate &amp; Legal Consultant &bull; High Court &amp; District Courts</div>\n          <div class=\"cause-main-title\" id=\"casesReportMainTitle\">\n            CASES REGISTER\n          </div>\n        </div>\n        <div class=\"dossier-info-badge cases-report-badge\" id=\"casesReportBadge\">REGISTER</div>\n      </div>\n\n      <div class=\"cause-meta-box\">\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\" id=\"casesReportMeta1Label\">TOTAL CASES:</span>\n          <span class=\"cause-meta-val\" id=\"casesReportMeta1Val\">0 Cases</span>\n        </div>\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\" id=\"casesReportMeta2Label\">FILTER / SCOPE:</span>\n          <span class=\"cause-meta-val\" id=\"casesReportMeta2Val\">All Cases</span>\n        </div>\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\" id=\"casesReportMeta3Label\">SORTED BY:</span>\n          <span class=\"cause-meta-val\" id=\"casesReportMeta3Val\">Case Number</span>\n        </div>\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\" id=\"casesReportMeta4Label\">PRINTED ON:</span>\n          <span class=\"cause-meta-val\" id=\"casesReportMeta4Val\">—</span>\n        </div>\n      </div>\n\n      <table class=\"cause-print-table cases-report-table\" aria-label=\"Cases Register Table\">\n        <caption class=\"sr-only\" id=\"casesReportCaption\">Cases Register Table</caption>\n        <thead id=\"casesReportTableHead\">\n          <!-- Columns injected dynamically -->\n        </thead>\n        <tbody id=\"casesReportTableBody\">\n          <!-- Rows injected dynamically -->\n        </tbody>\n      </table>\n\n      <div class=\"cause-list-footer\">\n        <div class=\"info-footer-meta\">\n          <svg class=\"lucide lucide-scale\" xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z\"></path><path d=\"M7 21h10\"></path><path d=\"M12 3v18\"></path><path d=\"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2\"></path></svg>\n          <span>Generated via CaseBook &bull; Chambers of Atul Kumar Mishra</span>\n        </div>\n        <div class=\"cause-signature-line\">\n          <span>Advocate Signature: _______________________</span>\n        </div>\n      </div>\n    </article>\n";

function ensurePrintTemplatesMounted() {
  let el = document.getElementById('printableCaseDossier');
  if (el) return el;
  let c = document.getElementById('printTemplatesContainer');
  if (!c && typeof document !== 'undefined') {
    c = document.createElement('div');
    c.id = 'printTemplatesContainer';
    document.body.appendChild(c);
  }
  if (c && window.__casebook_templates && window.__casebook_templates['print-templates']) {
    c.innerHTML = window.__casebook_templates['print-templates'];
    c.dataset.loaded = 'true';
  }
  return document.getElementById('printableCaseDossier');
}
if (typeof ensurePrintTemplatesMounted !== 'undefined') {
  window.ensurePrintTemplatesMounted = ensurePrintTemplatesMounted;
}

(function() {
  if (typeof document !== 'undefined') {
    ensurePrintTemplatesMounted();
  }
})();

// ==============================================================================
// Full Case Dossier Printable Engine
// ==============================================================================
function populatePrintableCaseDossier(caseObj) {
  if (!caseObj) return;
  if (!document.getElementById('printableCaseDossier')) {
    if (typeof ensurePrintTemplatesMounted === 'function') {
      ensurePrintTemplatesMounted();
    } else if (typeof loadPrintTemplates === 'function') {
      loadPrintTemplates();
    }
  }

  const caseType = (caseObj.caseType || 'civil').toLowerCase();
  const isCriminal = caseType === 'criminal';
  const isFamily = caseType === 'family';
  const isRevenue = caseType === 'revenue';

  const caseNumber = caseObj.caseNo || caseObj.criminalCaseNumber || '—';
  const caseYear = caseObj.caseYear || caseObj.crimeYear || '—';
  const courtName = caseObj.courtName || caseObj.criminalCourtName || '—';
  const filingDateVal = caseObj.filingDate || caseObj.crimeFilingDate;
  const filingDate = formatDateDMY(filingDateVal);
  const nextHearing = formatDateDMY(caseObj.nextHearing);
  const nextProcess = caseObj.hearingProcess || '—';
  const prevHearing = formatDateDMY(caseObj.previousHearing);
  const prevProcess = caseObj.previousProcess || '—';
  const clientName = caseObj.clientName || caseObj.criminalClientName || caseObj.client || '—';
  const clientPhone = caseObj.clientNumber || caseObj.criminalClientNumber || '';

  // Status calculation
  const isDisposed = caseObj.status === 'disposed' || Boolean(caseObj.disposalComment || caseObj.disposal_comment);
  const isUndated = !caseObj.nextHearing || caseObj.nextHearing === '—' || String(caseObj.nextHearing).trim() === '';
  let statusText = 'Pending';
  if (isDisposed) statusText = 'Disposed Off';
  else if (isUndated) statusText = 'Undated / Unscheduled';

  // Case Title
  let caseTitle = caseObj.caseName || '';
  if (!caseTitle) {
    if (isCriminal) {
      const v = caseObj.victimName || caseObj.firstParty;
      const a = caseObj.accusedName || caseObj.oppositeParty;
      caseTitle = v && a ? `${v} vs ${a}` : (v || a || 'Criminal Matter');
    } else if (isFamily) {
      const p = caseObj.petitioner || caseObj.plaintiff;
      const r = caseObj.respondent || caseObj.defendant;
      caseTitle = p && r ? `${p} vs ${r}` : (p || r || 'Family Dispute');
    } else if (isRevenue) {
      const app = caseObj.applicant || caseObj.plaintiff;
      const opp = caseObj.respondent || caseObj.defendant;
      caseTitle = app && opp ? `${app} vs ${opp}` : (app || opp || 'Revenue Matter');
    } else {
      const p = caseObj.plaintiff || caseObj.firstParty;
      const d = caseObj.defendant || caseObj.oppositeParty;
      caseTitle = p && d ? `${p} vs ${d}` : (p || d || 'Civil Suit');
    }
  }

  // Header & Title
  const badgeEl = document.getElementById('casePrintTypeBadge');
  if (badgeEl) badgeEl.textContent = `${caseType.toUpperCase()} CASE`;

  const titleEl = document.getElementById('casePrintTitle');
  if (titleEl) titleEl.textContent = caseTitle;

  const noEl = document.getElementById('casePrintNo');
  if (noEl) noEl.textContent = caseNumber;

  const courtEl = document.getElementById('casePrintCourt');
  if (courtEl) courtEl.textContent = courtName;

  const statusEl = document.getElementById('casePrintStatus');
  if (statusEl) statusEl.textContent = statusText;

  // Grid details
  const ctEl = document.getElementById('casePrintCaseType');
  if (ctEl) ctEl.textContent = caseType.toUpperCase();

  const yrEl = document.getElementById('casePrintYear');
  if (yrEl) yrEl.textContent = caseYear;

  const fdEl = document.getElementById('casePrintFilingDate');
  if (fdEl) fdEl.textContent = filingDate;

  const cfEl = document.getElementById('casePrintCourtFull');
  if (cfEl) cfEl.textContent = courtName;

  const nhEl = document.getElementById('casePrintNextHearing');
  if (nhEl) nhEl.textContent = nextHearing;

  const npEl = document.getElementById('casePrintNextProcess');
  if (npEl) npEl.textContent = nextProcess;

  const phEl = document.getElementById('casePrintPrevHearing');
  if (phEl) phEl.textContent = prevHearing;

  const ppEl = document.getElementById('casePrintPrevProcess');
  if (ppEl) ppEl.textContent = prevProcess;

  // Parties & Matter Particulars
  const partiesContainer = document.getElementById('casePrintPartiesContent');
  if (partiesContainer) {
    const items = [];
    if (isCriminal || caseType === 'state' || caseType === 'complaint' || caseType === 'misc_criminal') {
      if (caseObj.victimName || caseObj.firstParty) items.push(['Complainant / Victim', caseObj.victimName || caseObj.firstParty]);
      if (caseObj.accusedName || caseObj.oppositeParty) items.push(['Accused / Opposite', caseObj.accusedName || caseObj.oppositeParty]);
      if (caseObj.policeStation) items.push(['Police Station', caseObj.policeStation]);
      if (caseObj.crimeNumber) {
        const rawCrimeNo = String(caseObj.crimeNumber).trim();
        const hasYear = rawCrimeNo.includes('/');
        items.push(['FIR / Crime No.', `${rawCrimeNo}${!hasYear && caseObj.crimeYear ? ` / ${caseObj.crimeYear}` : ''}`]);
      }
      if (caseObj.crimeSection) items.push(['Sections (IPC/BNS)', caseObj.crimeSection]);
      if (caseObj.custodyStatus) items.push(['Custody / Bail Status', caseObj.custodyStatus]);
    } else if (isFamily) {
      if (caseObj.petitioner || caseObj.plaintiff) items.push(['Petitioner / Applicant', caseObj.petitioner || caseObj.plaintiff]);
      if (caseObj.respondent || caseObj.defendant) items.push(['Respondent / Opposite', caseObj.respondent || caseObj.defendant]);
      if (caseObj.familyMatterType || caseObj.matterType) items.push(['Dispute Nature', caseObj.familyMatterType || caseObj.matterType]);
      if (caseObj.marriageDate) items.push(['Marriage Date', formatDateDMY(caseObj.marriageDate)]);
      if (caseObj.maintenance) items.push(['Maintenance Details', caseObj.maintenance]);
    } else if (isRevenue) {
      if (caseObj.applicant || caseObj.plaintiff) items.push(['Applicant / Petitioner', caseObj.applicant || caseObj.plaintiff]);
      if (caseObj.respondent || caseObj.defendant) items.push(['Opposite Party', caseObj.respondent || caseObj.defendant]);
      if (caseObj.revenueMatterType) items.push(['Revenue Matter Nature', caseObj.revenueMatterType]);
      if (caseObj.village) items.push(['Village / Mauza', caseObj.village]);
      if (caseObj.khataNo || caseObj.gataNo) items.push(['Khata / Gata No.', [caseObj.khataNo ? `Khata: ${caseObj.khataNo}` : '', caseObj.gataNo ? `Gata: ${caseObj.gataNo}` : ''].filter(Boolean).join(' | ')]);
    } else {
      if (caseObj.plaintiff || caseObj.firstParty) items.push(['Plaintiff / Petitioner', caseObj.plaintiff || caseObj.firstParty]);
      if (caseObj.defendant || caseObj.oppositeParty) items.push(['Defendant / Respondent', caseObj.defendant || caseObj.oppositeParty]);
      if (caseObj.matterType) items.push(['Matter / Suit Nature', caseObj.matterType]);
    }

    if (items.length === 0) {
      items.push(['Parties', caseTitle]);
    }

    partiesContainer.innerHTML = items.map(([k, v]) => `
      <div class="dossier-print-prop-cell">
        <span class="dossier-print-prop-lbl">${escapeHtml(k)}:</span>
        <span class="dossier-print-prop-val">${escapeHtml(v)}</span>
      </div>
    `).join('');
  }

  // Client & Remarks
  const cNameEl = document.getElementById('casePrintClientName');
  if (cNameEl) cNameEl.textContent = clientName;

  const cPhoneEl = document.getElementById('casePrintClientPhone');
  if (cPhoneEl) cPhoneEl.textContent = clientPhone ? clientPhone : '—';

  const remEl = document.getElementById('casePrintRemarks');
  const getRemarkText =
    typeof remarksToPlainText === 'function'
      ? remarksToPlainText
      : typeof window !== 'undefined' && typeof window.remarksToPlainText === 'function'
        ? window.remarksToPlainText
        : (r) => String(r || '');
  const remarkVal = getRemarkText(caseObj.remark || caseObj.remarks);
  if (remEl) remEl.textContent = remarkVal ? remarkVal : 'None recorded.';

  const dispRow = document.getElementById('casePrintDisposalRow');
  const dispEl = document.getElementById('casePrintDisposalComment');
  const disposalVal = caseObj.disposalComment || caseObj.disposal_comment || '';
  if (dispRow && dispEl) {
    if (disposalVal.trim()) {
      dispRow.style.display = '';
      dispEl.textContent = disposalVal.trim();
    } else if (isDisposed) {
      dispRow.style.display = '';
      dispEl.textContent = 'Matter disposed of.';
    } else {
      dispRow.style.display = 'none';
    }
  }

  // Proceedings History
  const historyBody = document.getElementById('casePrintHistoryBody');
  if (historyBody) {
    const history = typeof getCaseHearingHistory === 'function' ? getCaseHearingHistory(caseNumber) : [];
    const events = [];

    history.forEach(h => {
      const isNext = Boolean(caseObj.nextHearing && (h.hearing_date === caseObj.nextHearing));
      events.push({
        date: h.hearing_date,
        process: h.process || 'Court Hearing',
        type: isNext ? 'Upcoming Hearing' : 'Past Hearing',
        action: h.action_taken || h.remarks || 'Court proceedings conducted.'
      });
    });

    if (caseObj.nextHearing && caseObj.nextHearing !== '—' && !events.some(e => e.date === caseObj.nextHearing)) {
      events.push({
        date: caseObj.nextHearing,
        process: caseObj.hearingProcess || 'Scheduled Hearing',
        type: 'Upcoming Hearing',
        action: `Next appearance scheduled at ${courtName}`
      });
    }

    if (caseObj.previousHearing && caseObj.previousHearing !== '—' && !events.some(e => e.date === caseObj.previousHearing)) {
      events.push({
        date: caseObj.previousHearing,
        process: caseObj.previousProcess || 'Previous Stage',
        type: 'Past Hearing',
        action: `Previous proceedings recorded at ${courtName}`
      });
    }

    if (filingDateVal && filingDateVal !== '—' && !events.some(e => e.date === filingDateVal)) {
      events.push({
        date: filingDateVal,
        process: 'Case Inception & Filing',
        type: 'Initial Filing',
        action: `Case instituted and registered at ${courtName}`
      });
    }

    // Sort newest first
    events.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (events.length === 0) {
      historyBody.innerHTML = '<tr><td colspan="5" class="print-no-proceedings">No recorded proceedings logged yet.</td></tr>';
    } else {
      // Limit to latest 8 hearings to guarantee a clean, single A4 page fit
      const displayEvents = events.slice(0, 8);
      let rowsHtml = displayEvents.map((ev, idx) => {
        const typeClass = String(ev.type || '').toLowerCase().replace(/\s+/g, '-');
        return `
          <tr>
            <td class="print-col-idx">${idx + 1}</td>
            <td class="print-col-date">${formatDateDMY(ev.date)}</td>
            <td class="print-col-process">${escapeHtml(ev.process || '—')}</td>
            <td><span class="dossier-timeline-tag ${typeClass}">${escapeHtml(ev.type)}</span></td>
            <td>${escapeHtml(ev.action || '—')}</td>
          </tr>
        `;
      }).join('');

      if (events.length > 8) {
        rowsHtml += `
          <tr>
            <td colspan="5" class="print-col-action">
              + ${events.length - 8} earlier proceedings on record in CaseBook database
            </td>
          </tr>
        `;
      }

      historyBody.innerHTML = rowsHtml;
    }
  }

  // Timestamp
  const tsEl = document.getElementById('casePrintTimestamp');
  if (tsEl) {
    const now = new Date();
    tsEl.textContent = now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}

function printCurrentCaseDossier(customCaseObj = null) {
  const currentCase =
    typeof currentSelectedCase !== 'undefined'
      ? currentSelectedCase
      : typeof window !== 'undefined'
        ? window.currentSelectedCase
        : null;
  const caseObj = customCaseObj || currentCase;
  if (!caseObj) {
    if (typeof showToast === 'function') {
      showToast('Please select a case to print.', 'warning');
    }
    if (typeof alert === 'function' && ((typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') || typeof showToast !== 'function')) {
      alert('Please select a case to print.');
    }
    return;
  }

  populatePrintableCaseDossier(caseObj);
  document.body.classList.add('printing-case-dossier');

  const cleanup = () => {
    document.body.classList.remove('printing-case-dossier');
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);
  setTimeout(cleanup, 4000);

  window.print();
}

function printCurrentGuestCaseDossier() {
  const guestCase =
    typeof currentGuestSelectedCase !== 'undefined'
      ? currentGuestSelectedCase
      : typeof window !== 'undefined'
        ? window.currentGuestSelectedCase
        : null;
  if (!guestCase) {
    if (typeof showToast === 'function') {
      showToast('Please select a case to print.', 'warning');
    }
    if (typeof alert === 'function' && ((typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') || typeof showToast !== 'function')) {
      alert('Please select a case to print.');
    }
    return;
  }
  printCurrentCaseDossier(guestCase);
}

if (typeof populatePrintableCaseDossier !== 'undefined') window.populatePrintableCaseDossier = populatePrintableCaseDossier;
if (typeof printCurrentCaseDossier !== 'undefined') window.printCurrentCaseDossier = printCurrentCaseDossier;
if (typeof printCurrentGuestCaseDossier !== 'undefined') window.printCurrentGuestCaseDossier = printCurrentGuestCaseDossier;

// ==============================================================================
// Shared Helpers for Tabular A4 Reports (Undated List & Complete Cases Register)
// ==============================================================================
function resolvePrintCaseNo(c) {
  return String(c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '—').trim() || '—';
}

function resolvePrintCaseName(c) {
  if (c.caseName || c.case_name) return String(c.caseName || c.case_name).trim();
  const type = String(c.caseType || c.case_type || 'civil').toLowerCase();
  if (type === 'criminal' || type === 'state' || type === 'complaint' || type === 'misc_criminal') {
    const v = c.victimName || c.firstParty || c.first_party;
    const a = c.accusedName || c.oppositeParty || c.second_party;
    return v && a ? `${v} vs ${a}` : (v || a || 'Criminal Matter');
  }
  if (type === 'family') {
    const p = c.petitioner || c.plaintiff || c.firstParty;
    const r = c.respondent || c.defendant || c.oppositeParty;
    return p && r ? `${p} vs ${r}` : (p || r || 'Family Dispute');
  }
  if (type === 'revenue') {
    const app = c.applicant || c.plaintiff || c.firstParty;
    const opp = c.respondent || c.defendant || c.oppositeParty;
    return app && opp ? `${app} vs ${opp}` : (app || opp || 'Revenue Matter');
  }
  const p = c.plaintiff || c.firstParty || c.first_party;
  const d = c.defendant || c.oppositeParty || c.second_party;
  return p && d ? `${p} vs ${d}` : (p || d || 'Civil Matter');
}

function resolvePrintCourt(c) {
  return String(c.courtName || c.criminalCourtName || c.court_name || '—').trim() || '—';
}

function resolvePrintCaseYear(c) {
  if (c.caseYear || c.crimeYear || c.case_year) {
    return String(c.caseYear || c.crimeYear || c.case_year).trim();
  }
  const no = resolvePrintCaseNo(c);
  const match = no.match(/\/(\d{4})\b/);
  if (match) return match[1];
  const fd = String(c.filingDate || c.crimeFilingDate || c.filing_date || '');
  const yrMatch = fd.match(/\b(19|20)\d{2}\b/);
  return yrMatch ? yrMatch[0] : 'Other';
}

function resolvePrintCaseTypeLabel(c) {
  const raw = String(c.caseType || c.case_type || 'civil').toLowerCase().trim();
  const map = {
    civil: 'Civil',
    state: 'State / Criminal',
    criminal: 'Criminal',
    family: 'Family',
    revenue: 'Revenue',
    misc_civil: 'Misc Civil',
    misccivil: 'Misc Civil',
    misc_criminal: 'Misc Criminal',
    misccriminal: 'Misc Criminal',
    complaint: 'Complaint'
  };
  return map[raw] || (raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : 'Civil');
}

function resolvePrintLastDate(c, fallbackDate) {
  const raw = c.previousHearing || c.previous_hearing || fallbackDate || c.filingDate || c.crimeFilingDate || c.filing_date || '';
  if (!raw || raw === '—') return '—';
  return typeof formatDateDMY === 'function' ? formatDateDMY(raw) : String(raw);
}

function resolvePrintStage(c) {
  return String(c.hearingProcess || c.hearing_process || c.previousProcess || c.previous_process || '—').trim() || '—';
}

function getPrintTimestamp() {
  return new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function escapePrintHtml(str) {
  if (typeof escapeHtml === 'function') return escapeHtml(str);
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function ensureCasesReportMounted() {
  if (!document.getElementById('printableCasesReport')) {
    if (typeof ensurePrintTemplatesMounted === 'function') {
      ensurePrintTemplatesMounted();
    }
  }
  return document.getElementById('printableCasesReport');
}

function triggerCasesReportPrint() {
  document.body.classList.remove('printing-case-dossier');
  document.body.classList.add('printing-cases-report');

  const cleanup = () => {
    document.body.classList.remove('printing-cases-report');
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);
  setTimeout(cleanup, 4000);
  window.print();
}

function getPrintSourceRecords(options = {}) {
  if (Array.isArray(options.records)) return options.records;
  if (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) && window.allCaseRecords.length) {
    return window.allCaseRecords;
  }
  if (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) && allCaseRecords.length) {
    return allCaseRecords;
  }
  if (typeof window !== 'undefined' && Array.isArray(window.allCases) && window.allCases.length) {
    return window.allCases;
  }
  if (typeof allCases !== 'undefined' && Array.isArray(allCases) && allCases.length) {
    return allCases;
  }
  return [];
}

// ==============================================================================
// 1. Undated Cases Register Print Engine (5 columns: Case No, Name, Court, Last Date, Next Date [blank])
// ==============================================================================
function printUndatedCasesList(options = {}) {
  const reportEl = ensureCasesReportMounted();
  if (!reportEl) return;

  const sourceRecords = getPrintSourceRecords(options);

  const todayISO = new Date().toISOString().split('T')[0];
  const evalFn = typeof evaluateCaseUndatedState === 'function'
    ? evaluateCaseUndatedState
    : window.evaluateCaseUndatedState;

  let undatedItems = [];
  if (typeof evalFn === 'function') {
    sourceRecords.forEach((c) => {
      const state = evalFn(c, todayISO);
      if (state && state.isUndated) {
        undatedItems.push({ record: c, lastDate: state.lastDate || '' });
      }
    });
  } else {
    sourceRecords.forEach((c) => {
      const nh = String(c.nextHearing || c.next_hearing || '').trim();
      const disp = c.status === 'disposed' || c.isDisposed === true || Boolean(c.disposalComment || c.disposal_comment);
      if (!disp && (!nh || nh === '—' || nh < todayISO)) {
        undatedItems.push({ record: c, lastDate: nh || c.previousHearing || '' });
      }
    });
  }

  // Apply optional active filters from Undated tab
  const searchQ = String(options.search || '').toLowerCase().trim();
  const courtF = String(options.court || '').toLowerCase().trim();
  const catF = String(options.category || '').toLowerCase().trim();

  undatedItems = undatedItems.filter(({ record: c }) => {
    if (catF) {
      const t = String(c.caseType || c.case_type || 'civil').toLowerCase();
      if (catF === 'state' || catF === 'criminal') {
        if (!['state', 'criminal', 'misc_criminal', 'misccriminal', 'complaint'].includes(t)) return false;
      } else if (catF === 'civil') {
        if (!['civil', 'misc_civil', 'misccivil'].includes(t)) return false;
      } else if (t !== catF) {
        return false;
      }
    }
    if (courtF && resolvePrintCourt(c).toLowerCase() !== courtF) return false;
    if (searchQ) {
      const hay = `${resolvePrintCaseNo(c)} ${resolvePrintCaseName(c)} ${resolvePrintCourt(c)} ${c.clientName || ''}`.toLowerCase();
      if (!hay.includes(searchQ)) return false;
    }
    return true;
  });

  undatedItems.sort((a, b) => resolvePrintCaseNo(a.record).localeCompare(resolvePrintCaseNo(b.record)));

  if (undatedItems.length === 0) {
    if (typeof showToast === 'function') showToast('No undated cases to print.', 'warning');
    return;
  }

  const filterParts = [];
  if (options.court) filterParts.push(`Court: ${options.court}`);
  if (options.category) filterParts.push(`Type: ${options.category}`);
  if (options.search) filterParts.push(`Search: "${options.search}"`);
  const filterSummary = filterParts.length ? filterParts.join(' • ') : 'All Courts • All Types';

  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('casesReportSrTitle', 'Undated Cases Register');
  setTxt('casesReportMainTitle', 'UNDATED CASES REGISTER');
  setTxt('casesReportBadge', 'UNDATED LIST');
  setTxt('casesReportCaption', 'Undated Cases Register — Cases Awaiting Next Hearing Date');
  setTxt('casesReportMeta1Label', 'TOTAL UNDATED:');
  setTxt('casesReportMeta1Val', `${undatedItems.length} Cases`);
  setTxt('casesReportMeta2Label', 'FILTER / SCOPE:');
  setTxt('casesReportMeta2Val', filterSummary);
  setTxt('casesReportMeta3Label', 'SORT ORDER:');
  setTxt('casesReportMeta3Val', 'Case Number (A–Z)');
  setTxt('casesReportMeta4Label', 'PRINTED ON:');
  setTxt('casesReportMeta4Val', getPrintTimestamp());

  const thead = document.getElementById('casesReportTableHead');
  if (thead) {
    thead.innerHTML = `
      <tr>
        <th scope="col" style="width: 120px">Case Number</th>
        <th scope="col">Case Name</th>
        <th scope="col" style="width: 155px">Court</th>
        <th scope="col" style="width: 95px">Last Date</th>
        <th scope="col" style="width: 115px">Next Date</th>
      </tr>
    `;
  }

  const tbody = document.getElementById('casesReportTableBody');
  if (tbody) {
    tbody.innerHTML = undatedItems.map(({ record: c, lastDate }) => `
      <tr>
        <td class="print-col-caseno">${escapePrintHtml(resolvePrintCaseNo(c))}</td>
        <td class="print-col-title">${escapePrintHtml(resolvePrintCaseName(c))}</td>
        <td>${escapePrintHtml(resolvePrintCourt(c))}</td>
        <td class="print-col-date">${escapePrintHtml(resolvePrintLastDate(c, lastDate))}</td>
        <td class="print-next-date-blank"></td>
      </tr>
    `).join('');
  }

  triggerCasesReportPrint();
}

// ==============================================================================
// 2. Complete Cases Register Print Engine (Sort-wise + Group Heading + 5 Columns)
// ==============================================================================
function printAllCasesRegister(sortBy = 'court', options = {}) {
  const reportEl = ensureCasesReportMounted();
  if (!reportEl) return;

  const sourceRecords = [...getPrintSourceRecords(options)];

  if (sourceRecords.length === 0) {
    if (typeof showToast === 'function') showToast('No cases available to print.', 'warning');
    return;
  }

  const sortLabels = {
    'year-desc': 'Year-wise (Newest First)',
    'year-asc': 'Year-wise (Oldest First)',
    'court': 'Court-wise (A–Z)',
    'caseType': 'Case Type-wise',
    'nextHearing': 'Next Hearing Date-wise'
  };
  const activeSort = sortLabels[sortBy] ? sortBy : 'court';

  sourceRecords.sort((a, b) => {
    if (activeSort === 'year-desc') {
      const ya = parseInt(resolvePrintCaseYear(a), 10) || 0;
      const yb = parseInt(resolvePrintCaseYear(b), 10) || 0;
      if (yb !== ya) return yb - ya;
    } else if (activeSort === 'year-asc') {
      const ya = parseInt(resolvePrintCaseYear(a), 10) || 9999;
      const yb = parseInt(resolvePrintCaseYear(b), 10) || 9999;
      if (ya !== yb) return ya - yb;
    } else if (activeSort === 'court') {
      const ca = resolvePrintCourt(a).toLowerCase();
      const cb = resolvePrintCourt(b).toLowerCase();
      const cmp = ca.localeCompare(cb);
      if (cmp !== 0) return cmp;
    } else if (activeSort === 'caseType') {
      const ta = resolvePrintCaseTypeLabel(a).toLowerCase();
      const tb = resolvePrintCaseTypeLabel(b).toLowerCase();
      const cmp = ta.localeCompare(tb);
      if (cmp !== 0) return cmp;
    } else if (activeSort === 'nextHearing') {
      const da = String(a.nextHearing || a.next_hearing || '9999-99-99');
      const db = String(b.nextHearing || b.next_hearing || '9999-99-99');
      const cmp = da.localeCompare(db);
      if (cmp !== 0) return cmp;
    }
    return resolvePrintCaseNo(a).localeCompare(resolvePrintCaseNo(b));
  });

  // Detect single court / group when filtered
  const uniqueCourts = Array.from(new Set(sourceRecords.map(resolvePrintCourt).filter(v => v && v !== '—')));
  const isSingleCourt = uniqueCourts.length === 1;
  const headingSuffix = isSingleCourt
    ? `COURT: ${uniqueCourts[0].toUpperCase()}`
    : sortLabels[activeSort].toUpperCase();

  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('casesReportSrTitle', `Complete Cases Register — ${sortLabels[activeSort]}`);
  setTxt('casesReportMainTitle', `COMPLETE CASES REGISTER (${headingSuffix})`);
  setTxt('casesReportBadge', isSingleCourt ? uniqueCourts[0].toUpperCase() : 'COMPLETE REGISTER');
  setTxt('casesReportCaption', `Complete Cases Register sorted by ${sortLabels[activeSort]}`);
  setTxt('casesReportMeta1Label', 'TOTAL CASES:');
  setTxt('casesReportMeta1Val', `${sourceRecords.length} Cases`);
  setTxt('casesReportMeta2Label', 'SCOPE / FILTER:');
  setTxt('casesReportMeta2Val', options.filterLabel || 'All Registered Cases');
  setTxt('casesReportMeta3Label', 'SORTED BY:');
  setTxt('casesReportMeta3Val', sortLabels[activeSort]);
  setTxt('casesReportMeta4Label', 'PRINTED ON:');
  setTxt('casesReportMeta4Val', getPrintTimestamp());

  const thead = document.getElementById('casesReportTableHead');
  if (thead) {
    thead.innerHTML = `
      <tr>
        <th scope="col" style="width: 120px">Case Number</th>
        <th scope="col">Case Name</th>
        <th scope="col" style="width: 155px">Court</th>
        <th scope="col" style="width: 95px">Last Date</th>
        <th scope="col" style="width: 140px">Stage</th>
      </tr>
    `;
  }

  const getGroupKey = (c) => {
    if (activeSort === 'year-desc' || activeSort === 'year-asc') return `Year: ${resolvePrintCaseYear(c)}`;
    if (activeSort === 'court') return resolvePrintCourt(c);
    if (activeSort === 'caseType') return `Case Type: ${resolvePrintCaseTypeLabel(c)}`;
    return null;
  };

  // Count per group for clean "(N Cases)" header
  const groupCounts = {};
  sourceRecords.forEach((c) => {
    const k = getGroupKey(c);
    if (k) groupCounts[k] = (groupCounts[k] || 0) + 1;
  });

  const tbody = document.getElementById('casesReportTableBody');
  if (tbody) {
    let lastGroup = null;
    const rowsHtml = [];
    sourceRecords.forEach((c) => {
      const grp = getGroupKey(c);
      if (grp && grp !== lastGroup) {
        lastGroup = grp;
        rowsHtml.push(`
          <tr class="print-group-header">
            <td colspan="5">${escapePrintHtml(grp)} (${groupCounts[grp]} ${groupCounts[grp] === 1 ? 'Case' : 'Cases'})</td>
          </tr>
        `);
      }
      rowsHtml.push(`
        <tr>
          <td class="print-col-caseno">${escapePrintHtml(resolvePrintCaseNo(c))}</td>
          <td class="print-col-title">${escapePrintHtml(resolvePrintCaseName(c))}</td>
          <td>${escapePrintHtml(resolvePrintCourt(c))}</td>
          <td class="print-col-date">${escapePrintHtml(resolvePrintLastDate(c))}</td>
          <td>${escapePrintHtml(resolvePrintStage(c))}</td>
        </tr>
      `);
    });
    tbody.innerHTML = rowsHtml.join('');
  }

  triggerCasesReportPrint();
}

if (typeof printUndatedCasesList !== 'undefined') window.printUndatedCasesList = printUndatedCasesList;
if (typeof printAllCasesRegister !== 'undefined') window.printAllCasesRegister = printAllCasesRegister;

