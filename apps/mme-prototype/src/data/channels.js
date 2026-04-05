// Channels domain — company channels, event channels, sidebar data, channel metadata

export const activityFeed = [
    { icon: 'chat',      text: '3 unread in #inf25-general',                               tier: null,    time: '2m ago' },
    { icon: 'stage',     text: 'Stage B submitted by AV Solutions — awaiting review',       tier: 'Tier 1', time: '15m ago' },
    { icon: 'broadcast', text: 'Broadcast unacknowledged: 2 vendors',                       tier: 'Tier 1', time: '32m ago' },
    { icon: 'overdue',   text: 'Task overdue: Catering brief — inf25',                      tier: 'Tier 1', time: '1h ago' },
    { icon: 'member',    text: 'New member added to #wip24-ops: Priya Sharma',              tier: null,    time: '2h ago' },
    { icon: 'event',     text: 'TCS Offsite 2024 — wrap-up in progress, 5 tasks remaining', tier: null,    time: '3h ago' },
];

export const companyChannels = [
    { name: 'company-general',   type: 'Mandatory',  locked: true },
    { name: 'company-wins',      type: 'Mandatory',  locked: false },
    { name: 'company-random',    type: 'Mandatory',  locked: false },
    { name: 'dept-operations',   type: 'Department', locked: false },
    { name: 'dept-production',   type: 'Department', locked: false },
    { name: 'resource-templates',type: 'Knowledge',  locked: false },
];

export const eventChannels = [
    { name: 'inf25-general',  tag: 'INF25', stage: 'Planning',  locked: false },
    { name: 'inf25-ops',      tag: 'INF25', stage: 'Planning',  locked: false },
    { name: 'inf25-alerts',   tag: 'INF25', stage: 'Alerts',    locked: false, isAlert: true },
    { name: 'wip24-general',  tag: 'WIP24', stage: 'Build-Up',  locked: false },
    { name: 'gla26-general',  tag: 'GLA26', stage: 'Active',    locked: false },
    { name: 'tcs24-general',  tag: 'TCS24', stage: 'Archived',  locked: false, archived: true },
];

export const overviewDMs = [
    { name: 'Sofia Davis',       type: '1:1 DM' },
    { name: 'Jackson Lee',       type: '1:1 DM' },
    { name: 'Anita Verma',       type: 'Client DM' },
    { name: 'Team Standup (5)',  type: 'Group DM' },
    { name: 'Saved / Later',     type: 'Personal', icon: 'bookmark' },
];

export const sidebarCompany = {
    mandatory: [
        { name: 'company-general', icon: 'megaphone', locked: true },
        { name: 'company-wins',    icon: 'hash',      locked: false },
        { name: 'company-random',  icon: 'circle',    locked: false, muted: true },
    ],
    departments: [
        { name: 'dept-operations',   locked: false },
        { name: 'dept-production',   locked: false },
        { name: 'dept-marketing',    locked: false },
        { name: 'dept-finance',      locked: true },
        { name: 'dept-logistics',    locked: false },
        { name: 'dept-registration', locked: false },
    ],
};

export const sidebarEvents = [
    {
        name: 'Infosys Summit',
        stage: 'planning',
        stageLabel: 'Yellow',
        notifications: 3,
        channels: [
            { name: 'inf25-general',      unread: 3 },
            { name: 'inf25-ops',          unread: 1 },
            { name: 'inf25-production',   unread: 0 },
            { name: 'inf25-registration', unread: 0 },
            { name: 'inf25-marketing',    unread: 0 },
            { name: 'inf25-finance',      unread: 0, locked: true },
            { name: 'inf25-logistics',    unread: 0 },
            { name: 'inf25-alerts',       unread: 0, isAlert: true },
        ],
    },
    {
        name: 'Wipro Retreat',
        stage: 'build-up',
        stageLabel: 'Orange',
        notifications: 1,
        channels: [
            { name: 'wip24-general',   unread: 1 },
            { name: 'wip24-ops',       unread: 0 },
            { name: 'wip24-logistics', unread: 0 },
            { name: 'wip24-catering',  unread: 0 },
            { name: 'wip24-finance',   unread: 0, locked: true },
            { name: 'wip24-alerts',    unread: 0, isAlert: true },
        ],
    },
    {
        name: 'Tech Forum 2026',
        stage: 'lead',
        stageLabel: 'Grey',
        notifications: 0,
        channels: [
            { name: 'tech26-general', unread: 0 },
        ],
    },
];

