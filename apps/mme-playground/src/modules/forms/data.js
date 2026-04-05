export const EVENT = {
    id:   'inf25',
    name: 'Infosys Leadership Summit 2025',
    date: 'Apr 14–16, 2025',
    code: 'inf25',
};

/* ── Channels ────────────────────────────────────────────────────────
   type: 'internal' | 'external'
   scope: who can see forms posted here
   ─────────────────────────────────────────────────────────────────── */
export const CHANNELS = [
    { id: 'inf25-general',         label: 'inf25-general',         type: 'internal', scope: 'All agency members'          },
    { id: 'inf25-ops',             label: 'inf25-ops',             type: 'internal', scope: 'Operations team'             },
    { id: 'inf25-registration',    label: 'inf25-registration',    type: 'internal', scope: 'Registration team'           },
    { id: 'inf25-logistics',       label: 'inf25-logistics',       type: 'internal', scope: 'Logistics team'              },
    { id: 'inf25-vendor-catering', label: 'inf25-vendor-catering', type: 'external', scope: 'Acme Caterers only'          },
    { id: 'inf25-vendor-av',       label: 'inf25-vendor-av',       type: 'external', scope: 'StageRight Productions only' },
    { id: 'inf25-sponsor-tata',    label: 'inf25-sponsor-tata',    type: 'external', scope: 'Tata Consultancy only'       },
];

export const CHANNEL_MAP = Object.fromEntries(CHANNELS.map(c => [c.id, c]));

/* ── Forms ───────────────────────────────────────────────────────── */
export const FORMS = [
    {
        id: 1, eventId: 'inf25', channelId: 'inf25-registration',
        title: 'Dietary Preference Form',
        status: 'active',  responses: 147, total: 200,
        deadline: 'Apr 5, 2025',  createdAt: 'Mar 15, 2025',
    },
    {
        id: 2, eventId: 'inf25', channelId: 'inf25-registration',
        title: 'T-Shirt Size Collection',
        status: 'active',  responses: 183, total: 200,
        deadline: 'Apr 8, 2025',  createdAt: 'Mar 18, 2025',
    },
    {
        id: 3, eventId: 'inf25', channelId: 'inf25-general',
        title: 'Session Preference Survey',
        status: 'draft',   responses: 0,   total: 200,
        deadline: 'Apr 10, 2025', createdAt: 'Mar 22, 2025',
    },
    {
        id: 4, eventId: 'inf25', channelId: 'inf25-general',
        title: 'Post-Event Feedback',
        status: 'draft',   responses: 0,   total: 200,
        deadline: 'Apr 18, 2025', createdAt: 'Mar 25, 2025',
    },
    {
        id: 5, eventId: 'inf25', channelId: 'inf25-logistics',
        title: 'Accommodation Preference',
        status: 'closed',  responses: 198, total: 200,
        deadline: 'Mar 20, 2025', createdAt: 'Mar 1, 2025',
    },
    {
        id: 6, eventId: 'inf25', channelId: 'inf25-vendor-catering',
        title: 'Catering Headcount Confirmation',
        status: 'active',  responses: 1,   total: 1,
        deadline: 'Apr 3, 2025',  createdAt: 'Mar 20, 2025',
    },
    {
        id: 7, eventId: 'inf25', channelId: 'inf25-vendor-av',
        title: 'AV Equipment Checklist',
        status: 'active',  responses: 0,   total: 1,
        deadline: 'Apr 5, 2025',  createdAt: 'Mar 21, 2025',
    },
    /* ── Quick Polls ── */
    {
        id: 8, eventId: 'inf25', channelId: 'inf25-ops',
        type: 'quick-poll',
        title: 'Stage Setup Readiness Check',
        question: 'Is your setup complete and ready for rehearsal?',
        status: 'active', responses: 7, total: 11,
        deadline: 'Apr 12, 2025', createdAt: 'Apr 1, 2025',
        allowUndo: false,
    },
    {
        id: 9, eventId: 'inf25', channelId: 'inf25-vendor-catering',
        type: 'quick-poll',
        title: 'Catering Team On-Site?',
        question: 'Is the full catering team on-site and setup begun?',
        status: 'active', responses: 1, total: 1,
        deadline: 'Apr 14, 2025', createdAt: 'Apr 5, 2025',
        allowUndo: true,
    },
    {
        id: 10, eventId: 'inf25', channelId: 'inf25-logistics',
        type: 'quick-poll',
        title: 'Transport Arrival Confirmation',
        question: 'Have all transport vehicles arrived at the venue?',
        status: 'active', responses: 3, total: 8,
        deadline: 'Apr 13, 2025', createdAt: 'Apr 3, 2025',
        allowUndo: false,
    },
];

