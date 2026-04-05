import React, { useState } from 'react';
import { FIELD_TYPES, FORMS, CHANNELS, CHANNEL_MAP } from './data';
import QuickPollCard from './QuickPollCard';

const INITIAL_FIELDS = [
    { id: 1, type: 'text',     label: 'Full Name',               required: true,  options: null },
    { id: 2, type: 'email',    label: 'Email Address',            required: true,  options: null },
    { id: 3, type: 'dropdown', label: 'Dietary Preference',       required: true,  options: ['Vegetarian', 'Non Vegetarian', 'Vegan', 'Jain'] },
    { id: 4, type: 'checkbox', label: 'Allergies / Restrictions', required: false, options: ['Gluten-free', 'Nut-free', 'Dairy-free', 'None'] },
    { id: 5, type: 'file',     label: 'Supporting Document',      required: false, options: null },
];

const PALETTE = [
    { type: 'text',     label: 'Short Answer',   icon: '─' },
    { type: 'textarea', label: 'Paragraph',       icon: '≡' },
    { type: 'radio',    label: 'Multiple Choice', icon: '◉' },
    { type: 'checkbox', label: 'Checkboxes',      icon: '☑' },
    { type: 'dropdown', label: 'Dropdown',        icon: '▾' },
    { type: 'file',     label: 'File Upload',     icon: '📎' },
    { type: 'date',     label: 'Date',            icon: '◷' },
    { type: 'email',    label: 'Email',           icon: '@' },
    { type: 'number',   label: 'Number',          icon: '#' },
];

const isChoiceType = (t) => ['radio', 'checkbox', 'dropdown'].includes(t);

function ChannelBadge({ channelId, size = 'md' }) {
    const ch = CHANNEL_MAP[channelId];
    if (!ch) return null;
    return (
        <span className={`forms-ch-badge forms-ch-badge--${ch.type} forms-ch-badge--${size}`}>
            {ch.type === 'external' ? '🔒' : '#'}{ch.label}
        </span>
    );
}

function PermissionNote({ channelId }) {
    const ch = CHANNEL_MAP[channelId];
    if (!ch || ch.type !== 'external') return null;
    return (
        <div className="forms-perm-note">
            <span className="forms-perm-note__icon">🔒</span>
            <span>
                <strong>Restricted visibility</strong> — this form is only accessible to members of{' '}
                <code>#{ch.label}</code>. Submissions post back to that channel only.
                Scope: <em>{ch.scope}</em>.
            </span>
        </div>
    );
}

