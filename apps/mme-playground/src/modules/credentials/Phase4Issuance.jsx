import React from 'react';
import { printQueue, checkinLog, pickupTracker, credentialTypes } from './data';

export default function Phase4Issuance() {
    const totalPrinted = pickupTracker.filter(p => p.printed).length;
    const totalPickedUp = pickupTracker.filter(p => p.pickedUp).length;

    return (
        <div className="cred-phase">
            <div className="cred-phase__title">Phase 4 — Issuance & On-Site</div>
            <div className="cred-phase__subtitle">Badge printing, access scanning, will-call pickup tracking, and walk-in overrides</div>

            {/* Summary Counters */}
            <div className="cred-counters">
                <div className="cred-counter">
                    <div className="cred-counter__value">{printQueue.length}</div>
                    <div className="cred-counter__label">Ready to Print</div>
                </div>
                <div className="cred-counter">
                    <div className="cred-counter__value">{totalPrinted}</div>
                    <div className="cred-counter__label">Printed</div>
                </div>
                <div className="cred-counter">
                    <div className="cred-counter__value">{totalPickedUp} / {totalPrinted}</div>
                    <div className="cred-counter__label">Picked Up</div>
                </div>
                <div className="cred-counter">
                    <div className="cred-counter__value">{checkinLog.length}</div>
                    <div className="cred-counter__label">Checked In</div>
                </div>
            </div>

            <div className="cred-two-col">
                {/* Print Queue */}
                <div className="cred-card">
                    <div className="cred-card__header">
                        <span>Print Queue ({printQueue.length})</span>
                        <button className="cred-btn cred-btn--primary" style={{ fontSize: 10 }}>⎙ Print Selected</button>
                    </div>
                    {printQueue.map(p => {
                        const ct = credentialTypes.find(c => c.id === p.type);
                        return (
                            <div key={p.id} className="cred-print-row">
                                <div className="cred-print-row__checkbox">✓</div>
                                <span className="cred-type-dot" style={{ background: ct?.color || '#999' }} />
                                <div className="cred-print-row__info">
                                    <div className="cred-print-row__name">{p.name}</div>
                                    <div className="cred-print-row__meta">{ct?.name} · {p.barcode}</div>
                                </div>
                                <span className="cred-pill cred-pill--approved">Ready</span>
                            </div>
                        );
                    })}
                </div>

                {/* Check-in Scan Simulation */}
                <div className="cred-card">
                    <div className="cred-card__header">
                        <span>Check-in App — Scan Station</span>
                    </div>
                    <div className="cred-scan">
                        <div className="cred-scan__target">⊙</div>
                        <div className="cred-scan__label">Scan RFID wristband or barcode</div>
                        <div className="cred-scan__result cred-scan__result--success">
                            <div className="cred-scan__result-icon" style={{ color: '#2e7d32' }}>✓</div>
                            <div className="cred-scan__result-name">DJ Shadow</div>
                            <div className="cred-scan__result-detail">
                                <span className="cred-type-tag" style={{ marginBottom: 4 }}>
                                    <span className="cred-type-dot" style={{ background: '#333', marginRight: 0 }} />
                                    Artist — All Zones
                                </span>
                            </div>
                            <div style={{ fontSize: 11, color: '#999', marginTop: 6 }}>RFID-0001 · Scanned 14:30 PM · Artist Entrance</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pickup Tracking */}
            <div className="cred-card">
                <div className="cred-card__header">
                    <span>Will-Call Pickup Tracker</span>
                    <span style={{ fontSize: 11, color: '#666', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                        {totalPickedUp} of {totalPrinted} collected
                    </span>
                </div>
                <table className="cred-table">
                    <thead>
                        <tr>
                            <th>Person</th>
                            <th>Group</th>
                            <th>Type</th>
                            <th>Printed</th>
                            <th>Picked Up</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pickupTracker.map(p => {
                            const ct = credentialTypes.find(c => c.id === p.type);
                            return (
                                <tr key={p.personId}>
                                    <td><strong>{p.name}</strong></td>
                                    <td style={{ fontSize: 12, color: '#666' }}>{p.group}</td>
                                    <td>
                                        <span className="cred-type-tag">
                                            <span className="cred-type-dot" style={{ background: ct?.color || '#999', marginRight: 0 }} />
                                            {ct?.name || p.type}
                                        </span>
                                    </td>
                                    <td>{p.printed ? <span className="cred-pill cred-pill--printed">✓ Printed</span> : '—'}</td>
                                    <td>{p.pickedUp ? <span className="cred-pill cred-pill--collected">✓ Collected</span> : <button className="cred-btn" style={{ fontSize: 10 }}>Mark Collected</button>}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Recent Check-in Log */}
            <div className="cred-card">
                <div className="cred-card__header">
                    <span>Recent Check-in Log</span>
                </div>
                <table className="cred-table">
                    <thead>
                        <tr>
                            <th>Person</th>
                            <th>Type</th>
                            <th>Gate</th>
                            <th>Time</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkinLog.map((log, i) => {
                            const ct = credentialTypes.find(c => c.id === log.type);
                            return (
                                <tr key={i}>
                                    <td><strong>{log.name}</strong></td>
                                    <td>
                                        <span className="cred-type-tag">
                                            <span className="cred-type-dot" style={{ background: ct?.color || '#999', marginRight: 0 }} />
                                            {ct?.name || log.type}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: 12, color: '#666' }}>{log.gate}</td>
                                    <td style={{ fontSize: 11, color: '#999' }}>{log.scannedAt}</td>
                                    <td><span className="cred-pill cred-pill--approved">✓ {log.result}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
