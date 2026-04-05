export const EVENT = {
    name: 'Infosys Leadership Summit 2025',
    date: 'Apr 14–16, 2025',
    days: 3,
};

export const ASSET_TYPES = [
    { id: 1, name: 'Walkie Talkie',   category: 'Communication',  unit: 'piece',   pricePerDay: 500,  totalStock: 50  },
    { id: 2, name: 'Golf Cart',        category: 'Transport',       unit: 'vehicle', pricePerDay: 2500, totalStock: 8   },
    { id: 3, name: 'Round Table',      category: 'Furniture',       unit: 'piece',   pricePerDay: 300,  totalStock: 40  },
    { id: 4, name: 'Tent (10×10)',     category: 'Infrastructure',  unit: 'piece',   pricePerDay: 1500, totalStock: 15  },
    { id: 5, name: 'PA Speaker',       category: 'AV Equipment',    unit: 'piece',   pricePerDay: 800,  totalStock: 20  },
    { id: 6, name: 'Folding Chair',    category: 'Furniture',       unit: 'piece',   pricePerDay: 50,   totalStock: 200 },
];

export const CATEGORIES = [
    { label: 'Communication',  count: 147, color: '#2471A3' },
    { label: 'Transport',      count: 89,  color: '#27AE60' },
    { label: 'Furniture',      count: 142, color: '#F39C12' },
    { label: 'AV Equipment',   count: 78,  color: '#E74C3C' },
    { label: 'Infrastructure', count: 56,  color: '#8E44AD' },
];

export const VENDOR_REQUESTS = [
    { id: 1, vendorName: 'Acme AV Solutions',      assetName: 'Walkie Talkie', allocated: 20,  requested: 18,  status: 'approved'   },
    { id: 2, vendorName: 'Acme AV Solutions',      assetName: 'Golf Cart',     allocated: 5,   requested: 5,   status: 'approved'   },
    { id: 3, vendorName: 'StageRight Productions', assetName: 'PA Speaker',    allocated: 10,  requested: 8,   status: 'approved'   },
    { id: 4, vendorName: 'Elite Hospitality',      assetName: 'Round Table',   allocated: 30,  requested: 30,  status: 'approved'   },
    { id: 5, vendorName: 'Elite Hospitality',      assetName: 'Folding Chair', allocated: 150, requested: 150, status: 'pending'    },
    { id: 6, vendorName: 'BuildRight Infra',       assetName: 'Tent (10×10)',  allocated: 8,   requested: 12,  status: 'over-limit' },
];

export const DISTRIBUTION_LOG = [
    { id: 1, assetName: 'Walkie Talkie', vendorName: 'Acme AV Solutions',      distributed: 18, returned: 17, days: 3, pricePerDay: 500,  billbackAmount: 27000 },
    { id: 2, assetName: 'Golf Cart',     vendorName: 'Acme AV Solutions',      distributed: 5,  returned: 5,  days: 3, pricePerDay: 2500, billbackAmount: 37500 },
    { id: 3, assetName: 'PA Speaker',    vendorName: 'StageRight Productions', distributed: 8,  returned: 8,  days: 3, pricePerDay: 800,  billbackAmount: 19200 },
    { id: 4, assetName: 'Round Table',   vendorName: 'Elite Hospitality',      distributed: 30, returned: 28, days: 3, pricePerDay: 300,  billbackAmount: 27000 },
];

export const BILLBACK_BY_VENDOR = [
    { vendorName: 'Acme AV Solutions',      assetCount: 2, total: 64500 },
    { vendorName: 'StageRight Productions', assetCount: 1, total: 19200 },
    { vendorName: 'Elite Hospitality',      assetCount: 1, total: 27000 },
];

export const RETURN_STATUS = { returned: 58, pending: 3, unreturned: 0 };

export const BILLBACK = {
    totalAmount: 110700,
    vendorCount: 3,
    locked:      false,
};

export const WIDGET_STATS = {
    assetTypes:      12,
    pendingRequests: 23,
    billbackDisplay: '₹2.3L',
};

export const WIDGET_RETURN = { returned: 312, pending: 47, damaged: 8 };
