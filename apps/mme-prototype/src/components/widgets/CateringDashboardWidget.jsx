import React from 'react';

const DIETARY_AGGREGATE = [
    { label: 'Vegetarian',     count: 89 },
    { label: 'Non Vegetarian', count: 47 },
    { label: 'Vegan',          count: 34 },
    { label: 'Jain',           count: 21 },
];

const LIVE_MEAL_SERVICE = [
    { meal: 'Breakfast', served: 148, total: 173, status: 'done'     },
    { meal: 'Lunch',     served: 91,  total: 173, status: 'active'   },
    { meal: 'Hi-Tea',    served: 0,   total: 173, status: 'upcoming' },
];

const OCCASIONS = [
    { id: 1, name: 'Inauguration Session', serviceStyle: 'Mixed (Packet + Plated)' },
    { id: 2, name: 'Budget Session Days',  serviceStyle: 'Plated'                  },
];

const VENDOR = { name: 'Delhi Catering Co.' };

const maxDietary = Math.max(...DIETARY_AGGREGATE.map(d => d.count));

const MEAL_COLOURS = {
    'Vegetarian':     '#27AE60',
    'Non Vegetarian': '#E74C3C',
    'Vegan':          '#8E44AD',
    'Jain':           '#F39C12',
};

export default function CateringDashboardWidget({ onNavigate }) {
    return (
        <div className="cat-widget">
            <div className="cat-widget__row">

                {/* ── LEFT: Catering Overview infographic ── */}
                <div>
                    <div className="cat-widget__card" style={{ marginBottom: 0 }}>
                        <div className="cat-widget__card-header">
                            <div className="cat-widget__card-title">
                                <span className="cat-widget__card-icon">◇</span>
                                Catering Overview
                            </div>
                        </div>

                        <div className="cat-widget__infographic">
                            <div>
                                <div className="cat-widget__section-title">Dietary Breakdown</div>
                                {DIETARY_AGGREGATE.map(d => (
                                    <div key={d.label} className="cat-widget__bar-row">
                                        <span className="cat-widget__bar-label">{d.label}</span>
                                        <div className="cat-widget__bar-bg">
                                            <div
                                                className="cat-widget__bar-fill"
                                                style={{
                                                    width: `${(d.count / maxDietary) * 100}%`,
                                                    background: MEAL_COLOURS[d.label] || '#555',
                                                }}
                                            />
                                        </div>
                                        <span className="cat-widget__bar-count">{d.count}</span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <div className="cat-widget__section-title">Service Style Split</div>
                                {OCCASIONS.map(o => (
                                    <div key={o.id} className="cat-widget__service-item">
                                        <span style={{ fontSize: 12, color: '#333', fontWeight: 500 }}>{o.name}</span>
                                        <span style={{ fontSize: 11, color: '#888' }}>{o.serviceStyle}</span>
                                    </div>
                                ))}
                                <div style={{ marginTop: 12, padding: '8px 10px', background: '#fff8e1', borderRadius: 4, border: '1px solid #ffe082' }}>
                                    <div style={{ marginBottom: 4 }}>
                                        <span style={{ display: 'inline-block', padding: '2px 7px', background: '#F39C12', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 4 }}>△ Action Required</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: '#555' }}>53 meal preferences still pending. Deadline Apr 5.</div>
                                </div>
                            </div>
                        </div>

                        {/* Live Meal Service */}
                        <div className="cat-widget__live-meals">
                            <div className="cat-widget__section-title" style={{ padding: '0 14px', marginBottom: 10 }}>Live Meal Service</div>
                            <div className="cat-widget__live-meals-row">
                                {LIVE_MEAL_SERVICE.map(m => {
                                    const pct = Math.round((m.served / m.total) * 100);
                                    return (
                                        <div key={m.meal} className="cat-widget__live-meal-cell">
                                            <div className="cat-widget__live-meal-top">
                                                <span className="cat-widget__meal-name">{m.meal}</span>
                                                <span className={`cat-widget__meal-badge cat-widget__meal-badge--${m.status}`}>{m.status}</span>
                                            </div>
                                            <div className="cat-widget__live-meal-nums">
                                                <span className="cat-widget__live-meal-served">{m.served}</span>
                                                <span className="cat-widget__live-meal-sep"> / </span>
                                                <span className="cat-widget__live-meal-total">{m.total}</span>
                                                <span className="cat-widget__live-meal-pct">{pct}%</span>
                                            </div>
                                            <div className="cat-widget__bar-bg" style={{ marginTop: 6 }}>
                                                <div
                                                    className="cat-widget__bar-fill"
                                                    style={{
                                                        width: `${pct}%`,
                                                        background: m.status === 'done' ? '#bbb' : m.status === 'active' ? '#27AE60' : '#bbdefb',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: sub-widgets + Vendor Status ── */}
                <div>
                    <div className="cat-widget__sub" style={{ marginBottom: 12 }} onClick={() => onNavigate && onNavigate('occasion-setup')}>
                        <div className="cat-widget__sub-header">
                            <span className="cat-widget__sub-num">1</span>
                            <span className="cat-widget__sub-label">Catering Setup</span>
                            <span className="cat-widget__sub-arrow">→</span>
                        </div>
                        <div className="cat-widget__sub-stat">
                            <span className="cat-widget__sub-val">2</span>
                            <span className="cat-widget__sub-lbl">Occasions</span>
                        </div>
                        <div className="cat-widget__sub-foot">
                            <span className="cat-widget__status cat-widget__status--ok">✓ Setup Complete</span>
                        </div>
                    </div>

                    <div className="cat-widget__sub" style={{ marginBottom: 12 }} onClick={() => onNavigate && onNavigate('count-lock')}>
                        <div className="cat-widget__sub-header">
                            <span className="cat-widget__sub-num">2</span>
                            <span className="cat-widget__sub-label">Final Count</span>
                            <span className="cat-widget__sub-arrow">→</span>
                        </div>
                        <div className="cat-widget__sub-stat">
                            <span className="cat-widget__sub-val">173</span>
                            <span className="cat-widget__sub-lbl">meals locked</span>
                        </div>
                        <div className="cat-widget__sub-foot">
                            <span className="cat-widget__status cat-widget__status--lock">Locked</span>
                        </div>
                    </div>

                    <div className="cat-widget__card" style={{ marginBottom: 0 }}>
                        <div className="cat-widget__card-header">
                            <div className="cat-widget__card-title">
                                <span className="cat-widget__card-icon" style={{ background: '#555' }}>⊡</span>
                                Vendor Status
                            </div>
                        </div>
                        <div className="cat-widget__vendor-row"><span>Invoice Received</span><span className="cat-widget__vendor-ok">✓ Yes</span></div>
                        <div className="cat-widget__vendor-row"><span>Tax Docs</span><span className="cat-widget__vendor-ok">✓ Complete</span></div>
                        <div className="cat-widget__vendor-row"><span>Payment</span><span style={{ fontSize: 11, fontWeight: 600, color: '#1A365D' }}>Processed</span></div>
                        <div className="cat-widget__vendor-row"><span>Variance</span><span className="cat-widget__vendor-warn">+₹2,500</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
