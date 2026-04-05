import React from 'react';
import { approvalQueue, personnelRoster, credentialTypes, groups } from './data';

export default function Phase3Review() {
    const approved = personnelRoster.filter(p => p.status === 'approved').length;
    const pending = personnelRoster.filter(p => p.status === 'pending').length;
    const denied = personnelRoster.filter(p => p.status === 'denied').length;

    return (
        <div className="cred-phase">
            <div className="cred-phase__title">Phase 3 — Review & Approval</div>
            <div className="cred-phase__subtitle">Centralized queue for admins to approve, deny, or request changes</div>

            {/* Summary Counters */}
            <div className="cred-counters">
                <div className="cred-counter">
                    <div className="cred-counter__value" style={{ color: '#2e7d32' }}>{approved}</div>
                    <div className="cred-counter__label">Approved</div>
                </div>
                <div className="cred-counter">
                    <div className="cred-counter__value" style={{ color: '#f57f17' }}>{pending}</div>
                    <div className="cred-counter__label">Pending Review</div>
                </div>
                <div className="cred-counter">
                    <div className="cred-counter__value" style={{ color: '#c62828' }}>{denied}</div>
                    <div className="cred-counter__label">Denied</div>
                </div>
                <div className="cred-counter">
                    <div className="cred-counter__value">{personnelRoster.length}</div>
                    <div className="cred-counter__label">Total Credentials</div>
                </div>
            </div>

            {/* Approval Queue */}
            <div className="cred-card">
                <div className="cred-card__header">
                    <span>Approval Queue — Pending ({pending})</span>
                    <button className="cred-card__header-action">Bulk Approve All</button>
                </div>
                <table className="cred-table">
                    <thead>
                        <tr>
                            <th>Person</th>
                            <th>Group</th>
                            <th>Credential Type</th>
                            <th>Approval Chain</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvalQueue.map(p => {
                            const ct = credentialTypes.find(c => c.id === p.type);
                            const group = groups.find(g => g.id === p.groupId);
                            return (
                                <tr key={p.id}>
                                    <td>
                                        <div>
                                            <strong>{p.name}</strong>
                                            <div style={{ fontSize: 11, color: '#999' }}>{p.role}</div>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: 12 }}>{group?.name || p.groupId}</td>
                                    <td>
                                        <span className="cred-type-tag">
                                            <span className="cred-type-dot" style={{ background: ct?.color || '#999', marginRight: 0 }} />
                                            {ct?.name || p.type}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="cred-workflow">
                                            <span className="cred-workflow__step" style={{ background: '#fff8e1', color: '#f57f17' }}>⊙ Awaiting review</span>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="cred-btn-group" style={{ justifyContent: 'flex-end' }}>
                                            <button className="cred-btn cred-btn--approve">✓ Approve</button>
                                            <button className="cred-btn cred-btn--deny">✗ Deny</button>
                                            <button className="cred-btn">↩ Request Change</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Status Report */}
            <div className="cred-card">
                <div className="cred-card__header">
                    <span>Status Report — By Group</span>
                    <button className="cred-card__header-action">Export CSV</button>
                </div>
                <table className="cred-table">
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th>Approved</th>
                            <th>Pending</th>
                            <th>Denied</th>
                            <th>Completion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(g => {
                            const roster = personnelRoster.filter(p => p.groupId === g.id);
                            const gApproved = roster.filter(p => p.status === 'approved').length;
                            const gPending = roster.filter(p => p.status === 'pending').length;
                            const gDenied = roster.filter(p => p.status === 'denied').length;
                            const total = roster.length;
                            return (
                                <tr key={g.id}>
                                    <td>
                                        <div>
                                            <strong>{g.name}</strong>
                                            <div style={{ fontSize: 10, color: '#999' }}>{g.type}</div>
                                        </div>
                                    </td>
                                    <td>{gApproved > 0 ? <span className="cred-pill cred-pill--approved">{gApproved}</span> : '—'}</td>
                                    <td>{gPending > 0 ? <span className="cred-pill cred-pill--pending">{gPending}</span> : '—'}</td>
                                    <td>{gDenied > 0 ? <span className="cred-pill cred-pill--denied">{gDenied}</span> : '—'}</td>
                                    <td>
                                        {total > 0 ? (
                                            <div className="cred-progress">
                                                <div className="cred-progress__bar">
                                                    <div className="cred-progress__fill" style={{ width: `${(gApproved / total) * 100}%`, background: '#2e7d32' }} />
                                                </div>
                                                <span className="cred-progress__text">{gApproved}/{total}</span>
                                            </div>
                                        ) : (
                                            <span style={{ color: '#999', fontSize: 11 }}>No roster</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