export const FIELD_TYPES = [
    { value: 'text',     label: 'Short Text'  },
    { value: 'textarea', label: 'Long Text'   },
    { value: 'email',    label: 'Email'       },
    { value: 'number',   label: 'Number'      },
    { value: 'dropdown', label: 'Dropdown'    },
    { value: 'checkbox', label: 'Checkboxes'  },
    { value: 'radio',    label: 'Radio'       },
    { value: 'file',     label: 'File Upload' },
    { value: 'date',     label: 'Date'        },
];

/* ── Reminders ───────────────────────────────────────────────────── */
export const REMINDERS = [
    { id: 1, formId: 1, formTitle: 'Dietary Preference Form',        channelId: 'inf25-registration',    sentAt: 'Mar 28, 2025 · 10:02 AM', type: 'auto',   recipients: 53,  status: 'delivered' },
    { id: 2, formId: 1, formTitle: 'Dietary Preference Form',        channelId: 'inf25-registration',    sentAt: 'Mar 25, 2025 · 04:15 PM', type: 'auto',   recipients: 67,  status: 'delivered' },
    { id: 3, formId: 2, formTitle: 'T-Shirt Size Collection',        channelId: 'inf25-registration',    sentAt: 'Mar 30, 2025 · 09:30 AM', type: 'manual', recipients: 17,  status: 'delivered' },
    { id: 4, formId: 1, formTitle: 'Dietary Preference Form',        channelId: 'inf25-general',         sentAt: 'Mar 22, 2025 · 02:45 PM', type: 'auto',   recipients: 200, status: 'delivered' },
    { id: 5, formId: 7, formTitle: 'AV Equipment Checklist',         channelId: 'inf25-vendor-av',       sentAt: 'Mar 27, 2025 · 11:00 AM', type: 'manual', recipients: 1,   status: 'delivered' },
    { id: 6, formId: 6, formTitle: 'Catering Headcount Confirmation',channelId: 'inf25-vendor-catering', sentAt: 'Mar 21, 2025 · 09:00 AM', type: 'auto',   recipients: 1,   status: 'delivered' },
];

/* ── Responses ───────────────────────────────────────────────────── */
export const RESPONSES = [
    { id: 1, formId: 1, channelId: 'inf25-registration', name: 'Aditya Sharma', company: 'Infosys BPM',  submittedAt: 'Apr 1, 2025 · 11:24 AM', status: 'complete', hasFile: true,  fileExt: 'pdf'  },
    { id: 2, formId: 1, channelId: 'inf25-registration', name: 'Priya Nair',    company: 'Infosys Ltd.', submittedAt: 'Mar 31, 2025 · 03:15 PM', status: 'complete', hasFile: false, fileExt: null   },
    { id: 3, formId: 1, channelId: 'inf25-registration', name: 'Rahul Verma',   company: 'EdgeVerve',    submittedAt: 'Mar 30, 2025 · 09:45 AM', status: 'complete', hasFile: true,  fileExt: 'jpg'  },
    { id: 4, formId: 1, channelId: 'inf25-registration', name: 'Sneha Patel',   company: 'Infosys Ltd.', submittedAt: 'Mar 29, 2025 · 01:30 PM', status: 'complete', hasFile: false, fileExt: null   },
    { id: 5, formId: 1, channelId: 'inf25-registration', name: 'Vikram Reddy',  company: 'Infosys BPM',  submittedAt: '—',                       status: 'pending',  hasFile: false, fileExt: null   },
    { id: 6, formId: 1, channelId: 'inf25-registration', name: 'Anjali Singh',  company: 'EdgeVerve',    submittedAt: 'Apr 2, 2025 · 08:10 AM',  status: 'complete', hasFile: true,  fileExt: 'docx' },
    { id: 7, formId: 2, channelId: 'inf25-registration', name: 'Karan Mehta',   company: 'Infosys Ltd.', submittedAt: 'Apr 2, 2025 · 12:55 PM',  status: 'complete', hasFile: false, fileExt: null   },
    { id: 8, formId: 1, channelId: 'inf25-registration', name: 'Divya Iyer',    company: 'Infosys BPM',  submittedAt: '—',                       status: 'pending',  hasFile: false, fileExt: null   },
];

/* ── Poll Responses ──────────────────────────────────────────────
   answer: true = Yes, null = pending (no response yet)
   ─────────────────────────────────────────────────────────────── */
