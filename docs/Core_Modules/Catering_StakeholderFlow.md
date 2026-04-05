# Catering Module — Stakeholder Breakdown & User Flows

---

## Who Are the Stakeholders?

The Catering module has **5 distinct parties** interacting with it, some of whom overlap with the Credentials module.

---

### 1. 🏢 Agency Admin (Event Organiser)
**Who**: The production team (MmE) running the event.

**Core Relationship**: Owns the entire meal system. Sets it up, controls approvals, generates the catering forecast, and monitors onsite usage.

**System Access**: Full Agency Portal — all 4 phases.

---

### 2. 🏭 Vendor / Supplier Group
**Who**: External companies with onsite crews — AV, staging, security, etc.

**Core Relationship**: Needs to feed their crew. Submits group-level meal requests and, optionally, individual assignments.

**System Access**: Vendor Portal (tunnelled) — Phase 2 (meal request) only.

---

### 3. 🎤 Artist / Talent Group
**Who**: Performers and their touring party.

**Core Relationship**: Typically has a hospitality rider — specific meal arrangements, often different from standard crew meals.

**System Access**: Dedicated portal / form — Phase 2 (meal request with dietary info per person).

---

### 4. 🍽️ Catering Vendor (Supplier, Onsite)
**Who**: The catering company physically preparing and serving the food.

**Core Relationship**: Receives the forecast report — total meals per type per day. Does NOT use the system directly; consumes the exported data.

**System Access**: Export only — receives CSV/Excel generated from Phase 3 dashboard.

---

### 5. 🛡️ Catering Gate Staff (Server / Check-in Operator)
**Who**: Staff manning the catering stations (breakfast tent, lunch area, backstage kitchen, etc.)

**Core Relationship**: Scans wristbands to verify meal entitlement and claim the meal against the person's record.

**System Access**: Check-in App (catering mode) — Phase 4 onsite view only.

---

## Stakeholder Activity Through the Event Lifecycle

```
PRE-EVENT ──────────────────────────────────────────────────► EVENT DAY
Config      Collection     Approval      Forecasting         Onsite
(Weeks out) (Weeks out)    (Days out)    (Day before)        (Live)
```

---

### 1. Agency Admin Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-6 weeks** | Define event days (load-in / show / load-out) | Agency Portal / Config |
| **T-6 weeks** | Create meal types and set per-day availability | Meal Type Manager |
| **T-6 weeks** | Configure dietary restriction options | Dietary Config |
| **T-6 weeks** | Build item blocks — which meals each group type gets, qty caps | Item Block Builder |
| **T-5 weeks** | Assign approvers; set manager override code | Approver Settings |
| **T-4 weeks** | Open portal collection for groups | Portal Config |
| **T-4 weeks → T-1 week** | Monitor which groups have submitted | Status Dashboard |
| **T-2 weeks → T-3 days** | Review and approve/deny group meal requests | Approval Queue |
| **T-2 days** | Run catering forecast dashboard; export to CSV for catering vendor | Forecast Dashboard |
| **T-1 day** | Final tally — freeze orders; send final count to catering vendor | Export |
| **Event Day** | Monitor real-time meal usage by station | Live Usage Dashboard |
| **Event Day** | Handle walk-in meal additions manually | Manual Add |
| **Post-event** | Review utilization — find waste patterns | Budget/Utilization Report |

---

### 2. Vendor / Supplier Group Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-4 weeks** | Receives portal invite from Admin | Email notification |
| **T-4 weeks** | Reviews available meal types and which days they need meals | Vendor Portal |
| **T-3 weeks** | Submits group-level count: "12 lunches and 12 dinners on Day 1, 15 on Day 2" | Meal Request Grid |
| **T-2 weeks** | Optionally assigns specific meals to individual team members | Person-Meal Assignment |
| **T-2 weeks** | Each person's dietary restrictions captured | Dietary Fields |
| **T-1 week** | Receives confirmation that meals are approved | Portal notification |
| **Event Day** | Team shows up at catering station with wristbands | Physical |
| **Event Day** | Can view portal: which team members' meals are confirmed | Portal Status View |

---

