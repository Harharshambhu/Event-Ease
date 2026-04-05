import React from 'react';
import { ASSET_TYPES, CATEGORIES, VENDOR_REQUESTS } from './data';

const maxCat = Math.max(...CATEGORIES.map(c => c.count));

const STATUS_LABEL = {
    'approved':   'Approved',
    'pending':    'Pending',
    'over-limit': 'Over Limit',
    'denied':     'Denied',
};

export default function Phase1AssetSetup({ requestStatuses, onApprove, onDeny, showToast }) {
    return (
        <div className="ast-layout--full">

            {/* ── Asset Types Table ── */}
            <div className="ast-card">
                <div className="ast-card__header">
                    <span className="ast-card__title">Asset Types ({ASSET_TYPES.length})</span>
                    <button className="ast-btn ast-btn--primary ast-btn--sm">+ Add Asset Type</button>
                </div>
                <table className="ast-table">
                    <thead>
                        <tr>
                            <th>Asset Name</th>
                            <th>Category</th>
                            <th>Unit</th>
                            <th>Price / Day</th>
                            <th>Total Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ASSET_TYPES.map(a => (
                            <tr key={a.id}>
                                <td style={{ fontWeight: 600 }}>{a.name}</td>
                                <td style={{ color: '#666' }}>{a.category}</td>
                                <td style={{ color: '#888' }}>{a.unit}</td>
                                <td style={{ fontWeight: 600 }}>₹{a.pricePerDay.toLocaleString('en-IN')}</td>
                                <td style={{ fontWeight: 600 }}>{a.totalStock}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                                        <button className="ast-btn ast-btn--secondary ast-btn--sm">Edit</button>
                                        <button className="ast-btn ast-btn--secondary ast-btn--sm" style={{ color: '#c62828' }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Vendor Requests + Category Breakdown ── */}
            <div className="ast-layout--split">

                {/* LEFT: Vendor Requests */}
                <div>
                    <div className="ast-card" style={{ marginBottom: 0 }}>
                        <div className="ast-card__header">
                            <span className="ast-card__title">Vendor Requests</span>
                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                <span style={{ fontSize: 11, color: '#888' }}>
                                    {VENDOR_REQUESTS.filter(r => {
                                        const s = requestStatuses[r.id] || r.status;
                                        return s === 'pending' || s === 'over-limit';
                                    }).length} pending review
                                </span>
                            </div>
                        </div>
                        <table className="ast-table">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Asset</th>
                                    <th>Allocated</th>
                                    <th>Requested</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {VENDOR_REQUESTS.map(r => {
                                    const status = requestStatuses[r.id] || r.status;
                                    const isActionable = status === 'pending' || status === 'over-limit';
                                    return (
                                        <tr key={r.id}>
                                            <td style={{ fontWeight: 600 }}>{r.vendorName}</td>
                                            <td style={{ color: '#555' }}>{r.assetName}</td>
                                            <td style={{ fontWeight: 600 }}>{r.allocated}</td>
                                            <td style={{ fontWeight: 600, color: r.requested > r.allocated ? '#c62828' : '#111' }}>
                                                {r.requested}
                                                {r.requested > r.allocated && (
                                                    <span style={{ fontSize: 10, color: '#c62828', marginLeft: 4 }}>
                                                        (+{r.requested - r.allocated})
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <span className={`ast-pill ast-pill--${status}`}>
                                                    {STATUS_LABEL[status]}
                                                </span>
                                            </td>
                                            <td>
                                                {isActionable ? (
                                                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                                                        <button
                                                            className="ast-btn ast-btn--approve ast-btn--sm"
                                                            onClick={() => onApprove(r.id)}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="ast-btn ast-btn--deny ast-btn--sm"
                                                            onClick={() => onDeny(r.id)}
                                                        >
                                                            Deny
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span style={{ fontSize: 11, color: '#bbb', display: 'block', textAlign: 'right' }}>—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT: Category Breakdown + Allocation Stats */}
                <div>
                    <div className="ast-card">
                        <div className="ast-card__header">
                            <span className="ast-card__title">Category Breakdown</span>
                        </div>
                        <div className="ast-card__body">
                            {CATEGORIES.map(c => (
                                <div key={c.label} className="ast-cat-bar-row">
                                    <span className="ast-cat-bar-label">{c.label}</span>
                                    <div className="ast-cat-bar-bg">
                                        <div
                                            className="ast-cat-bar-fill"
                                            style={{ width: `${(c.count / maxCat) * 100}%`, background: c.color }}
                                        />
                                    </div>
                                    <span className="ast-cat-bar-count">{c.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="ast-card" style={{ marginBottom: 0 }}>
                        <div className="ast-card__header">
                            <span className="ast-card__title">Allocation Summary</span>
                        </div>
                        <div className="ast-card__body">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#888' }}>Total Requests</span>
                                    <span style={{ fontWeight: 600 }}>{VENDOR_REQUESTS.length}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#888' }}>Approved</span>
                                    <span style={{ fontWeight: 600, color: '#27AE60' }}>
                                        {VENDOR_REQUESTS.filter(r => (requestStatuses[r.id] || r.status) === 'approved').length}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#888' }}>Pending Review</span>
                                    <span style={{ fontWeight: 600, color: '#F39C12' }}>
                                        {VENDOR_REQUESTS.filter(r => {
                                            const s = requestStatuses[r.id] || r.status;
                                            return s === 'pending' || s === 'over-limit';
                                        }).length}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#888' }}>Denied</span>
                                    <span style={{ fontWeight: 600, color: '#999' }}>
                                        {VENDOR_REQUESTS.filter(r => (requestStatuses[r.id] || r.status) === 'denied').length}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #eee' }}>
                                    <span style={{ color: '#888' }}>Vendors</span>
                                    <span style={{ fontWeight: 600 }}>
                                        {[...new Set(VENDOR_REQUESTS.map(r => r.vendorName))].length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
