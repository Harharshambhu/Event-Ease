import React, { useState } from 'react';
import { channelMeta } from '../data/channels';

export default function ChannelWindow({ channelId, isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('about');
    const [starred, setStarred] = useState(false);

    if (!isOpen) return null;

    const meta = channelMeta[channelId] || {};
    const members = meta.members || [];

    const tabs = [
        { id: 'about', label: 'About' },
        { id: 'members', label: `Members ${members.length > 0 ? members.length : ''}` },
        { id: 'integrations', label: 'Integrations' },
        { id: 'settings', label: 'Settings' },
    ];

    return (
        <div className="ch-window__backdrop" onClick={onClose}>
            <div className="ch-window" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="ch-window__header">
                    <div className="ch-window__title-row">
                        <span className="ch-window__title"># {channelId}</span>
                        <button className="ch-window__close" onClick={onClose}>×</button>
                    </div>
                    <div className="ch-window__actions">
                        <button
                            className={`ch-window__action-btn${starred ? ' ch-window__action-btn--star-active' : ''}`}
                            onClick={() => setStarred(v => !v)}
                        >
                            {starred ? '★' : '☆'} {starred ? 'Starred' : 'Star'}
                        </button>
                        <button className="ch-window__action-btn">
                            🔔 All new posts ▾
                        </button>
                        <button className="ch-window__action-btn">
                            🎧 Huddle
                        </button>
                    </div>
                    <div className="ch-window__tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`ch-window__tab${activeTab === tab.id ? ' ch-window__tab--active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="ch-window__body">
                    {activeTab === 'about' && <AboutTab channelId={channelId} meta={meta} />}
                    {activeTab === 'members' && <MembersTab members={members} />}
                    {activeTab === 'integrations' && <IntegrationsTab />}
                    {activeTab === 'settings' && <SettingsTab channelId={channelId} />}
                </div>
            </div>
        </div>
    );
}

function AboutTab({ channelId, meta }) {
    return (
        <div>
            <div className="ch-window__card">
                <div className="ch-window__card-header">
                    <span className="ch-window__card-label">Channel name</span>
                    <button className="ch-window__card-edit">Edit</button>
                </div>
                <div className="ch-window__card-value"># {meta.displayName || channelId}</div>
            </div>

            <div className="ch-window__card">
                <div className="ch-window__card-header">
                    <span className="ch-window__card-label">Topic</span>
                    <button className="ch-window__card-edit">Edit</button>
                </div>
                <div className="ch-window__card-value" style={{ color: '#3b82f6', cursor: 'pointer' }}>
                    Add a topic
                </div>
            </div>

            <div className="ch-window__card">
                <div className="ch-window__card-header">
                    <span className="ch-window__card-label">Description</span>
                    <button className="ch-window__card-edit">Edit</button>
                </div>
                <div className="ch-window__card-value">
                    {meta.description || 'This channel is used for event coordination, updates, and team communication related to ' + (meta.groupName || channelId) + '.'}
                </div>
            </div>

            <div className="ch-window__card">
                <div className="ch-window__card-header">
                    <span className="ch-window__card-label">Created by</span>
                </div>
                <div className="ch-window__card-value">
                    Jane Doe on {meta.createdDate || 'Apr 2026'}
                </div>
            </div>

            <div className="ch-window__card">
                <div className="ch-window__card-header">
                    <span className="ch-window__card-label">Files</span>
                </div>
                <div className="ch-window__card-value">
                    No files yet. Drag and drop any file into the message pane.
                </div>
            </div>

            <div className="ch-window__channel-id">
                <span>Channel ID: {channelId.toUpperCase()}</span>
                <span style={{ cursor: 'pointer', fontSize: '14px' }} title="Copy channel ID">⊞</span>
            </div>
        </div>
    );
}

function MembersTab({ members }) {
    const displayMembers = members.length > 0
        ? members
        : [{ initials: 'JD', name: 'Jane Doe', role: 'Ops Coordinator' }];

    return (
        <div>
            <input
                className="ch-window__member-search"
                placeholder="Find members"
                type="text"
            />
            <div className="ch-window__add-people">
                <div className="ch-window__add-people-icon">⊕</div>
                <span>Add people</span>
            </div>
            {displayMembers.map((m, i) => (
                <div key={m.initials + i} className="ch-window__member-row">
                    <div className="ch-window__member-avatar" style={{ background: avatarColor(m.initials) }}>
                        {m.initials}
                        {i < 2 && <span className="ch-window__member-dot" />}
                    </div>
                    <div>
                        <div className="ch-window__member-name">{m.name}</div>
                        <div className="ch-window__member-role">{m.role}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function IntegrationsTab() {
    const integrations = [
        { icon: '💬', name: 'WhatsApp', desc: 'Forward channel messages to a WhatsApp group' },
        { icon: '🟦', name: 'Microsoft Teams', desc: 'Sync messages between this channel and a Teams channel' },
        { icon: '🎥', name: 'Zoom', desc: 'Start Zoom meetings directly from this channel' },
    ];

    return (
        <div>
            {integrations.map(item => (
                <div key={item.name} className="ch-window__integration-card">
                    <div className="ch-window__integration-icon">{item.icon}</div>
                    <div className="ch-window__integration-info">
                        <div className="ch-window__integration-name">{item.name}</div>
                        <div className="ch-window__integration-desc">{item.desc}</div>
                        <button className="ch-window__integration-connect">Connect</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function SettingsTab() {
    return (
        <div>
            <div className="ch-window__card">
                <div className="ch-window__card-header">
                    <span className="ch-window__card-label">Posting permissions</span>
                    <button className="ch-window__card-edit">Edit</button>
                </div>
                <ul className="ch-window__bullet-list">
                    <li>Everyone can post</li>
                    <li>Everyone can reply to messages</li>
                    <li>Only admins can use @everyone mentions</li>
                </ul>
            </div>

            <div className="ch-window__card">
                <div className="ch-window__card-header">
                    <span className="ch-window__card-label">Huddles</span>
                    <button className="ch-window__card-edit">Edit</button>
                </div>
                <div className="ch-window__card-value">
                    Members can start and join huddles in this channel.
                </div>
                <div className="ch-window__huddle-btns">
                    <button className="ch-window__huddle-btn">🎧 Start huddle</button>
                    <button className="ch-window__huddle-btn">Copy huddle link</button>
                </div>
            </div>

            <div className="ch-window__card">
                <div className="ch-window__card-header">
                    <span className="ch-window__card-label">Tab management</span>
                </div>
                <div className="ch-window__card-value">
                    Choose who can add, remove and reorder tabs
                </div>
                <select className="ch-window__tab-select">
                    <option>Everyone</option>
                    <option>Admins only</option>
                </select>
            </div>
        </div>
    );
}

function avatarColor(initials) {
    const colors = ['#c0392b', '#2980b9', '#8e44ad', '#27ae60', '#e67e22', '#2c3e50'];
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
        hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}