### 3. Artist / Talent Group Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-3 weeks** | Tour manager receives portal link | Email |
| **T-3 weeks** | Submits hospitality/rider-level meal needs per person per day | Meal Request Form |
| **T-3 weeks** | Dietary requirements captured per artist | Dietary Fields |
| **T-1 week** | Admin approves (or negotiates) the hospitality requests | Approval Queue |
| **Event Day** | Artist hospitality handled at designated catering area | Physical |

---

### 4. Catering Vendor (External, Offline Consumer)

| Stage | Activity | Tool |
|-------|----------|------|
| **T-2 days** | Receives exported forecast: meals per type per day per total count | CSV/Excel export |
| **T-1 day** | Receives final revised count after last-minute additions | Final export |
| **Event Day** | Prepares meals based on forecast | Kitchen operations |
| **Event Day** | Staff uses check-in app at station for verification | Check-in App |

---

### 5. Catering Gate Staff Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **Pre-service brief** | Briefed on which meals are active for the current service (lunch, dinner) | App dashboard |
| **Service** | Scans each person's wristband as they arrive at station | Scan Station |
| **Service** | App confirms: `[Name] Lunch ✓ — Vegan` or `DENIED — no lunch on record` | Check-in App |
| **Service** | Falls back to group search if wristband missing | Group Search |
| **Exception** | Calls manager for override if person is denied | Manager Override |
| **Post-service** | Usage counts auto-update in admin dashboard | Automatic |

---

## User Flow Map (Cross-Stakeholder)

```
ADMIN                            VENDOR / ARTIST
  │                                     │
  ├─ Configures Days + Meals            │
  ├─ Builds Dietary Options             │
  ├─ Creates Item Blocks ─────────────► │ Sees available meals in portal
  ├─ Opens Collection ────────────────► │ Receives invite
  │                                     │
  │                                     ├─ Submits group count (Phase 2a)
  │                                     │  "12 lunches / Day 1"
  │                                     ├─ Optionally assigns per person (Phase 2b)
  │                                     └─ Dietary collected per person
  │
  ├─ Reviews Approval Queue
  │    ├─ Approve ──── meal is confirmed ──► Group sees ✓ in portal
  │    └─ Deny ──── group notified ──────► Group revises and resubmits
  │
  ├─ Generates Forecast Dashboard (Day × Meal grid)
  ├─ Exports CSV ─────────────────────────── ► Catering Vendor prepares stock
  │
EVENT DAY
  │
  ├─ Live Usage Dashboard (admin monitor)
  │
  └─ Catering Gate Staff
         ├─ Scans wristband ──► Match found ──► Meal claimed ──► Counter -1
         ├─ No match found ──► Group search fallback
         └─ Still no match ──► Manager override ──► Logged exception
```

---

## Key Tension Points to Design For

> [!IMPORTANT]
> **The Day × Meal grid is the core interaction**: Unlike Credentials which is person-centric, Catering is grid-centric. The meal request form and the forecast dashboard are both variants of the same `day × meal type × quantity` matrix. Design these as one consistent component.

> [!WARNING]
> **Two different check-in modes**: Individual scan (wristband → person → meal) and group-level fallback (search group → decrement pool). The onsite UI must handle both seamlessly without requiring a mode switch.

> [!NOTE]
> **Catering vendor is an offline consumer**: They don't log into the system. The export/CSV quality is critical — it's their primary data source for kitchen planning.

> [!NOTE]
> **Dietary data crosses modules**: Dietary restrictions collected here should be visible in the Credentials person record and any future CRM module. Design the dietary field as a shared person attribute, not a module-specific field.

---

## Stakeholder Portal Mapping

| Stakeholder | Portal | Phases Visible |
|-------------|--------|---------------|
| Agency Admin | Agency Portal (full) | 1 + 2 (management) + 3 + 4 |
| Vendor / Supplier | Vendor Portal (tunnelled) | 2 (request) + status confirmation |
| Artist / Talent | Dedicated form or portal | 2 (request + dietary) |
| Catering Vendor | Offline / Export | Phase 3 export only |
| Gate Staff | Check-in App (catering mode) | 4 (scan + verify only) |
