import React from 'react';

export function ActivityRow({ icon, text, time, tier, showArrow }) {
    return (
        <div className="activity-item">
            {React.isValidElement(icon) ? icon : <span className="activity-item__icon">{icon || '•'}</span>}
            <span className="activity-item__text">{text}</span>
            {tier && <span className="activity-item__tier">{tier}</span>}
            <span className="activity-item__time">{time}</span>
            {showArrow && <span className="activity-item__arrow">›</span>}
        </div>
    );
}
