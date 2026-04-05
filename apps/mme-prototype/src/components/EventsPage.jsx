import React from 'react';
import { EventLifecycleBoard } from '@mme/ui-components';
import { activeEvents, archivedEvents, stageColors, lifecycleEvents } from '../data';

export default function EventsPage({ onNavigate, onCreateEvent }) {
    return (
        <div className="main-content">
            <div className="events-page__header">
                <span className="events-page__icon">▦</span>
                <span className="events-page__title">Event Dashboard</span>
                <button
                    className="events-page__create-btn"
                    onClick={onCreateEvent}
                >
                    + Create Event
                </button>
            </div>
            <div className="events-page__subtitle">
                All events across their lifecycle. Click an event to view its channel cluster.
            </div>

            {/* Event Channel Lifecycle */}
            <div className="card">
                <div className="card__header">EVENT CHANNEL LIFECYCLE</div>
                <EventLifecycleBoard stageColors={stageColors} lifecycleEvents={lifecycleEvents} />
            </div>

            {/* Active Events */}
            <div className="section-label">ACTIVE EVENTS ({activeEvents.length})</div>
            {activeEvents.map((event) => (
                <div
                    key={event.id}
                    className="event-card"
                    onClick={() => onNavigate('event-dashboard', { eventId: event.id })}
                >
                    <div className="event-card__main">
                        <span className="event-card__expand">›</span>
                        <span
                            className="event-card__dot"
                            style={{ background: stageColors[event.stage]?.color || '#999' }}
                        />
                        <span className="event-card__name">{event.name}</span>
                        {event.notifications > 0 && (
                            <span className="event-card__notif">⊡ {event.notifications}</span>
                        )}
                        <div className="event-card__meta">
                            <span>◷ {event.countdown}</span>
                            <span>⊕ {event.members} members</span>
                            {event.vendors && <span>⊞ {event.vendors} vendors</span>}
                            {event.location && <span>◈ {event.location}</span>}
                        </div>
                        {event.channels && (
                            <span className="event-card__channels">{event.channels} channels</span>
                        )}
                    </div>
                </div>
            ))}

            {/* Archived Events */}
            <div className="section-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                ☐ ARCHIVED EVENTS ({archivedEvents.length})
            </div>
            {archivedEvents.map((event) => (
                <div key={event.id} className="event-card">
                    <div className="event-card__main">
                        <span className="event-card__expand">›</span>
                        <span className="event-card__dot" style={{ background: stageColors.closed.color }} />
                        <span className="event-card__name">{event.name}</span>
                        <div className="event-card__meta">
                            <span>▦ {event.date}</span>
                            <span>◈ {event.location}</span>
                        </div>
                        {event.channels ? (
                            <span className="event-card__channels">{event.channels} channels</span>
                        ) : (
                            <span className="event-card__channels">archived</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
