import React from 'react';

const EVENTS = [
    {
        id: 'inf25',
        name: 'Infosys Summit 2025',
        date: 'Apr 14–16, 2025',
        confirmed: 312,
        waitlisted: 47,
        status: 'active',
    },
    {
        id: 'wip24',
        name: 'Wipro Retreat 2024',
        date: 'Mar 3–5, 2025',
        confirmed: 280,
        waitlisted: 0,
        status: 'active',
    },
    {
        id: 'tech26',
        name: 'Tech Forum 2026',
        date: 'Oct 10, 2026',
        confirmed: 0,
        waitlisted: 0,
        status: 'setup',
    },
];

export default function GuestListsDashboardWidget({ onSelectEvent }) {
    return (
        <div className="gl-dw">
            <div className="gl-dw__header">
                <div className="gl-dw__header-left">
                    <span className="gl-dw__icon">☐</span>
                    <span className="gl-dw__title">Guest Lists</span>
                </div>
                <span className="gl-dw__count">{EVENTS.length} events</span>
            </div>

            <div className="gl-dw__list">
                {EVENTS.map((event, i) => (
                    <div
                        key={event.id}
                        className="gl-dw__row"
                        onClick={() => onSelectEvent(event.id, event.name)}
                    >
                        <div className="gl-dw__row-left">
                            <span className="gl-dw__row-arrow">›</span>
                            <div>
                                <div className="gl-dw__row-name">{event.name}</div>
                                <div className="gl-dw__row-date">{event.date}</div>
                            </div>
                        </div>
                        <div className="gl-dw__row-right">
                            {event.status === 'setup' ? (
                                <span className="gl-dw__badge gl-dw__badge--warn">Setup Required</span>
                            ) : (
                                <div className="gl-dw__row-stats">
                                    <span className="gl-dw__row-stat">{event.confirmed} confirmed</span>
                                    {event.waitlisted > 0 && (
                                        <span className="gl-dw__badge gl-dw__badge--amber">
                                            {event.waitlisted} waitlisted
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
