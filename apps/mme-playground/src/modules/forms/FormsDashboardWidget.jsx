import React from 'react';
import { WIDGET_STATS, WIDGET_FORMS, FORMS, CHANNELS, CHANNEL_MAP } from './data';

/* Count active forms per channel for the summary line */
const ACTIVE_FORMS   = FORMS.filter(f => f.status === 'active');
const CHANNEL_COUNTS = CHANNELS.reduce((acc, c) => {
    const n = ACTIVE_FORMS.filter(f => f.channelId === c.id).length;
    if (n > 0) acc.push({ channelId: c.id, type: c.type, count: n });
    return acc;
}, []);

export default function FormsDashboardWidget({ onNavigate }) {
    return (
        <div className="forms-dw">

            {/* Header */}
            <div className="forms-dw__header">
                <span className="forms-dw__header-title">
                    <span className="forms-dw__header-icon">◈</span>
                    Forms
                </span>
                <button className="forms-dw__view-btn" onClick={() => onNavigate('builder')}>
                    [View Full Module]
                </button>
            </div>

            {/* Stat boxes */}
            <div className="forms-dw__stats">
                <div className="forms-dw__stat" onClick={() => onNavigate('builder')}>
                    <div className="forms-dw__stat-val">{WIDGET_STATS.activeForms}</div>
                    <div className="forms-dw__stat-lbl">Active Forms</div>
                    <div className="forms-dw__stat-foot">✓ Published</div>
                </div>
                <div className="forms-dw__stat" onClick={() => onNavigate('responses')}>
                    <div className="forms-dw__stat-val">{WIDGET_STATS.totalResponses}</div>
                    <div className="forms-dw__stat-lbl">Total Responses</div>
                    <div className="forms-dw__stat-foot">{WIDGET_STATS.pendingResponses} pending</div>
                </div>
                <div className="forms-dw__stat" onClick={() => onNavigate('distribution')}>
                    <div className="forms-dw__stat-val">{WIDGET_STATS.nextDeadline}</div>
                    <div className="forms-dw__stat-lbl">Next Deadline</div>
                    <div className="forms-dw__stat-foot" style={{ color: '#F39C12' }}>△ Upcoming</div>
                </div>
            </div>

            {/* Channel distribution summary */}
            <div className="forms-dw__section-title" style={{ marginBottom: 6 }}>Active in Channels</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {CHANNEL_COUNTS.map(c => (
                    <span
                        key={c.channelId}
                        className={`forms-dw__form-channel forms-dw__form-channel--${c.type}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => onNavigate('distribution')}
                        title={`${c.count} form${c.count !== 1 ? 's' : ''} in #${c.channelId}`}
                    >
                        {c.type === 'external' ? '🔒' : '#'}{c.channelId} ·{c.count}
                    </span>
                ))}
            </div>

            {/* Per-form progress rows with channel tag */}
            <div className="forms-dw__section-title">Form Progress</div>
            <div>
                {WIDGET_FORMS.map(f => {
                    const ch = CHANNEL_MAP[f.channelId];
                    return (
                        <div
                            key={f.title}
                            className="forms-dw__form-row"
                            onClick={() => onNavigate('responses')}
                        >
                            <span className="forms-dw__form-title">{f.title}</span>
                            {/* Channel tag */}
                            <span className={`forms-dw__form-channel forms-dw__form-channel--${ch?.type || 'internal'}`}>
                                {ch?.type === 'external' ? '🔒' : '#'}{f.channelId.replace(/^inf25-/, '')}
                            </span>
                            {/* Progress */}
                            {f.status === 'draft' ? (
                                <span className="forms-pill forms-pill--draft" style={{ fontSize: 9, padding: '2px 6px' }}>Draft</span>
                            ) : (
                                <>
                                    <div className="forms-dw__form-bar-bg">
                                        <div
                                            className="forms-dw__form-bar-fill"
                                            style={{ width: `${f.pct}%` }}
                                        />
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
