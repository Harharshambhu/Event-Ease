import React from 'react';
import { channelMeta } from '../../data/channels';

const fileIcons = { pdf: '⊟', doc: '▤', xls: '▦', ai: '◈', default: '○' };
const fileColors = { pdf: '#ef4444', doc: '#3b82f6', xls: '#22c55e', ai: '#f97316', default: '#94a3b8' };

export default function PinnedDocsTab({ channelId }) {
    const meta = channelMeta[channelId];
    const docs = meta?.pinnedDocs || [];

    if (docs.length === 0) {
        return <div className="rsb-tab__empty">No pinned documents in this channel.</div>;
    }

    return (
        <div className="rsb-docs">
            <div className="rsb-docs__count">{docs.length} pinned</div>
            {docs.map((doc, i) => (
                <div key={i} className="rsb-pinned-doc">
                    <div
                        className="rsb-pinned-doc__icon"
                        style={{ color: fileColors[doc.type] || fileColors.default }}
                    >
                        {fileIcons[doc.type] || fileIcons.default}
                    </div>
                    <div className="rsb-pinned-doc__info">
                        <div className="rsb-pinned-doc__name">{doc.name}</div>
                        <div className="rsb-pinned-doc__meta">
                            Pinned by {doc.pinnedBy} · {doc.date}
                        </div>
                    </div>
                    <span className="rsb-pinned-doc__arrow">›</span>
                </div>
            ))}
        </div>
    );
}
