import React, { useState } from 'react';

/**
 * QuickPollCard — reusable across:
 *   - Phase1FormBuilder sidebar (preview mode, no interaction)
 *   - Phase3Responses header summary (read-only)
 *   - Future: channel feed (interactive=true)
 *
 * Props:
 *   question    string   The yes/no question text
 *   deadline    string   Optional deadline label
 *   allowUndo   bool     Whether the vote button can be untoggled
 *   channelId   string   Channel this poll belongs to
 *   responses   array    [{name, answer: true|null}] full respondent list
 *   total       number   Total number of people assigned
 *   interactive bool     Show the [✓ Yes] vote button
 *   preview     bool     Show a "live preview" footer label
 */
export default function QuickPollCard({
    question   = '',
    deadline,
    allowUndo  = false,
    channelId,
    responses  = [],
    total      = 0,
    interactive = false,
    preview     = false,
}) {
    const [voted, setVoted] = useState(false);

    const respondedList  = responses.filter(r => r.answer !== null);
    const respondedCount = respondedList.length;
    const yesCount       = responses.filter(r => r.answer === true).length;
    const pct            = total > 0 ? Math.round((respondedCount / total) * 100) : 0;

    const previewNames = respondedList.slice(0, 3).map(r => r.name);
    const extraCount   = Math.max(0, respondedCount - 3);

    const handleVote = () => {
        if (voted && !allowUndo) return;
        setVoted(v => !v);
    };

    return (
        <div className="qpoll-card">

            {/* Header row: icon + question + deadline */}
            <div className="qpoll-card__header">
                <span className="qpoll-card__icon">📊</span>
                <div className="qpoll-card__meta">
                    <div className="qpoll-card__question">
                        {question || <em style={{ color: 'hsl(var(--muted-foreground))' }}>Poll question will appear here…</em>}
                    </div>
                    {deadline && (
                        <div className="qpoll-card__deadline">◷ Deadline: {deadline}</div>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            <div className="qpoll-card__progress-wrap">
                <div className="qpoll-card__counts">
                    <span className="qpoll-card__counts-responded">
                        {respondedCount}/{total} responded
                    </span>
                    {yesCount > 0 && (
                        <span className="qpoll-card__counts-yes">✓ {yesCount} Yes</span>
                    )}
                </div>
                <div className="qpoll-card__bar-bg">
                    <div className="qpoll-card__bar-fill" style={{ width: `${pct}%` }} />
                </div>
            </div>

            {/* First 3 respondent names */}
            {previewNames.length > 0 && (
                <div className="qpoll-card__names">
                    {previewNames.join(', ')}
                    {extraCount > 0 && (
                        <span className="qpoll-card__names-extra"> +{extraCount} more</span>
                    )}
                </div>
            )}

            {/* Vote button */}
            {interactive && (
                <div className="qpoll-card__actions">
                    <button
                        className={`qpoll-card__vote-btn${voted ? ' qpoll-card__vote-btn--voted' : ''}`}
                        onClick={handleVote}
                        disabled={voted && !allowUndo}
                        title={voted && !allowUndo ? 'Undo disabled for this poll' : ''}
                    >
                        {voted ? '✓ Yes' : '○ Yes'}
                    </button>
                    {allowUndo && voted && (
                        <span className="qpoll-card__undo-hint">Click to undo</span>
                    )}
                </div>
            )}

            {preview && (
                <div className="qpoll-card__preview-note">
                    ◎ Live preview — members will see this in #{channelId}
                </div>
            )}
        </div>
    );
}
