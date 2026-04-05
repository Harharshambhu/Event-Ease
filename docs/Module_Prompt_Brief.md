# MmE Platform — Module Prompt Brief
> Reference document for continuing module development across sessions.
> Last updated: Apr 1, 2026

---

## Platform Context (Required Reading)

**MmE** is a purpose-built B2B SaaS event management platform for Indian event agencies. Its defining rule: **communication is the core**, not a feature. Every event creates a temporary cluster of scoped channels. All modules — credentials, guest lists, catering, assets — are secondary to and dependent on the communication layer.

**Two portals:**
- `apps/mme-prototype` — Agency portal (full access, all events, all data)
- `apps/mme-vendor-portal` — Vendor portal (scoped to their assigned channels only)

**Monorepo** at `/home/anirudh/Drive/figma/` using NPM Workspaces:
```
figma/
├── apps/
│   ├── mme-prototype/         Agency portal (port 5173)
│   ├── mme-vendor-portal/     Vendor portal (port 5174)
│   └── mme-playground/        Wireframe sandbox (port 5176)  ← active dev here
└── packages/
    ├── ui-components/          Shared "dumb" React components (@mme/ui-components)
    └── core-modules/           Shared business logic
```

**Design system rules (non-negotiable):**
- BEM CSS naming convention
- Grayscale mid-fidelity wireframe aesthetic (no final colours except in module-specific CSS)
- UTF-8 text symbols as icons — no external icon libraries
- Inter font, CSS variable type scale
- All shared structural components live in `@mme/ui-components`

**Agency navigation:** Overview / Events / DMs (top nav). No Modules tab anywhere.

**Module widget pattern:** Modules surface as widgets on the agency Overview page (dashboard). Each widget shows a compact overview. Clicking a row in a widget navigates to the full module for that specific event. The mme-playground is where all widgets and module pages are built and tested before being moved to the prototype.

---

## Playground Dashboard (`apps/mme-playground`)

The playground dashboard (`App.jsx`) is the test harness for all modules. Current state:

```
App.jsx
  └── Dashboard view (default)
       ├── CredentialsDashboardWidget
       │    └── Right sidebar contains GuestListsDashboardWidget (slotted via sidebarExtra prop)
       └── Navigation state → opens CredentialsModule or GuestListsModule on click
```

**Navigation flow:**
- Dashboard → click credentials sub-widget → `CredentialsModule` (with ← Dashboard back button)
- Dashboard → click guest list event row → `GuestListsModule` (with ← Dashboard back button)
- Both modules return to dashboard via `onBack` prop

---

## Module 1 — Credentials

### What It Does
Pass and access management for events. Vendors, staff, and artists submit personnel rosters. Each person gets a credential type (defining zone access). Credentials are approved, printed as badges, and scanned at gates on event day.

### File Structure
```
src/modules/credentials/
├── credentials.css               All module styles (cred- prefix)
├── data.js                       All mock data
├── CredentialsDashboardWidget.jsx Dashboard widget (4 phase sub-widgets + issuance overview)
├── CredentialsModule.jsx          Module shell — handles navigation between dashboard and phases
├── 1.Configuration.jsx            Admin pre-event setup
├── 2.Collection.jsx               Stakeholder roster submissions
├── Phase3Review.jsx               Admin approval queue
└── Phase4Issuance.jsx             Badge printing + onsite scanning
```

### Dashboard Widget (`CredentialsDashboardWidget`)
Two-column layout:
- **Left:** 4 clickable phase sub-widgets (each shows key stat + status) + Credential Issuance Status infographic (stacked bar, allocation by type, hardware status, action required card)
- **Right:** Live Attendance bar chart + `sidebarExtra` slot (currently holds Guest Lists widget)

Props: `onNavigate(phase)`, `sidebarExtra`

Note: `onNavigate` in the widget fires with the phase key. In the current playground, ALL phase clicks navigate to `CredentialsModule` (dashboard view), which then lets the user tab between phases. This may need refinement to jump directly to the correct phase tab.

### Module Shell (`CredentialsModule`)
- State: `activeView` — `'dashboard' | 'config' | 'collection' | 'review' | 'issuance'`
- Dashboard view: renders `CredentialsDashboardWidget`
- Phase view: renders phase tabs + active phase component
- Props: `onBack` (returns to playground dashboard)

### Phase 1 — Configuration
**Purpose:** Admin pre-event setup before any vendor submits anything.

**UI elements built:**
| Section | What it shows |
|---------|---------------|
| Credential Types table | Name, tier, zone access (colour-coded dot per type) |
| Approval Workflows table | Per credential type → approval chain with role steps + conditional flag |
| Item Blocks table | Requestable packages — bundled credential types, max qty, price, assigned group |
| Badge Design Templates | Visual card previews per type (colour header, photo circle, name, barcode strip) |
| Barcode / RFID Pools | Pool name, format (QR/RFID), assigned/total gauge bar |

