import React from 'react';

const fileIcons = { pdf: '⊟', doc: '▤', xls: '▦', ai: '◈', default: '○' };

export default function OverviewTab({ meta }) {
    if (!meta) {
        return <div className="rsb-tab__empty">No channel info available.</div>;
    }

    return (
        <div className="rsb-overview">
            {/* Channel identity */}
            <div className="rsb-overview__identity">
                <div className="rsb-overview__channel-name">#{meta.displayName}</div>
                <div className="rsb-overview__group">{meta.groupName}</div>
                {meta.companyName && meta.companyName !== meta.groupName && (
                    <div className="rsb-overview__company">{meta.companyName}</div>
                )}
                <div className="rsb-overview__created">Created {meta.createdDate}</div>
                {meta.stageLabel && (
                    <span className="rsb-overview__stage-badge">{meta.stageLabel}</span>
                )}
            </div>

            {/* Pinned broadcast */}
            {meta.pinnedBroadcast && (
                <div className="rsb-overview__broadcast">
                    <div className="rsb-overview__section-label">◁ PINNED BROADCAST</div>
                    <div className="rsb-overview__broadcast-text">{meta.pinnedBroadcast}</div>
                </div>
            )}

            {/* Tasks summary */}
            <div className="rsb-overview__section">
                <div className="rsb-overview__section-label">▤ TASKS</div>
                <div className="rsb-overview__stats-row">
                    <div className="rsb-overview__stat">
                        <span className="rsb-overview__stat-num">{meta.tasksSummary.total}</span>
                        <span className="rsb-overview__stat-label">Total</span>
                    </div>
                    <div className="rsb-overview__stat">
                        <span className="rsb-overview__stat-num rsb-overview__stat-num--success">{meta.tasksSummary.completed}</span>
                        <span className="rsb-overview__stat-label">Done</span>
                    </div>
                    <div className="rsb-overview__stat">
                        <span className="rsb-overview__stat-num rsb-overview__stat-num--danger">{meta.tasksSummary.overdue}</span>
                        <span className="rsb-overview__stat-label">Overdue</span>
                    </div>
                </div>
            </div>

            {/* Forms summary */}
            <div className="rsb-overview__section">
                <div className="rsb-overview__section-label">○ FORMS</div>
                <div className="rsb-overview__stats-row">
                    <div className="rsb-overview__stat">
                        <span className="rsb-overview__stat-num">{meta.formsStatus.distributed}</span>
                        <span className="rsb-overview__stat-label">Sent</span>
                    </div>
                    <div className="rsb-overview__stat">
                        <span className="rsb-overview__stat-num rsb-overview__stat-num--success">{meta.formsStatus.submitted}</span>
                        <span className="rsb-overview__stat-label">Submitted</span>
                    </div>
                    <div className="rsb-overview__stat">
                        <span className="rsb-overview__stat-num rsb-overview__stat-num--warning">{meta.formsStatus.pending}</span>
                        <span className="rsb-overview__stat-label">Pending</span>
                    </div>
                </div>
            </div>

            {/* Pinned docs preview */}
            {meta.pinnedDocs?.length > 0 && (
                <div className="rsb-overview__section">
                    <div className="rsb-overview__section-label">⊞ PINNED DOCS</div>
                    {meta.pinnedDocs.map((doc, i) => (
                        <div key={i} className="rsb-doc-row">
                            <span className="rsb-doc-row__icon">{fileIcons[doc.type] || fileIcons.default}</span>
                            <span className="rsb-doc-row__name">{doc.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
