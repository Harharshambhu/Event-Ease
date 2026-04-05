// ============================================
// Credentials Module — Sample Data
// ============================================

export const credentialTypes = [
    { id: 'all-access', name: 'All-Access', tier: 'Tier 1', color: '#444', zones: ['All Zones'], icon: '◉' },
    { id: 'backstage', name: 'Backstage', tier: 'Tier 2', color: '#666', zones: ['Backstage', 'FOH'], icon: '◎' },
    { id: 'vendor', name: 'Vendor', tier: 'Tier 3', color: '#888', zones: ['BOH', 'Loading'], icon: '▣' },
    { id: 'media', name: 'Media / Press', tier: 'Tier 3', color: '#777', zones: ['Press Pit', 'FOH'], icon: '⬡' },
    { id: 'vip', name: 'VIP Guest', tier: 'Tier 2', color: '#555', zones: ['VIP Lounge', 'FOH'], icon: '❖' },
    { id: 'artist', name: 'Artist', tier: 'Tier 1', color: '#333', zones: ['All Zones'], icon: '⊙' },
    { id: 'volunteer', name: 'Volunteer', tier: 'Tier 4', color: '#999', zones: ['Assigned Area'], icon: '○' },
];

export const badgeTemplates = [
    { typeId: 'all-access', fields: ['Full Name', 'Company', 'Photo', 'Barcode', 'Access Level'], layout: 'full' },
    { typeId: 'vendor', fields: ['Full Name', 'Company', 'Barcode', 'Valid Dates'], layout: 'standard' },
    { typeId: 'media', fields: ['Full Name', 'Outlet', 'Photo', 'Barcode'], layout: 'standard' },
    { typeId: 'artist', fields: ['Artist Name', 'Photo', 'Barcode', 'Access Level'], layout: 'full' },
];

export const approvalWorkflows = [
    { typeId: 'all-access', steps: ['Ops Lead Review', 'Director Approval'], conditional: true },
    { typeId: 'backstage', steps: ['Ops Lead Review'], conditional: false },
    { typeId: 'vendor', steps: ['Auto-Approve (via block)'], conditional: false },
    { typeId: 'media', steps: ['PR Manager Review', 'Ops Lead Approval'], conditional: true },
    { typeId: 'vip', steps: ['Client Manager Review'], conditional: false },
];

export const itemBlocks = [
    { id: 'vendor-standard', name: 'Vendor Standard Pack', types: ['vendor'], maxQty: 15, price: 0, assignedTo: 'Vendor groups' },
    { id: 'media-accred', name: 'Media Accreditation', types: ['media'], maxQty: 5, price: 0, assignedTo: 'Media groups' },
    { id: 'artist-pack', name: 'Artist & Crew Pack', types: ['artist', 'backstage', 'all-access'], maxQty: 20, price: 0, assignedTo: 'Artist groups' },
    { id: 'sponsor-vip', name: 'Sponsor VIP Bundle', types: ['vip', 'all-access'], maxQty: 10, price: 25, assignedTo: 'Sponsor groups' },
];

export const barcodePools = [
    { id: 'pool-a', name: 'RFID Wristband Pool A', total: 500, assigned: 312, format: 'RFID', partner: 'Intellitix' },
    { id: 'pool-b', name: 'Barcode Lanyard Pool B', total: 200, assigned: 87, format: 'QR Code', partner: 'Internal' },
];

// Phase 2 — Collection
export const groups = [
    { id: 'acme-av', name: 'Acme AV Solutions', type: 'Vendor', contact: 'Rahul Sharma', status: 'submitted', headcount: { vendor: 12, backstage: 3 }, submitted: 15, total: 15 },
    { id: 'stageworks', name: 'StageWorks Inc.', type: 'Vendor', contact: 'Priya Mehta', status: 'partial', headcount: { vendor: 8 }, submitted: 5, total: 8 },
    { id: 'dj-shadow', name: 'DJ Shadow Mgmt', type: 'Artist', contact: 'Mike Torres', status: 'submitted', headcount: { artist: 2, backstage: 4, 'all-access': 1 }, submitted: 7, total: 7 },
    { id: 'times-media', name: 'Times Media Group', type: 'Media', contact: 'Sneha Kapoor', status: 'empty', headcount: {}, submitted: 0, total: 5 },
    { id: 'redbull', name: 'RedBull Sponsorship', type: 'Sponsor', contact: 'Alex Chen', status: 'submitted', headcount: { vip: 8, 'all-access': 2 }, submitted: 10, total: 10 },
    { id: 'sound-crew', name: 'SoundTech Audio', type: 'Vendor', contact: 'Deepak Nair', status: 'overdue', headcount: { vendor: 6 }, submitted: 0, total: 6 },
];

