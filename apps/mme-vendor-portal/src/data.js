// All mock data for the MmE Agency Workspace prototype

export const stageColors = {
    lead: { label: 'Lead', color: '#999999', bg: '#f0f0f0' },
    confirmed: { label: 'Confirmed', color: '#868686ff', bg: '#f0f0f0' },
    planning: { label: 'Planning', color: '#666666', bg: '#ebebeb' },
    'build-up': { label: 'Build-Up', color: '#555555', bg: '#e5e5e5' },
    live: { label: 'Live', color: '#444444', bg: '#e0e0e0' },
    'wrap-up': { label: 'Wrap-Up', color: '#777777', bg: '#ededed' },
    closed: { label: 'Closed', color: '#666666', bg: '#ebebeb' },
};

export const lifecycleEvents = [
    { stage: 'lead', events: ['Tech Forum 20...'] },
    { stage: 'confirmed', events: [] },
    { stage: 'planning', events: ['Infosys Summit'] },
    { stage: 'build-up', events: ['Wipro Retreat'] },
    { stage: 'live', events: [] },
    { stage: 'wrap-up', events: ['TCS Offsite 2024', 'Annual Gala 20...'] },
    { stage: 'closed', events: ['Decathlon Laun...'] },
];

export const activityFeed = [
    { icon: 'chat', text: '3 unread in #inf25-general', tier: null, time: '2m ago' },
    { icon: 'stage', text: 'Stage B submitted by AV Solutions — awaiting review', tier: 'Tier 1', time: '15m ago' },
    { icon: 'broadcast', text: 'Broadcast unacknowledged: 2 vendors', tier: 'Tier 1', time: '32m ago' },
    { icon: 'overdue', text: 'Task overdue: Catering brief — inf25', tier: 'Tier 1', time: '1h ago' },
    { icon: 'member', text: 'New member added to #wip24-ops: Priya Sharma', tier: null, time: '2h ago' },
    { icon: 'event', text: 'TCS Offsite 2024 — wrap-up in progress, 5 tasks remaining', tier: null, time: '3h ago' },
];

export const companyChannels = [
    { name: 'company-general', type: 'Mandatory', locked: true },
    { name: 'company-wins', type: 'Mandatory', locked: false },
    { name: 'company-random', type: 'Mandatory', locked: false },
    { name: 'dept-operations', type: 'Department', locked: false },
    { name: 'dept-production', type: 'Department', locked: false },
    { name: 'resource-templates', type: 'Knowledge', locked: false },
];

export const eventChannels = [
    { name: 'inf25-general', tag: 'INF25', stage: 'Planning', locked: false },
    { name: 'inf25-ops', tag: 'INF25', stage: 'Planning', locked: false },
    { name: 'inf25-alerts', tag: 'INF25', stage: 'Alerts', locked: false, isAlert: true },
    { name: 'wip24-general', tag: 'WIP24', stage: 'Build-Up', locked: false },
    { name: 'gla26-general', tag: 'GLA26', stage: 'Active', locked: false },
    { name: 'tcs24-general', tag: 'TCS24', stage: 'Archived', locked: false, archived: true },
];

export const overviewDMs = [
    { name: 'Sofia Davis', type: '1:1 DM' },
    { name: 'Jackson Lee', type: '1:1 DM' },
    { name: 'Anita Verma', type: 'Client DM' },
    { name: 'Team Standup (5)', type: 'Group DM' },
    { name: 'Saved / Later', type: 'Personal', icon: 'bookmark' },
];

export const sidebarCompany = {
    mandatory: [
        { name: 'company-general', icon: 'megaphone', locked: true },
        { name: 'company-wins', icon: 'hash', locked: false },
        { name: 'company-random', icon: 'circle', locked: false, muted: true },
    ],
    departments: [
        { name: 'dept-operations', locked: false },
        { name: 'dept-production', locked: false },
        { name: 'dept-marketing', locked: false },
        { name: 'dept-finance', locked: true },
        { name: 'dept-logistics', locked: false },
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
            { name: 'inf25-general', unread: 3 },
            { name: 'inf25-ops', unread: 1 },
            { name: 'inf25-production', unread: 0 },
            { name: 'inf25-registration', unread: 0 },
            { name: 'inf25-marketing', unread: 0 },
            { name: 'inf25-finance', unread: 0, locked: true },
            { name: 'inf25-logistics', unread: 0 },
            { name: 'inf25-alerts', unread: 0, isAlert: true },
        ],
    },
];

