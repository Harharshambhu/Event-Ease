# Guest Lists Module — Element Analysis & UI Requirements

> **Source**: `docs/Core_Modules/lennd_guest_lists_module_product_breakdown.html`
> **Module**: Module 4 — Guest Lists (allocation, self-management & fulfillment)
> **Phases**: Allocation Setup → Name Submission → Management & Reporting → Fulfillment & Onsite

---

## Module Summary

Guest Lists is a **4-phase allocation module** that is **fundamentally different** from the other three modules. The admin doesn't collect requests and approve them. Instead, the admin **pre-sets a quota** ("Artist X gets 8 guest passes") and the stakeholder **fills in names within that limit**. The control lever is the cap, not the approval.

**Key distinction**: This is the only module where the stakeholder has near-total autonomy — they manage their own list end-to-end (add, edit, remove, swap names) without requiring admin approval for each change. Admin only intervenes for quota adjustments or deadline extensions.

**Cross-module integration**: Guest Lists feeds directly into both Credentials (names → badges) and Catering (names → meals, if meal allocations are attached).

This module spans **two user contexts**:
- **Admin (Agency)**: Sets quotas, monitors completion, exports for box office
- **Stakeholder (Artist/Sponsor/Group)**: Self-manages names within their quota

---

## Phase 1 — Allocation Setup *(Admin)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 1 | **Pass type definitions** | Which credential types are available for guest lists (GA, VIP, backstage, meet-and-greet) | Type selector pulling from Credentials module types |
| 2 | **Meal allocations** | Optionally attach meals to guest spots; auto-creates in Catering module | Toggle per pass type: "Include meal: [meal type dropdown]" |
| 3 | **Group-level quotas** | How many spots each group gets, per pass type | Per-group allocation table: `[group name] [GA: qty] [VIP: qty]` |
| 4 | **Unique allocation groups** | Custom segmentation beyond standard group types (headliner guests, sponsor table, contest winners) | Group creation modal with custom name + quota fields |

### Phase 1 UI Requirements
- **Pass Type Selector**: Multi-select pulling from existing Credentials types. Toggle to include/exclude specific types for guest lists.
- **Meal Attachment Config**: Per pass type — toggle "Attach meal" → dropdown for meal type (pulling from Catering module). Visual indicator showing cross-module link.
- **Group Quota Table**: The core config view — `[group name] [pass type 1: qty input] [pass type 2: qty input] ... [total allocated]`. Inline editing. Totals row at bottom.
- **Custom Group Creator**: Modal — `[group name] [pass type → qty] [add pass type] [create]`. Appears in the same quota table alongside standard groups.

---

## Phase 2 — Name Submission *(Stakeholders, self-service)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 5 | **Portal guest list view** | Stakeholder sees their allocation with progress | Progress bar: `5 of 8 GA submitted, 1 of 2 VIP submitted` |
| 6 | **Name entry** | Add/edit/remove guest names; portal enforces cap | Inline add row; edit/delete per row; cap enforcement |
| 7 | **Deadline enforcement** | Configurable close date; portal locks after deadline | Countdown banner; locked state after expiry |
| 8 | **Guest self-sufficiency** | Full self-management within cap; admin only for exceptions | No approval needed; instant submit |

### Phase 2 UI Requirements
- **Allocation Overview (Portal)**: Progress card per pass type — `[type name] [progress bar: X of Y] [add name CTA]`. Deadline countdown banner at top.
- **Guest Name Table**: Editable roster — `[name] [contact / email] [pass type] [plus-one toggle] [edit] [delete]`. "Add Guest" row at bottom. Greyed out / locked when cap reached.
- **Deadline Banner**: Prominent bar — `Submission closes: [date] ([X days remaining])`. After deadline: locked state with "Contact admin for changes" message.
- **Instant Feedback**: No approval queue for names — submitting a name immediately confirms it. Counter updates in real time: `6 of 8`.

---

## Phase 3 — Management & Reporting *(Admin)*

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 9 | **Completion tracking** | Per-group: allocated vs. submitted vs. remaining; flag overdue | Progress dashboard: per-group row with completion bar |
| 10 | **Aggregate guest count** | Total across all groups, broken down by pass type and allocation group | Summary counters at top; drill-down by group |
| 11 | **Export for box office** | CSV/Excel with names, pass types, group, barcode | Export button; formatted for will-call system |
| 12 | **Quota adjustment** | Admin increases/decreases group allocation post-setup | Inline edit on quota table; audit log of changes |

