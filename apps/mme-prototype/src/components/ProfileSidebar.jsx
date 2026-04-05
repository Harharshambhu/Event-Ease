import React from 'react';

const AVATAR_COLORS = ['#c0392b', '#2980b9', '#8e44ad', '#27ae60', '#e67e22', '#2c3e50'];

function hashInitials(initials) {
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
        hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ProfileSidebar({ user, isOpen, onClose }) {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`profile-sidebar${isOpen ? ' profile-sidebar--open' : ''}`}>
            {user && (
                <div className="profile-sidebar__inner">
                    {/* Header */}
                    <div className="profile-sidebar__header">
                        <span className="profile-sidebar__title">Profile</span>
                        <button className="profile-sidebar__close" onClick={onClose}>×</button>
                    </div>

                    {/* Avatar */}
                    <div
                        className="profile-sidebar__avatar"
                        style={{ background: hashInitials(user.initials || 'U') }}
                    >
                        {user.initials}
                    </div>

                    {/* Name row */}
                    <div className="profile-sidebar__name-row">
                        <span className="profile-sidebar__name">{user.name}</span>
                        <button className="profile-sidebar__edit">Edit</button>
                    </div>

                    {/* Pronunciation */}
                    <div className="profile-sidebar__meta-row" style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#3b82f6', cursor: 'pointer', fontSize: 'var(--fs-xs)' }}>
                            + Add name pronunciation
                        </span>
                    </div>

                    {/* Active status */}
                    <div className="profile-sidebar__meta-row">
                        <span className="profile-sidebar__online-dot" />
                        <span>Active</span>
                    </div>

                    {/* Local time */}
                    <div className="profile-sidebar__meta-row">
                        <span>⊙ {currentTime} local time</span>
                    </div>

                    {/* Action buttons */}
                    <div className="profile-sidebar__action-row">
                        <button className="profile-sidebar__action-btn">Set a status</button>
                        <button className="profile-sidebar__action-btn">View as ▾</button>
                        <button className="profile-sidebar__more-btn">⋮</button>
                    </div>

                    <div className="profile-sidebar__divider" />

                    {/* Contact information */}
                    <div className="profile-sidebar__section-title">
                        <span>Contact information</span>
                        <button className="profile-sidebar__edit">Edit</button>
                    </div>
                    <div className="profile-sidebar__contact-row">
                        <span>✉</span>
                        <span>{(user.initials || 'u').toLowerCase()}@mmeagency.com</span>
                    </div>
                    <span className="profile-sidebar__add-link">+ Add Phone</span>

                    <div className="profile-sidebar__divider" />

                    {/* About me */}
                    <div className="profile-sidebar__section-title">
                        <span>About me</span>
                        <button className="profile-sidebar__edit">Edit</button>
                    </div>
                    <span className="profile-sidebar__add-link">+ Add Start date</span>
                </div>
            )}
        </div>
    );
}
