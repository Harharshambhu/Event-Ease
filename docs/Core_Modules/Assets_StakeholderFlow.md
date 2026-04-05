# Assets & Inventory Module — Stakeholder Breakdown & User Flows

---

## Who Are the Stakeholders?

The Assets module has **4 distinct parties** — a smaller set than Credentials/Catering because this module is primarily a vendor-facing logistics operation.

---

### 1. 🏢 Agency Admin (Event Organiser)
**Who**: The production team (MmE) running the event.

**Core Relationship**: Owns the asset catalog, controls approvals, manages the global inventory ceiling, generates billback invoices.

**System Access**: Full Agency Portal — all 4 phases.

---

### 2. 🏭 Vendor / Supplier Group
**Who**: External companies needing physical equipment to operate — AV, staging, production, security.

**Core Relationship**: The primary consumer. Requests golf carts, radios, forklifts, etc. Gets billed for what they use.

**System Access**: Vendor Portal — Phase 2 (request) + Phase 4 (status / dispute reference).

---

### 3. 🚛 Operations / Logistics Team (Internal)
**Who**: Agency's own operations crew responsible for physically distributing equipment onsite.

**Core Relationship**: Receives the approved allocation manifest. Delivers items to correct groups at correct locations. Tracks returns.

**System Access**: Export from Phase 3 (delivery manifest) + Phase 4 (return tracking dashboard).

---

### 4. 💰 Finance / Accounts Team (Internal)
**Who**: Internal finance or accounts receivable handling vendor payments.

**Core Relationship**: Consumes the billback invoices generated from approved asset orders. Tracks payment status.

**System Access**: Phase 3 billback panel (invoice view + Stripe payment status).

---

## Stakeholder Activity Through the Event Lifecycle

```
PRE-EVENT ──────────────────────────────────────────────────► EVENT DAY ──► POST-EVENT
Config      Collection     Approval        Delivery          Onsite        Reconciliation
(Weeks out) (Weeks out)    (Days out)      (Day before)      (Live)        (Week after)
```

---

### 1. Agency Admin Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-8 weeks** | Define asset catalog — list all available equipment with quantities | Asset Catalog Manager |
| **T-8 weeks** | Set pricing per item; configure free vs. charged items | Pricing Config |
| **T-7 weeks** | Build item blocks — which assets each vendor type can request, qty limits | Item Block Builder |
| **T-6 weeks** | Set inventory ceilings per item | Inventory Limits |
| **T-5 weeks** | Open portal collection; vendors can start submitting requests | Portal Config |
| **T-5 weeks → T-2 weeks** | Monitor incoming requests; check allocation dashboard for over-commitment risks | Allocation Dashboard |
| **T-2 weeks → T-5 days** | Review and approve/partially approve/deny asset requests | Approval Queue |
| **T-3 days** | Generate per-group allocation reports → hand off to ops team | Group Asset Report |
| **T-2 days** | Generate billback invoices → hand off to finance | Billback Panel |
| **Event Day** | Reference dashboard for onsite disputes ("I was approved for 5 radios!") | Dispute Resolution |
| **Post-event (T+3 days)** | Track returns; flag missing/damaged equipment | Return Tracker |
| **Post-event (T+1 week)** | Review utilization patterns for next year's planning | Year-over-year Data |

---

### 2. Vendor / Supplier Group Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-5 weeks** | Receives portal invite from Admin | Email notification |
| **T-5 weeks** | Browses available equipment in their portal (filtered to their item block) | Portal Asset Catalog |
| **T-4 weeks** | Submits asset requests: "3 golf carts, 10 radios, 2 forklifts" with delivery notes | Asset Request Form |
| **T-4 weeks** | May submit custom request for non-standard items | Custom Request Form |
| **T-2 weeks** | Receives approval/partial/denial notification in portal | Portal Status View |
| **T-2 weeks** | Receives invoice for charged items | Email / Portal notification |
| **T-1 week** | Pays invoice via Stripe | Payment link |
| **Event Day** | Equipment delivered to their designated area | Physical |
| **Event Day** | References portal if dispute arises ("I was approved for X") | Portal Status View |
| **Post-event** | Returns equipment; missing items flagged | Physical / documented |