### Phase 3 UI Requirements
- **Completion Dashboard**: Per-group row — `[group name] [allocated: X] [submitted: Y] [remaining: Z] [progress bar] [status: Complete / Partial / Empty / Overdue]`. Sortable by status. Warning highlight for overdue groups.
- **Aggregate Counter Panel**: Top-level cards — `[Total Allocated: X] [Names Submitted: Y] [Remaining: Z]`. Broken down by pass type below (GA: X/Y, VIP: X/Y).
- **Box Office Export**: One-click export — generates CSV with columns: `Name | Pass Type | Group | Barcode | Meal (if attached)`. Formatted for will-call scanning.
- **Quota Adjustment**: Click group row → inline edit quota numbers → save. Change logged with timestamp and admin name.

---

## Phase 4 — Fulfillment & Onsite

| # | Element | Description | Key UI Requirement |
|---|---------|-------------|-------------------|
| 13 | **Credential generation** | Guest names flow into Credentials module; badges generated with correct access level | Automated cascade — no unique UI; visible in Credentials print queue |
| 14 | **Catering sync** | If meals attached, guests auto-appear in Catering module | Automated cascade — no unique UI; visible in Catering dashboard |
| 15 | **Will-call / pickup** | Guest arrives, name searched/scanned, credential issued | Will-call search: `[name input] → [match result] → [issue badge CTA]` |
| 16 | **No-show tracking** | Post-event: unused allocations and uncollected credentials | Summary: `[group] [allocated: X] [showed: Y] [no-show: Z]` |

### Phase 4 UI Requirements
- **Credential & Catering Sync**: No dedicated UI — Phase 4 operates through the Credentials and Catering modules' existing Phase 4 views. The Guest Lists module's job is done once names flow downstream.
- **Will-Call Search**: Shared with Credentials will-call — search/scan, match to guest list entry, issue credential. Status updates to "Collected".
- **No-Show Report**: Post-event view — per-group: `[group] [allocated] [arrived] [no-show count] [utilisation %]`. Used for next year's quota optimisation.

---

## Cross-Cutting UI Components

| Component | Use Case |
|-----------|----------|
| **Quota Progress Bar** | Shows X of Y allocated per pass type; used in portal view, admin completion dashboard |
| **Guest Name Row** | Editable row: name + contact + pass type + actions; used in portal and admin override |
| **Deadline Banner** | Countdown + locked state; used in portal view |
| **Completion Status Card** | Per-group progress with status pill; used in admin dashboard |
| **Aggregate Counter** | Top-level total / submitted / remaining cards; admin management view |

---

## Shared Patterns with Other Modules

| Pattern | Credentials | Catering | Assets | Guest Lists |
|---------|-------------|----------|--------|-------------|
| Item Blocks / Quotas | ✓ (blocks) | ✓ (blocks) | ✓ (blocks) | ✓ (quotas — allocation model) |
| Approval Queue | ✓ | ✓ | ✓ | ✗ (no approval — quota-based) |
| Portal self-service | ✓ (submit names) | ✓ (submit counts) | ✓ (submit requests) | ✓ (manage names autonomously) |
| Deadline enforcement | ✗ (implicit) | ✗ (implicit) | ✗ (implicit) | ✓ (explicit, hard lock) |
| Credential generation | Source module | ✗ | ✗ | ✓ (feeds into Credentials) |
| Catering sync | ✗ | Source module | ✗ | ✓ (feeds into Catering) |
| Completion tracking | ✓ (status reports) | ✓ (status dashboard) | ✓ (allocation dashboard) | ✓ (completion dashboard) |
| Export for operations | ✓ (badge print) | ✓ (caterer CSV) | ✓ (ops manifest) | ✓ (box office will-call) |

> [!IMPORTANT]
> **Guest Lists is a feeder module**: It doesn't live in isolation. Submitted guest names cascade into Credentials (for badge printing) and Catering (for meal generation). The UI must make these cross-module links visible — e.g., "This guest will also receive: VIP Badge + Dinner".

> [!NOTE]
> **No approval queue**: This is the simplest admin workload of all 4 modules. The admin's job is setup (quotas) and monitoring (completion tracking). The stakeholder does the heavy lifting. Design should emphasize the monitoring dashboard over any review workflow.
