import React from 'react';

const stageIcons = {
    lead: '◉',
    confirmed: '◎',
    planning: '▣',
    'build-up': '⬡',
    live: '▶',
    'wrap-up': '❖',
    closed: '⊙',
};

function getColorName(key) {
    const map = {
        lead: 'Grey',
        confirmed: 'Blue',
        planning: 'Yellow',
        'build-up': 'Orange',
        live: 'Red',
        'wrap-up': 'Purple',
        closed: 'Green',
    };
    return map[key] || '';
}

export function EventLifecycleBoard({ stageColors, lifecycleEvents }) {
    const stages = Object.entries(stageColors);

    return (
        <div className="lifecycle">
            {/* Row 1: Stage labels */}
            <div className="lifecycle__row">
                {stages.map(([key, stage]) => (
                    <div key={key} className="lifecycle__col">
                        <div className="lifecycle__label">{stage.label.toUpperCase()}</div>
                        <div className="lifecycle__color-name">{getColorName(key)}</div>
                    </div>
                ))}
            </div>

            {/* Row 2: Icons with connecting line */}
            <div className="lifecycle__row lifecycle__row--icons">
                {stages.map(([key, stage]) => {
                    const events = lifecycleEvents.find((e) => e.stage === key);
                    const hasEvents = events?.events.length > 0;
                    return (
                        <div key={key} className="lifecycle__col">
                            <div
                                className="lifecycle__icon"
                                style={hasEvents ? {
                                    borderColor: stage.color,
                                    color: stage.color,
                                    background: stage.bg || 'hsl(var(--card))',
                                } : {}}
                            >
                                {stageIcons[key] || '○'}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Row 3: Event pills */}
            <div className="lifecycle__row">
                {stages.map(([key, stage]) => {
                    const events = lifecycleEvents.find((e) => e.stage === key);
                    return (
                        <div key={key} className="lifecycle__col">
                            <div className="lifecycle__events">
                                {events?.events.length > 0 ? (
                                    events.events.map((e, i) => (
                                        <div key={i} className="lifecycle__event-pill">
                                            <span className="lifecycle__event-dot" style={{ background: stage.color }} />
                                            {e}
                                        </div>
                                    ))
                                ) : (
                                    <span className="lifecycle__dash">—</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
