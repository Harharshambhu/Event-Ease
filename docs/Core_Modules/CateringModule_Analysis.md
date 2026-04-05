# Catering Module — Element Analysis & UI Requirements

> **Source**: `docs/Core_Modules/lennd_catering_module_product_breakdown.html`
> **Module**: Module 2 — Catering (meal request, approval & check-in)
> **Phases**: Configuration → Request & Collection → Approval & Forecasting → Onsite Check-in

---

## Module Summary

Catering is a **4-phase budget and logistics module** that controls meal ordering across the full event lifecycle — from load-in day through load-out. It translates a complex, multi-day group meal operation into a trackable, budget-controlled system with onsite scanning verification.

**Key distinction from Credentials**: Catering operates on a *day × meal type × person/group* matrix. Everything is measured against that grid.

This module spans **two user contexts**:
- **Admin (Agency)**: Configures meal types, approves requests, forecasts for catering vendor, monitors onsite usage
- **Stakeholder (Vendor/Group)**: Submits meal requests for their team per day

---

## Phase 1 — Configuration *(Admin)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 1 | **Event Days** | Define which days include catering — load-in, show days, load-out | Date range selector with day-type labels (load-in / show / load-out) |
| 2 | **Meal Types** | Custom names per event; set per-day availability | Tag-based meal type builder; per-type day availability toggles |
| 3 | **Dietary Restrictions** | Configurable restriction options per event (preset + custom) | Multi-select chip builder; separate allergy free-text field |
| 4 | **Item Blocks** | Meal packages per group type — which meals, qty limits, optional pricing | Block card builder with meal assignment + quantity cap + group assignment |
| 5 | **Approver Settings** | Assign approver privileges; configure manager override code | Team member selector; override code generator field |

### Phase 1 UI Requirements
- **Event Day Planner**: Calendar or list-style day setup with `load-in / show / load-out` type tags and start/end time
- **Meal Type Manager**: Simple list with `[name] [days available: toggle chips] [edit/delete]` per row; add new meal inline
- **Dietary Restriction Builder**: Preset chips (vegetarian, vegan, gluten-free, halal, kosher, nut allergy) + `+ Add custom` field
- **Item Block Table**: Card-per-block showing meal name, group type, qty limit, price/free, assigned portal. Drag to reorder.
- **Approver Settings Panel**: Team member multi-select for approvers + override code display/regenerate button

---

## Phase 2 — Request & Collection *(Stakeholders)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 6 | **Group-level meal requests** | Group contact requests total meals per type per day for their team | Day × meal type grid with qty input per cell |
| 7 | **Person-level meal assignment** | Individual meal assignments within a group for per-person check-in | Per-person toggles mapped to approved meals; bulk assign |
| 8 | **Dietary info per person** | Collected per individual; persists cross-module | Dietary sub-fields within each person's profile (multi-select + notes) |
| 9 | **Admin manual entry** | Admin adds meal orders for late additions / walk-ins | Quick-add modal: person / group / meal type / day |

### Phase 2 UI Requirements
- **Meal Request Grid**: Matrix view — rows: available meal types, columns: event days. Qty input cells. Subtotals per meal per day.
- **Person-Meal Assignment Table**: Per-person list with meal toggles — `[name] [lunch ✓] [dinner ✓] [dietary: vegan]` per row
- **Dietary Field**: Within the person detail, a multi-select chip row for restriction tags + a free-text "other allergies" field
- **Manual Add Modal**: `Select person / group → select day → select meal type → confirm` — a 4-step quick form

---

## Phase 3 — Approval & Forecasting *(Admin)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 10 | **Approval queue** | Review and approve/deny meal requests per group; admin orders auto-approve | Filter by group/status; bulk approve; deny with note |
| 11 | **Catering dashboard** | Total approved/pending/denied/unused/used by day and meal type; export CSV | Pivot table or heatmap grid; export button |
| 12 | **Budget tracking** | Total meal cost by group / day / meal type; over-request and under-utilization | Summary totals with group breakdown; cost per line |

### Phase 3 UI Requirements
- **Approval Queue**: List view filterable by group / meal type / status. Per-row: group name, meal requested, day, approve/deny buttons. Bulk approve toggle.
- **Catering Forecast Dashboard**: The core data view — a `Day × Meal Type` pivot table with approved/pending/unused/used counts per cell. Colour-coded. Export to CSV.
- **Budget Panel**: Running cost totals — `group name / meals allocated / cost / utilization %` in a sortable table. Highlight over-budget groups in red.

---

## Phase 4 — Onsite Check-in *(Event Day)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 13 | **RFID / barcode scanning** | Scan wristband → match person → claim approved meal | Full-screen scan UI; instant match + meal confirmation |
| 14 | **Group-level check-in** | Fallback: search by group name, count against group's meal pool | Search input; group pool counter `X of Y used` |
| 15 | **Manager override** | Password-protected exception — approve unrecorded meal, log it | PIN/code entry overlay; logs override against wristband ID |
| 16 | **Real-time usage dashboard** | Live approved vs. used vs. unused by day/meal/group | Live-updating counters: approved / scanned / remaining per meal type |

### Phase 4 UI Requirements
- **Scan Station View**: Large scan target area + result card showing `[person name] [meal type] [APPROVED ✓]` or `[DENIED ✗ — no meal on record]`. Optimized for high-contrast, fast-read.
- **Group Fallback Search**: Search bar → group result with pool count `[Infosys] Lunch: 8 of 12 used`. Tap to claim one.
- **Manager Override Modal**: Triggered on denial — enter override code → add reason note → meal is logged + approved.
- **Live Usage Dashboard**: Card per meal type showing real-time bar: `[claimed X] [remaining Y] [buffer Z]`. Auto-refreshing.

---

## Cross-Cutting UI Components

| Component | Use Case |
|-----------|----------|
| **Day × Meal Grid** | The core data structure — used in request (Phase 2) and forecast dashboard (Phase 3) |
| **Meal Type Tag** | Coloured chip showing meal name; used in request, approval, check-in |
| **Dietary Restriction Badge** | Small chip per restriction; used in person rows and catering vendor export |
| **Approval Action Row** | Approve / Deny — consistent pattern shared with Credentials module |
| **Usage Counter Card** | Approved / Used / Remaining — used in forecast and onsite dashboards |
| **Manager Override Modal** | Password gate before exception logging |

---

## Shared Patterns with Credentials Module

| Pattern | Credentials | Catering |
|---------|-------------|---------|
| Item Blocks (group packages) | ✓ credential type packages | ✓ meal packages |
| Approval Queue | ✓ per-person credential approval | ✓ per-group meal approval |
| Admin manual entry | ✓ VIP/exec add | ✓ walk-in meal add |
| Portal submission → approval | ✓ name submission | ✓ meal request |
| Onsite scan verification | ✓ badge scan at gate | ✓ wristband scan at catering tent |
| Manager override | ✓ day-of exception | ✓ unrecorded meal exception |

> These shared patterns confirm that `<ApprovalQueue>`, `<ItemBlockBuilder>`, `<ManualAddModal>`, and `<ScanStation>` should be **generic shared components** in `@mme/ui-components`.
