export const EVENT = {
    name: 'Infosys Leadership Summit 2025',
    date: 'Apr 14–16, 2025',
    venue: 'Taj Palace, New Delhi',
};

export const VENDOR = {
    name: 'Delhi Catering Co.',
    contact: 'Ramesh Gupta',
    phone: '+91 98100 12345',
    email: 'ramesh@delhicatering.in',
};

export const OCCASIONS = [
    {
        id: 1,
        name: 'Inauguration Session',
        date: 'Apr 14, 2025',
        serviceStyle: 'Mixed (Packet + Plated)',
        baseQty: 200,
        vendor: 'Delhi Catering Co.',
        status: 'locked',
    },
    {
        id: 2,
        name: 'Budget Session Days',
        date: 'Apr 15–16, 2025',
        serviceStyle: 'Plated',
        baseQty: 50,
        days: 2,
        vendor: 'Delhi Catering Co.',
        status: 'pending',
    },
];

export const SERVICE_STYLES = [
    { icon: '☐', name: 'Packet', desc: 'Pre-packed meal boxes distributed individually.' },
    { icon: '◯', name: 'Plated', desc: 'Individually plated meals served at tables.' },
    { icon: '▤', name: 'Buffet', desc: 'Self-serve stations; guests choose portions.' },
    { icon: '◇', name: 'High-Tea', desc: 'Light bites and beverages; no main course.' },
];

export const MEAL_SUBMISSIONS = [
    { id: 1, name: 'Rajesh Mehta',   company: 'Acme Corp',       mealType: 'Veg',     dietary: 'Nut Allergy', submittedAt: 'Mar 10, 14:30', status: 'confirmed' },
    { id: 2, name: 'Sunita Rao',     company: 'Synapse Capital', mealType: 'Jain',    dietary: 'None',        submittedAt: 'Mar 11, 09:15', status: 'confirmed' },
    { id: 3, name: 'James Okafor',   company: 'TechVentures',    mealType: 'Non-Veg', dietary: 'Halal',       submittedAt: 'Mar 12, 16:45', status: 'confirmed' },
    { id: 4, name: 'Priya Nambiar',  company: 'DirectVIP',       mealType: 'Veg',     dietary: 'None',        submittedAt: null,            status: 'pending'   },
];

export const DIETARY_AGGREGATE = [
    { label: 'Vegetarian',     count: 89 },
    { label: 'Non Vegetarian', count: 47 },
    { label: 'Vegan',          count: 34 },
    { label: 'Jain',           count: 21 },
];

export const LOCKED_COUNTS = {
    veg:            95,
    nonVeg:         38,
    jain:           24,
    total:          157,
    bufferPercent:  10,
    buffer:         17,
    finalPrep:      173,
    lockedDate:     'Mar 20, 2025',
    editableUntil:  'Apr 12, 2025',
};

export const INVOICE = {
    uploaded:      true,
    fileName:      'Delhi_Catering_Invoice_INF25.pdf',
    amount:        87500,
    quoted:        85000,
    variance:      2500,
    taxDocs:       { mushak: true, tds: true, vat: true },
    paymentStatus: 'Processed',
};

// Dashboard widget mock
export const WIDGET_STATS = {
    occasions:    { count: 2, status: 'complete' },
    preferences:  { submitted: 147, total: 200, pending: 53, status: 'warning' },
    countLock:    { finalPrep: 173, status: 'locked' },
    invoice:      { amount: 87500, taxComplete: true, status: 'complete' },
};

export const LIVE_MEAL_SERVICE = [
    { meal: 'Breakfast',  served: 148, total: 173, status: 'done'   },
    { meal: 'Lunch',      served: 91,  total: 173, status: 'active' },
    { meal: 'Hi-Tea',     served: 0,   total: 173, status: 'upcoming' },
];
