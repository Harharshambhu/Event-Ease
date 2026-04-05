import React, { useState } from 'react';
import { stageColors } from '../data';

const stageOptions = Object.entries(stageColors).map(([key, s]) => ({ key, label: s.label }));

const defaultMembers = [
    { id: 'm1', initials: 'SD', name: 'Sofia Davis',  role: 'Event Manager' },
    { id: 'm2', initials: 'JL', name: 'Jackson Lee',  role: 'AV Technician' },
    { id: 'm3', initials: 'PS', name: 'Priya Sharma', role: 'Registration Coordinator' },
    { id: 'm4', initials: 'RM', name: 'Rahul Menon',  role: 'Ops Coordinator' },
];

export default function EventCreator({ onClose }) {
    const [form, setForm] = useState({
        name: '',
        client: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
        location: '',
        stage: 'lead',
        description: '',
    });
    const [selectedMembers, setSelectedMembers] = useState(['m1', 'm4']);

    const toggleMember = (id) =>
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-box">
                {/* Title bar */}
                <div className="modal-box__header">
                    <span className="modal-box__title">Create Event</span>
                    <button className="modal-box__close" onClick={onClose}>×</button>
                </div>

                <div className="modal-box__body">
                    {/* Left — fields */}
                    <div className="modal-box__left">
                        <label className="evcreator__label">Event Name <span style={{ color: '#e74c3c' }}>*</span></label>
                        <input
                            className="evcreator__input"
                            type="text"
                            placeholder="e.g. Infosys Summit 2026"
                            value={form.name}
                            onChange={set('name')}
                        />

                        <label className="evcreator__label">Client / Organisation</label>
                        <input
                            className="evcreator__input"
                            type="text"
                            placeholder="e.g. Infosys Ltd."
                            value={form.client}
                            onChange={set('client')}
                        />

                        <div className="evcreator__row">
                            <div className="evcreator__col">
                                <label className="evcreator__label">Start Date</label>
                                <input className="evcreator__input" type="text" placeholder="May 03, 2026" value={form.startDate} onChange={set('startDate')} />
                            </div>
                            <div className="evcreator__col">
                                <label className="evcreator__label">End Date</label>
                                <input className="evcreator__input" type="text" placeholder="May 05, 2026" value={form.endDate} onChange={set('endDate')} />
                            </div>
                        </div>

                        <label className="evcreator__label">Location</label>
                        <input className="evcreator__input" type="text" placeholder="City, Country" value={form.location} onChange={set('location')} />

                        <label className="evcreator__label">Initial Stage</label>
                        <select className="evcreator__input evcreator__select" value={form.stage} onChange={set('stage')}>
                            {stageOptions.map((s) => (
                                <option key={s.key} value={s.key}>{s.label}</option>
                            ))}
                        </select>

                        <label className="evcreator__label">Description / Brief</label>
                        <textarea
                            className="evcreator__input evcreator__textarea"
                            placeholder="Short brief about this event..."
                            value={form.description}
                            onChange={set('description')}
                            rows={3}
                        />

                        <div className="evcreator__section-label" style={{ marginTop: 'var(--space-3)' }}>ASSIGN TEAM</div>
                        <div className="modal-box__members">
                            {defaultMembers.map((m) => (
                                <div
                                    key={m.id}
                                    className={`evcreator__member-row ${selectedMembers.includes(m.id) ? 'evcreator__member-row--selected' : ''}`}
                                    onClick={() => toggleMember(m.id)}
                                >
                                    <div className="evcreator__member-avatar">{m.initials}</div>
                                    <div className="evcreator__member-info">
                                        <div className="evcreator__member-name">{m.name}</div>
                                        <div className="evcreator__member-role">{m.role}</div>
                                    </div>
                                    <span className="evcreator__member-check">
                                        {selectedMembers.includes(m.id) ? '✓' : '○'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — info panel */}
                    <div className="modal-box__right">
                        <div className="modal-box__right-art">▦</div>
                        <div className="modal-box__right-heading">Create your event</div>
                        <p className="modal-box__right-body">
                            Start by providing the basic details now and configure modules — credentials, catering, assets, and forms — after creation.
                        </p>
                        <p className="modal-box__right-body" style={{ marginTop: 8 }}>
                            Channels will be auto-created based on the event stage.
                        </p>
                        <div style={{ flex: 1 }} />
                        <div className="modal-box__actions">
                            <button className="evcreator__cancel" onClick={onClose}>Cancel</button>
                            <button className="evcreator__submit">Create Event</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
