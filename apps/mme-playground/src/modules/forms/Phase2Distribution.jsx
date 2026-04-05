import React, { useState } from 'react';
import { FORMS, REMINDERS, CHANNELS, CHANNEL_MAP } from './data';

const ALL_CHANNEL = 'all';

/* Group forms by channelId */
function groupByChannel(forms) {
    const groups = {};
    forms.forEach(f => {
        if (!groups[f.channelId]) groups[f.channelId] = [];
        groups[f.channelId].push(f);
    });
    return groups;
}

function ChannelGroupHeader({ channelId }) {
    const ch = CHANNEL_MAP[channelId];
    if (!ch) return null;
    return (
        <tr className="forms-table__ch-group">
            <td colSpan={7}>
                <span className={`forms-ch-badge forms-ch-badge--${ch.type}`}>
                    #{ch.label}
                </span>
                <span className="forms-table__ch-scope">{ch.scope}</span>
            </td>
        </tr>
    );
}

export default function Phase2Distribution({ showToast }) {
    const [channelFilter, setChannelFilter] = useState(ALL_CHANNEL);
    const [groupBy, setGroupBy]             = useState(true);
    const [sending, setSending]             = useState(null);

    const visibleForms = FORMS.filter(f =>
        f.status !== 'draft' &&
        (channelFilter === ALL_CHANNEL || f.channelId === channelFilter)
    );

    const handleManualReminder = (form) => {
        setSending(form.id);
        setTimeout(() => {
            setSending(null);
            showToast(`Reminder posted to #${form.channelId} for "${form.title}".`);
        }, 800);
    };

    const renderFormRow = (f, idx = null) => {
        const pct     = f.total > 0 ? Math.round((f.responses / f.total) * 100) : 0;
        const pending = f.total - f.responses;
        const ch      = CHANNEL_MAP[f.channelId];
        return (
            <tr key={f.id}>
                <td style={{ fontWeight: 600, paddingLeft: idx !== null ? 28 : undefined }}>
                    {idx !== null && (
                        <span style={{ color: '#bbb', fontWeight: 400, marginRight: 6, fontSize: 11, userSelect: 'none' }}>
                            {idx + 1}.
                        </span>
                    )}
                    {f.title}
                </td>
                {!groupBy && (
                    <td>
                        <span className={`forms-ch-badge forms-ch-badge--${ch?.type || 'internal'} forms-ch-badge--sm`}>
                            {ch?.type === 'external' ? '🔒' : '#'}{f.channelId}
                        </span>
                    </td>
                )}
                <td style={{ fontWeight: 600 }}>
                    {f.responses}
                    <span style={{ color: '#bbb', fontWeight: 400 }}> / {f.total}</span>
                </td>
                <td>
                    <span style={{ fontWeight: 600, color: pending > 0 ? '#F39C12' : '#27AE60' }}>
                        {pending}
                    </span>
                </td>
                <td style={{ color: '#555', fontSize: 11 }}>{f.deadline}</td>
                <td>
                    <span className={`forms-pill forms-pill--${f.status}`}>{f.status}</span>
                </td>
                <td style={{ width: 120 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ flex: 1, height: 5, background: '#e5e5e5', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: pct >= 90 ? '#27AE60' : pct > 0 ? '#F39C12' : '#e5e5e5', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#555', width: 28 }}>{pct}%</span>
                    </div>
                </td>
                <td>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        {f.status === 'active' && (
                            <button
                                className="forms-btn forms-btn--outline forms-btn--sm"
                                onClick={() => handleManualReminder(f)}
                                disabled={sending === f.id}
                            >
                                {sending === f.id ? 'Sending…' : 'Remind'}
                            </button>
                        )}
                        <button className="forms-btn forms-btn--secondary forms-btn--sm">View</button>
                    </div>
                </td>
            </tr>
        );
    };

    const renderGrouped = () => {
        const groups  = groupByChannel(visibleForms);
        const rows    = [];
        Object.entries(groups).forEach(([chId, forms]) => {
            rows.push(<ChannelGroupHeader key={`hdr-${chId}`} channelId={chId} />);
            forms.forEach((f, i) => rows.push(renderFormRow(f, i)));
        });
        return rows;
    };

    const pendingTotal = visibleForms.reduce((s, f) => s + (f.total - f.responses), 0);

    return (
        <div className="forms-layout--full">

            {/* Forms table */}
            <div className="forms-card">
                <div className="forms-card__header">
                    <span className="forms-card__title">Forms</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {/* Channel filter */}
                        <select
                            className="forms-filter-select"
                            value={channelFilter}
                            onChange={e => setChannelFilter(e.target.value)}
                        >
                            <option value={ALL_CHANNEL}>All channels</option>
                            {CHANNELS.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.type === 'external' ? '🔒 ' : '#'}{c.label}
                                </option>
                            ))}
                        </select>
                        {/* Group by toggle */}
                        <label className="forms-toggle-label">
                            <input
                                type="checkbox"
                                checked={groupBy}
                                onChange={e => setGroupBy(e.target.checked)}
                                style={{ accentColor: '#1A365D', marginRight: 5 }}
                            />
                            Group by channel
                        </label>
                        <span style={{ fontSize: 11, color: '#888' }}>{pendingTotal} pending responses</span>
                    </div>
                </div>
                <table className="forms-table">
                    <thead>
                        <tr>
                            <th>Form Title</th>
                            {!groupBy && <th>Channel</th>}
                            <th>Responses</th>
                            <th>Pending</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupBy ? renderGrouped() : visibleForms.map(renderFormRow)}
                        {visibleForms.length === 0 && (
                            <tr>
                                <td colSpan={8} style={{ textAlign: 'center', color: '#bbb', padding: '20px 0' }}>
                                    No forms in this channel
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Reminder log + config */}
            <div className="forms-layout--split">

                {/* LEFT: Reminder log */}
                <div>
                    <div className="forms-card" style={{ marginBottom: 0 }}>
                        <div className="forms-card__header">
                            <span className="forms-card__title">Automated Reminder Log</span>
                            <span style={{ fontSize: 11, color: '#888' }}>Last {REMINDERS.length} dispatches</span>
                        </div>
                        <div className="forms-reminder-log">
                            {REMINDERS.map(r => {
                                const ch = CHANNEL_MAP[r.channelId];
                                return (
                                    <div key={r.id} className="forms-reminder-row">
                                        <div className="forms-reminder-dot" style={{ background: r.type === 'manual' ? '#7B1FA2' : '#1A365D' }} />
                                        <div className="forms-reminder-info">
                                            <div className="forms-reminder-form">{r.formTitle}</div>
                                            <div className="forms-reminder-meta">
                                                <span className={`forms-ch-badge forms-ch-badge--${ch?.type || 'internal'} forms-ch-badge--xs`}>
                                                    {ch?.type === 'external' ? '🔒' : '#'}{r.channelId}
                                                </span>
                                                {' · '}{r.recipients} recipient{r.recipients !== 1 ? 's' : ''}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                                            <span className="forms-reminder-time">{r.sentAt}</span>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                <span className={`forms-pill forms-pill--${r.type}`}>{r.type}</span>
                                                <span className={`forms-pill forms-pill--${r.status}`}>{r.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Config + manual */}
                <div>
                    <div className="forms-card">
                        <div className="forms-card__header">
                            <span className="forms-card__title">Auto-Reminder Config</span>
                        </div>
                        <div className="forms-card__body">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <label className="forms-field-lbl">Reminder Interval</label>
                                    <select className="forms-inline-select">
                                        <option>Every 3 days</option>
                                        <option>Every 2 days</option>
                                        <option>Daily</option>
                                        <option>Weekly</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <label className="forms-field-lbl">Stop When</label>
                                    <select className="forms-inline-select">
                                        <option>100% complete</option>
                                        <option>Deadline reached</option>
                                        <option>Manually stopped</option>
                                    </select>
                                </div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                    <input type="checkbox" defaultChecked style={{ accentColor: '#1A365D', width: 14, height: 14 }} />
                                    <span style={{ fontSize: 12, color: '#333' }}>Auto-reminders enabled</span>
                                </label>
                                <button
                                    className="forms-btn forms-btn--secondary"
                                    style={{ alignSelf: 'flex-start' }}
                                    onClick={() => showToast('Auto-reminder config saved.')}
                                >
                                    Save Config
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="forms-card" style={{ marginBottom: 0 }}>
                        <div className="forms-card__header">
                            <span className="forms-card__title">Send Now</span>
                        </div>
                        <div className="forms-card__body">
                            <p style={{ fontSize: 12, color: '#666', margin: '0 0 10px', lineHeight: 1.5 }}>
                                Posts an immediate reminder to each channel for its pending respondents. External channels (vendor / sponsor) are messaged separately.
                            </p>
                            <button
                                className="forms-btn forms-btn--primary"
                                style={{ width: '100%' }}
                                onClick={() => showToast(`Reminders dispatched to ${pendingTotal} pending respondents across ${CHANNELS.length} channels.`)}
                            >
                                Send Reminder to All Pending
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
