import React, { useState } from 'react';
import { vendorSidebar, vendorTasks, vendorActivity, stageColors } from '../data';

const lifecycleSteps = [
    { key: 'lead', label: 'LEAD', icon: '◉' },
    { key: 'confirmed', label: 'CONFIRMED', icon: '◎' },
    { key: 'planning', label: 'PLANNING', icon: '▣' },
    { key: 'build-up', label: 'BUILD-UP', icon: '⬡' },
    { key: 'live', label: 'LIVE', icon: '(m)' },
    { key: 'wrap-up', label: 'WRAP-UP', icon: '❖' },
    { key: 'closed', label: 'CLOSED', icon: '⊙' },
];

function VendorActivityIcon({ type }) {
    const icons = {
        chat: '◯',
        broadcast: '◁',
        check: '✓',
        pin: '⊞',
    };
    return <span className="activity-item__icon">{icons[type] || '•'}</span>;
}

export default function VendorPortalPage({ onBackToAgency }) {
    const [expandedEvent, setExpandedEvent] = useState('infosys');

    return (
        <div className="app-layout">
            {/* Vendor Top Nav */}
            <div className="vendor-topnav">
                <div className="vendor-topnav__logo">
                    <div className="vendor-topnav__logo-icon">AV</div>
                    <span>AV SOLUTIONS — VENDOR PORTAL</span>
                </div>
                <div className="vendor-topnav__nav">
                    <button className="topnav__nav-item topnav__nav-item--active">Overview</button>
                    <button className="topnav__nav-item">DMs</button>
                </div>
            </div>

            <div className="app-body">
                {/* Vendor Sidebar */}
                <div className="vendor-sidebar">
                    <div className="sidebar__section">
                        <div className="sidebar__section-header">
                            <span>COMPANY — INTERNAL</span>
                        </div>
                        {vendorSidebar.internal.map((ch) => (
                            <div key={ch.name} className="sidebar__channel">
                                <span className="sidebar__channel-prefix">#</span>
                                <span className="sidebar__channel-name">{ch.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="sidebar__section">
                        <div className="sidebar__section-header">
                            <span>EVENTS</span>
                        </div>
                        {vendorSidebar.events.map((event) => (
                            <div key={event.name} className="sidebar__event-group">
                                <div className="sidebar__event-header">
                                    <span
                                        className="sidebar__event-dot"
                                        style={{ background: stageColors[event.stage]?.color || '#999' }}
                                    />
                                    <span className="sidebar__event-name">{event.name}</span>
                                    <span className="sidebar__event-stage">{event.stageLabel}</span>
                                    {event.notifications > 0 && (
                                        <span className="sidebar__channel-badge">{event.notifications}</span>
                                    )}
                                </div>
                                <div className="sidebar__event-channels">
                                    {event.channels.map((ch) => (
                                        <div key={ch.name} className="sidebar__channel">
                                            <span className="sidebar__channel-prefix">#</span>
                                            <span className="sidebar__channel-name">{ch.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="sidebar__section">
                        <div className="sidebar__section-header">
                            <span>⊕ DMS</span>
                        </div>
                        {vendorSidebar.dms.map((dm) => (
                            <div key={dm.name} className="vendor-dm-item">
                                <div className="vendor-dm-avatar">
                                    {dm.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span>{dm.name}</span>
                                <span className="vendor-dm-role">{dm.role}</span>
                                {dm.unread > 0 && (
                                    <span className="sidebar__channel-badge">{dm.unread}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Vendor User Footer */}
                    <div className="sidebar__footer">
                        <div className="sidebar__user-avatar">RS</div>
                        <div className="sidebar__user-info">
                            <div className="sidebar__user-name">Rahul Sharma</div>
                            <div className="sidebar__user-role">AV Solutions</div>
                        </div>
                        <div className="sidebar__user-icons">
                            <span>⊘</span>
                            <div className="sidebar__user-status" />
                        </div>
                    </div>
                </div>

                {/* Vendor Main Content */}
                <div className="main-content">
                    <div className="vendor-overview__header">
                        <span className="vendor-overview__icon">▤</span>
                        <span className="vendor-overview__title">Vendor Overview</span>
                        <span className="vendor-overview__org">AV Solutions</span>
                    </div>
                    <div className="vendor-overview__subtitle">
                        Your events, tasks, and activity — tunnelled view for vendor context.
                    </div>

                    {/* Lifecycle Stepper */}
                    <div className="card">
                        <div className="card__header">EVENT CHANNEL LIFECYCLE (READ-ONLY)</div>
                        <div className="vendor-lifecycle">
                            {lifecycleSteps.map((step) => {
                                const isActive = step.key === 'planning';
                                const isCompleted = ['lead', 'confirmed'].includes(step.key);
                                return (
                                    <div
                                        key={step.key}
                                        className={`vendor-lifecycle__step ${isActive ? 'vendor-lifecycle__step--active' : ''} ${isCompleted ? 'vendor-lifecycle__step--completed' : ''}`}
                                    >
                                        <div className="vendor-lifecycle__icon">{step.icon}</div>
                                        <div className="vendor-lifecycle__label">{step.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active Events */}
                    <div className="section-label">ACTIVE EVENTS (2)</div>

                    {/* Infosys Summit - expanded */}
                    <div className="card">
                        <div className="vendor-event">
                            <div
                                className="vendor-event__header"
                                onClick={() => setExpandedEvent(expandedEvent === 'infosys' ? null : 'infosys')}
                            >
                                <span className={`vendor-event__expand ${expandedEvent === 'infosys' ? 'vendor-event__expand--open' : ''}`}>
                                    ›
                                </span>
                                <span className="vendor-event__dot" style={{ background: stageColors.planning.color }} />
                                <span className="vendor-event__name">Infosys Summit 2025</span>
                                <span className="vendor-event__stage">Yellow — Planning</span>
                                <span className="vendor-event__countdown">T-22 days</span>
                            </div>
                            {expandedEvent === 'infosys' && (
                                <div className="vendor-event__body">
                                    <div className="vendor-event__contact">
                                        ⊕ Contact: Priya Mehta · Ops Lead
                                    </div>
                                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: 'hsl(var(--muted-foreground))', marginBottom: 6, textTransform: 'uppercase' }}>
                                        TASK SUMMARY
                                    </div>
                                    {vendorTasks.map((task, i) => (
                                        <div key={i} className="vendor-task">
                                            <span className={`vendor-task__icon vendor-task__icon--${task.icon}`}>
                                                {task.icon === 'warning' ? '△' : task.icon === 'check' ? '✓' : '○'}
                                            </span>
                                            <span className={`vendor-task__name ${task.status === 'Complete' ? 'vendor-task__name--done' : ''}`}>
                                                {task.name}
                                            </span>
                                            <span className="vendor-task__status">{task.status}</span>
                                            {task.date && <span className="vendor-task__date">{task.date}</span>}
                                        </div>
                                    ))}
                                    <button className="vendor-event__go-link">
                                        ⊏ Go to channel ›
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Wipro - collapsed */}
                    <div className="card">
                        <div className="vendor-event">
                            <div className="vendor-event__header" onClick={() => setExpandedEvent(expandedEvent === 'wipro' ? null : 'wipro')}>
                                <span className={`vendor-event__expand ${expandedEvent === 'wipro' ? 'vendor-event__expand--open' : ''}`}>
                                    ›
                                </span>
                                <span className="vendor-event__dot" style={{ background: stageColors['build-up'].color }} />
                                <span className="vendor-event__name">Wipro Retreat 2024</span>
                                <span className="vendor-event__stage">Orange — Build-Up</span>
                                <span className="vendor-event__countdown">T-45 days</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="card" style={{ marginTop: 16 }}>
                        <div className="card__header">RECENT ACTIVITY</div>
                        {vendorActivity.map((item, i) => (
                            <div key={i} className="activity-item">
                                <VendorActivityIcon type={item.icon} />
                                <span className="activity-item__text">{item.text}</span>
                                <span className="activity-item__time">{item.time}</span>
                            </div>
                        ))}
                    </div>

                    <div className="footer-label">
                        LOW FIDELITY WIREFRAME — VENDOR PORTAL — TUNNELLED VIEW
                    </div>
                </div>
            </div>

            {/* Back to Agency Button */}
            <button className="vendor-back" onClick={onBackToAgency}>
                ← Back to Agency View
            </button>
        </div>
    );
}
