# Credentials Module — Stakeholder Breakdown & User Flows

---

## Who Are the Stakeholders?

There are **5 distinct parties** interacting with this module, each experiencing it from a different angle.

---

### 1. 🏢 Agency Admin (Event Organiser)
**Who**: The production company or event management team running the event (MmE).

**Core Relationship**: Owns the entire credentials system. Sets it up, controls all approvals, runs onsite logistics.

**System Access**: Full Agency Portal — all 4 phases.

---

### 2. 🏭 Vendor / Supplier Group
**Who**: External companies providing services — AV, catering, staging, security, etc.

**Core Relationship**: Submits personnel who need credentials to operate onsite. Wants passes for their crew.

**System Access**: Vendor Portal (tunnelled view) — Phase 2 + Phase 4 status visibility only.

---

### 3. 🎤 Artist / Talent Group
**Who**: Performers, bands, speakers, and their management teams.

**Core Relationship**: Needs All-Access or Backstage passes for artists, band members, tour managers, merch crews, etc.

**System Access**: Dedicated Portal form — Phase 2 only (name submission + credential type selection).

---

### 4. 📸 Media / Press Group
**Who**: Journalists, photographers, broadcasters.

**Core Relationship**: Submits accreditation requests. Often subject to tighter approval criteria than vendors.

**System Access**: Standalone form (public URL) or dedicated portal — Phase 2 only.

---

### 5. 🛡️ Security / Gate Staff (Onsite Operator)
**Who**: The security team physically scanning credentials at access points.

**Core Relationship**: Does not configure or submit — they *verify* at the point of entry.

**System Access**: Check-in App only — Phase 4 operational view.

---

## Stakeholder Activity Through the Event Lifecycle

```
PRE-EVENT ──────────────────────────────────────────────────► EVENT DAY
Config     Collection      Review        Issuance         Onsite
(Weeks out) (Weeks/Days out) (Days out)   (Day before)    (Live)
```

---

### 1. Agency Admin Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-6 weeks** | Create credential types (VIP, Vendor, Media, Artist…) | Agency Portal / Config |
| **T-6 weeks** | Design badge templates per type | Badge Template Editor |
| **T-6 weeks** | Set up approval workflows per group | Workflow Builder |
| **T-5 weeks** | Create item blocks — what each group can request | Item Block Manager |
| **T-5 weeks** | Set up barcode/RFID pools, import from partner | Barcode Pool Manager |
| **T-4 weeks** | Open collection portals / send form links to groups | Portal Config |
| **T-4 weeks → T-1 week** | Monitor which groups have submitted via Status Dashboard | Status Reports |
| **T-4 weeks → T-1 week** | Send automated reminders to overdue groups | Reminder Rules |
| **T-2 weeks → T-3 days** | Review submissions in Approval Queue (approve / deny / request changes) | Approval Queue |
| **T-3 days** | Barcode auto-assigned on approval | System automation |
| **T-1 day** | Run print queue — print all approved badges | Print Queue |
| **Event Day** | Monitor pickup tracking at will-call | Pickup Tracker |
| **Event Day** | Manage walk-in additions / manual credential adds | Single Add / Override |
| **Post-event** | Review who checked in vs. issued | Reporting View |

---

### 2. Vendor / Supplier Group Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-4 weeks** | Receives portal invite / form link from Admin | Email notification |
| **T-4 weeks** | Submits high-level count: "We need 12 vendor passes, 3 backstage" | Count Request Form |
| **T-3 weeks** | Returns to portal to enter individual names + roles | Personnel Roster (portal) |
| **T-3 weeks → T-10 days** | Edits/removes names as crew finalises | Roster Edit |
| **T-3 days+** | Receives approval/denial status updates in portal | Portal Status View |
| **Event Day** | Team collects printed badges at will-call | Physical |
| **Event Day** | Views portal to confirm each person's issuance status | Portal Status Panel |

---