export const POLL_RESPONSES = [
    /* Poll 8 — inf25-ops, 11 total, 7 responded */
    { id: 1,  pollId: 8, channelId: 'inf25-ops', name: 'Rahul Menon',    respondedAt: 'Apr 2, 2025 · 10:15 AM', answer: true  },
    { id: 2,  pollId: 8, channelId: 'inf25-ops', name: 'Priya Sharma',   respondedAt: 'Apr 2, 2025 · 11:42 AM', answer: true  },
    { id: 3,  pollId: 8, channelId: 'inf25-ops', name: 'Jackson Lee',    respondedAt: '—',                      answer: null  },
    { id: 4,  pollId: 8, channelId: 'inf25-ops', name: 'Sofia Davis',    respondedAt: 'Apr 3, 2025 · 09:00 AM', answer: true  },
    { id: 5,  pollId: 8, channelId: 'inf25-ops', name: 'Anita Verma',    respondedAt: '—',                      answer: null  },
    { id: 6,  pollId: 8, channelId: 'inf25-ops', name: 'Vikram Patel',   respondedAt: 'Apr 3, 2025 · 09:30 AM', answer: true  },
    { id: 7,  pollId: 8, channelId: 'inf25-ops', name: 'Karan Mehta',    respondedAt: '—',                      answer: null  },
    { id: 8,  pollId: 8, channelId: 'inf25-ops', name: 'Divya Iyer',     respondedAt: 'Apr 3, 2025 · 14:20 PM', answer: true  },
    { id: 9,  pollId: 8, channelId: 'inf25-ops', name: 'Arjun Reddy',    respondedAt: 'Apr 4, 2025 · 08:05 AM', answer: true  },
    { id: 10, pollId: 8, channelId: 'inf25-ops', name: 'Meera Nair',     respondedAt: '—',                      answer: null  },
    { id: 11, pollId: 8, channelId: 'inf25-ops', name: 'Suresh Kumar',   respondedAt: 'Apr 4, 2025 · 10:00 AM', answer: true  },
    /* Poll 9 — inf25-vendor-catering, 1 total, 1 responded */
    { id: 12, pollId: 9, channelId: 'inf25-vendor-catering', name: 'Acme Caterers',    respondedAt: 'Apr 6, 2025 · 08:00 AM', answer: true  },
    /* Poll 10 — inf25-logistics, 8 total, 3 responded */
    { id: 13, pollId: 10, channelId: 'inf25-logistics', name: 'Rohit Singh',   respondedAt: 'Apr 4, 2025 · 07:45 AM', answer: true  },
    { id: 14, pollId: 10, channelId: 'inf25-logistics', name: 'Nalini Rao',    respondedAt: '—',                      answer: null  },
    { id: 15, pollId: 10, channelId: 'inf25-logistics', name: 'Deepak Sharma', respondedAt: 'Apr 4, 2025 · 08:10 AM', answer: true  },
    { id: 16, pollId: 10, channelId: 'inf25-logistics', name: 'Sneha Gupta',   respondedAt: '—',                      answer: null  },
    { id: 17, pollId: 10, channelId: 'inf25-logistics', name: 'Akash Verma',   respondedAt: 'Apr 4, 2025 · 09:00 AM', answer: true  },
    { id: 18, pollId: 10, channelId: 'inf25-logistics', name: 'Pooja Menon',   respondedAt: '—',                      answer: null  },
    { id: 19, pollId: 10, channelId: 'inf25-logistics', name: 'Ravi Kumar',    respondedAt: '—',                      answer: null  },
    { id: 20, pollId: 10, channelId: 'inf25-logistics', name: 'Tanya Bose',    respondedAt: '—',                      answer: null  },
];

export const FORM_FIELDS = [
    { id: 1, type: 'text',     label: 'Full Name',               required: true,  placeholder: 'Enter your full name', options: null },
    { id: 2, type: 'email',    label: 'Email Address',           required: true,  placeholder: 'your@email.com',       options: null },
    { id: 3, type: 'dropdown', label: 'Dietary Preference',      required: true,  placeholder: null,                   options: ['Vegetarian', 'Non Vegetarian', 'Vegan', 'Jain'] },
    { id: 4, type: 'checkbox', label: 'Allergies / Restrictions',required: false, placeholder: null,                   options: ['Gluten-free', 'Nut-free', 'Dairy-free', 'None'] },
    { id: 5, type: 'file',     label: 'Supporting Document',     required: false, placeholder: 'PDF or image upload',  options: null },
];

/* ── Widget data ─────────────────────────────────────────────────── */
export const WIDGET_STATS = {
    activeForms:      4,
    totalResponses:   330,
    pendingResponses: 70,
    nextDeadline:     'Apr 3',
};

export const WIDGET_FORMS = [
    { title: 'Dietary Preference Form',        channelId: 'inf25-registration',    pct: 74, status: 'active' },
    { title: 'T-Shirt Size Collection',        channelId: 'inf25-registration',    pct: 92, status: 'active' },
    { title: 'Catering Headcount Confirmation',channelId: 'inf25-vendor-catering', pct: 100,status: 'active' },
    { title: 'Post-Event Feedback',            channelId: 'inf25-general',         pct: 0,  status: 'draft'  },
];