function QuestionCard({ field, isActive, onClick, onChange, onDelete, onDuplicate, onToggleRequired, onAddOption, onChangeOption, onDeleteOption }) {
    return (
        <div className={`fb-qcard ${isActive ? 'fb-qcard--active' : ''}`} onClick={onClick}>
            <div className="fb-qcard__drag">⠿⠿</div>

            <div className="fb-qcard__top">
                <input
                    className="fb-qcard__question-input"
                    value={field.label}
                    placeholder="Question"
                    onChange={e => onChange(field.id, { label: e.target.value })}
                    onClick={e => e.stopPropagation()}
                />
                <select
                    className="fb-qcard__type-select"
                    value={field.type}
                    onChange={e => onChange(field.id, {
                        type: e.target.value,
                        options: isChoiceType(e.target.value) ? (field.options || ['Option 1']) : null,
                    })}
                    onClick={e => e.stopPropagation()}
                >
                    {FIELD_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                </select>
            </div>

            <div className="fb-qcard__body">
                {(field.type === 'text' || field.type === 'email' || field.type === 'number') && (
                    <div className="fb-qcard__mock-input">
                        {field.type === 'email' ? 'email@example.com' : field.type === 'number' ? '0' : 'Short answer text'}
                    </div>
                )}
                {field.type === 'textarea' && (
                    <div className="fb-qcard__mock-input" style={{ height: 52 }}>Long answer text</div>
                )}
                {field.type === 'date' && (
                    <div className="fb-qcard__mock-input" style={{ width: 160 }}>MM / DD / YYYY</div>
                )}
                {field.type === 'file' && (
                    <div className="fb-qcard__file-zone">
                        <span style={{ fontSize: 20 }}>📎</span>
                        <span>Add File</span>
                    </div>
                )}
                {isChoiceType(field.type) && (
                    <div className="fb-qcard__options">
                        {(field.options || []).map((opt, oi) => (
                            <div key={oi} className="fb-qcard__option-row">
                                <span className="fb-qcard__option-icon">
                                    {field.type === 'checkbox' ? '☐' : field.type === 'dropdown' ? `${oi + 1}.` : '○'}
                                </span>
                                <input
                                    className="fb-qcard__option-input"
                                    value={opt}
                                    placeholder={`Option ${oi + 1}`}
                                    onChange={e => onChangeOption(field.id, oi, e.target.value)}
                                    onClick={e => e.stopPropagation()}
                                />
                                {(field.options || []).length > 1 && (
                                    <button className="fb-qcard__option-del" onClick={e => { e.stopPropagation(); onDeleteOption(field.id, oi); }}>×</button>
                                )}
                            </div>
                        ))}
                        <button className="fb-qcard__add-option" onClick={e => { e.stopPropagation(); onAddOption(field.id); }}>
                            <span className="fb-qcard__option-icon" style={{ color: '#bbb' }}>
                                {field.type === 'checkbox' ? '☐' : field.type === 'dropdown' ? `${(field.options || []).length + 1}.` : '○'}
                            </span>
                            Add option
                        </button>
                    </div>
                )}
            </div>

            {isActive && (
                <div className="fb-qcard__footer" onClick={e => e.stopPropagation()}>
                    <div className="fb-qcard__footer-left">
                        <button className="fb-qcard__action-btn" onClick={() => onDuplicate(field.id)}>⧉ Duplicate</button>
                        <span className="fb-qcard__divider" />
                        <button className="fb-qcard__action-btn fb-qcard__action-btn--del" onClick={() => onDelete(field.id)}>🗑 Delete</button>
                    </div>
                    <div className="fb-qcard__footer-right">
                        <span className="fb-qcard__req-label">Required</span>
                        <div className={`fb-toggle ${field.required ? 'fb-toggle--on' : ''}`} onClick={() => onToggleRequired(field.id)}>
                            <div className="fb-toggle__thumb" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Quick Poll Settings Card ─────────────────────────────────── */
function PollSettingsCard({ question, deadline, allowUndo, channelId, onChange }) {
    return (
        <div className="fb-poll-settings">
            <div className="fb-poll-settings__row">
                <label className="fb-poll-settings__label">
                    Question <span className="fb-poll-settings__required">*</span>
                </label>
                <input
                    className="fb-poll-settings__input"
                    value={question}
                    placeholder="e.g. Is your setup complete and ready for rehearsal?"
                    onChange={e => onChange('question', e.target.value)}
                />
                <div className="fb-poll-settings__hint">
                    Respondents answer with a single ✓ Yes tap. No multiple-choice options.
                </div>
            </div>

            <div className="fb-poll-settings__row fb-poll-settings__row--inline">
                <div style={{ flex: 1 }}>
                    <label className="fb-poll-settings__label">Deadline <span style={{ color: 'hsl(var(--muted-foreground))', fontWeight: 400 }}>(optional)</span></label>
                    <input
                        className="fb-poll-settings__input"
                        type="date"
                        value={deadline}
                        onChange={e => onChange('deadline', e.target.value)}
                    />
                </div>
                <div>
                    <label className="fb-poll-settings__label">Allow Undo</label>
                    <div className="fb-poll-settings__toggle-row">
                        <div
                            className={`fb-toggle ${allowUndo ? 'fb-toggle--on' : ''}`}
                            onClick={() => onChange('allowUndo', !allowUndo)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="fb-toggle__thumb" />
                        </div>
                        <span className="fb-poll-settings__toggle-label">
                            {allowUndo ? 'Respondents can change vote' : 'Vote is final once submitted'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="fb-poll-settings__rule">
                <div className="fb-poll-settings__rule-title">Scoping</div>
                <div className="fb-poll-settings__rule-body">
                    Poll is visible and respondable only by members of the selected channel.
                    Responses are posted back to that channel's activity feed.
                </div>
            </div>
        </div>
    );
}

export default function Phase1FormBuilder({ showToast }) {
    /* Standard form state */
    const [fields,    setFields]    = useState(INITIAL_FIELDS);
    const [activeId,  setActiveId]  = useState(INITIAL_FIELDS[0].id);
    const [formTitle, setFormTitle] = useState(FORMS[0].title);
    const [formDesc,  setFormDesc]  = useState('Please fill out all required fields before the deadline.');
    const [channelId, setChannelId] = useState('inf25-registration');
    const [published, setPublished] = useState(false);

    /* Form type */
    const [formType, setFormType] = useState('standard'); // 'standard' | 'quick-poll'

    /* Quick Poll state */
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollDeadline, setPollDeadline] = useState('');
    const [pollAllowUndo, setPollAllowUndo] = useState(false);

    const selectedChannel = CHANNEL_MAP[channelId];
    const isQuickPoll = formType === 'quick-poll';

    /* Standard form handlers */
    const handleChange         = (id, patch) => setFields(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f));
    const handleDelete         = (id) => {
        setFields(prev => { const next = prev.filter(f => f.id !== id); if (activeId === id) setActiveId(next[0]?.id ?? null); return next; });
        showToast('Question deleted.');
    };
    const handleDuplicate      = (id) => {
        setFields(prev => {
            const idx  = prev.findIndex(f => f.id === id);
            const copy = { ...prev[idx], id: Date.now(), label: prev[idx].label + ' (copy)' };
            const next = [...prev]; next.splice(idx + 1, 0, copy); setActiveId(copy.id); return next;
        });
        showToast('Question duplicated.');
    };
    const handleToggleRequired = (id) => setFields(prev => prev.map(f => f.id === id ? { ...f, required: !f.required } : f));
    const handleAddOption      = (id) => setFields(prev => prev.map(f => f.id !== id ? f : { ...f, options: [...(f.options || []), `Option ${(f.options || []).length + 1}`] }));
    const handleChangeOption   = (id, oi, val) => setFields(prev => prev.map(f => { if (f.id !== id) return f; const o = [...(f.options || [])]; o[oi] = val; return { ...f, options: o }; }));
    const handleDeleteOption   = (id, oi) => setFields(prev => prev.map(f => f.id !== id ? f : { ...f, options: (f.options || []).filter((_, i) => i !== oi) }));
    const handleAddQuestion    = (type = 'text') => {
        const id = Date.now();
        setFields(prev => [...prev, { id, type, label: 'Untitled Question', required: false, options: isChoiceType(type) ? ['Option 1', 'Option 2'] : null }]);
        setActiveId(id);
        showToast('Question added.');
    };

    /* Poll settings handler */
    const handlePollChange = (key, val) => {
        if (key === 'question')  setPollQuestion(val);
        if (key === 'deadline')  setPollDeadline(val);
        if (key === 'allowUndo') setPollAllowUndo(val);
    };

    const handlePublish = () => {
        if (isQuickPoll && !pollQuestion.trim()) {
            showToast('Question is required before publishing.');
            return;
        }
        setPublished(true);
        showToast(isQuickPoll
            ? `Poll published to #${channelId}.`
            : `Form published to #${channelId}.`
        );
    };

    const handleTypeSwitch = (t) => {
        setFormType(t);
        setPublished(false);
    };

    return (
        <div className="fb-layout">

            {/* ── CANVAS ── */}
            <div className="fb-canvas">

                {/* Form header card */}
                <div className="fb-header-card">
                    <div className="fb-header-card__accent" />
                    <div className="fb-header-card__body">

                        {/* ── Form type selector ── */}
                        <div className="fb-type-selector">
                            <span className="fb-type-selector__label">Form Type</span>
                            <div className="fb-type-selector__group">
                                <button
                                    className={`fb-type-btn${!isQuickPoll ? ' fb-type-btn--active' : ''}`}
                                    onClick={() => handleTypeSwitch('standard')}
                                >
                                    ◈ Standard Form
                                </button>
                                <button
                                    className={`fb-type-btn${isQuickPoll ? ' fb-type-btn--active' : ''}`}
                                    onClick={() => handleTypeSwitch('quick-poll')}
                                >
                                    📊 Quick Poll
                                </button>
                            </div>
                        </div>

                        {!isQuickPoll && (
                            <>
                                <input
                                    className="fb-header-card__title"
                                    value={formTitle}
                                    onChange={e => setFormTitle(e.target.value)}
                                    placeholder="Form Title"
                                />
                                <input
                                    className="fb-header-card__desc"
                                    value={formDesc}
                                    onChange={e => setFormDesc(e.target.value)}
                                    placeholder="Form description (optional)"
                                />
                            </>
                        )}

                        {isQuickPoll && (
                            <input
                                className="fb-header-card__title"
                                value={formTitle}
                                onChange={e => setFormTitle(e.target.value)}
                                placeholder="Poll Title (internal reference)"
                            />
                        )}

                        {/* ── Channel Selector ── */}
                        <div className="fb-channel-selector">
                            <label className="fb-channel-selector__label">Channel</label>
                            <div className="fb-channel-selector__row">
                                <select
                                    className="fb-channel-selector__select"
                                    value={channelId}
                                    onChange={e => { setChannelId(e.target.value); setPublished(false); }}
                                >
                                    {CHANNELS.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.type === 'external' ? '🔒 ' : '#'}{c.label} — {c.scope}
                                        </option>
                                    ))}
                                </select>
                                <ChannelBadge channelId={channelId} />
                            </div>
                        </div>

                        <PermissionNote channelId={channelId} />
                    </div>
                </div>

                {/* ── Quick Poll Settings ── */}
                {isQuickPoll && (
                    <PollSettingsCard
                        question={pollQuestion}
                        deadline={pollDeadline}
                        allowUndo={pollAllowUndo}
                        channelId={channelId}
                        onChange={handlePollChange}
                    />
                )}

                {/* ── Standard question cards ── */}
                {!isQuickPoll && (
                    <>
                        {fields.map(f => (
                            <QuestionCard
                                key={f.id}
                                field={f}
                                isActive={activeId === f.id}
                                onClick={() => setActiveId(f.id)}
                                onChange={handleChange}
                                onDelete={handleDelete}
                                onDuplicate={handleDuplicate}
                                onToggleRequired={handleToggleRequired}
                                onAddOption={handleAddOption}
                                onChangeOption={handleChangeOption}
                                onDeleteOption={handleDeleteOption}
                            />
                        ))}
                        <button className="fb-add-question" onClick={() => handleAddQuestion('text')}>
                            + Add Question
                        </button>
                    </>
                )}
            </div>

            {/* ── SIDEBAR ── */}
            <div className="fb-sidebar">

                {/* Channel context */}
                <div className="fb-sidebar__section fb-sidebar__channel-ctx">
                    <div className="fb-sidebar__title">Posting To</div>
                    <ChannelBadge channelId={channelId} size="lg" />
                    {selectedChannel && (
                        <div className="fb-sidebar__ch-scope">
                            {selectedChannel.type === 'external'
                                ? <><span style={{ color: '#c56a00' }}>🔒</span> {selectedChannel.scope}</>
                                : <><span style={{ color: '#27AE60' }}>✓</span> {selectedChannel.scope}</>
                            }
                        </div>
                    )}
                    <div style={{ fontSize: 10, color: '#bbb', marginTop: 6 }}>
                        {isQuickPoll
                            ? 'Poll card will appear in this channel\'s feed.'
                            : 'Submissions post back to this channel\'s activity feed.'}
                    </div>
                </div>

                {/* Quick Poll — live preview */}
                {isQuickPoll && (
                    <div className="fb-sidebar__section">
                        <div className="fb-sidebar__title">Live Preview</div>
                        <QuickPollCard
                            question={pollQuestion}
                            deadline={pollDeadline ? `${pollDeadline}` : undefined}
                            allowUndo={pollAllowUndo}
                            channelId={channelId}
                            responses={[]}
                            total={0}
                            interactive={true}
                            preview={true}
                        />
                    </div>
                )}

                {/* Standard form — field palette */}
                {!isQuickPoll && (
                    <div className="fb-sidebar__section">
                        <div className="fb-sidebar__title">Add Question</div>
                        <div className="fb-palette">
                            {PALETTE.map(p => (
                                <button key={p.type} className="fb-palette__item" onClick={() => handleAddQuestion(p.type)}>
                                    <span className="fb-palette__icon">{p.icon}</span>
                                    <span className="fb-palette__label">{p.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="fb-sidebar__section">
                    <div className="fb-sidebar__title">{isQuickPoll ? 'Poll Settings' : 'Form Stats'}</div>
                    {isQuickPoll ? (
                        <>
                            <div className="fb-sidebar__stat-row">
                                <span>Type</span>
                                <span>Yes / No</span>
                            </div>
                            <div className="fb-sidebar__stat-row">
                                <span>Allow Undo</span>
                                <span>{pollAllowUndo ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="fb-sidebar__stat-row">
                                <span>Deadline</span>
                                <span>{pollDeadline || '—'}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="fb-sidebar__stat-row"><span>Questions</span><span>{fields.length}</span></div>
                            <div className="fb-sidebar__stat-row"><span>Required</span><span>{fields.filter(f => f.required).length}</span></div>
                        </>
                    )}
                </div>

                {/* Publish */}
                <div className="fb-sidebar__section fb-sidebar__publish">
                    <div className="fb-sidebar__title">Publish</div>
                    <div className="fb-sidebar__pub-sub">
                        {published
                            ? `✓ Live — ${isQuickPoll ? 'poll active' : 'collecting responses'}`
                            : `Send to #${channelId}`}
                    </div>
                    <button className="forms-btn forms-btn--secondary forms-btn--sm" style={{ width: '100%', marginBottom: 8 }}>
                        Save Draft
                    </button>
                    <button
                        className="forms-btn forms-btn--publish"
                        style={{ width: '100%' }}
                        onClick={handlePublish}
                        disabled={published}
                    >
                        {published
                            ? `✓ ${isQuickPoll ? 'Poll Published' : 'Published'}`
                            : `${isQuickPoll ? 'Post Poll →' : 'Publish Form →'}`}
                    </button>
                </div>

            </div>
        </div>
    );
}
