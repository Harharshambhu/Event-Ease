# Guest Lists Module — Stakeholder Breakdown & User Flows

---

## Who Are the Stakeholders?

Guest Lists has **5 distinct parties**, but the dynamics are fundamentally different from the other modules. The stakeholder has more autonomy here — they self-manage their list without per-name approvals.

---

### 1. 🏢 Agency Admin (Event Organiser)
**Who**: The production team (MmE) running the event.

**Core Relationship**: Sets quotas, monitors completion, adjusts allocations, exports the final list for box office / will-call.

**System Access**: Full Agency Portal — all 4 phases.

---

### 2. 🎤 Artist / Talent Manager
**Who**: Tour managers, artist management teams, band representatives.

**Core Relationship**: The **primary user** of this module. Manages their artist's guest list — adding, editing, swapping names within the allocated quota.

**System Access**: Dedicated portal or form — Phase 2 (full self-service name management).

---

### 3. 🏷️ Sponsor / Brand Partner
**Who**: Corporate sponsors, brand partners with VIP guest allocations.

**Core Relationship**: Manages corporate guest lists — clients, executives, influencers. Often has larger quotas with multiple pass types (GA + VIP + hospitality).

**System Access**: Dedicated portal — Phase 2 (self-service name management).

---

### 4. 🗂️ Internal Staff / Teams
**Who**: Agency employees managing "Staff Family & Friends" or "Contest Winners" allocations.

**Core Relationship**: Manages internal or promotional guest lists that don't belong to any external group.

**System Access**: Admin portal — Phase 2 (internal allocation management).

---

### 5. 🎟️ Box Office / Will-Call Staff (Onsite)
**Who**: Staff at the venue entrance managing guest credential pickup.

**Core Relationship**: Uses the exported guest list to verify arrivals and issue credentials. Searches names, scans IDs, marks as collected.

**System Access**: Will-call view (shared with Credentials module) — Phase 4 only.

---

## Stakeholder Activity Through the Event Lifecycle

```
PRE-EVENT ──────────────────────────────────────────────────► EVENT DAY ──► POST-EVENT
Allocation     Name Entry      Monitoring       Fulfillment     Onsite        Analysis
(Weeks out)    (Weeks out)     (Days out)       (Day before)    (Live)        (Week after)
```

---

### 1. Agency Admin Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-6 weeks** | Define which pass types are available for guest lists | Pass Type Selector |
| **T-6 weeks** | Optionally attach meal allocations to guest list spots | Meal Attachment Config |
| **T-6 weeks** | Set group-level quotas: "DJ Shadow: 8 GA + 2 VIP" | Quota Table |
| **T-6 weeks** | Create custom allocation groups: "Contest Winners," "Staff Family" | Custom Group Creator |
| **T-5 weeks** | Open portal for stakeholders to begin entering names | Portal Config |
| **T-5 weeks → T-1 week** | Monitor completion dashboard — who's submitted, who hasn't | Completion Dashboard |
| **T-2 weeks** | Send reminders to groups with incomplete lists | Manual or automated |
| **T-1 week** | Adjust quotas for late requests ("headliner needs 4 more") | Quota Adjustment |
| **T-3 days** | Review aggregate guest count for security/box office planning | Aggregate Counter |
| **T-2 days** | Set submission deadline — portal locks entries | Deadline Config |
| **T-1 day** | Export finalized guest list for box office / will-call | Box Office Export |
| **Event Day** | Handle last-minute additions via admin override | Admin Portal |
| **Post-event** | Review no-show data for next year's optimization | No-Show Report |

---

### 2. Artist / Talent Manager Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-5 weeks** | Receives portal invite with allocation details | Email notification |
| **T-5 weeks** | Logs in → sees: "You have 8 GA + 2 VIP guest spots" | Portal Allocation View |
| **T-4 weeks** | Starts entering names: band member's partner, tour bus driver, etc. | Guest Name Table |
| **T-4 → T-2 weeks** | Edits and swaps names as plans change | Inline edit/delete |
| **T-2 weeks** | Fills remaining spots: photographer, merch crew's family | Guest Name Table |
| **T-3 days** | Final check — 8 of 8 GA, 2 of 2 VIP submitted | Progress confirmation |
| **After deadline** | Portal locks — any changes require contacting admin | Locked state |
| **Event Day** | Guests arrive at will-call and collect credentials | Physical |

---