### 3. Artist / Talent Group Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-3 weeks** | Tour manager receives form link | Email / direct URL |
| **T-3 weeks** | Fills out artist roster — name, role (artist / crew / merch), credential type | Personnel Submission Form |
| **T-2 weeks** | May make edits as artist lineup changes | Form edit access |
| **T-3 days+** | Hears back from admin if requests approved / denied | Email notification |
| **Event Day** | Collects artist laminates / wristbands at artist entrance | Physical |

---

### 4. Media / Press Group Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **T-3 weeks** | Journalist fills out public accreditation form | Standalone Form (no login) |
| **Submission** | Provides name, outlet, credential type needed, photo upload | Public Form |
| **T-2 weeks** | Admin reviews — media often has stricter approval criteria | Approval Queue |
| **T-1 week** | Gets email: approved/denied + credential type granted | Email notification |
| **Event Day** | Collects press badge with media lanyard at press desk | Physical |
| **Onsite** | Scanned at restricted areas (press pit, backstage access) | Check-in App |

---

### 5. Security / Gate Staff Timeline

| Stage | Activity | Tool |
|-------|----------|------|
| **Pre-event brief** | Receives access level guide (what each badge type permits) | Printed reference / app |
| **Event Day** | Scans barcode or RFID at entry gates | Check-in App |
| **Event Day** | App shows: person name + access tier + APPROVED or DENIED | Check-in App result |
| **Event Day** | Logs timestamp of entry | Automatic |
| **Event Day** | Flags issues — wrong zone, revoked credential | Override feature |

---

## User Flow Map (Cross-Stakeholder)

```
ADMIN                          VENDOR / ARTIST / MEDIA
  │                                      │
  ├─ Creates Types & Templates           │
  ├─ Builds Approval Workflow            │
  ├─ Creates Item Blocks ──────────────► │ Sees available credential types in portal
  ├─ Opens Collection Portal ──────────► │ Receives invite / form link
  │                                      │
  │                                      ├─ Submits headcount (Phase 2a)
  │                                      ├─ Submits roster: names + roles (Phase 2b)
  │                                      └─ Can edit until deadline
  │
  ├─ Monitors Status Dashboard (who is overdue?)
  ├─ Automated reminders fire ────────► Group gets email nudge
  │
  ├─ Reviews Approval Queue
  │    ├─ Approve ──── barcode auto-assigned ──► Credential is issuance-ready
  │    ├─ Deny ──────────────────────────────► Group notified in portal
  │    └─ Request Changes ─────────────────► Group edits & resubmits
  │
  ├─ Runs Print Queue (T-1 day)
  │
EVENT DAY
  │
  ├─ Will-Call: Pickup Tracker marks badge collected
  ├─ Walk-ins: Admin adds credentials manually
  │
  └─ Security Gate ─── Scans badge ──► Check-in App validates instantly
                                           ✓ Approved: name + zone shown
                                           ✗ Denied: reason shown
```

---

## Key Tension Points to Design For

> [!IMPORTANT]
> **Deadline pressure**: Vendors submit late. The system needs to make overdue states very visible to admins — not buried in settings.

> [!WARNING]
> **Two-phase collection**: Stakeholders submit a headcount first, then names later. The UI must clearly communicate "you've done Phase 1 but not Phase 2" without confusing them.

> [!NOTE]
> **Walk-in exception flow**: On event day, admin needs a quick "Add credential on the fly" path that bypasses the full workflow. Important because this will be used under stress.

> [!NOTE]
> **Security is a read-only consumer**: Gate staff never touch the admin portal. Their mobile check-in view is a completely separate, high-contrast, simplified UI optimized for speed in noisy environments.

---

## Stakeholder Portal Mapping

| Stakeholder | Portal |Phases Visible |
|-------------|--------|---------------|
| Agency Admin | Agency Portal (full) | 1 + 2 (management) + 3 + 4 |
| Vendor / Supplier | Vendor Portal (tunnelled) | 2 (submission) + 4 (status only) |
| Artist / Talent | Standalone form or basic portal | 2 (submission only) |
| Media / Press | Standalone public form | 2 (submission only) |
| Security Staff | Check-in App (separate screen) | 4 (scan + verify only) |
