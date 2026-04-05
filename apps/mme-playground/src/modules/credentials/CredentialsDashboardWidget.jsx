import React from 'react';

// Dashboard-level aggregate data
const allocationByType = [
    { label: 'Vendors', count: 1400, max: 2000 },
    { label: 'Staff', count: 1200, max: 2000 },
    { label: 'Artists & Crew', count: 850, max: 2000 },
    { label: 'VIP', count: 450, max: 2000 },
    { label: 'Media / Press', count: 320, max: 2000 },
];

const hourlyCheckins = [
    { hour: '8 AM', count: 820 },
    { hour: '9 AM', count: 1450 },
    { hour: '10 AM', count: 2100 },
    { hour: '11 AM', count: 1800 },
    { hour: '12 PM', count: 2400 },
    { hour: '1 PM', count: 1600 },
    { hour: '2 PM', count: 1200 },
    { hour: '3 PM', count: 980 },
];
const maxHourly = Math.max(...hourlyCheckins.map(h => h.count));
const totalCheckedIn = hourlyCheckins.reduce((a, h) => a + h.count, 0);

export default function CredentialsDashboardWidget({ onNavigate, sidebarExtra }) {
    return (
        <div className="cred-widget">
            <div className="cred-widget__row">
                {/* ─── LEFT COLUMN: Phases + Issuance Status ─── */}
                <div className="cred-widget__main">
                    
                    {/* 4 Phase Sub-Widgets */}
                    <div className="cred-widget__phases">
                        {/* Phase 1: Configuration */}
                        <div className="cred-widget__subwidget" onClick={() => onNavigate('config')}>
                            <div className="cred-widget__subwidget-header">
                                <span className="cred-widget__subwidget-num">1</span>
                                <span className="cred-widget__subwidget-label">Configuration</span>
                                <span className="cred-widget__subwidget-arrow">→</span>
                            </div>
                            <div className="cred-widget__subwidget-body">
                                <div className="cred-widget__subwidget-stat">
                                    <span className="cred-widget__subwidget-stat-val">7</span>
                                    <span className="cred-widget__subwidget-stat-label">Credential Types</span>
                                </div>
                                <div className="cred-widget__subwidget-stat">
                                    <span className="cred-widget__subwidget-stat-val">5</span>
                                    <span className="cred-widget__subwidget-stat-label">Workflows</span>
                                </div>
                                <div className="cred-widget__subwidget-stat">
                                    <span className="cred-widget__subwidget-stat-val">4</span>
                                    <span className="cred-widget__subwidget-stat-label">Item Blocks</span>
                                </div>
                            </div>
                            <div className="cred-widget__subwidget-foot">
                                <span className="cred-widget__subwidget-status cred-widget__subwidget-status--ok">✓ Setup Complete</span>
                            </div>
                        </div>

                        {/* Phase 2: Collection */}
                        <div className="cred-widget__subwidget" onClick={() => onNavigate('collection')}>
                            <div className="cred-widget__subwidget-header">
                                <span className="cred-widget__subwidget-num">2</span>
                                <span className="cred-widget__subwidget-label">Collection</span>
                                <span className="cred-widget__subwidget-arrow">→</span>
                            </div>
                            <div className="cred-widget__subwidget-body">
                                <div className="cred-widget__subwidget-big">
                                    <span className="cred-widget__subwidget-big-val">37 / 51</span>
                                    <span className="cred-widget__subwidget-big-label">Personnel Submitted</span>
                                </div>
                                <div className="cred-widget__subwidget-mini-bar">
                                    <div className="cred-widget__subwidget-mini-fill" style={{ width: '72%' }} />
                                </div>
                            </div>
                            <div className="cred-widget__subwidget-foot">
                                <span className="cred-widget__subwidget-status cred-widget__subwidget-status--warn">△ 1 Group Overdue</span>
                                <span className="cred-widget__subwidget-foot-detail">3 complete · 1 partial · 1 empty</span>
                            </div>
                        </div>

                        {/* Phase 3: Review & Approval */}
                        <div className="cred-widget__subwidget cred-widget__subwidget--alert" onClick={() => onNavigate('review')}>
                            <div className="cred-widget__subwidget-header">
                                <span className="cred-widget__subwidget-num">3</span>
                                <span className="cred-widget__subwidget-label">Review & Approval</span>
                                <span className="cred-widget__subwidget-arrow">→</span>
                            </div>
                            <div className="cred-widget__subwidget-body">
                                <div className="cred-widget__subwidget-big">
                                    <span className="cred-widget__subwidget-big-val" style={{ fontSize: 32 }}>4</span>
                                    <span className="cred-widget__subwidget-big-label">Pending Review</span>
                                </div>
                                <div className="cred-widget__subwidget-breakdown">
                                    <span><strong>7</strong> approved</span>
                                    <span><strong>4</strong> pending</span>
                                    <span><strong>1</strong> denied</span>
                                </div>
                            </div>
                            <div className="cred-widget__subwidget-foot">
                                <span className="cred-widget__subwidget-status cred-widget__subwidget-status--action">◉ Action Required</span>
                            </div>
                        </div>

                        {/* Phase 4: Issuance & Onsite */}
                        <div className="cred-widget__subwidget" onClick={() => onNavigate('issuance')}>
                            <div className="cred-widget__subwidget-header">
                                <span className="cred-widget__subwidget-num">4</span>
                                <span className="cred-widget__subwidget-label">Issuance & On-Site</span>
                                <span className="cred-widget__subwidget-arrow">→</span>
                            </div>
                            <div className="cred-widget__subwidget-body">
                                <div className="cred-widget__subwidget-stat">
                                    <span className="cred-widget__subwidget-stat-val">7</span>
                                    <span className="cred-widget__subwidget-stat-label">Print Queue</span>
                                </div>
                                <div className="cred-widget__subwidget-stat">
                                    <span className="cred-widget__subwidget-stat-val">4/7</span>
                                    <span className="cred-widget__subwidget-stat-label">Picked Up</span>
                                </div>
                                <div className="cred-widget__subwidget-stat">
                                    <span className="cred-widget__subwidget-stat-val">3</span>
                                    <span className="cred-widget__subwidget-stat-label">Checked In</span>
                                </div>
                            </div>
                            <div className="cred-widget__subwidget-foot">
                                <span className="cred-widget__subwidget-status cred-widget__subwidget-status--ok">⎙ 14/14 Printers Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Credential Issuance Status (overview infographic) */}
                    <div className="cred-widget__card" style={{ marginBottom: 0 }}>
                        <div className="cred-widget__card-header">
                            <div className="cred-widget__card-title">
                                <span className="cred-widget__card-icon">⊡</span>
                                Credential Issuance Status
                            </div>
                        </div>

                        <div className="cred-widget__stats-row">
                            <div>
                                <div className="cred-widget__big-number">4,289</div>
                                <div className="cred-widget__big-label">Total Requests</div>
                            </div>
                            <div className="cred-widget__target">
                                <div className="cred-widget__target-pct">89% Approved</div>
                                <div className="cred-widget__target-sub">Target: 95% by Friday</div>
                            </div>
                        </div>

                        <div className="cred-widget__stacked-bar">
                            <div className="cred-widget__stacked-seg cred-widget__stacked-seg--approved" style={{ width: '89%' }} />
                            <div className="cred-widget__stacked-seg cred-widget__stacked-seg--pending" style={{ width: '6%' }} />
                            <div className="cred-widget__stacked-seg cred-widget__stacked-seg--hold" style={{ width: '3%' }} />
                            <div className="cred-widget__stacked-seg cred-widget__stacked-seg--denied" style={{ width: '2%' }} />
                        </div>

                        <div className="cred-widget__legend">
                            <span className="cred-widget__legend-item"><span className="cred-widget__legend-dot cred-widget__legend-dot--approved" /> 3,817 Approved</span>
                            <span className="cred-widget__legend-item"><span className="cred-widget__legend-dot cred-widget__legend-dot--pending" /> 257 Pending</span>
                            <span className="cred-widget__legend-item"><span className="cred-widget__legend-dot cred-widget__legend-dot--hold" /> 128 Security Hold</span>
                            <span className="cred-widget__legend-item"><span className="cred-widget__legend-dot cred-widget__legend-dot--denied" /> 87 Denied</span>
                        </div>

                        <div className="cred-widget__bottom-grid">
                            <div className="cred-widget__alloc">
                                <div className="cred-widget__alloc-title">Allocation by Type</div>
                                {allocationByType.map(a => (
                                    <div key={a.label} className="cred-widget__alloc-row">
                                        <span className="cred-widget__alloc-label">{a.label}</span>
                                        <div className="cred-widget__alloc-bar">
                                            <div className="cred-widget__alloc-fill" style={{ width: `${(a.count / a.max) * 100}%` }} />
                                        </div>
                                        <span className="cred-widget__alloc-count">{a.count.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="cred-widget__right-stack">
                                <div className="cred-widget__action-card">
                                    <div className="cred-widget__action-header">
                                        <span>Action Required</span>
                                        <span className="cred-widget__action-warn">△</span>
                                    </div>
                                    <p className="cred-widget__action-text">28 Vendor applications require immediate site manager clearance for loading dock access.</p>
                                    <button className="cred-widget__action-btn" onClick={() => onNavigate('review')}>Review Holds</button>
                                </div>
                                <div className="cred-widget__hw-card">
                                    <div className="cred-widget__hw-row">
                                        <div>
                                            <div className="cred-widget__hw-title">Hardware Status</div>
                                            <div className="cred-widget__hw-sub">14/14 Printers Online</div>
                                        </div>
                                        <span className="cred-widget__hw-icon">⎙</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── RIGHT COLUMN: Live Attendance + Support Tickets ─── */}
                <div className="cred-widget__sidebar">
                    <div className="cred-widget__card">
                        <div className="cred-widget__card-header">
                            <div className="cred-widget__card-title">
                                <span className="cred-widget__card-icon" style={{ background: '#333' }}>↗</span>
                                Live Attendance
                            </div>
                        </div>
                        <div className="cred-widget__attendance">
                            <div className="cred-widget__attendance-num">{totalCheckedIn.toLocaleString()}</div>
                            <div className="cred-widget__attendance-label">Checked in Today</div>
                        </div>
                        <div className="cred-widget__chart">
                            {hourlyCheckins.map(h => (
                                <div key={h.hour} className="cred-widget__chart-col">
                                    <div className="cred-widget__chart-bar-wrap">
                                        <div className="cred-widget__chart-bar" style={{ height: `${(h.count / maxHourly) * 100}%` }} />
                                    </div>
                                    <span className="cred-widget__chart-label">{h.hour}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {sidebarExtra && (
                        <div style={{ marginTop: 0 }}>
                            {sidebarExtra}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