---

### 3. Operations / Logistics Team Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-3 days** | Receives per-group allocation manifest (exported from admin) | CSV/Excel export |
| **T-1 day** | Pre-positions equipment for delivery | Physical logistics |
| **Event Day** | Delivers assets to each group at specified locations | Delivery manifest |
| **Event Day** | References admin dashboard if vendor disputes arise | Dispute Resolution |
| **Post-event** | Collects returned equipment | Physical |
| **Post-event** | Updates return tracker — marks returned / missing / damaged | Return Tracker |

---

### 4. Finance / Accounts Team Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-2 days** | Receives generated invoices from admin | Billback Panel |
| **T-1 week → Event** | Monitors payment status — paid / outstanding | Invoice Status View |
| **Post-event** | Chases outstanding payments; adjusts for missing/damaged items | Adjusted invoices |

---

## User Flow Map (Cross-Stakeholder)

```
ADMIN                            VENDOR
  │                                     │
  ├─ Creates Asset Catalog              │
  ├─ Sets Pricing                       │
  ├─ Builds Item Blocks ─────────────► │ Sees available equipment in portal
  ├─ Opens Collection ────────────────► │ Receives invite
  │                                     │
  │                                     ├─ Browses catalog
  │                                     ├─ Submits request: "3 carts, 10 radios"
  │                                     └─ Adds delivery notes
  │
  ├─ Reviews Approval Queue
  │    ├─ Approve (full) ──────────────► Vendor sees ✓ in portal
  │    ├─ Approve (partial) 2 of 3 ───► Vendor sees "2 approved of 3 requested"
  │    └─ Deny ────────────────────────► Vendor sees ✗ + reason
  │
  ├─ Allocation Dashboard (monitor global ceiling)
  │
  ├─ Generates Group Report ───────────► Ops Team receives delivery manifest
  ├─ Generates Invoice ────────────────► Finance tracks payment
  │                                     ► Vendor pays via Stripe
  │
EVENT DAY
  │
  ├─ Ops delivers equipment per manifest
  ├─ Dispute? → Dashboard settles it instantly
  │
POST-EVENT
  │
  ├─ Ops tracks returns
  ├─ Admin flags missing/damaged
  └─ Finance adjusts invoices if needed
```

---

## Key Tension Points to Design For

> [!IMPORTANT]
> **Global inventory ceiling is the hard constraint**. Unlike Credentials (per-person) or Catering (per-meal), Assets has a shared pool. When 5 vendors want 30 golf carts and you own 20, the approval queue must show the impact of each approval on the remaining pool in real time.

> [!WARNING]
> **Partial approval is critical**. A vendor requests 5 carts, admin approves 3. The UI must make this partial state crystal clear — not just "Approved" which implies full quantity. The status needs to show `3 of 5 approved`.

> [!NOTE]
> **Billback is a revenue conversation**. The invoice panel needs to be professional and export-ready — this is a financial document that goes to the vendor's accounts payable team.

> [!NOTE]
> **Return tracking happens under pressure** — load-out day is chaotic. The return interface needs to be fast, checkbox-heavy, and tolerant of imprecise data (mark as "approximately returned" vs. exact count).

---

## Stakeholder Portal Mapping

| Stakeholder | Portal | Phases Visible |
|-------------|--------|---------------|
| Agency Admin | Agency Portal (full) | 1 + 2 (management) + 3 + 4 |
| Vendor / Supplier | Vendor Portal (tunnelled) | 2 (request) + status / invoice |
| Operations / Logistics | Export + Return Tracker | 3 (manifest) + 4 (returns) |
| Finance / Accounts | Billback Panel | 3 (invoices + payment tracking) |
