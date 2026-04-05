// Tasks domain — channel-scoped tasks, current user's tasks, summary counts

// Tasks scoped per channel — used by right sidebar Tasks tab
export const channelTasks = {
    'inf25-general': [
        { id: 'cgt-1', name: 'Confirm venue AV setup',          assignee: 'Jackson Lee',  assigneeInitials: 'JL', due: 'Apr 5',  status: 'in-progress' },
        { id: 'cgt-2', name: 'Catering brief — final sign-off', assignee: 'Jane Doe',    assigneeInitials: 'JD', due: 'Apr 3',  status: 'overdue' },
        { id: 'cgt-3', name: 'Guest list v3 upload',             assignee: 'Priya Sharma',assigneeInitials: 'PS', due: 'Apr 7',  status: 'pending' },
        { id: 'cgt-4', name: 'Vendor contract reviews',          assignee: 'Rahul Menon', assigneeInitials: 'RM', due: 'Apr 4',  status: 'in-progress' },
        { id: 'cgt-5', name: 'Run-of-show final approval',       assignee: 'Sofia Davis', assigneeInitials: 'SD', due: 'Apr 10', status: 'pending' },
    ],
    'inf25-ops': [
        { id: 'cot-1', name: 'Load-in schedule confirmation',   assignee: 'Jane Doe',    assigneeInitials: 'JD', due: 'Apr 9',  status: 'in-progress' },
        { id: 'cot-2', name: 'Bay 2 access pass — AV Solutions',assignee: 'Rahul Menon', assigneeInitials: 'RM', due: 'Apr 8',  status: 'pending' },
        { id: 'cot-3', name: 'Catering van access slots',        assignee: 'Jane Doe',    assigneeInitials: 'JD', due: 'Apr 6',  status: 'overdue' },
        { id: 'cot-4', name: 'Security briefing with venue mgr', assignee: 'Sofia Davis', assigneeInitials: 'SD', due: 'Apr 11', status: 'pending' },
    ],
    'inf25-production': [
        { id: 'cpt-1', name: 'Stage A tech specs sign-off',       assignee: 'Jackson Lee', assigneeInitials: 'JL', due: 'Mar 28', status: 'complete' },
        { id: 'cpt-2', name: 'Stage B equipment checklist',       assignee: 'Rahul Sharma',assigneeInitials: 'RS', due: 'Apr 5',  status: 'in-progress' },
        { id: 'cpt-3', name: 'Ceiling load data from venue',      assignee: 'Sofia Davis', assigneeInitials: 'SD', due: 'Apr 3',  status: 'complete' },
        { id: 'cpt-4', name: 'Rigging crew confirmation — Apr 10',assignee: 'Jackson Lee', assigneeInitials: 'JL', due: 'Apr 2',  status: 'complete' },
        { id: 'cpt-5', name: 'LED panel spec — Stage B',          assignee: 'Rahul Sharma',assigneeInitials: 'RS', due: 'Apr 6',  status: 'pending' },
    ],
    'inf25-registration': [
        { id: 'crt-1', name: 'Badge template — Anita sign-off',  assignee: 'Priya Sharma',assigneeInitials: 'PS', due: 'Apr 6',  status: 'in-progress' },
        { id: 'crt-2', name: 'Guest list v3 upload',              assignee: 'Priya Sharma',assigneeInitials: 'PS', due: 'Mar 30', status: 'complete' },
        { id: 'crt-3', name: 'Meal tag mapping to badge IDs',    assignee: 'Jane Doe',    assigneeInitials: 'JD', due: 'Apr 4',  status: 'complete' },
        { id: 'crt-4', name: 'Badge printing — 160 units',       assignee: 'Priya Sharma',assigneeInitials: 'PS', due: 'Apr 7',  status: 'pending' },
        { id: 'crt-5', name: 'On-site check-in desk setup',       assignee: 'Priya Sharma',assigneeInitials: 'PS', due: 'Apr 24', status: 'pending' },
    ],
    'inf25-logistics': [
        { id: 'clt-1', name: 'Transport plan — 3 buses confirmed', assignee: 'Rahul Menon', assigneeInitials: 'RM', due: 'Apr 2',  status: 'complete' },
        { id: 'clt-2', name: 'Speaker pickup car service',          assignee: 'Rahul Menon', assigneeInitials: 'RM', due: 'Apr 20', status: 'in-progress' },
        { id: 'clt-3', name: 'Backup transport option document',    assignee: 'Jane Doe',    assigneeInitials: 'JD', due: 'Apr 5',  status: 'pending' },
    ],
    'dept-operations': [
        { id: 'dot-1', name: 'Post-event archiving SOP draft',     assignee: 'Jane Doe',    assigneeInitials: 'JD', due: 'Apr 8',  status: 'in-progress' },
        { id: 'dot-2', name: 'Vendor contract template v3 review', assignee: 'Sofia Davis', assigneeInitials: 'SD', due: 'Apr 4',  status: 'overdue' },
        { id: 'dot-3', name: 'Q2 ops calendar — block dates',      assignee: 'Rahul Menon', assigneeInitials: 'RM', due: 'Apr 10', status: 'pending' },
        { id: 'dot-4', name: 'New vendor onboarding checklist',     assignee: 'Jane Doe',    assigneeInitials: 'JD', due: 'Mar 31', status: 'complete' },
    ],
};

// Current user's tasks across all events — used by Overview dashboard widget
export const myTasks = [
    { id: 'mt-1', name: 'Catering brief — final sign-off',    channel: 'inf25-general',      event: 'Infosys Summit 2025', due: 'Apr 3',  status: 'overdue' },
    { id: 'mt-2', name: 'Load-in schedule confirmation',      channel: 'inf25-ops',          event: 'Infosys Summit 2025', due: 'Apr 9',  status: 'in-progress' },
    { id: 'mt-3', name: 'Catering van access slots',          channel: 'inf25-ops',          event: 'Infosys Summit 2025', due: 'Apr 6',  status: 'overdue' },
    { id: 'mt-4', name: 'Meal tag mapping to badge IDs',     channel: 'inf25-registration', event: 'Infosys Summit 2025', due: 'Apr 4',  status: 'complete' },
    { id: 'mt-5', name: 'Backup transport option document',   channel: 'inf25-logistics',    event: 'Infosys Summit 2025', due: 'Apr 5',  status: 'pending' },
    { id: 'mt-6', name: 'Post-event archiving SOP draft',     channel: 'dept-operations',    event: 'Company',             due: 'Apr 8',  status: 'in-progress' },
];

// Aggregate counts for Overview dashboard summary bar
export const taskSummary = {
    overdueCount:       2,
    assignedToMe:       6,
    pendingSubmissions: 3,
};
