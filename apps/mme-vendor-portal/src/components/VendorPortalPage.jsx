import React, { useState } from 'react';
import { Card, ActivityRow, AppLayout, TopNav, SidebarSection, ChannelRow, EventStageBadge, VendorStepper } from '@mme/ui-components';
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
        <>
            <AppLayout
                topNav={
                    <TopNav 
                        className="vendor-topnav"
                        logoBox={
                            <div className="vendor-topnav__logo">
                                <div className="vendor-topnav__logo-icon">AV</div>
                                <span>AV SOLUTIONS — VENDOR PORTAL</span>
                            </div>
                        }
                        navActions={
                            <div className="vendor-topnav__nav">
                                <button className="topnav__nav-item topnav__nav-item--active">Overview</button>
                                <button className="topnav__nav-item">DMs</button>
                            </div>
                        }
                    />
                }
                sidebar={
                    <div className="vendor-sidebar">
                        <SidebarSection title="COMPANY — INTERNAL">
                            {vendorSidebar.internal.map((ch) => (
                                <ChannelRow
                                    key={ch.name}
                                    className="sidebar__channel"
                                    elementModifier="-"
                                    prefixIcon="#"
                                    name={ch.name}
                                />
                            ))}
                        </SidebarSection>

                        <SidebarSection title="EVENTS">
                            {vendorSidebar.events.map((event) => (
                                <div key={event.name} className="sidebar__event-group">
                                    <div className="sidebar__event-header">
                                        <EventStageBadge
                                            className="sidebar__event"
                                            color={stageColors[event.stage]?.color}
                                            name={event.name}
                                            stageLabel={event.stageLabel}
                                        />
                                        {event.notifications > 0 && (
                                            <span className="sidebar__channel-badge">{event.notifications}</span>
                                        )}
                                    </div>
                                    <div className="sidebar__event-channels">
                                        {event.channels.map((ch) => (
                                            <ChannelRow
                                                key={ch.name}
                                                className="sidebar__channel"
                                                elementModifier="-"
                                                prefixIcon="#"
                                                name={ch.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </SidebarSection>

                        <SidebarSection title="⊕ DMS">
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
                        </SidebarSection>

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
                }
            >
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
                    <Card headerTitle="EVENT CHANNEL LIFECYCLE (READ-ONLY)">
                        <VendorStepper
                            steps={lifecycleSteps.map(step => ({
                                ...step,
                                status: ['lead', 'confirmed'].includes(step.key) ? 'completed' 
                                      : (step.key === 'planning' ? 'active' : 'pending')
                            }))}
                        />
                    </Card>

                    {/* Active Events */}
                    <div className="section-label">ACTIVE EVENTS (2)</div>

                    {/* Infosys Summit - expanded */}
                    <Card>
                        <div className="vendor-event">
                            <div
                                className="vendor-event__header"
                                onClick={() => setExpandedEvent(expandedEvent === 'infosys' ? null : 'infosys')}
                            >
                                <span className={`vendor-event__expand ${expandedEvent === 'infosys' ? 'vendor-event__expand--open' : ''}`}>
                                    ›
                                </span>
                                <EventStageBadge
                                    className="vendor-event"
                                    color={stageColors.planning.color}
                                    name="Infosys Summit 2025"
                                    stageLabel="Yellow — Planning"
                                    countdown="T-22 days"
                                />
                            </div>
                            {expandedEvent === 'infosys' && (
                                <div className="vendor-event__body">
                                    <div className="vendor-event__contact">
                                        ⊕ Contact: Priya Mehta · Ops Lead
                                    </div>
                                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.6, color: '#999', marginBottom: 6, textTransform: 'uppercase' }}>
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
                    </Card>

                    {/* Wipro - collapsed */}
                    <Card>
                        <div className="vendor-event">
                            <div className="vendor-event__header" onClick={() => setExpandedEvent(expandedEvent === 'wipro' ? null : 'wipro')}>
                                <span className={`vendor-event__expand ${expandedEvent === 'wipro' ? 'vendor-event__expand--open' : ''}`}>
                                    ›
                                </span>
                                <EventStageBadge
                                    className="vendor-event"
                                    color={stageColors['build-up'].color}
                                    name="Wipro Retreat 2024"
                                    stageLabel="Orange — Build-Up"
                                    countdown="T-45 days"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card headerTitle="RECENT ACTIVITY" style={{ marginTop: 16 }}>
                        {vendorActivity.map((item, i) => (
                            <ActivityRow 
                                key={i}
                                icon={<VendorActivityIcon type={item.icon} />}
                                text={item.text}
                                time={item.time}
                            />
                        ))}
                    </Card>

                    <div className="footer-label">
                        LOW FIDELITY WIREFRAME — VENDOR PORTAL — TUNNELLED VIEW
                    </div>
                </div>
            </AppLayout>

            {/* Back to Agency Button */}
            <button className="vendor-back" onClick={onBackToAgency}>
                ← Back to Agency View
            </button>
        </>
    );
}