Layout: 2-column grid (credential types + workflows), then full-width item blocks, then 2-column (badge templates + barcode pools).

### Phase 2 — Collection
**Purpose:** Stakeholders (vendors, sponsors, artists) submit their personnel headcounts and individual rosters.

**UI elements built:**
| Section | What it shows |
|---------|---------------|
| Summary counters | Groups total, personnel submitted/expected, complete count, overdue count |
| Group Submission Status table | Group name, type, contact, progress bar (submitted/total), status pill |
| Personnel Roster table | Name, role, credential type (dot+name), status pill, barcode — filtered to one group sample |

### Phase 3 — Review & Approval
**Purpose:** Admin reviews submitted rosters and approves/denies individual credential requests.

**UI elements built:**
| Section | What it shows |
|---------|---------------|
| Summary counters | Approved (green), pending (amber), denied (red), total credentials |
| Approval Queue table | Person + role, group, credential type, approval chain status, Approve/Deny/Request Change actions |
| Status Report by Group table | Per group: approved/pending/denied counts + completion progress bar |

### Phase 4 — Issuance & On-Site
**Purpose:** Badge printing, gate scanning, will-call pickup, post-event check-in log.

**UI elements built:**
| Section | What it shows |
|---------|---------------|
| Summary counters | Ready to print, printed, picked up / printed ratio, checked in |
| Print Queue | Checkbox list with credential type dot, name, barcode, "Ready" pill, Print Selected button |
| Check-in Scan Station | Simulated scanner UI with success state (name, type, zone, scan time) |
| Will-Call Pickup Tracker | Table: person, group, type, printed status, picked up status / Mark Collected button |
| Recent Check-in Log | Table: person, type, gate, timestamp, result pill |

### Data Model (`data.js` — mock data)
```js
credentialTypes[]     { id, name, tier, zones[], color }
badgeTemplates[]      { typeId, fields[] }
approvalWorkflows[]   { typeId, steps[], conditional }
itemBlocks[]          { id, name, types[], maxQty, price, assignedTo }
barcodePools[]        { id, name, format, partner, total, assigned }
groups[]              { id, name, type, contact, submitted, total, status }
personnelRoster[]     { id, name, role, groupId, type, status, barcode }
approvalQueue[]       (subset of personnelRoster with status: 'pending')
printQueue[]          (subset with status: 'approved')
pickupTracker[]       { personId, name, group, type, printed, pickedUp }
checkinLog[]          { name, type, gate, scannedAt, result }
```

---

## Module 2 — Guest Lists

### What It Does
Allocation-based guest management. Unlike Credentials (which uses an approval queue), Guest Lists uses a **quota system** — admin pre-sets how many spots each company/sponsor gets per pass tier, and the stakeholder fills in names autonomously within that cap. No approval needed per name. Hard deadline enforcement locks submissions. Names cascade into Credentials (badges) and Catering (meals) automatically.

### Key Distinction vs Other Modules
- No approval queue — admin role is setup + monitoring only
- Stakeholder has near-total autonomy within their allocated quota
- Deadline enforcement is explicit and hard-locks the portal
- Feeder module: guest names → Credentials (badge generation) + Catering (meal headcount)
- Tiered registration: Gold / Silver / Classic pass tiers, each with separate per-company caps
- Direct VIP invites: admin manually generates ticket + QR code for VIPs bypassing the link system
- Waitlist: when a tier cap is reached, new registrants auto-flow to a waitlist queue

### File Structure
```
src/modules/guestlists/
├── guestlists.css                  All module styles (gl- prefix) + dashboard widget styles
├── GuestListsDashboardWidget.jsx   Dashboard widget (simple event list)
└── GuestListsModule.jsx            Full module — all 4 tabs in one file
```

### Dashboard Widget (`GuestListsDashboardWidget`)
Intentionally minimal. Shows only what the agency employee needs to know at a glance:

```
┌──────────────────────────────────┐
│  ☐  GUEST LISTS         3 events │
├──────────────────────────────────┤
│  › Infosys Summit 2025           │
│    Apr 14–16, 2025               │
│    312 confirmed  [47 waitlisted]│
├──────────────────────────────────┤
│  › Wipro Retreat 2024            │
│    Mar 3–5, 2025                 │
│    280 confirmed                 │
├──────────────────────────────────┤
│  › Tech Forum 2026               │
│    Oct 10, 2026                  │
│    [Setup Required]              │
└──────────────────────────────────┘
```

Props: `onSelectEvent(eventId, eventName)`