// Per-channel metadata used by the right sidebar Overview tab
export const channelMeta = {
    'inf25-general': {
        channelId:       'inf25-general',
        displayName:     'inf25-general',
        eventId:         'inf25',
        groupName:       'Infosys Summit 2025',
        companyName:     'Infosys Ltd.',
        createdDate:     'Mar 10, 2025',
        stage:           'planning',
        stageLabel:      'Yellow — Planning',
        pinnedBroadcast: 'Load-in rescheduled to Apr 13 6:00 AM — all vendors notified.',
        tasksSummary:    { total: 12, completed: 5, overdue: 2 },
        formsStatus:     { distributed: 3, submitted: 7, pending: 2 },
        members: [
            { initials: 'SD', name: 'Sofia Davis',   role: 'Event Manager' },
            { initials: 'JL', name: 'Jackson Lee',   role: 'AV Technician' },
            { initials: 'PS', name: 'Priya Sharma',  role: 'Reg. Coordinator' },
            { initials: 'RM', name: 'Rahul Menon',   role: 'Ops Coordinator' },
            { initials: 'JD', name: 'Jane Doe',      role: 'Ops Coordinator' },
            { initials: 'AV', name: 'Anita Verma',   role: 'Client POC (External)' },
            { initials: 'RS', name: 'Rahul Sharma',  role: 'AV Lead (Vendor)' },
            { initials: 'VP', name: 'Vikram Patel',  role: 'Catering Mgr (Vendor)' },
        ],
        pinnedDocs: [
            { name: 'Venue layout v2.pdf',      type: 'pdf',  pinnedBy: 'Jane Doe',    date: 'Mar 28' },
            { name: 'Technical brief v3.docx',  type: 'doc',  pinnedBy: 'Sofia Davis', date: 'Mar 22' },
            { name: 'Guest list master.xlsx',   type: 'xls',  pinnedBy: 'Priya Sharma',date: 'Mar 15' },
        ],
        forms: [
            { name: 'AV Equipment Checklist', status: 'Stage 3/4', distributed: 'Mar 12' },
            { name: 'Catering Brief',          status: 'Pending',   distributed: 'Mar 18' },
            { name: 'Vendor NDA',              status: 'Signed',    distributed: 'Mar 8' },
        ],
    },
    'inf25-ops': {
        channelId:       'inf25-ops',
        displayName:     'inf25-ops',
        eventId:         'inf25',
        groupName:       'Infosys Summit 2025',
        companyName:     'Infosys Ltd.',
        createdDate:     'Mar 10, 2025',
        stage:           'planning',
        stageLabel:      'Yellow — Planning',
        pinnedBroadcast: null,
        tasksSummary:    { total: 8, completed: 3, overdue: 1 },
        formsStatus:     { distributed: 1, submitted: 2, pending: 1 },
        members: [
            { initials: 'SD', name: 'Sofia Davis',  role: 'Event Manager' },
            { initials: 'RM', name: 'Rahul Menon',  role: 'Ops Coordinator' },
            { initials: 'JD', name: 'Jane Doe',     role: 'Ops Coordinator' },
            { initials: 'JL', name: 'Jackson Lee',  role: 'AV Technician' },
            { initials: 'RS', name: 'Rahul Sharma', role: 'AV Lead (Vendor)' },
            { initials: 'VP', name: 'Vikram Patel', role: 'Catering Mgr (Vendor)' },
        ],
        pinnedDocs: [
            { name: 'Run-of-show v4.pdf', type: 'pdf', pinnedBy: 'Sofia Davis', date: 'Mar 30' },
            { name: 'Vendor contacts.xlsx', type: 'xls', pinnedBy: 'Rahul Menon', date: 'Mar 20' },
        ],
        forms: [
            { name: 'Load-in Schedule Confirmation', status: 'Pending', distributed: 'Mar 25' },
        ],
    },
    'inf25-production': {
        channelId:    'inf25-production',
        displayName:  'inf25-production',
        eventId:      'inf25',
        groupName:    'Infosys Summit 2025',
        companyName:  'Infosys Ltd.',
        createdDate:  'Mar 10, 2025',
        stage:        'planning',
        stageLabel:   'Yellow — Planning',
        pinnedBroadcast: null,
        tasksSummary: { total: 6, completed: 2, overdue: 0 },
        formsStatus:  { distributed: 2, submitted: 3, pending: 0 },
        members: [
            { initials: 'JL', name: 'Jackson Lee',  role: 'AV Technician' },
            { initials: 'SD', name: 'Sofia Davis',  role: 'Event Manager' },
            { initials: 'RM', name: 'Rahul Menon',  role: 'Ops Coordinator' },
            { initials: 'RS', name: 'Rahul Sharma', role: 'AV Lead (Vendor)' },
            { initials: 'JD', name: 'Jane Doe',     role: 'Ops Coordinator' },
        ],
        pinnedDocs: [
            { name: 'Stage layout.pdf', type: 'pdf', pinnedBy: 'Jackson Lee', date: 'Mar 18' },
        ],
        forms: [
            { name: 'Stage A: Tech Specs', status: 'Complete',   distributed: 'Mar 5' },
            { name: 'Stage B: Equipment',  status: 'Stage 3/4',  distributed: 'Mar 12' },
        ],
    },
    'inf25-registration': {
        channelId:    'inf25-registration',
        displayName:  'inf25-registration',
        eventId:      'inf25',
        groupName:    'Infosys Summit 2025',
        companyName:  'Infosys Ltd.',
        createdDate:  'Mar 10, 2025',
        stage:        'planning',
        stageLabel:   'Yellow — Planning',
        pinnedBroadcast: null,
        tasksSummary: { total: 5, completed: 3, overdue: 0 },
        formsStatus:  { distributed: 2, submitted: 5, pending: 1 },
        members: [
            { initials: 'PS', name: 'Priya Sharma', role: 'Reg. Coordinator' },
            { initials: 'JD', name: 'Jane Doe',     role: 'Ops Coordinator' },
            { initials: 'SD', name: 'Sofia Davis',  role: 'Event Manager' },
            { initials: 'AV', name: 'Anita Verma',  role: 'Client POC (External)' },
        ],
        pinnedDocs: [
            { name: 'Guest list master.xlsx',  type: 'xls', pinnedBy: 'Priya Sharma', date: 'Mar 15' },
            { name: 'Badge template v2.ai',    type: 'ai',  pinnedBy: 'Priya Sharma', date: 'Mar 21' },
        ],
        forms: [
            { name: 'Attendee Registration Form', status: 'Active',   distributed: 'Mar 10' },
            { name: 'Badge Data Collection',      status: 'Signed',   distributed: 'Mar 14' },
        ],
    },
    'company-general': {
        channelId:    'company-general',
        displayName:  'company-general',
        eventId:      null,
        groupName:    'MmE Agency',
        companyName:  'MmE Agency',
        createdDate:  'Jan 1, 2024',
        stage:        null,
        stageLabel:   null,
        pinnedBroadcast: 'Q2 all-hands scheduled for May 2 — attendance mandatory.',
        tasksSummary: { total: 0, completed: 0, overdue: 0 },
        formsStatus:  { distributed: 0, submitted: 0, pending: 0 },
        members: [
            { initials: 'SD', name: 'Sofia Davis',  role: 'Event Manager' },
            { initials: 'JL', name: 'Jackson Lee',  role: 'AV Technician' },
            { initials: 'PS', name: 'Priya Sharma', role: 'Reg. Coordinator' },
            { initials: 'RM', name: 'Rahul Menon',  role: 'Ops Coordinator' },
            { initials: 'JD', name: 'Jane Doe',     role: 'Ops Coordinator' },
        ],
        pinnedDocs: [
            { name: 'MmE Employee Handbook.pdf', type: 'pdf', pinnedBy: 'Admin', date: 'Jan 1' },
        ],
        forms: [],
    },
    'dept-operations': {
        channelId:    'dept-operations',
        displayName:  'dept-operations',
        eventId:      null,
        groupName:    'MmE Agency — Operations',
        companyName:  'MmE Agency',
        createdDate:  'Jan 1, 2024',
        stage:        null,
        stageLabel:   null,
        pinnedBroadcast: null,
        tasksSummary: { total: 4, completed: 2, overdue: 1 },
        formsStatus:  { distributed: 1, submitted: 1, pending: 0 },
        members: [
            { initials: 'SD', name: 'Sofia Davis', role: 'Event Manager' },
            { initials: 'RM', name: 'Rahul Menon', role: 'Ops Coordinator' },
            { initials: 'JD', name: 'Jane Doe',    role: 'Ops Coordinator' },
        ],
        pinnedDocs: [],
        forms: [],
    },
};
