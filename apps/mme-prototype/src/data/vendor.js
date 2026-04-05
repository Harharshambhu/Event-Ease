// Vendor domain — vendor portal sidebar, tasks, activity

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
        { name: 'Priya Mehta',  role: 'Ops Lead',              unread: 1 },
        { name: 'Sofia Davis',  role: 'Event Manager',         unread: 0 },
        { name: 'Ravi Kumar',   role: 'AV Tech (Internal)',    unread: 0 },
    ],
};

export const vendorTasks = [
    { name: 'Equipment checklist', status: 'Stage 3/4',   date: 'Apr 5 — 9 days left', icon: 'warning' },
    { name: 'Load-in confirmation', status: 'Not started', date: 'Apr 10',              icon: 'circle' },
    { name: 'Stage A: Tech specs',  status: 'Complete',    date: null,                  icon: 'check' },
    { name: 'Stage B: Equipment',   status: 'Complete',    date: null,                  icon: 'check' },
];

export const vendorActivity = [
    { icon: 'chat',      text: 'New message from Priya in #inf25-vendor-avsolutions', time: '5m ago' },
    { icon: 'broadcast', text: 'Broadcast: Load-in rescheduled [Acknowledge ✓]',      time: '1h ago' },
    { icon: 'check',     text: 'Stage B auto-marked complete ✓',                       time: '2h ago' },
    { icon: 'pin',       text: 'Brief updated: Technical brief v3 pinned',             time: '1d ago' },
];
