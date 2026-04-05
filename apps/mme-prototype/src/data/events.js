// Events domain — stage colors, pipeline, lifecycle, active/archived events, event channel clusters

export const stageColors = {
    lead:       { label: 'Lead',      color: '#94a3b8', bg: '#f1f5f9' },
    confirmed:  { label: 'Confirmed', color: '#3b82f6', bg: '#eff6ff' },
    planning:   { label: 'Planning',  color: '#f59e0b', bg: '#fffbeb' },
    'build-up': { label: 'Build-Up',  color: '#f97316', bg: '#fff7ed' },
    live:       { label: 'Live',      color: '#ef4444', bg: '#fef2f2' },
    'wrap-up':  { label: 'Wrap-Up',   color: '#8b5cf6', bg: '#f5f3ff' },
    closed:     { label: 'Closed',    color: '#22c55e', bg: '#f0fdf4' },
};

export const lifecycleEvents = [
    { stage: 'lead',      events: ['Tech Forum 20...'] },
    { stage: 'confirmed', events: [] },
    { stage: 'planning',  events: ['Infosys Summit'] },
    { stage: 'build-up',  events: ['Wipro Retreat'] },
    { stage: 'live',      events: [] },
    { stage: 'wrap-up',   events: ['TCS Offsite 2024', 'Annual Gala 20...'] },
    { stage: 'closed',    events: ['Decathlon Laun...'] },
];

export const pipelineStages = [
    { key: 'lead',      label: 'LEAD',      colorName: 'Grey',   count: '1 event' },
    { key: 'confirmed', label: 'CONFIRMED', colorName: 'Blue',   count: '—' },
    { key: 'planning',  label: 'PLANNING',  colorName: 'Yellow', count: '1 event' },
    { key: 'build-up',  label: 'BUILD-UP',  colorName: 'Orange', count: '1 event' },
    { key: 'live',      label: 'LIVE',      colorName: 'Red',    count: '—' },
    { key: 'wrap-up',   label: 'WRAP-UP',   colorName: 'Purple', count: '—' },
    { key: 'closed',    label: 'CLOSED',    colorName: 'Green',  count: '3 events' },
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
        client: 'Infosys Ltd.',
        clientEmail: 'events@infosys.com',
        date: 'Apr 25, 2025',
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
        client: 'Wipro Technologies',
        clientEmail: 'offsites@wipro.com',
        date: 'May 15, 2025',
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
        client: 'Tech Forum Org.',
        clientEmail: 'contact@techforum.in',
        date: 'Sep 10, 2026',
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

// Per-event channel clusters — used by EventDashboard
export const eventChannelClusters = {
    inf25: {
        eventId: 'inf25',
        eventName: 'Infosys Summit 2025',
        channels: [
            { id: 'inf25-general',      name: 'inf25-general',      role: 'General',      stage: 'planning', members: 8, unread: 3 },
            { id: 'inf25-ops',          name: 'inf25-ops',          role: 'Operations',   stage: 'planning', members: 6, unread: 1 },
            { id: 'inf25-production',   name: 'inf25-production',   role: 'Production',   stage: 'planning', members: 5, unread: 0 },
            { id: 'inf25-registration', name: 'inf25-registration', role: 'Registration', stage: 'planning', members: 4, unread: 0 },
            { id: 'inf25-marketing',    name: 'inf25-marketing',    role: 'Marketing',    stage: 'planning', members: 3, unread: 0 },
            { id: 'inf25-finance',      name: 'inf25-finance',      role: 'Finance',      stage: 'planning', members: 3, unread: 0, locked: true },
            { id: 'inf25-logistics',    name: 'inf25-logistics',    role: 'Logistics',    stage: 'planning', members: 4, unread: 0 },
            { id: 'inf25-alerts',       name: 'inf25-alerts',       role: 'Alerts',       stage: 'planning', members: 8, unread: 0, isAlert: true },
        ],
    },
    wip24: {
        eventId: 'wip24',
        eventName: 'Wipro Retreat 2024',
        channels: [
            { id: 'wip24-general',    name: 'wip24-general',    role: 'General',    stage: 'build-up', members: 6, unread: 1 },
            { id: 'wip24-ops',        name: 'wip24-ops',        role: 'Operations', stage: 'build-up', members: 5, unread: 0 },
            { id: 'wip24-logistics',  name: 'wip24-logistics',  role: 'Logistics',  stage: 'build-up', members: 4, unread: 0 },
            { id: 'wip24-catering',   name: 'wip24-catering',   role: 'Catering',   stage: 'build-up', members: 3, unread: 0 },
            { id: 'wip24-finance',    name: 'wip24-finance',    role: 'Finance',    stage: 'build-up', members: 2, unread: 0, locked: true },
            { id: 'wip24-alerts',     name: 'wip24-alerts',     role: 'Alerts',     stage: 'build-up', members: 6, unread: 0, isAlert: true },
        ],
    },
    tech26: {
        eventId: 'tech26',
        eventName: 'Tech Forum 2026',
        channels: [
            { id: 'tech26-general', name: 'tech26-general', role: 'General', stage: 'lead', members: 2, unread: 0 },
        ],
    },
};

// Module widget summary data per event — used by EventDashboard widgets
export const eventModuleSummary = {
    inf25: {
        guestList:   { registered: 142, capacity: 200, pending: 3 },
        credentials: { vendors: 4, stagesComplete: '3/4', pendingAction: 'Load-in confirmation' },
        catering:    { pax: 200, dietary: 12, status: 'Brief signed off' },
        assets:      { total: 8, assigned: 2, inStorage: 6 },
        forms:       { active: 3, submitted: 7, pending: 2 },
    },
    wip24: {
        guestList:   { registered: 88, capacity: 120, pending: 5 },
        credentials: { vendors: 3, stagesComplete: '2/4', pendingAction: 'Equipment checklist' },
        catering:    { pax: 120, dietary: 8, status: 'Draft submitted' },
        assets:      { total: 12, assigned: 5, inStorage: 7 },
        forms:       { active: 2, submitted: 4, pending: 3 },
    },
    tech26: {
        guestList:   { registered: 0, capacity: 500, pending: 0 },
        credentials: { vendors: 0, stagesComplete: '0/4', pendingAction: '—' },
        catering:    { pax: 0, dietary: 0, status: 'Not started' },
        assets:      { total: 0, assigned: 0, inStorage: 0 },
        forms:       { active: 0, submitted: 0, pending: 0 },
    },
};
