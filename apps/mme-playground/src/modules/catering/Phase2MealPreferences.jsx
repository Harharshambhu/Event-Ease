import React, { useState } from 'react';
import { MEAL_SUBMISSIONS, DIETARY_AGGREGATE } from './data';

function MealTypePill({ type }) {
    const key = type.toLowerCase().replace(/[^a-z]/g, '-');
    return <span className={`cat-meal-pill cat-meal-pill--${key}`}>{type}</span>;
}

const maxDietary = Math.max(...DIETARY_AGGREGATE.map(d => d.count));

export default function Phase2MealPreferences({ showToast }) {
    const [search, setSearch] = useState('');
    const [filterMeal, setFilterMeal] = useState('All');

    const filtered = MEAL_SUBMISSIONS.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                            s.company.toLowerCase().includes(search.toLowerCase());
        const matchMeal   = filterMeal === 'All' || s.mealType === filterMeal;
        return matchSearch && matchMeal;
    });

    return (
        <div className="cat-layout--split">

            {/* ── LEFT: Main Content ── */}
            <div>
                {/* Stat Cards */}
                <div className="cat-stat-row">
                    <div className="cat-stat-card">
                        <div className="cat-stat-card__label">Total Submitted</div>
                        <div className="cat-stat-card__value">147 <span style={{ fontSize: 16, fontWeight: 500, color: '#999' }}>/ 200</span></div>
                        <div className="cat-stat-card__sub">73.5% completion</div>
                    </div>
                    <div className="cat-stat-card cat-stat-card--warn">
                        <div className="cat-stat-card__label">Pending</div>
                        <div className="cat-stat-card__value">53</div>
                        <div className="cat-stat-card__sub">Reminder sent Mar 28</div>
                    </div>
                    <div className="cat-stat-card">
                        <div className="cat-stat-card__label">Deadline</div>
                        <div className="cat-stat-card__value" style={{ fontSize: 20, color: '#c62828' }}>Apr 5</div>
                        <div className="cat-stat-card__sub">3 days remaining</div>
                    </div>
                </div>

                {/* Individual Submissions Table */}
                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Individual Submissions</span>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <select
                                value={filterMeal}
                                onChange={e => setFilterMeal(e.target.value)}
                                style={{ fontSize: 11, padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4, background: '#fff', cursor: 'pointer' }}
                            >
                                <option>All</option>
                                <option>Veg</option>
                                <option>Non-Veg</option>
                                <option>Jain</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Search name or company..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ fontSize: 11, padding: '4px 10px', border: '1px solid #ccc', borderRadius: 4, width: 180 }}
                            />
                            <button
                                className="cat-btn cat-btn--outline cat-btn--sm"
                                onClick={() => showToast('Reminder sent to 53 pending guests.')}
                            >
                                Send Reminder
                            </button>
                        </div>
                    </div>
                    <table className="cat-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Meal Type</th>
                                <th>Dietary</th>
                                <th>Submitted</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(s => (
                                <tr key={s.id}>
                                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                                    <td style={{ fontSize: 11, color: '#666' }}>{s.company}</td>
                                    <td><MealTypePill type={s.mealType} /></td>
                                    <td style={{ fontSize: 11, color: '#555' }}>
                                        {s.dietary === 'None'
                                            ? <span style={{ color: '#bbb' }}>—</span>
                                            : s.dietary}
                                    </td>
                                    <td style={{ fontSize: 11, color: '#999' }}>
                                        {s.submittedAt ?? <span style={{ color: '#bbb' }}>—</span>}
                                    </td>
                                    <td>
                                        <span className={`cat-pill cat-pill--${s.status}`}>{s.status}</span>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', color: '#bbb', padding: '20px 0' }}>
                                        No results
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div style={{ padding: '10px 16px', background: '#fafafa', borderTop: '1px solid #eee', fontSize: 11, color: '#888' }}>
                        Showing {filtered.length} of {MEAL_SUBMISSIONS.length} (sample) — 147 total submissions in production
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <div>
                {/* Dietary Breakdown */}
                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Dietary Breakdown</span>
                    </div>
                    <div className="cat-card__body">
                        {DIETARY_AGGREGATE.map(d => (
                            <div key={d.label} className="cat-dietary-bar-row">
                                <span className="cat-dietary-label">{d.label}</span>
                                <div className="cat-dietary-bar-bg">
                                    <div
                                        className="cat-dietary-bar-fill"
                                        style={{ width: `${(d.count / maxDietary) * 100}%` }}
                                    />
                                </div>
                                <span className="cat-dietary-count">{d.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sync Status */}
                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Module Sync</span>
                    </div>
                    <div className="cat-card__body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div className="cat-sync-status cat-sync-status--ok">
                            <span className="cat-sync-status__icon">✓</span>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: 2 }}>Synced to Credentials Module</div>
                                <div style={{ fontSize: 11, opacity: 0.8 }}>312 guests · dietary auto-imported</div>
                            </div>
                        </div>
                        <div className="cat-sync-status cat-sync-status--warn">
                            <span className="cat-sync-status__icon">△</span>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: 2 }}>53 guests not yet submitted</div>
                                <div style={{ fontSize: 11, opacity: 0.8 }}>Deadline Apr 5 — reminder sent</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
