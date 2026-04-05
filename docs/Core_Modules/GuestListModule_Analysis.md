# Guest Lists Module Analysis & Breakdown

## 1. Module Objectives & Core Philosophy

The **Guest Lists Module** is fundamentally different from the other modules. While Credentials and Catering rely on an "approval/denial" workflow, Guest Lists operates on an **allocation/quota system**.

**Key Objectives:**
- **Tiered Links & Waitlists**: Companies distribute tier-specific registration links. Once caps are reached, registrants automatically flow into a Waitlist. After the deadline, the Agency can allocate leftover global seats to the waitlist in order.
- **Centralized Agency Control**: Companies circulate the links, but they don't have "approval" powers on the platform—the Agency retains full control over the final list and cancellations.
- **Unified Ticketing**: Direct/Premium invites and plus-ones (+1s) share a single barcode/ticket. A +1 adopts the same dietary preferences as the primary ticket holder.
- **Instant eDelivery**: Upon registration, guests immediately receive an email ticket containing a QR code encoded with custom properties (like Session RSVPs). They scan this QR onsite to print their physical badge.
- **Aggregate Insight Syncing**: Dietary and custom needs are collected primarily for aggregate sharing with other modules (e.g., passing total headcounts to Catering) rather than triggering row-by-row individual meal orders.

---

## 2. Tasks by Stakeholder

### A. Agency Admin (Event Organiser)
*The production team running the event.*
* **Tasks**:
  - Define pass tiers and configure registration links for these tiers.
  - Set numerical caps (both global event caps and tier-specific limits).
  - Manage the **Waitlist** after the registration deadline by approving remaining seats.
  - Manually process ticket cancellation requests submitted via email.
  - Create manual tickets with QR codes for directly invited VIPs based on lists provided by companies.
  - Share aggregate dietary data with Catering.

### B. Company / Sponsoring Group
*The external partners bringing guests.*
* **Tasks**:
  - Distribute tier-specific registration links (provided by the Agency) to their internal teams/clients.
  - Compile the list of specially invited VIPs to hand off to the Agency.
  - Email the Agency to request any necessary guest cancellations or data changes, as they lack direct edit/approval access on the platform.

### C. Sponsor / Brand Partner
*Corporate partners with larger guest blocks.*
* **Tasks**:
  - Enter batches of client names.
  - Assign specific pass tiers (if they have a mixed allocation of VIP/GA).
  - Track RSVPs and progress against their total allocation.

### D. Box Office / Will-Call Staff (Onsite)
*The front-line access control team.*
* **Tasks**:
  - Search arriving guests by name.
  - Verify ID and mark the guest as "collected/checked-in".
  - Handle exceptions and call admins for last-minute list additions.

---

## 3. Required Tools & Surfaces

Based on the cross-module tool matrix, the Guest List module requires **15 distinct tools**, spanning 4 phases:

### Phase 1: Configuration Tools (Admin)
1. **Tiered Link Generator**: Create shareable registration links bound to specific pass tiers.
2. **Quota & Waitlist Configurator**: Set global and group-level caps, and configure waitlist fallback logic.
3. **Custom Field Builder**: Define fields (e.g., dietary preferences, registered sessions) to be captured during signup and encoded into the QR code.
4. **Direct Invite Generator**: The admin interface to manually input a VIP's details, set the "+1" checkbox (which duplicates dietary info), and trigger their ticket email.

### Phase 2: Collection Tools (Guest-Facing)
5. **Registration Landing Page**: The public/semi-public form where guests hitting a tiered link enter their details.
6. **Dynamic Waitlist Gate**: Identifies if the tier cap is hit and automatically shunts the registrant to the Waitlist.
7. **Email Dispatcher**: Instantly delivers either the "Ticket Confirmed + QR Code" email or the "Added to Waitlist" email.

### Phase 3: Review & Monitoring Tools (Admin)
8. **Waitlist Resolution Dashboard**: Interface for admins to process the waitlisted users after the deadline if global seats remain.
9. **Cancellation Manager**: Tool to process manual cancellation requests and revoke issued QR codes.
10. **Aggregate Data Exporter**: Dashboard that rolls up dietary preferences and session registrations to share with Catering/Production.

### Phase 4: On-Site Fulfillment Tools
12. **Credential Generation Sync**: Silent integration to fire print jobs to the Credentials module.
13. **Catering Sync**: Silent integration to update headcount in the Catering module.
14. **Will-Call / Pickup Search Engine**: Shared view with Credentials for searching arriving guests.
15. **No-Show Report**: Post-event analytics showing allocation vs. actual attendance to inform next year's planning.
