import React from 'react';
import { channelMeta } from '../../data/channels';

export default function MembersTab({ channelId }) {
    const meta = channelMeta[channelId];
    const members = meta?.members || [];

    if (members.length === 0) {
        return <div className="rsb-tab__empty">No members assigned to this channel.</div>;
    }

    const internal = members.filter((m) => !m.role.includes('External') && !m.role.includes('Vendor'));
    const external = members.filter((m) => m.role.includes('External') || m.role.includes('Vendor'));

    return (
        <div className="rsb-members">
            <div className="rsb-members__count">{members.length} members</div>

            {internal.length > 0 && (
                <div className="rsb-members__group">
                    <div className="rsb-members__group-label">INTERNAL ({internal.length})</div>
                    {internal.map((m, i) => (
                        <MemberRow key={i} member={m} />
                    ))}
                </div>
            )}

            {external.length > 0 && (
                <div className="rsb-members__group">
                    <div className="rsb-members__group-label">EXTERNAL ({external.length})</div>
                    {external.map((m, i) => (
                        <MemberRow key={i} member={m} />
                    ))}
                </div>
            )}
        </div>
    );
}

function MemberRow({ member }) {
    return (
        <div className="rsb-member-row">
            <div className="rsb-member-row__avatar">{member.initials}</div>
            <div className="rsb-member-row__info">
                <div className="rsb-member-row__name">{member.name}</div>
                <div className="rsb-member-row__role">{member.role}</div>
            </div>
            <div className="rsb-member-row__status" />
        </div>
    );
}