export const personnelRoster = [
    { id: 'p1', groupId: 'acme-av', name: 'Rahul Sharma', role: 'Lead Engineer', type: 'vendor', status: 'approved', barcode: 'RFID-0312' },
    { id: 'p2', groupId: 'acme-av', name: 'Anita Desai', role: 'AV Technician', type: 'vendor', status: 'approved', barcode: 'RFID-0313' },
    { id: 'p3', groupId: 'acme-av', name: 'Vikram Patel', role: 'Stage Manager', type: 'backstage', status: 'pending', barcode: null },
    { id: 'p4', groupId: 'acme-av', name: 'Sanjay Kumar', role: 'Rigging Lead', type: 'vendor', status: 'approved', barcode: 'RFID-0314' },
    { id: 'p5', groupId: 'dj-shadow', name: 'DJ Shadow', role: 'Artist', type: 'artist', status: 'approved', barcode: 'RFID-0001' },
    { id: 'p6', groupId: 'dj-shadow', name: 'Mike Torres', role: 'Tour Manager', type: 'all-access', status: 'approved', barcode: 'RFID-0002' },
    { id: 'p7', groupId: 'dj-shadow', name: 'Sarah Lin', role: 'Sound Engineer', type: 'backstage', status: 'pending', barcode: null },
    { id: 'p8', groupId: 'redbull', name: 'Alex Chen', role: 'Brand Manager', type: 'all-access', status: 'approved', barcode: 'RFID-0100' },
    { id: 'p9', groupId: 'redbull', name: 'Jessica Wong', role: 'Client', type: 'vip', status: 'pending', barcode: null },
    { id: 'p10', groupId: 'stageworks', name: 'Priya Mehta', role: 'Ops Lead', type: 'vendor', status: 'approved', barcode: 'RFID-0400' },
    { id: 'p11', groupId: 'stageworks', name: 'Ravi Sundaram', role: 'Carpenter', type: 'vendor', status: 'denied', barcode: null },
    { id: 'p12', groupId: 'times-media', name: 'Sneha Kapoor', role: 'Journalist', type: 'media', status: 'pending', barcode: null },
];

// Phase 3 — Approval Queue
export const approvalQueue = personnelRoster.filter(p => p.status === 'pending');

// Phase 4 — Issuance
export const printQueue = personnelRoster.filter(p => p.status === 'approved');

export const checkinLog = [
    { personId: 'p1', name: 'Rahul Sharma', type: 'vendor', scannedAt: '08:12 AM', gate: 'Gate B', result: 'approved' },
    { personId: 'p5', name: 'DJ Shadow', type: 'artist', scannedAt: '14:30 PM', gate: 'Artist Entrance', result: 'approved' },
    { personId: 'p8', name: 'Alex Chen', type: 'all-access', scannedAt: '16:45 PM', gate: 'VIP Gate', result: 'approved' },
];

export const pickupTracker = [
    { personId: 'p1', name: 'Rahul Sharma', group: 'Acme AV', type: 'vendor', printed: true, pickedUp: true },
    { personId: 'p2', name: 'Anita Desai', group: 'Acme AV', type: 'vendor', printed: true, pickedUp: false },
    { personId: 'p4', name: 'Sanjay Kumar', group: 'Acme AV', type: 'vendor', printed: true, pickedUp: true },
    { personId: 'p5', name: 'DJ Shadow', group: 'DJ Shadow Mgmt', type: 'artist', printed: true, pickedUp: true },
    { personId: 'p6', name: 'Mike Torres', group: 'DJ Shadow Mgmt', type: 'all-access', printed: true, pickedUp: false },
    { personId: 'p8', name: 'Alex Chen', group: 'RedBull', type: 'all-access', printed: true, pickedUp: true },
    { personId: 'p10', name: 'Priya Mehta', group: 'StageWorks', type: 'vendor', printed: true, pickedUp: false },
];
