# Assets & Inventory Module — Element Analysis & UI Requirements

> **Source**: `docs/Core_Modules/lennd_assets_module_product_breakdown.html`
> **Module**: Module 3 — Assets & Inventory (equipment request, approval & billback)
> **Phases**: Configuration → Request & Collection → Review, Approval & Allocation → Onsite & Post-event

---

## Module Summary

Assets is a **4-phase inventory and billing module** that manages physical equipment — golf carts, radios, forklifts, tables, signage — from catalog definition through stakeholder request, admin approval with inventory ceiling enforcement, and post-event return reconciliation.

**Key distinction from other modules**: Assets introduces **billback/payment** — vendors can be charged for equipment they use. This module is the only one that generates revenue, turning a cost centre into a tracked income stream. It also enforces a hard **global inventory ceiling** — if you have 30 golf carts, the system won't approve 35 across all vendors combined.

This module spans **two user contexts**:
- **Admin (Agency)**: Catalogs inventory, approves requests, tracks allocation, generates invoices
- **Stakeholder (Vendor/Group)**: Requests equipment via portal, views status

---

## Phase 1 — Configuration *(Admin)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 1 | **Asset Catalog** | All requestable equipment with total inventory qty | CRUD list: item name, category, total inventory count, image/icon |
| 2 | **Pricing per Item** | Rental/usage price for billback; varies by group or flat | Price field per item; group-specific override pricing option |
| 3 | **Item Blocks** | Request packages bundled per group type with qty limits | Block builder: assign items + qty cap + group type |
| 4 | **Inventory Limits** | Per-item per-group cap and global inventory ceiling | Numerical cap fields; real-time remaining counter |

### Phase 1 UI Requirements
- **Asset Catalog Manager**: Card or table list — `[icon] [name] [category tag] [total qty] [price] [edit/delete]` per row. Add new asset inline or via modal.
- **Pricing Configuration**: Inline price field per asset. Toggle for "Free (included)" vs. "Charged". Optional group-override pricing table (group name → custom price).
- **Item Block Builder**: Card-per-block — lists included items, assigned group types, qty limits per item. Drag items from catalog into blocks.
- **Inventory Ceiling Display**: Per-asset: `[total] / [allocated] / [remaining]` live counter. Warning state when remaining < 20%.

---

## Phase 2 — Request & Collection *(Stakeholders)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 5 | **Portal asset request** | Self-service ordering with qty and delivery notes | Item catalog view (filtered to group's block); qty input + notes field |
| 6 | **Custom request forms** | For non-standard or special items | Free-text description form; file attachment support |
| 7 | **Request visibility** | Real-time status in portal | Status list: `[item] [qty requested] [status pill] [admin notes]` |

### Phase 2 UI Requirements
- **Asset Order Page (Portal)**: Catalog of available items filtered to the stakeholder's block. Per-item: `[image/icon] [name] [price] [qty input] [notes field]`. Cart-like "Submit Request" CTA at bottom.
- **Custom Request Form**: Simple form — `[title] [description textarea] [file upload] [submit]`. Admin reviews in approval queue.
- **Request Status View**: Read-only table in portal — `[item] [qty requested] [qty approved] [status: Pending / Approved / Partial / Denied] [admin note]`.

---

## Phase 3 — Review, Approval & Allocation *(Admin)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 8 | **Approval queue** | All pending asset requests across groups; approve full/partial/deny | Filterable list; per-row qty adjustment; approve/deny/partial buttons |
| 9 | **Allocation dashboard** | Total inventory vs. committed vs. remaining per item | Bar or gauge per asset type; colour-coded thresholds |
| 10 | **Group-level asset report** | Per-group approved items; export for delivery logistics | Per-group card with item list; export CSV for ops manifest |
| 11 | **Billback / payment** | Generate invoices; Stripe integration; paid vs. outstanding | Invoice table per group; total due; payment status; "Send Invoice" CTA |

### Phase 3 UI Requirements
- **Approval Queue**: Master list — `[group name] [item requested] [qty] [approve qty input] [approve/deny/partial]`. Inline remaining inventory counter so admin can see impact of approval.
- **Allocation Dashboard**: The core admin view — per-asset row: `[item name] [total inventory bar: allocated | pending | remaining]`. Critical threshold highlight (red when over-committed).
- **Group Asset Report**: Per-group drill-down — `[group name] → [items approved table] → [delivery notes]`. Export button for operations team manifest.
- **Billback Panel**: Invoice table — `[group name] [items × qty × price = total] [paid / outstanding]`. Stripe "Charge" button. Export invoice PDF.

---

## Phase 4 — Onsite & Post-event

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 12 | **Onsite dispute resolution** | Single source of truth for "how many were approved" | Searchable dashboard; timestamped approval records |
| 13 | **Return tracking** | Mark assets as returned; flag missing/damaged | Per-item toggle: `returned / missing / damaged` per group |
| 14 | **Year-over-year data** | Historical request patterns carry forward for forecasting | Historical card showing past event data per group |

### Phase 4 UI Requirements
- **Dispute Resolution View**: Search bar → group result → timestamped approval log. Shows exactly what was approved, when, by whom. Shareable link.
- **Return Tracker**: Post-event checklist — `[group name] → [item] [qty issued] [returned ✓/✗] [missing count] [damage notes]`. Summary counter at top: `X of Y items returned`.
- **Historical Data Panel**: Per-group card — `[Last event: requested X, approved Y, returned Z]`. Used during Phase 1 of next event for smarter allocation.

---

## Cross-Cutting UI Components

| Component | Use Case |
|-----------|----------|
| **Asset Item Card** | Used in catalog (Phase 1), portal order page (Phase 2), and allocation dashboard (Phase 3) |
| **Inventory Gauge** | Bar/gauge showing total → allocated → remaining; used in catalog, approval queue, allocation dashboard |
| **Approval Action Row** | Approve / Partial / Deny — shared pattern with Credentials and Catering |
| **Status Pill** | Pending / Approved / Partial / Denied / Returned / Missing — consistent across all phases |
| **Invoice Row** | Group × items × price calculation; used in billback panel |
| **Return Checklist Row** | Per-item returned/missing/damaged toggle; post-event view |

---

## Shared Patterns with Other Modules

| Pattern | Credentials | Catering | Assets |
|---------|-------------|----------|--------|
| Item Blocks (group packages) | ✓ | ✓ | ✓ |
| Approval Queue | ✓ | ✓ | ✓ (+ partial approval) |
| Portal self-service request | ✓ | ✓ | ✓ |
| Status visibility in portal | ✓ | ✓ | ✓ |
| Admin manual entry | ✓ | ✓ | ✓ (custom request) |
| Export for operations | ✗ | ✓ (CSV for caterer) | ✓ (manifest for ops) |
| Billback / payment | ✗ | ✗ | ✓ (unique to assets) |
| Return tracking | ✗ | ✗ | ✓ (unique to assets) |

> [!IMPORTANT]
> **Partial approval is unique to Assets**. Credentials and Catering are approve/deny only. Assets needs an "approve X of Y requested" flow. The `<ApprovalQueue>` shared component must support a qty adjustment input.

> [!NOTE]
> **Billback is a new UI paradigm** not seen in other modules. The invoice generation, Stripe integration, and payment tracking panel will be specific to Assets initially, but could extend to Catering if meals become chargeable.
