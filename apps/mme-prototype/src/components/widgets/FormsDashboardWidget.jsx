import React from 'react';

const WIDGET_STATS = {
    activeForms:      4,
    totalResponses:   330,
    pendingResponses: 70,
    nextDeadline:     'Apr 3',
};

const WIDGET_FORMS = [
    { title: 'Dietary Preference Form',         channelId: 'inf25-registration',    pct: 74,  status: 'active' },
    { title: 'T-Shirt Size Collection',         channelId: 'inf25-registration',    pct: 92,  status: 'active' },
    { title: 'Catering Headcount Confirmation', channelId: 'inf25-vendor-catering', pct: 100, status: 'active' },
    { title: 'Post-Event Feedback',             channelId: 'inf25-general',         pct: 0,   status: 'draft'  },
];

const CHANNELS = [
    { id: 'inf25-registration',    type: 'internal' },
    { id: 'inf25-vendor-catering', type: 'external' },
    { id: 'inf25-vendor-av',       type: 'external' },
    { id: 'inf25-general',         type: 'internal' },
];
const CHANNEL_MAP = Object.fromEntries(CHANNELS.map(c => [c.id, c]));

const ACTIVE_FORMS_WITH_CHANNELS = [
    { channelId: 'inf25-registration',    type: 'internal', count: 2 },
    { channelId: 'inf25-vendor-catering', type: 'external', count: 1 },
];

export default function FormsDashboardWidget({ onNavigate }) {
    return (
        <div className="forms-dw">
            <div className="forms-dw__header">
                <span className="forms-dw__header-title">
                    <span className="forms-dw__header-icon">◈</span>
                    Forms
                </span>
                <button className="forms-dw__view-btn" onClick={() => onNavigate && onNavigate('builder')}>
                    [View Full Module]
                </button>
            </div>

            <div className="forms-dw__stats">
                <div className="forms-dw__stat" onClick={() => onNavigate && onNavigate('builder')}>
                    <div className="forms-dw__stat-val">{WIDGET_STATS.activeForms}</div>
                    <div className="forms-dw__stat-lbl">Active Forms</div>
                    <div className="forms-dw__stat-foot">✓ Published</div>
                </div>
                <div className="forms-dw__stat" onClick={() => onNavigate && onNavigate('responses')}>
                    <div className="forms-dw__stat-val">{WIDGET_STATS.totalResponses}</div>
                    <div className="forms-dw__stat-lbl">Total Responses</div>
                    <div className="forms-dw__stat-foot">{WIDGET_STATS.pendingResponses} pending</div>
                </div>
                <div className="forms-dw__stat" onClick={() => onNavigate && onNavigate('distribution')}>
                    <div className="forms-dw__stat-val">{WIDGET_STATS.nextDeadline}</div>
                    <div className="forms-dw__stat-lbl">Next Deadline</div>
                    <div className="forms-dw__stat-foot" style={{ color: '#F39C12' }}>△ Upcoming</div>
                </div>
            </div>

            <div className="forms-dw__section-title" style={{ marginBottom: 6 }}>Active in Channels</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {ACTIVE_FORMS_WITH_CHANNELS.map(c => (
                    <span
                        key={c.channelId}
                        className={`forms-dw__form-channel forms-dw__form-channel--${c.type}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => onNavigate && onNavigate('distribution')}
                    >
                        {c.type === 'external' ? '🔒' : '#'}{c.channelId} ·{c.count}
                    </span>
                ))}
            </div>

            <div className="forms-dw__section-title">Form Progress</div>
            <div>
                {WIDGET_FORMS.map(f => {
                    const ch = CHANNEL_MAP[f.channelId];
                    return (
                        <div
                            key={f.title}
                            className="forms-dw__form-row"
                            onClick={() => onNavigate && onNavigate('responses')}
                        >
                            <span className="forms-dw__form-title">{f.title}</span>
                            {f.status === 'draft' ? (
                                <span className="forms-pill forms-pill--draft" style={{ fontSize: 9, padding: '2px 6px' }}>Draft</span>
                            ) : (
                                <>
                                    <div className="forms-dw__form-bar-bg">
                                        <div className="forms-dw__form-bar-fill" style={{ width: `${f.pct}%` }} />
                                    </div>
                                    <span className="forms-dw__form-pct">{f.pct}%</span>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