### 3. Sponsor / Brand Partner Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-5 weeks** | Receives portal invite: "50 GA + 10 VIP allocated" | Email notification |
| **T-4 weeks** | Marketing team begins entering names: clients, influencers | Guest Name Table |
| **T-3 weeks** | Assigns pass types per guest (GA vs. VIP) | Inline pass type selector |
| **T-2 weeks → deadline** | Edits as RSVP responses come in | Inline edit/delete |
| **Deadline** | Portal locks with 42 of 50 GA, 8 of 10 VIP submitted | Progress bar shows remaining |
| **Event Day** | Guests arrive at VIP entrance / will-call | Physical |

---

### 4. Internal Staff Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-4 weeks** | Admin creates "Staff Family & Friends" allocation: 30 GA | Custom Group |
| **T-3 weeks** | HR or admin enters staff guest names | Guest Name Table |
| **T-2 weeks** | Admin creates "Contest Winners" allocation: 20 GA | Custom Group |
| **T-2 weeks** | Marketing enters winner names from social media campaign | Guest Name Table |
| **Deadline** | All names submitted | Auto-flow to Credentials |

---

### 5. Box Office / Will-Call Staff Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-1 day** | Receives exported guest list (CSV / printed) | Box Office Export |
| **Event Day** | Guest arrives: "I'm on DJ Shadow's guest list" | Manual |
| **Event Day** | Searches name in will-call system → match found → credential issued | Will-Call Search |
| **Event Day** | Scans barcode if pre-printed; or prints badge on-the-spot | Credentials Check-in App |
| **Event Day** | Guest not on list? → calls admin for override | Exception handling |

---

## User Flow Map (Cross-Stakeholder)

```
ADMIN                             ARTIST / SPONSOR / INTERNAL
  │                                       │
  ├─ Defines Pass Types                   │
  ├─ Attaches Meals (optional)            │
  ├─ Sets Quotas ───────────────────────► │ Sees "8 GA + 2 VIP" in portal
  ├─ Creates Custom Groups                │
  ├─ Opens Portal ──────────────────────► │ Receives invite
  │                                       │
  │                                       ├─ Enters names (self-service, no approval needed)
  │                                       ├─ Edits / swaps names freely
  │                                       ├─ Views progress: "5 of 8 GA submitted"
  │                                       └─ Portal locks at deadline
  │
  ├─ Monitors Completion Dashboard
  │    "DJ Shadow: 8/8 ✓" "RedBull: 42/50 partial"
  │
  ├─ Adjusts quotas if needed
  ├─ Exports final list ───────────────────► Box Office receives will-call list
  │
  │  ┌─────────── AUTOMATED CASCADES ──────────┐
  │  │ Submitted names → Credentials module    │  (badges generated)
  │  │ If meals attached → Catering module     │  (meal orders created)
  │  └─────────────────────────────────────────┘
  │
EVENT DAY
  │
  └─ Box Office / Will-Call
         ├─ Guest arrives → name searched
         ├─ Match found → credential issued (from Credentials module)
         └─ No match → admin override (manual add)
```

---

## Key Tension Points to Design For

> [!IMPORTANT]
> **Quota is the control, not approval**: This is the fundamental UX difference. There is no "pending" state for names — once a stakeholder enters a name within their cap, it's instantly confirmed. The only constraint is the numerical limit. The UI must communicate this autonomy clearly.

> [!WARNING]
> **Deadline is a hard wall**: After the deadline, the portal must lock completely — no more edits. But the admin must be able to extend the deadline or make changes on behalf of the stakeholder. The locked state needs a clear "Contact admin" path.

> [!NOTE]
> **Cross-module cascades are invisible to the stakeholder**: When a name is submitted in Guest Lists, it silently creates a Credential record and (if attached) a Catering record. The stakeholder doesn't see this. But the admin must be able to trace the chain: "This guest's VIP badge and dinner came from Guest List allocation #47."

> [!NOTE]
> **No-show data is strategic**: Post-event, knowing that "Artist X used 4 of 8 spots" means you can allocate 5 next year and redistribute the savings. The no-show report directly informs next year's Phase 1.

---

## Stakeholder Portal Mapping

| Stakeholder | Portal | Phases Visible |
|-------------|--------|---------------|
| Agency Admin | Agency Portal (full) | 1 + 2 (management) + 3 + 4 |
| Artist / Talent Manager | Dedicated portal | 2 (self-service name entry) |
| Sponsor / Brand Partner | Dedicated portal | 2 (self-service name entry) |
| Internal Staff | Admin portal (internal groups) | 2 (name entry) |
| Box Office / Will-Call | Will-call search (shared w/ Credentials) | 4 (search + issue only) |
