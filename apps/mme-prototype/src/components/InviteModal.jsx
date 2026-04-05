import React from 'react';

export default function InviteModal({ channelId, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="invite-modal__backdrop" onClick={onClose}>
            <div className="invite-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="invite-modal__header">
                    <span className="invite-modal__title">Add people to #{channelId}</span>
                    <button className="invite-modal__close" onClick={onClose}>×</button>
                </div>

                {/* Search input */}
                <input
                    className="invite-modal__input"
                    type="text"
                    placeholder="Enter a name or email address"
                    autoFocus
                />

                {/* Auto-add info box */}
                <div className="invite-modal__auto-add">
                    <button className="invite-modal__toggle" title="Toggle auto-add" />
                    <span className="invite-modal__auto-text">
                        When new people join your workspace, add them to #{channelId}
                    </span>
                </div>

                {/* Footer */}
                <div className="invite-modal__footer">
                    <button className="invite-modal__add-btn" onClick={onClose}>Add</button>
                </div>
            </div>
        </div>
    );
}
