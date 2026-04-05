import React, { useState } from 'react';
import { RESPONSES, FORMS, FORM_FIELDS, CHANNELS, CHANNEL_MAP, POLL_RESPONSES } from './data';
import QuickPollCard from './QuickPollCard';

const ALL = 'all';

function fileLabel(ext) {
    if (!ext) return null;
    const lower = ext.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(lower)) return { icon: '🖼', label: ext.toUpperCase() };
    if (['pdf'].includes(lower))                                  return { icon: '📄', label: 'PDF' };
    return { icon: '📎', label: ext.toUpperCase() };
}

function FileCell({ hasFile, fileExt, fileName }) {
    if (!hasFile) return <span style={{ color: '#ddd' }}>—</span>;
    const info = fileLabel(fileExt);
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
            <span>{info.icon}</span>
            <span style={{ fontSize: 10, color: '#1A365D' }}>{fileName}</span>
        </span>
    );
}

function ResponseModal({ response, form, onClose, showToast }) {
    if (!response) return null;
    const ch = CHANNEL_MAP[response.channelId];
    const fileName = response.hasFile ? `${response.name.replace(' ', '_')}.${response.fileExt}` : null;
    const MOCK_ANSWERS = {
        'Full Name':               response.name,
        'Email Address':           `${response.name.toLowerCase().replace(' ', '.')}@${response.company.toLowerCase().replace(/[ .]/g, '')}.com`,
        'Dietary Preference':      'Vegetarian',
        'Allergies / Restrictions':'None',
        'Supporting Document':     fileName,
    };

    return (
        <div className="forms-modal-overlay" onClick={onClose}>
            <div className="forms-modal" onClick={e => e.stopPropagation()}>
                <div className="forms-modal__header">
                    <div>
                        <div className="forms-modal__title">Response — {response.name}</div>
                        {ch && (
                            <span className={`forms-ch-badge forms-ch-badge--${ch.type} forms-ch-badge--sm`} style={{ marginTop: 4, display: 'inline-block' }}>
                                {ch.type === 'external' ? '🔒' : '#'}{response.channelId}
                            </span>
                        )}
                    </div>
                    <button className="forms-modal__close" onClick={onClose}>×</button>
                </div>
                <div className="forms-modal__body">
                    <div style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
                        <div className="forms-modal__field" style={{ flex: 1 }}>
                            <div className="forms-modal__field-label">Company</div>
                            <div className="forms-modal__field-value">{response.company}</div>
                        </div>
                        <div className="forms-modal__field" style={{ flex: 1 }}>
                            <div className="forms-modal__field-label">Submitted</div>
                            <div className="forms-modal__field-value" style={{ fontSize: 12 }}>
                                {response.submittedAt === '—'
                                    ? <span style={{ color: '#F39C12' }}>Not submitted</span>
                                    : response.submittedAt}
                            </div>
                        </div>
                        <div className="forms-modal__field">
                            <div className="forms-modal__field-label">Status</div>
                            <div className="forms-modal__field-value">
                                <span className={`forms-pill forms-pill--${response.status}`}>{response.status}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: '#999', marginBottom: 10 }}>
                            Answers
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {FORM_FIELDS.map(f => {
                                const val = MOCK_ANSWERS[f.label];
                                return (
                                    <div key={f.id} className="forms-modal__field">
                                        <div className="forms-modal__field-label">{f.label}</div>
                                        <div className="forms-modal__field-value">
                                            {f.type === 'file'
                                                ? val
                                                    ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                                                        {(() => { const i = fileLabel(response.fileExt); return i ? <span>{i.icon}</span> : null; })()}
                                                        <span style={{ fontSize: 11, color: '#1A365D' }}>{val}</span>
                                                      </span>
                                                    : <span style={{ color: '#bbb' }}>No file</span>
                                                : val || <span style={{ color: '#bbb' }}>—</span>
                                            }
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="forms-modal__footer">
                    {response.status === 'pending' && (
                        <button
                            className="forms-btn forms-btn--outline forms-btn--sm"
                            onClick={() => { showToast(`Reminder sent to ${response.name} via #${response.channelId}.`); onClose(); }}
                        >
                            Send Reminder
                        </button>
                    )}
                    <button className="forms-btn forms-btn--secondary forms-btn--sm" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

/* ── Quick Poll Responses sub-view ────────────────────────────── */
function PollResponsesView({ form, showToast }) {
    const allRows    = POLL_RESPONSES.filter(r => r.pollId === form.id);
    const yesCount   = allRows.filter(r => r.answer === true).length;
    const pendingCount = allRows.filter(r => r.answer === null).length;
    const respondedCount = allRows.filter(r => r.answer !== null).length;
    const ratePct    = form.total > 0 ? Math.round((respondedCount / form.total) * 100) : 0;

    /* respondent names for poll card preview */
    const previewResponses = allRows.map(r => ({ name: r.name, answer: r.answer }));

    const handleExportCSV = () => {
        const rows = [
            ['Vendor Name', 'Responded At', 'Status'],
            ...allRows.map(r => [r.name, r.respondedAt === '—' ? 'Pending' : r.respondedAt, r.answer === true ? 'Yes' : 'Pending']),
        ];
        const csv = rows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a'); a.href = url; a.download = `${form.title}.csv`; a.click();
        URL.revokeObjectURL(url);
        showToast('CSV exported.');
    };

    const handleReminder = () => {
        showToast(`Reminder sent to ${pendingCount} pending respondent${pendingCount !== 1 ? 's' : ''}.`);
    };

    return (
        <div className="forms-layout--full">

            {/* Summary stat bar */}
            <div className="forms-stat-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="forms-stat-card">
                    <div className="forms-stat-card__value" style={{ color: 'hsl(var(--success-fg))' }}>{yesCount}</div>
                    <div className="forms-stat-card__label">Yes</div>
                    <div className="forms-stat-card__sub">Confirmed</div>
                </div>
                <div className="forms-stat-card">
                    <div className="forms-stat-card__value" style={{ color: 'hsl(var(--warning-fg))' }}>{pendingCount}</div>
                    <div className="forms-stat-card__label">Pending</div>
                    <div className="forms-stat-card__sub">No response yet</div>
                </div>
                <div className="forms-stat-card">
                    <div className="forms-stat-card__value" style={{ color: 'hsl(var(--info-fg))' }}>{ratePct}%</div>
                    <div className="forms-stat-card__label">Response Rate</div>
                    <div className="forms-stat-card__sub">{respondedCount} of {form.total}</div>
                </div>
            </div>

            <div className="forms-layout--split">

                {/* Respondents table */}
                <div>
                    <div className="forms-card" style={{ marginBottom: 0 }}>
                        <div className="forms-card__header">
                            <span className="forms-card__title">📊 Quick Poll Responses — {form.title}</span>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {pendingCount > 0 && (
                                    <button
                                        className="forms-btn forms-btn--outline forms-btn--sm"
                                        onClick={handleReminder}
                                    >
                                        ◷ Send Reminder ({pendingCount})
                                    </button>
                                )}
                                <button
                                    className="forms-btn forms-btn--secondary forms-btn--sm"
                                    onClick={handleExportCSV}
                                >
                                    ↓ Export CSV
                                </button>
                            </div>
                        </div>

                        <table className="forms-table">
                            <thead>
                                <tr>
                                    <th>Vendor / Member Name</th>
                                    <th>Responded At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allRows.map(r => (
                                    <tr key={r.id} style={{ height: 38 }}>
                                        <td style={{ fontWeight: 600 }}>{r.name}</td>
                                        <td style={{ fontSize: 11, color: 'hsl(var(--muted-foreground))' }}>
                                            {r.respondedAt === '—'
                                                ? <span style={{ color: 'hsl(var(--warning-fg))' }}>—</span>
                                                : r.respondedAt}
                                        </td>
                                        <td>
                                            {r.answer === true
                                                ? <span className="forms-pill forms-pill--complete">✓ Yes</span>
                                                : <span className="forms-pill forms-pill--pending">○ Pending</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ padding: '10px 14px', background: 'hsl(var(--muted)/0.3)', borderTop: '1px solid hsl(var(--border))', fontSize: 11, color: 'hsl(var(--muted-foreground))' }}>
                            {allRows.length} assignees · Channel: #{form.channelId} · Deadline: {form.deadline}
                        </div>
                    </div>
                </div>

                {/* Right: poll card preview */}
                <div>
                    <div className="forms-card">
                        <div className="forms-card__header">
                            <span className="forms-card__title">Channel Card Preview</span>
                        </div>
                        <div className="forms-card__body" style={{ padding: 'var(--space-3)' }}>
                            <QuickPollCard
                                question={form.question}
                                deadline={form.deadline}
                                allowUndo={form.allowUndo}
                                channelId={form.channelId}
                                responses={previewResponses}
                                total={form.total}
                                interactive={false}
                            />
                        </div>
                    </div>
                    <div className="forms-card" style={{ marginBottom: 0 }}>
                        <div className="forms-card__header">
                            <span className="forms-card__title">Poll Settings</span>
                        </div>
                        <div className="forms-card__body">
                            {[
                                { label: 'Channel',    val: `#${form.channelId}` },
                                { label: 'Deadline',   val: form.deadline || '—' },
                                { label: 'Allow Undo', val: form.allowUndo ? 'Yes' : 'No' },
                                { label: 'Status',     val: form.status },
                            ].map(row => (
                                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '5px 0', borderBottom: '1px solid hsl(var(--border))' }}>
                                    <span style={{ color: 'hsl(var(--muted-foreground))' }}>{row.label}</span>
                                    <span style={{ fontWeight: 600 }}>{row.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Phase3Responses({ showToast }) {
    const [channelFilter, setChannelFilter] = useState(ALL);
    const [formFilter, setFormFilter]       = useState(ALL);
    const [statusFilter, setStatusFilter]   = useState(ALL);
    const [search, setSearch]               = useState('');
    const [activeResponse, setActiveResponse] = useState(null);

    /* derive available forms based on channel filter */
    const formsInChannel = channelFilter === ALL
        ? FORMS
        : FORMS.filter(f => f.channelId === channelFilter);

    const filtered = RESPONSES.filter(r => {
        const matchChannel = channelFilter === ALL || r.channelId === channelFilter;
        const matchForm    = formFilter    === ALL || String(r.formId) === formFilter;
        const matchStatus  = statusFilter  === ALL || r.status === statusFilter;
        const matchSearch  = r.name.toLowerCase().includes(search.toLowerCase()) ||
                             r.company.toLowerCase().includes(search.toLowerCase());
        return matchChannel && matchForm && matchStatus && matchSearch;
    });

    const completeCount = filtered.filter(r => r.status === 'complete').length;
    const pendingCount  = filtered.filter(r => r.status === 'pending').length;
    const fileCount     = filtered.filter(r => r.hasFile).length;

    const activeForm = formFilter !== ALL ? FORMS.find(f => String(f.id) === formFilter) : null;

    /* ── Route to Poll view when a quick-poll form is selected ── */
    if (activeForm && activeForm.type === 'quick-poll') {
        return <PollResponsesView form={activeForm} showToast={showToast} />;
    }

    return (
        <div className="forms-layout--full">

            {/* Stat strip */}
            <div className="forms-stat-row">
                {[
                    { label: 'Showing',          val: filtered.length,  color: 'hsl(var(--info-fg))' },
                    { label: 'Complete',          val: completeCount,    color: 'hsl(var(--success-fg))' },
                    { label: 'Pending',           val: pendingCount,     color: 'hsl(var(--warning-fg))' },
                    { label: 'With Attachments',  val: fileCount,        color: 'hsl(var(--muted-foreground))' },
                ].map(s => (
                    <div key={s.label} className="forms-stat-card">
                        <div className="forms-stat-card__value" style={{ color: s.color }}>{s.val}</div>
                        <div className="forms-stat-card__label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Table + sidebar */}
            <div className="forms-layout--split">
                <div>
                    <div className="forms-card" style={{ marginBottom: 0 }}>
                        <div className="forms-card__header">
                            <span className="forms-card__title">Submissions</span>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                                {/* Channel filter */}
                                <select
                                    className="forms-filter-select"
                                    value={channelFilter}
                                    onChange={e => { setChannelFilter(e.target.value); setFormFilter(ALL); }}
                                >
                                    <option value={ALL}>All channels</option>
                                    {CHANNELS.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.type === 'external' ? '🔒 ' : '#'}{c.label}
                                        </option>
                                    ))}
                                </select>
                                {/* Form filter (scoped to channel) */}
                                <select
                                    className="forms-filter-select"
                                    value={formFilter}
                                    onChange={e => setFormFilter(e.target.value)}
                                >
                                    <option value={ALL}>All forms</option>
                                    {formsInChannel.map(f => (
                                        <option key={f.id} value={String(f.id)}>{f.title}</option>
                                    ))}
                                </select>
                                <select
                                    className="forms-filter-select"
                                    value={statusFilter}
                                    onChange={e => setStatusFilter(e.target.value)}
                                >
                                    <option value={ALL}>All statuses</option>
                                    <option value="complete">Complete</option>
                                    <option value="pending">Pending</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Search…"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    style={{ fontSize: 11, padding: '4px 10px', border: '1px solid #ccc', borderRadius: 4, width: 140 }}
                                />
                            </div>
                        </div>

                        {/* Selected form channel context */}
                        {channelFilter !== ALL && (() => {
                            const ch = CHANNEL_MAP[channelFilter];
                            return ch ? (
                                <div className="forms-scope-bar">
                                    <span className={`forms-ch-badge forms-ch-badge--${ch.type}`}>
                                        {ch.type === 'external' ? '🔒' : '#'}{ch.label}
                                    </span>
                                    <span className="forms-scope-bar__text">
                                        {ch.type === 'external'
                                            ? `🔒 External channel — responses visible to agency and ${ch.scope}`
                                            : `Internal channel — ${ch.scope}`}
                                    </span>
                                </div>
                            ) : null;
                        })()}

                        <table className="forms-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Submitted</th>
                                    <th>Status</th>
                                    <th>Attachment</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(r => {
                                    const fileName = r.hasFile ? `${r.name.replace(' ', '_')}.${r.fileExt}` : null;
                                    return (
                                        <tr key={r.id} style={{ cursor: 'pointer' }} onClick={() => setActiveResponse(r)}>
                                            <td style={{ fontWeight: 600 }}>{r.name}</td>
                                            <td style={{ fontSize: 11, color: '#666' }}>{r.company}</td>
                                            <td style={{ fontSize: 11, color: '#999' }}>
                                                {r.submittedAt === '—'
                                                    ? <span style={{ color: '#F39C12' }}>—</span>
                                                    : r.submittedAt}
                                            </td>
                                            <td><span className={`forms-pill forms-pill--${r.status}`}>{r.status}</span></td>
                                            <td><FileCell hasFile={r.hasFile} fileExt={r.fileExt} fileName={fileName} /></td>
                                            <td onClick={e => e.stopPropagation()}>
                                                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                                                    <button className="forms-btn forms-btn--secondary forms-btn--sm" onClick={() => setActiveResponse(r)}>View</button>
                                                    {r.status === 'pending' && (
                                                        <button
                                                            className="forms-btn forms-btn--outline forms-btn--sm"
                                                            onClick={() => showToast(`Reminder sent to ${r.name} via #${r.channelId}.`)}
                                                        >
                                                            Remind
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', color: '#bbb', padding: '20px 0' }}>
                                            No responses match this filter
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div style={{ padding: '10px 14px', background: '#fafafa', borderTop: '1px solid #eee', fontSize: 11, color: '#888' }}>
                            Showing {filtered.length} of {RESPONSES.length} sample records
                            {activeForm ? ` — ${activeForm.responses} total in production` : ''}
                        </div>
                    </div>
                </div>

                {/* RIGHT sidebar */}
                <div>
                    <div className="forms-card">
                        <div className="forms-card__header">
                            <span className="forms-card__title">Dietary Breakdown</span>
                        </div>
                        <div className="forms-card__body">
                            {[
                                { label: 'Vegetarian',     val: 84, color: '#27AE60' },
                                { label: 'Non Vegetarian', val: 38, color: '#E74C3C' },
                                { label: 'Vegan',          val: 14, color: '#8E44AD' },
                                { label: 'Jain',           val: 11, color: '#F39C12' },
                            ].map(item => (
                                <div key={item.label} style={{ marginBottom: 10 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                                        <span style={{ color: '#555', fontWeight: 600 }}>{item.label}</span>
                                        <span style={{ fontWeight: 700 }}>{item.val}</span>
                                    </div>
                                    <div style={{ height: 5, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: `${(item.val / 147) * 100}%`, height: '100%', background: item.color, borderRadius: 3 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="forms-card" style={{ marginBottom: 0 }}>
                        <div className="forms-card__header">
                            <span className="forms-card__title">Attachments</span>
                        </div>
                        <div className="forms-card__body">
                            {[
                                { label: 'PDF',            icon: '📄', count: 1 },
                                { label: 'Images',         icon: '🖼', count: 1 },
                                { label: 'Other (DOCX…)', icon: '📎', count: 1 },
                            ].map(item => (
                                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid #f5f5f5', fontSize: 12 }}>
                                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                                    <span style={{ flex: 1, color: '#555' }}>{item.label}</span>
                                    <span style={{ fontWeight: 700 }}>{item.count}</span>
                                </div>
                            ))}
                            <div style={{ marginTop: 8, fontSize: 11, color: '#888' }}>
                                No preview pane — icon + filename only per audit spec.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {activeResponse && (
                <ResponseModal
                    response={activeResponse}
                    form={FORMS.find(f => f.id === activeResponse.formId)}
                    onClose={() => setActiveResponse(null)}
                    showToast={showToast}
                />
            )}
        </div>
    );
}
