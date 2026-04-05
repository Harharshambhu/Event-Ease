import React, { useState } from 'react';
import { FORMS } from './data';

const ACTIVE_FORMS  = FORMS.filter(f => f.status === 'active');
const CLOSED_FORMS  = FORMS.filter(f => f.status === 'closed');

const EXPORT_OPTIONS = [
    {
        id: 'csv',
        icon: '📊',
        title: 'CSV Export',
        desc: 'All responses as a comma-separated spreadsheet. Compatible with Excel and Google Sheets.',
        format: '.csv',
    },
    {
        id: 'pdf',
        icon: '📄',
        title: 'PDF Report',
        desc: 'Formatted PDF with summary stats, charts, and individual responses per page.',
        format: '.pdf',
    },
    {
        id: 'json',
        icon: '{ }',
        title: 'JSON Export',
        desc: 'Raw structured data for API integrations or further processing.',
        format: '.json',
    },
];

export default function Phase4Exports({ showToast }) {
    const [selectedForm, setSelectedForm] = useState(FORMS[0].title);
    const [closedForms, setClosedForms]   = useState(CLOSED_FORMS.map(f => f.id));
    const [archived, setArchived]         = useState(new Set(CLOSED_FORMS.map(f => f.id)));

    const handleExport = (format) => {
        showToast(`Exporting "${selectedForm}" as ${format}…`);
    };

    const handleCloseForm = (form) => {
        setClosedForms(prev => [...prev, form.id]);
        showToast(`"${form.title}" has been closed. No new responses accepted.`);
    };

    const handleArchive = (form) => {
        setArchived(prev => new Set([...prev, form.id]));
        showToast(`"${form.title}" archived successfully.`);
    };

    return (
        <div className="forms-layout--full">

            {/* Export section */}
            <div className="forms-card">
                <div className="forms-card__header">
                    <span className="forms-card__title">Export Responses</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <label style={{ fontSize: 11, color: '#888' }}>Form:</label>
                        <select
                            value={selectedForm}
                            onChange={e => setSelectedForm(e.target.value)}
                            style={{ fontSize: 12, padding: '5px 10px', border: '1px solid #ccc', borderRadius: 4, background: '#fff', fontFamily: 'Inter, sans-serif' }}
                        >
                            {FORMS.map(f => (
                                <option key={f.id}>{f.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="forms-card__body">
                    <div className="forms-export-grid">
                        {EXPORT_OPTIONS.map(opt => (
                            <div key={opt.id} className="forms-export-card">
                                <div className="forms-export-card__icon">{opt.icon}</div>
                                <div className="forms-export-card__title">{opt.title}</div>
                                <div className="forms-export-card__desc">{opt.desc}</div>
                                <button
                                    className="forms-btn forms-btn--primary forms-btn--sm forms-export-card__btn"
                                    onClick={() => handleExport(opt.format)}
                                >
                                    Download {opt.format}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Close form + Archive */}
            <div className="forms-layout--split">

                {/* LEFT: Close / archive active forms */}
                <div>
                    <div className="forms-card" style={{ marginBottom: 0 }}>
                        <div className="forms-card__header">
                            <span className="forms-card__title">Close Forms</span>
                            <span style={{ fontSize: 11, color: '#888' }}>Closes the form to new responses</span>
                        </div>
                        <table className="forms-table">
                            <thead>
                                <tr>
                                    <th>Form Title</th>
                                    <th>Status</th>
                                    <th>Responses</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FORMS.map(f => {
                                    const isClosed  = closedForms.includes(f.id) || f.status === 'closed';
                                    const isArchived = archived.has(f.id);
                                    const displayStatus = isArchived ? 'archived' : isClosed ? 'closed' : f.status;
                                    return (
                                        <tr key={f.id}>
                                            <td style={{ fontWeight: 600 }}>{f.title}</td>
                                            <td>
                                                <span className={`forms-pill forms-pill--${displayStatus === 'archived' ? 'closed' : displayStatus}`}>
                                                    {displayStatus}
                                                </span>
                                            </td>
                                            <td style={{ fontWeight: 600 }}>
                                                {f.responses}
                                                <span style={{ color: '#bbb', fontWeight: 400 }}> / {f.total}</span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                                                    {!isClosed && (
                                                        <button
                                                            className="forms-btn forms-btn--danger forms-btn--sm"
                                                            onClick={() => handleCloseForm(f)}
                                                        >
                                                            Close Form
                                                        </button>
                                                    )}
                                                    {isClosed && !isArchived && (
                                                        <button
                                                            className="forms-btn forms-btn--secondary forms-btn--sm"
                                                            onClick={() => handleArchive(f)}
                                                        >
                                                            Archive
                                                        </button>
                                                    )}
                                                    {isArchived && (
                                                        <span style={{ fontSize: 11, color: '#bbb' }}>Archived</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT: Archive status + notes */}
                <div>
                    <div className="forms-card">
                        <div className="forms-card__header">
                            <span className="forms-card__title">Archive Status</span>
                        </div>
                        <div className="forms-card__body">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
                                <div className="forms-dw__right-stat-row">
                                    <span className="forms-dw__right-stat-key">Total Forms</span>
                                    <span className="forms-dw__right-stat-val">{FORMS.length}</span>
                                </div>
                                <div className="forms-dw__right-stat-row">
                                    <span className="forms-dw__right-stat-key">Active</span>
                                    <span className="forms-dw__right-stat-val" style={{ color: '#27AE60' }}>
                                        {ACTIVE_FORMS.length}
                                    </span>
                                </div>
                                <div className="forms-dw__right-stat-row">
                                    <span className="forms-dw__right-stat-key">Closed</span>
                                    <span className="forms-dw__right-stat-val" style={{ color: '#E74C3C' }}>
                                        {closedForms.length}
                                    </span>
                                </div>
                                <div className="forms-dw__right-stat-row">
                                    <span className="forms-dw__right-stat-key">Archived</span>
                                    <span className="forms-dw__right-stat-val" style={{ color: '#888' }}>
                                        {archived.size}
                                    </span>
                                </div>
                                <div className="forms-dw__right-stat-row">
                                    <span className="forms-dw__right-stat-key">Total Responses</span>
                                    <span className="forms-dw__right-stat-val">
                                        {FORMS.reduce((s, f) => s + f.responses, 0)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="forms-archive-row">
                        <div className="forms-archive-left">
                            <div className="forms-archive-title">Data Retention</div>
                            <div className="forms-archive-sub">Archived forms are retained for 90 days post-event, then purged.</div>
                        </div>
                        <button
                            className="forms-btn forms-btn--secondary forms-btn--sm"
                            onClick={() => showToast('Retention policy emailed to org admin.')}
                        >
                            Review Policy
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
