# Credentials Module — UI Element Analysis

> **Source**: `docs/Core_Modules/lennd_credentials_module_product_breakdown.html`
> **Module**: Module 1 — Credentials (pass & access management)
> **Phases**: Configuration → Collection → Review & Approval → Issuance & Onsite

---

## Module Summary

Credentials is a **4-phase lifecycle module** that manages the full journey of an event pass — from defining types and approvals upfront, through stakeholder submission, admin review, and finally physical badge printing & onsite scanning.

This module spans **two user contexts**:
- **Admin (Agency)**: Configures, reviews, approves, and monitors
- **Stakeholder (Vendor/Group)**: Submits requests via portal or form

---

## Phase 1 — Configuration *(Admin, pre-event)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 1 | **Credential Types** | Define types: All-Access, Backstage, Vendor, Media, VIP, Artist, Volunteer | CRUD table with name, access level, and color swatch |
| 2 | **Badge Design Templates** | Per-type customizable layout controlling which fields print | Visual badge preview editor; drag-and-drop field slots |
| 3 | **Approval Workflows** | Single/multi-level, conditional sign-off chains per credential type | Workflow builder; conditional logic UI (if/then dropdowns) |
| 4 | **Item Blocks** | Requestable credential packages — types, qty, price, limits | Package card builder; assign to group types |
| 5 | **Barcode / RFID Integration** | Import or generate barcodes; map pools to credential types | Import CSV / manual entry; pool assignment dropdown |

### Phase 1 UI Requirements
- **Credential Type Manager**: List of type cards with `[icon/dot] [name] [access tier badge] [color swatch] [edit]` per row
- **Badge Template Editor**: Live preview panel showing printed fields mapped to template zones (name, company, barcode, photo)
- **Workflow Builder**: Step-by-step chain editor – add/remove approver stages with conditional rules
- **Item Block Table**: Tabular view with inline fields for quantity, price, cap, and group assignment
- **Barcode Pool Manager**: Import/upload area + pool-to-type mapping pane

---

## Phase 2 — Collection *(Stakeholders, via portal or form)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 6 | **High-level count requests** | Stakeholder submits bulk numbers per type before individuals are named | Summary form: type → qty input per row |
| 7 | **Personnel name submission** | Individual names, roles, and credential type per person | Person-level data table with add/edit/remove; inline editing |
| 8 | **Portal request forms** | Custom fields per group — name, title, photo, emergency contact, dietary, type | Multi-field form builder rendered per stakeholder |
| 9 | **Standalone forms** | Public URL, no portal login required | Shareable link form with field subset; no auth wall |
| 10 | **Manual + bulk import** | Admin adds VIPs manually or imports CSV | Single add modal + CSV upload with field mapping |

### Phase 2 UI Requirements
- **Count Request Summary**: A table of `type → requested qty → allocated cap` with submission CTA
- **Personnel Roster Table**: Editable rows (name / role / type / status / delete) with an `Add Person` action
- **Form Builder**: Field configuration panel with drag-and-drop field types (text, photo upload, dropdown, etc.)
- **Standalone Form Page**: Minimal public form page with no sidebar/nav; brand name + field list only
- **Bulk Import Modal**: Drag-and-drop CSV zone + field-mapping step + validation summary before commit

---

## Phase 3 — Review & Approval *(Admin)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 11 | **Approval Queue** | Pending requests dashboard — approve / deny / request changes per person | Filterable list view; per-row action buttons; note input |
| 12 | **Status Reports** | Real-time group completion tracking; flags overdue items | Dashboard widget: submitted / pending / overdue per group |
| 13 | **Automated Reminders** | Rule-based email nudges for overdue groups | Reminder rule card — trigger date, frequency, message preview |
| 14 | **Barcode Assignment** | Auto-assign on approval; next available from pool | Transparent cascade — no UI needed; visible on credential detail |

### Phase 3 UI Requirements
- **Approval Queue View**: Master-detail layout — left list (people + status pill) → right panel (full details, approve/deny/note actions)
- **Status Dashboard**: Progress cards per group — `group name / X of Y submitted / Z approved / warnings` with per-group drill-down
- **Reminder Rule Panel**: Configuration form — deadline date, reminder frequency (x days before deadline), message body, preview send
- **Credential Detail View**: Shows assigned barcode number / pool name after approval fires automatically

---

## Phase 4 — Issuance & Onsite *(Event Day)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 15 | **Badge Printing** | Pre-event or onsite badge print with correct design, data, barcode | Print queue with filter by type; status `printed / not printed` |
| 16 | **Check-in App** | Mobile scan stations — verify barcode/RFID at entry; logs timestamp | Full-screen scan UI; success/denied feedback; timestamp log |
| 17 | **Pickup Tracking** | Mark badge as collected at will-call; track uncollected | Toggle/mark action per row; count of outstanding on header |
| 18 | **Portal Status Visibility** | Stakeholder sees per-person status: approved / pending / denied / issued / checked-in | Read-only credential status table in vendor portal; status pills |

### Phase 4 UI Requirements
- **Print Queue**: Filterable table — filter by type, status, group; bulk `Print Selected` action; `Reprint` per row
- **Mobile Check-in View**: Large scan-input area + result card ([green tick] name / [red cross] denied + reason)
- **Pickup Tracker**: Will-call roster with `Mark Collected` toggle per person; header counter `X / Y collected`
- **Vendor Portal Status Panel**: Read-only table showing each submitted person with a clear status pill (pending / approved / issued / checked-in)

---

## Cross-Cutting UI Components Needed

These will be needed across all 4 phases:

| Component | Use Case |
|-----------|----------|
| **Status Pill** | Pending, Approved, Denied, Issued, Checked-In across all phases |
| **Credential Type Tag** | Colored badge showing the type (Vendor, VIP, All-Access, etc.) |
| **Person Row** | Reusable name + role + type + status row for rosters, queues, and portal views |
| **Group Progress Card** | Used in status reports: group name, submitted/total, overdue warning |
| **Import Modal** | CSV drag-drop + field mapper; reusable across bulk imports |
| **Action Button Row** | Approve / Deny / Request Change — consistent 3-action row per person |
| **Reminder Rule Card** | Configurable automation trigger card |
| **Badge Preview** | Mini visual of credential badge; shown in type manager and print queue |

---

## Recommended Build Order

Since this is the **first module*, build in this order to maximize reuse:

1. **Agency side — Configuration** (Phase 1): Credential Type Manager + Item Blocks + Approval Workflow builder
2. **Vendor side — Collection** (Phase 2): Personnel Roster table + Portal status view
3. **Agency side — Review** (Phase 3): Approval Queue + Status Dashboard
4. **Agency side — Issuance** (Phase 4): Print Queue + Pickup Tracker

> [!IMPORTANT]
> The `<PersonRow>`, `<StatusPill>`, and `<CredentialTypeTag>` components are used in **every phase** and **both portals**. These should be built first and added to `@mme/ui-components`.

> [!NOTE]
> Phase 4 Check-in App is likely a separate mobile-optimized screen or standalone app page — it should be scoped separately from the main dashboard views.