The widget is slotted into `CredentialsDashboardWidget`'s right sidebar via the `sidebarExtra` prop, appearing below the Live Attendance chart.

### Module Shell (`GuestListsModule`)
Single file, all tabs. State: `activeTab` — `'configuration' | 'collection' | 'monitoring' | 'sync'`

Props: `eventId`, `eventName`, `onBack`

The `eventName` is passed in from the widget click and displayed in the module header. Underlying data is still hardcoded mock data (for wireframe purposes); in production this would be fetched by `eventId`.

### Tab 1 — Configuration
**Purpose:** Admin defines pass tiers, sets per-company allocation quotas before any registrations open.

**UI elements built:**
| Section | What it shows |
|---------|---------------|
| Global Event Capacity bar | Stacked bar: confirmed (green) / waitlisted (amber) / remaining (grey), with counts |
| Pass Tiers table | Tier name (colour-coded), perks description, Edit action |
| Multi-Tier Company Allocations Matrix | Per company: used/cap for each tier + overall utilisation bar. Edit Matrix action. |

Key interactions: inline quota editing per company, Add Company modal, Add Tier modal.

### Tab 2 — Collection & Distribution
**Purpose:** Admin distributes registration links per company/tier. Monitors fill rate in real time.

**UI elements built:**
| Section | What it shows |
|---------|---------------|
| Summary stat cards (×4) | Total Confirmed, Waitlisted, Capacity Remaining, Links Active (x/total companies) |
| Per-company link cards (2-column grid) | Company name, waitlisted count badge, per-tier: tier pill + link string + copy button + Active/CAP REACHED/Paused status + utilisation bar, overall company utilisation bar |
| Generate Direct VIP Ticket modal | Guest name input, tier selector, +1 checkbox, Generate & Send Ticket button |

### Tab 3 — Monitoring & Waitlist
**Purpose:** Admin tracks confirmed guest list vs waitlist, processes cancellations.

**UI elements built:**
| Section | What it shows |
|---------|---------------|
| Confirmed table (left, 3fr) | #, Name, Company, Tier pill, +1, Dietary, Sessions, Ticket code, Revoke action. Pagination. Search bar. |
| Waitlist Queue (right, 2fr) | Deadline countdown banner, Allocate button, checkbox multi-select table: position, name (+1 indicator), company, tier |
| Cancellation Inbox (full width) | Request date, guest name, company, ticket code, Dismiss / Revoke Ticket actions |
| Revoke Confirmation modal | Confirmation prompt + Confirm Revoke button |

### Tab 4 — Fulfillment & Sync
**Purpose:** Pre-event readiness checklist — confirms all downstream syncs are complete.

**UI elements built:**
| Section | What it shows |
|---------|---------------|
| Event Readiness checklist | 5 sync items with status icons (✓ green / ! amber / ✗ red): QR Payloads, Dietary → Catering, Session Registrations → Scheduling, Will-Call DB sync, No-Show Predictions (post-event) |
| Action buttons | Force Resync All, Export Guest List (CSV) |
| Dietary Breakdown Sync Summary | Per dietary category: label + horizontal bar + count |

### Data Model (in `GuestListsModule.jsx` — inline mock data)
```js
EVENT           { name, date, venue, globalCapacity, confirmed, waitlisted }
TIERS[]         { id, name, color, perks }
COMPANIES[]     { id, name, allocations: { [tierId]: { cap, used } }, waitlisted, linkActive }
CONFIRMED_GUESTS[] { id, name, company, tier, plusOne, dietary[], sessions, ticketCode, status }
WAITLIST[]      { id, name, company, tier, plusOne, dietary[], registeredAt, position }
DIETARY_AGGREGATE[] { label, count }
```

---

## Modules Planned But Not Yet Built

| Module | Analysis Docs | Status |
|--------|---------------|--------|
| Catering | `docs/Core_Modules/CateringModule_Analysis.md` | Not started |
| Assets | `docs/Core_Modules/AssetsModule_Analysis.md` | Not started |

Both follow the same 4-phase pattern (Configuration → Collection → Review → Fulfillment) and the same widget + module shell structure.

---

## What Needs To Happen Next

1. **Catering module** — build dashboard widget + 4-phase module following the same pattern
2. **Assets module** — same
3. **Overview page integration** — once all 4 module widgets are tested in the playground, they get added as a new section to `apps/mme-prototype/src/components/OverviewPage.jsx`
4. **Event-scoped data** — currently all module data is hardcoded mock. Eventually each module needs to accept `eventId` and fetch/filter data accordingly
5. **Cross-module links** — Guest Lists feeds Credentials and Catering; the sync indicators in Guest Lists Tab 4 should eventually be live status checks
