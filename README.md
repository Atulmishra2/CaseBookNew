# CaseBook — Legal Case Management System

**CaseBook** is an offline-first Progressive Web App (PWA) built with vanilla HTML5, CSS3, and ES Modules for Indian advocates, law chambers, and court clerks (munshis). It manages the complete litigation lifecycle — from dynamic case registration and daily cause lists to hearing calendars, financial khata ledgers, court/staff directories, and optional Supabase cloud synchronization.

---

## Table of Contents

1. [Core Features](#core-features)
2. [Architecture & Directory Structure](#architecture--directory-structure)
3. [Design System & Rules](#design-system--rules)
4. [Practice Modules (Tabs)](#practice-modules-tabs)
5. [Data Layer & Supabase Schema](#data-layer--supabase-schema)
6. [Authentication & Roles](#authentication--roles)
7. [Getting Started & Scripts](#getting-started--scripts)
8. [Testing & Quality Assurance](#testing--quality-assurance)
9. [PWA & Deployment](#pwa--deployment)

---

## Core Features

- **Zero-Build-Step Architecture:** Pure HTML5, CSS3 custom properties, and ES Modules with no bundler required.
- **Offline-First PWA:** Installable on desktop and mobile (`manifest.webmanifest`) with Service Worker caching (`sw.js`) and `localStorage`-first persistence.
- **Multi-Jurisdiction Case Filing:** Tailored dynamic forms for Civil, Criminal, State/Police, Family, Revenue, Miscellaneous, and Complaint matters.
- **Daily Cause List & Appearance Board:** Date-filtered court board with A4 printable dockets and 1-click WhatsApp summaries.
- **Hearing Calendar & Forward Dates:** Monthly calendar grid (`components/custom-calendar.js`) and rapid next-date / judicial-stage updates.
- **Chambers Accounts & Khata (`Paisa Manager`):** Tracks client fee receipts, court work expenses, net chamber savings, CSV exports, and WhatsApp daily closing reports.
- **Optional Cloud Sync:** Two-way synchronization with Supabase PostgreSQL backed by Row Level Security (RLS).
- **Advocate Charcoal & Gold Theme:** Unified Light and Midnight Dark (`[data-theme="dark"]`) design token system.

---

## Architecture & Directory Structure

```text
caseBook-modular/
├── index.html                  # Main application shell, navigation, and tab host
├── login.html                  # Role-based authentication & client tracking portal
├── documentation.html          # Interactive & A4-printable Chambers SOP manual
├── admin.js                    # Session management, role guards & app bootstrap
├── sw.js                       # Service Worker for offline asset caching
├── manifest.webmanifest        # PWA manifest & app icons
├── serve.json                  # Static server routing & cache headers
├── DESIGN.md                   # Master UI design system specification
├── package.json                # Dev dependencies & npm scripts (Vitest, Playwright)
├── vitest.config.js            # Unit test configuration (jsdom)
├── playwright.config.mjs       # Browser responsive & E2E test configuration
│
├── components/
│   ├── custom-calendar.js      # Custom Monday-first date picker & calendar widget
│   ├── custom-calendar.css     # Calendar widget styles
│   ├── chambers-footer.js      # Chambers footer component
│   ├── modals/                 # Case dossier, forward-date & confirmation modals
│   ├── print/                  # A4 printable templates (cause list, khata, slips)
│   └── tabs/                   # Modular tab views (HTML + scoped CSS + JS)
│       ├── home/               # Executive KPI dashboard
│       ├── newhome/            # Zen modern home dashboard
│       ├── causelist/          # Daily Cause List & Appearance Board
│       ├── upcoming/           # 7-day upcoming hearings
│       ├── calendar/           # Monthly Hearing Calendar Scheduler
│       ├── hearing/            # Forward Dates & batch hearing updates
│       ├── all/                # Master Cases Register (table & card views)
│       ├── undated/            # Undated cases register
│       ├── detail/             # Full Case Dossier view
│       ├── disposed/           # Decided & disposed cases archive
│       ├── manage/             # Unified Case Operations (Add / Update / Delete)
│       ├── add/                # New case registration form
│       ├── update/             # Case record editor
│       ├── delete/             # Case deletion & archive controls
│       ├── transfer/           # Court/bench transfer workflow & audit log
│       ├── courts/             # Courts directory & management
│       ├── helpers/            # Court staff & munshi helpers directory
│       ├── paisa/              # Chambers Accounts & Khata Expense Manager
│       ├── todo/               # Task deadlines & sub-step checklists
│       ├── livecrud/           # Live Supabase CRUD inspector
│       ├── settings/           # Theme, backup, CSV & Supabase DB Studio
│       └── about/              # System overview, diagnostics & manual reader
│
├── services/
│   ├── supabaseClient.js       # Supabase client initialization & config
│   ├── caseService.js          # Case CRUD, filtering, and sync logic
│   ├── todoService.js          # Tasks & sub-steps persistence
│   └── ancillaryService.js     # Courts, helpers, and khata/accounts services
│
├── styles/
│   ├── tokens.css              # Advocate Charcoal & Gold primitives + semantic tokens
│   ├── reset.css               # Base CSS reset
│   ├── layout.css              # App shell, sidebar, content & smart dock layout
│   ├── headerNav.css           # Top bar & search navigation
│   ├── components.css          # Shared UI primitives
│   ├── modals.css              # Modal & drawer styles
│   ├── auth.css                # Login & portal styling
│   └── print.css               # @media print A4 formatting rules
│
├── utils/
│   ├── caseNumberUtils.js      # Case number parsing, formatting & normalization
│   ├── dateUtils.js            # Date formatting, DD/MM/YYYY & ISO helpers
│   ├── exportUtils.js          # CSV & structured report export helpers
│   ├── lucideIcons.js          # Lucide SVG icon helpers
│   ├── tooltipController.js    # Accessible tooltip positioning
│   └── uiUtils.js              # Toasts, DOM helpers & safeStorage wrappers
│
├── supabase_schema/            # PostgreSQL DDL, specialized case tables & RLS policies
└── tests/                      # Vitest unit tests & Playwright browser specs
```

---

## Design System & Rules

All UI work follows [`DESIGN.md`](DESIGN.md) and [`styles/tokens.css`](styles/tokens.css):

1. **Advocate Charcoal & Gold Tokens:** All colors, surfaces, borders, and shadows reference CSS variables (`--bg-surface`, `--fg-primary`, `--accent`, `--action-bg`, `--feedback-info-soft`, etc.) with automatic dark mode support under `[data-theme="dark"]`.
2. **Lucide Icons Only:** All iconography uses Lucide SVGs (`<svg class="lucide ...">`). No emojis or third-party icon fonts.
3. **Strict Tab Isolation:** Every tab's CSS is scoped to its container selector (e.g. `:is(#about, [data-about-scope])`, `:is(#causelist, [data-causelist-scope])`) to prevent cross-tab style bleed.
4. **Multi-Tab Table Parity:** Shared docket rows, `.act` action buttons, and 5-column sorting headers remain synchronized across **Daily Cause List**, **Upcoming Hearings**, and **Calendar Scheduler**.

---

## Practice Modules (Tabs)

| Tab ID | Module | Purpose |
| :--- | :--- | :--- |
| `home` / `newhome` | **Dashboards** | Live KPI counts (Total Active, Listed Today, This Week, Disposed) and quick navigation. |
| `causelist` | **My Cause List** | Date- and court-filtered appearance board with A4 print and WhatsApp briefing. |
| `upcoming` | **Upcoming (7 Days)** | Short-term hearing horizon with quick action drawers. |
| `calendar` | **Calendar Scheduler** | Monthly grid showing daily hearing counts and inline docket inspection. |
| `hearing` | **Forward Dates** | Batch or single-case next hearing date, stage, and judicial remarks updater. |
| `manage` / `add` / `update` / `delete` | **Case Operations** | Dynamic category-based case registration, editing, and disposal/deletion. |
| `all` / `undated` / `detail` / `disposed` | **Case Registers** | Searchable master registry, undated backlog, full dossier view, and historical archive. |
| `paisa` | **Paisa Manager** | Chambers Khata ledger for client fees, court expenses, net savings, and WhatsApp closing. |
| `courts` / `helpers` | **Directories** | Judicial forums, readers, ahlmads, and munshi contact directories. |
| `todo` | **To-Do & Deadlines** | Priority-tagged tasks, limitation reminders, and sub-step checklists. |
| `transfer` | **Transfer Case** | Single and bulk court/bench transfers with audit history. |
| `livecrud` / `settings` | **Database & Settings** | Supabase DB Studio, JSON/CSV backups, and theme switching. |
| `about` | **About & Manual** | Embedded documentation reader, chapter explorer, and system diagnostics. |

---

## Data Layer & Supabase Schema

CaseBook uses a **local-first** model (`localStorage` via safe storage wrappers) with optional two-way replication to **Supabase PostgreSQL**.

SQL schemas and migrations live in `supabase_schema/`:
- `supabase_full_schema.sql` / `supabase-schema.sql` — Core tables and triggers
- Specialized litigation tables: `supabase_civilcases_schema.sql`, `supabase_criminalcases_schema.sql`, `supabase_familycases_schema.sql`, `supabase_revenuecases_schema.sql`, `supabase_statecases_schema.sql`, `supabase_complaint_cases_migration.sql`, `supabase_misc_cases_migration.sql`
- Unified views & hearings: `supabase_all_cases_unified_view_migration.sql`, `supabase_hearings_schema.sql`, `supabase_hearings_safe_unique_index_migration.sql`
- Ancillary modules: `supabase_accounts_schema.sql`, `supabase_courts_schema.sql`, `supabase_court_helpers_schema.sql`, `supabase_todos_schema.sql`, `supabase_case_todos_steps_migration.sql`
- Security: `supabase_security_hardening.sql` (Row Level Security policies)

---

## Authentication & Roles

- **Admin / Chambers Console (`index.html` + `admin.js`):** Full read/write access to all cases, hearings, financial khata, directories, and cloud sync, guarded by session authentication (`login.html`).
- **Client Guest Tracking Portal (`login.html`):** Read-only lookup by Case Number or Mobile Number showing next hearing date, court venue, and status while keeping chamber notes and finances private.

---

## Getting Started & Scripts

### Prerequisites
- Node.js 18+ (for local static serving and running tests)

### Run Locally
```bash
npm install
npm run dev
```
The app serves at `http://localhost:3000` (via `npx serve . -l 3000`).

### Available Scripts
| Command | Description |
| :--- | :--- |
| `npm run dev` / `npm start` | Start local static server on port 3000 |
| `npm test` | Run Vitest unit test suite (`tests/**/*.test.js`) |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:browser` | Run Playwright browser test (`paisa-responsive.spec.mjs`) |

---

## Testing & Quality Assurance

- **Unit Tests (Vitest + jsdom):** Cover `caseService`, `todoService`, `caseNumberUtils`, `paisaCalculations`, `themeEngine`, `securityAndAuth`, and tab-level logic.
  ```bash
  npm test
  ```
- **Browser & Responsive Audits (Playwright):** Verify desktop (`1280x800`) and mobile (`392x872`, `412x915`) layouts, zero horizontal overflow, minimum `44px` touch targets, and bottom dock clearance.
  ```bash
  npx playwright test tests/browser/tab-about-responsive.spec.mjs
  ```

---

## PWA & Deployment

CaseBook requires no build step (`npm run build` is a no-op) and can be deployed to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, or an internal chambers server):
1. Serve the repository root over HTTPS.
2. Ensure `sw.js`, `manifest.webmanifest`, and `serve.json` are served from the root path.
3. Configure your Supabase project URL and anon key in **Settings & Cloud** (`services/supabaseClient.js`) if using cloud sync.

---

## Developer & License

- **Author:** Atul Kumar Mishra — Advocate & Developer
- **Jurisdiction:** District & High Courts
- **License:** ISC (see `package.json`)
