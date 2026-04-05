import React from 'react';
import { groups, personnelRoster, credentialTypes } from './data';

export default function Phase2Collection() {
    const totalSubmitted = groups.reduce((a, g) => a + g.submitted, 0);
    const totalExpected = groups.reduce((a, g) => a + g.total, 0);

    return (
        <div className="cred-phase">
            <div className="cred-phase__title">Phase 2 — Collection</div>
            <div className="cred-phase__subtitle">Stakeholder submissions: headcounts and individual personnel rosters</div>

            {/* Summary Counters */}
            <div className="cred-counters">
                <div className="cred-counter">
                    <div className="cred-counter__value">{groups.length}</div>
                    <div className="cred-counter__label">Groups</div>
                </div>
                <div className="cred-counter">
                    <div className="cred-counter__value">{totalSubmitted} / {totalExpected}</div>
                    <div className="cred-counter__label">Personnel Submitted</div>
                </div>
                <div className="cred-counter">
                    <div className="cred-counter__value">{groups.filter(g => g.status === 'submitted').length}</div>
                    <div className="cred-counter__label">Complete</div>
                </div>
                <div className="cred-counter">
                    <div className="cred-counter__value" style={{ color: '#c62828' }}>{groups.filter(g => g.status === 'overdue').length}</div>
                    <div className="cred-counter__label">Overdue</div>
                </div>
            </div>

            {/* Group Status Table */}
            <div className="cred-card">
                <div className="cred-card__header">
                    <span>Group Submission Status</span>
                    <button className="cred-card__header-action">Send Reminders</button>
                </div>
                <table className="cred-table">
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th>Type</th>
                            <th>Contact</th>
                            <th>Progress</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(g => (
                            <tr key={g.id}>
                                <td><strong>{g.name}</strong></td>
                                <td><span className="cred-zone">{g.type}</span></td>
                                <td style={{ fontSize: 12, color: '#666' }}>{g.contact}</td>
                                <td>
                                    <div className="cred-progress">
                                        <div className="cred-progress__bar">
                                            <div className="cred-progress__fill" style={{ width: `${g.total > 0 ? (g.submitted / g.total) * 100 : 0}%` }} />
                                        </div>
                                        <span className="cred-progress__text">{g.submitted} / {g.total}</span>
                                    </div>
                                </td>
                                <td><span className={`cred-pill cred-pill--${g.status}`}>{g.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Personnel Roster (sample from one group) */}
            <div className="cred-card">
                <div className="cred-card__header">
                    <span>Personnel Roster — Acme AV Solutions</span>
                    <button className="cred-card__header-action">+ Add Person</button>
                </div>
                <table className="cred-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Credential Type</th>
                            <th>Status</th>
                            <th>Barcode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personnelRoster.filter(p => p.groupId === 'acme-av').map(p => {
                            const ct = credentialTypes.find(c => c.id === p.type);
                            return (
                                <tr key={p.id}>
                                    <td><strong>{p.name}</strong></td>
                                    <td style={{ fontSize: 12, color: '#666' }}>{p.role}</td>
                                    <td>
                                        <span className="cred-type-tag">
                                            <span className="cred-type-dot" style={{ background: ct?.color || '#999', marginRight: 0 }} />
                                            {ct?.name || p.type}
                                        </span>
                                    </td>
                                    <td><span className={`cred-pill cred-pill--${p.status}`}>{p.status}</span></td>
                                    <td style={{ fontSize: 11, color: '#999' }}>{p.barcode || '—'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
