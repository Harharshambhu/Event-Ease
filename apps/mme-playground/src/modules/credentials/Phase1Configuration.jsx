import React from 'react';
import { credentialTypes, badgeTemplates, approvalWorkflows, itemBlocks, barcodePools } from './data';

export default function Phase1Configuration() {
    return (
        <div className="cred-phase">
            <div className="cred-phase__title">Phase 1 — Configuration</div>
            <div className="cred-phase__subtitle">Admin pre-event setup: credential types, badge templates, approval routing, barcode pools</div>

            <div className="cred-two-col">
                {/* Credential Types */}
                <div className="cred-card">
                    <div className="cred-card__header">
                        <span>Credential Types ({credentialTypes.length})</span>
                        <button className="cred-card__header-action">+ Add Type</button>
                    </div>
                    <table className="cred-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Tier</th>
                                <th>Zones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {credentialTypes.map(ct => (
                                <tr key={ct.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span className="cred-type-dot" style={{ background: ct.color }} />
                                            <strong style={{ fontSize: 13 }}>{ct.name}</strong>
                                        </div>
                                    </td>
                                    <td><span className="cred-pill" style={{ background: '#f5f5f5', color: '#888' }}>{ct.tier}</span></td>
                                    <td>{ct.zones.map(z => <span key={z} className="cred-zone">{z}</span>)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Approval Workflows */}
                <div className="cred-card">
                    <div className="cred-card__header">
                        <span>Approval Workflows</span>
                        <button className="cred-card__header-action">Edit Rules</button>
                    </div>
                    <table className="cred-table">
                        <thead>
                            <tr>
                                <th>Credential Type</th>
                                <th>Approval Chain</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvalWorkflows.map(aw => (
                                <tr key={aw.typeId}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span className="cred-type-dot" style={{ background: credentialTypes.find(c => c.id === aw.typeId)?.color || '#999' }} />
                                            {credentialTypes.find(c => c.id === aw.typeId)?.name || aw.typeId}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cred-workflow">
                                            {aw.steps.map((step, i) => (
                                                <React.Fragment key={i}>
                                                    <span className="cred-workflow__step">{step}</span>
                                                    {i < aw.steps.length - 1 && <span className="cred-workflow__arrow">→</span>}
                                                </React.Fragment>
                                            ))}
                                            {aw.conditional && <span className="cred-zone" style={{ marginLeft: 4 }}>conditional</span>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Item Blocks */}
            <div className="cred-card">
                <div className="cred-card__header">
                    <span>Item Blocks — Requestable Packages</span>
                    <button className="cred-card__header-action">+ Add Block</button>
                </div>
                <table className="cred-table">
                    <thead>
                        <tr>
                            <th>Block Name</th>
                            <th>Credential Types</th>
                            <th>Max Qty</th>
                            <th>Price</th>
                            <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemBlocks.map(ib => (
                            <tr key={ib.id}>
                                <td><strong>{ib.name}</strong></td>
                                <td>
                                    {ib.types.map(t => {
                                        const ct = credentialTypes.find(c => c.id === t);
                                        return (
                                            <span key={t} className="cred-type-tag" style={{ marginRight: 4 }}>
                                                <span className="cred-type-dot" style={{ background: ct?.color || '#999', marginRight: 0 }} />
                                                {ct?.name || t}
                                            </span>
                                        );
                                    })}
                                </td>
                                <td>{ib.maxQty}</td>
                                <td>{ib.price === 0 ? <span style={{ color: '#999' }}>Free</span> : `$${ib.price}/ea`}</td>
                                <td><span className="cred-zone">{ib.assignedTo}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Badge Templates + Barcode Pools */}
            <div className="cred-two-col">
                {/* Badge Templates */}
                <div className="cred-card">
                    <div className="cred-card__header">
                        <span>Badge Design Templates</span>
                        <button className="cred-card__header-action">Configure</button>
                    </div>
                    <div style={{ padding: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        {badgeTemplates.map(bt => {
                            const ct = credentialTypes.find(c => c.id === bt.typeId);
                            return (
                                <div key={bt.typeId} className="cred-badge-preview">
                                    <div className="cred-badge-preview__top">
                                        <span className="cred-badge-preview__type" style={{ background: ct?.color || '#999' }}>
                                            {ct?.name}
                                        </span>
                                        {bt.fields.includes('Photo') && <div className="cred-badge-preview__photo">◯</div>}
                                    </div>
                                    <div className="cred-badge-preview__name">FULL NAME</div>
                                    <div style={{ fontSize: 7, color: '#999' }}>{bt.fields.filter(f => f !== 'Full Name' && f !== 'Photo' && f !== 'Barcode').join(' · ')}</div>
                                    <div className="cred-badge-preview__barcode" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Barcode Pools */}
                <div className="cred-card">
                    <div className="cred-card__header">
                        <span>Barcode / RFID Pools</span>
                        <button className="cred-card__header-action">+ Import Pool</button>
                    </div>
                    <table className="cred-table">
                        <thead>
                            <tr>
                                <th>Pool</th>
                                <th>Format</th>
                                <th>Allocation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {barcodePools.map(bp => (
                                <tr key={bp.id}>
                                    <td>
                                        <div>
                                            <strong style={{ fontSize: 13 }}>{bp.name}</strong>
                                            <div style={{ fontSize: 10, color: '#999' }}>Partner: {bp.partner}</div>
                                        </div>
                                    </td>
                                    <td><span className="cred-zone">{bp.format}</span></td>
                                    <td>
                                        <div className="cred-gauge">
                                            <div className="cred-gauge__bar">
                                                <div className="cred-gauge__fill" style={{ width: `${(bp.assigned / bp.total) * 100}%` }} />
                                            </div>
                                            <span className="cred-gauge__label">{bp.assigned} / {bp.total}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
