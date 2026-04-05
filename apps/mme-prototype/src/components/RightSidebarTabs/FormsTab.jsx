import React from 'react';
import { channelMeta } from '../../data/channels';

const formStatusConfig = {
    'Stage 3/4':  { cls: 'warning', label: 'Stage 3/4' },
    'Stage 2/4':  { cls: 'warning', label: 'Stage 2/4' },
    'Complete':   { cls: 'success', label: 'Complete' },
    'Signed':     { cls: 'success', label: 'Signed' },
    'Pending':    { cls: 'danger',  label: 'Pending' },
    'Active':     { cls: 'info',    label: 'Active' },
};

export default function FormsTab({ channelId }) {
    const meta = channelMeta[channelId];
    const forms = meta?.forms || [];

    return (
        <div className="rsb-forms">
            <button className="rsb-forms__create-btn" disabled>
                ○ Open Form Builder ›
            </button>
            {forms.length === 0 ? (
                <div className="rsb-tab__empty">No forms distributed to this channel.</div>
            ) : (
                forms.map((form, i) => {
                    const status = formStatusConfig[form.status] || { cls: 'muted', label: form.status };
                    return (
                        <div key={i} className="rsb-form-row">
                            <div className="rsb-form-row__name">{form.name}</div>
                            <div className="rsb-form-row__meta">
                                <span className="rsb-form-row__distributed">Sent {form.distributed}</span>
                                <span className={`rsb-form-row__status rsb-form-row__status--${status.cls}`}>
                                    {status.label}
                                </span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
