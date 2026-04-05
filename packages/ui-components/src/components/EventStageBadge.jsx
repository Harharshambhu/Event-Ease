import React from 'react';

export function EventStageBadge({ color, name, stageLabel, countdown, className = "sidebar__event" }) {
    return (
        <>
            {color && <span className={`${className}-dot`} style={{ background: color || '#999' }} />}
            {name && <span className={`${className}-name`}>{name}</span>}
            {stageLabel && <span className={`${className}-stage`}>{stageLabel}</span>}
            {countdown && <span className={`${className}-countdown`}>{countdown}</span>}
        </>
    );
}