export const pipelineStages = [
    { key: 'lead', label: 'LEAD', colorName: 'Grey', count: '1 event' },
    { key: 'confirmed', label: 'CONFIRMED', colorName: 'Blue', count: '—' },
    { key: 'planning', label: 'PLANNING', colorName: 'Yellow', count: '1 event' },
    { key: 'build-up', label: 'BUILD-UP', colorName: 'Orange', count: '1 event' },
    { key: 'live', label: 'LIVE', colorName: 'Red', count: '—' },
    { key: 'wrap-up', label: 'WRAP-UP', colorName: 'Purple', count: '—' },
    { key: 'closed', label: 'CLOSED', colorName: 'Green', count: '3 events' },
];

export const activeEvents = [
    {
        id: 'inf25',
        name: 'Infosys Summit 2025',
        stage: 'planning',
        stageLabel: 'Yellow — Planning',
        notifications: 6,
        countdown: 'T-22 days',
        members: 8,
        vendors: 4,
        channels: 8,
        location: 'Bangalore, IN',
    },
    {
        id: 'wip24',
        name: 'Wipro Retreat 2024',
        stage: 'build-up',
        stageLabel: 'Orange — Build-Up',
        notifications: 1,
        countdown: 'T-45 days',
        members: 6,
        vendors: 3,
        channels: 6,
        location: 'Goa, IN',
    },
    {
        id: 'tech26',
        name: 'Tech Forum 2026',
        stage: 'lead',
        stageLabel: 'Grey — Lead',
        notifications: 0,
        countdown: 'T-180 days',
        members: 2,
        vendors: null,
        channels: null,
        location: 'Hyderabad, IN',
    },
];

export const archivedEvents = [
    {
        id: 'tcs24',
        name: 'TCS Offsite 2024',
        stageLabel: 'Green — Closed',
        date: 'Sep 5 – Sep 7, 2024',
        location: 'Jaipur, IN',
        channels: 6,
    },
    {
        id: 'gala24',
        name: 'Annual Gala 2024',
        stageLabel: 'Green — Closed',
        date: 'Dec 15, 2024',
        location: 'Mumbai, IN',
        channels: null,
        archived: true,
    },
    {
        id: 'dec24',
        name: 'Decathlon Launch',
        stageLabel: 'Green — Closed',
        date: 'Oct 8, 2024',
        location: 'Chennai, IN',
        channels: null,
        archived: true,
    },
];

