import React from 'react';
import { DISTRIBUTION_LOG, BILLBACK_BY_VENDOR, RETURN_STATUS, BILLBACK } from './data';

const totalDistributed = DISTRIBUTION_LOG.reduce((s, r) => s + r.distributed, 0);
const totalReturned    = DISTRIBUTION_LOG.reduce((s, r) => s + r.returned, 0);
const totalPending     = totalDistributed - totalReturned;

export default function Phase2DistributionBillback({ showToast }) {
    return (
        <div className="ast-layout--full">

            {/* Stat cards */}
            <div className="ast-stat-row">
                <div className="ast-stat-card">
                    <div className="ast-stat-card__label">Total Distributed</div>
                    <div className="ast-stat-card__value">{totalDistributed}</div>
                    <div className="ast-stat-card__sub">units across {DISTRIBUTION_LOG.length} entries</div>
                </div>
                <div className="ast-stat-card">
                    <div className="ast-stat-card__label">Total Returned</div>
                    <div className="ast-stat-card__value" style={{ color: '#27AE60' }}>{totalReturned}</div>
                    <div className="ast-stat-card__sub">{Math.round((totalReturned / totalDistributed) * 100)}% return rate</div>
                </div>
                <div className="ast-stat-card ast-stat-card--warn">
                    <div className="ast-stat-card__label">Pending Return</div>
                    <div className="ast-stat-card__value">{totalPending}</div>
                    <div className="ast-stat-card__sub">units not yet returned</div>
                </div>
            </div>

            {/* Distribution Log table — full width */}
            <div className="ast-card">
                <div className="ast-card__header">
                    <span className="ast-card__title">Distribution Log</span>
                    <button
                        className="ast-btn ast-btn--secondary ast-btn--sm"
                        onClick={() => showToast('Distribution sheet exported.')}
                    >
                        ⎙ Export PDF
                    </button>
                </div>
                <table className="ast-table">
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Vendor</th>
                            <th>Distributed</th>
                            <th>Returned</th>
                            <th>Pending</th>
                            <th>Days</th>
                            <th>Price / Day</th>
                            <th>Billback (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DISTRIBUTION_LOG.map(r => {
                            const pending = r.distributed - r.returned;
                            return (
                                <tr key={r.id}>
                                    <td style={{ fontWeight: 600 }}>{r.assetName}</td>
                                    <td style={{ color: '#666' }}>{r.vendorName}</td>
                                    <td style={{ fontWeight: 600 }}>{r.distributed}</td>
                                    <td style={{ color: '#27AE60', fontWeight: 600 }}>{r.returned}</td>
                                    <td style={{ color: pending > 0 ? '#F39C12' : '#bbb', fontWeight: 600 }}>
                                        {pending > 0 ? pending : '—'}
                                    </td>
                                    <td style={{ color: '#666' }}>{r.days}d</td>
                                    <td style={{ color: '#888' }}>₹{r.pricePerDay.toLocaleString('en-IN')}</td>
                                    <td>
                                        <span className="ast-amount">
                                            ₹{r.billbackAmount.toLocaleString('en-IN')}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Billback by Vendor + Return Status + Total ── */}
            <div className="ast-layout--split" style={{ alignItems: 'stretch' }}>

                {/* LEFT: Billback by Vendor */}
                <div>
                    <div className="ast-card" style={{ marginBottom: 0 }}>
                        <div className="ast-card__header">
                            <span className="ast-card__title">Billback by Vendor</span>
                        </div>
                        <table className="ast-table">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Assets Used</th>
                                    <th>Total Billback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {BILLBACK_BY_VENDOR.map(v => (
                                    <tr key={v.vendorName}>
                                        <td style={{ fontWeight: 600 }}>{v.vendorName}</td>
                                        <td style={{ color: '#666' }}>{v.assetCount} asset type{v.assetCount > 1 ? 's' : ''}</td>
                                        <td>
                                            <span className="ast-amount">₹{v.total.toLocaleString('en-IN')}</span>
                                        </td>
                                    </tr>
                                ))}
                                <tr style={{ background: '#f9f9f9', borderTop: '2px solid #eee' }}>
                                    <td style={{ fontWeight: 700, color: '#111' }}>Total</td>
                                    <td />
                                    <td>
                                        <span className="ast-amount" style={{ fontSize: 14 }}>
                                            ₹{BILLBACK.totalAmount.toLocaleString('en-IN')}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ padding: '12px 16px', borderTop: '1px solid #eee' }}>
                            <div className="ast-export-row" style={{ marginTop: 0 }}>
                                <button
                                    className="ast-btn ast-btn--primary"
                                    onClick={() => showToast('Billback CSV exported successfully.')}
                                >
                                    ⎙ Export Billback CSV
                                </button>
                                <button
                                    className="ast-btn ast-btn--secondary"
                                    onClick={() => showToast('Billback data copied to clipboard.')}
                                >
                                    Copy Data
                                </button>
                            </div>
                            <div style={{ marginTop: 8, fontSize: 11, color: '#aaa' }}>
                                Billback invoices are processed externally. Export CSV for your finance system.
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Return Status + Billback Total */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="ast-card">
                        <div className="ast-card__header">
                            <span className="ast-card__title">Return Status</span>
                        </div>
                        <div className="ast-return-strip">
                            <div className="ast-return-cell ast-return-cell--ok">
                                <div className="ast-return-cell__num">{RETURN_STATUS.returned}</div>
                                <div className="ast-return-cell__label">Returned</div>
                            </div>
                            <div className="ast-return-cell ast-return-cell--warn">
                                <div className="ast-return-cell__num">{RETURN_STATUS.pending}</div>
                                <div className="ast-return-cell__label">Pending</div>
                            </div>
                            <div className={`ast-return-cell ${RETURN_STATUS.unreturned > 0 ? 'ast-return-cell--err' : 'ast-return-cell--ok'}`}>
                                <div className="ast-return-cell__num">{RETURN_STATUS.unreturned}</div>
                                <div className="ast-return-cell__label">Unreturned</div>
                            </div>
                        </div>
                    </div>

                    <div className="ast-billback-total" style={{ marginTop: 'auto' }}>
                        <div className="ast-billback-total__label">Total Billback</div>
                        <div className="ast-billback-total__amount">
                            ₹{BILLBACK.totalAmount.toLocaleString('en-IN')}
                        </div>
                        <div className="ast-billback-total__sub">
                            {BILLBACK.vendorCount} vendors · {DISTRIBUTION_LOG.length} asset types · {DISTRIBUTION_LOG[0]?.days ?? 3} days
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