export const dmContacts = [
    {
        initials: 'SD',
        name: 'Sofia Davis',
        role: 'Event Manager',
        org: 'MmE Agency',
        event: 'Infosys Summit 2025',
        lastMessage: 'Can you share the updated venue layout?',
        time: '2m ago',
        unread: 2,
        type: 'internal',
    },
    {
        initials: 'JL',
        name: 'Jackson Lee',
        role: 'AV Technician',
        org: 'MmE Agency',
        event: 'Infosys Summit 2025',
        lastMessage: 'Stage setup confirmed for Hall B',
        time: '15m ago',
        unread: 1,
        type: 'internal',
    },
    {
        initials: 'AV',
        name: 'Anita Verma',
        role: 'Client POC',
        org: 'Infosys Ltd.',
        event: 'Infosys Summit 2025',
        lastMessage: 'Approved the final agenda — looks great!',
        time: '3h ago',
        unread: 0,
        type: 'clients',
    },
    {
        initials: 'TS',
        name: 'Team Standup',
        memberCount: '5 members',
        role: 'Daily sync',
        org: 'MmE Agency',
        event: 'Infosys Summit 2025',
        lastMessage: "Sofia: Let's push the walkthrough to 3pm",
        time: '4h ago',
        unread: 0,
        type: 'internal',
        isGroup: true,
    },
    {
        initials: 'PS',
        name: 'Priya Sharma',
        role: 'Registration Coordinator',
        org: 'MmE Agency',
        event: 'Infosys Summit 2025',
        lastMessage: 'Badge printing starts tomorrow morning',
        time: '1h ago',
        unread: 0,
        type: 'internal',
    },
    {
        initials: 'RM',
        name: 'Rahul Menon',
        role: 'Ops Coordinator',
        org: 'MmE Agency',
        event: 'Annual Gala 2026',
        lastMessage: 'Vendor contracts are ready for review',
        time: '2h ago',
        unread: 0,
        type: 'internal',
        hasUnreadDot: true,
    },
    {
        initials: 'RS',
        name: 'Rahul Sharma',
        role: 'AV Vendor Lead',
        org: 'AV Solutions',
        event: 'Infosys Summit 2025',
        lastMessage: 'Equipment checklist uploaded — stage 3 of 4 complete',
        time: '3h ago',
        unread: 0,
        type: 'vendors',
    },
    {
        initials: 'VP',
        name: 'Vikram Patel',
        role: 'Catering Manager',
        org: 'Tastebud Events',
        event: 'Infosys Summit 2025',
        lastMessage: 'Menu confirmed for 200 pax',
        time: '5h ago',
        unread: 0,
        type: 'vendors',
    },
];

export const chatMessages = [
    {
        initials: 'SD',
        name: 'Sofia Davis',
        time: '9:15 AM',
        lines: 3,
        replies: 3,
    },
    {
        initials: 'JL',
        name: 'Jackson Lee',
        time: '9:32 AM',
        lines: 4,
        replies: 0,
    },
    {
        type: 'system',
        text: 'System notification placeholder',
    },
    {
        initials: 'AM',
        name: 'Alex Morgan',
        time: '10:15 AM',
        lines: 2,
        replies: 0,
    },
    {
        initials: 'JD',
        name: 'Jane Doe',
        time: '10:45 AM',
        lines: 4,
        replies: 0,
    },
];

export const vendorSidebar = {
    internal: [
        { name: 'vendor-general' },
        { name: 'vendor-ops' },
        { name: 'vendor-random' },
    ],
    events: [
        {
            name: 'Infosys Summit',
            stage: 'planning',
            stageLabel: 'Yellow',
            notifications: 2,
            channels: [{ name: 'inf25-vendor-avsolutions' }],
        },
        {
            name: 'Wipro Retreat',
            stage: 'build-up',
            stageLabel: 'Orange',
            notifications: 0,
            channels: [{ name: 'wipro-vendor-avsolutions' }],
        },
    ],
    dms: [
        { name: 'Priya Mehta', role: 'Ops Lead', unread: 1 },
        { name: 'Sofia Davis', role: 'Event Manager', unread: 0 },
        { name: 'Ravi Kumar', role: 'AV Tech (Internal)', unread: 0 },
    ],
};

export const vendorTasks = [
    { name: 'Equipment checklist', status: 'Stage 3/4', date: 'Apr 5 — 9 days left', icon: 'warning' },
    { name: 'Load-in confirmation', status: 'Not started', date: 'Apr 10', icon: 'circle' },
    { name: 'Stage A: Tech specs', status: 'Complete', date: null, icon: 'check' },
    { name: 'Stage B: Equipment', status: 'Complete', date: null, icon: 'check' },
];

export const vendorActivity = [
    { icon: 'chat', text: 'New message from Priya in #inf25-vendor-avsolutions', time: '5m ago' },
    { icon: 'broadcast', text: 'Broadcast: Load-in rescheduled [Acknowledge ✓]', time: '1h ago' },
    { icon: 'check', text: 'Stage B auto-marked complete ✓', time: '2h ago' },
    { icon: 'pin', text: 'Brief updated: Technical brief v3 pinned', time: '1d ago' },
];
