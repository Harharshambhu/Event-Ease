import React from 'react';

export function Card({ children, headerTitle, className = '', style }) {
    return (
        <div className={`card ${className}`.trim()} style={style}>
            {headerTitle && <div className="card__header">{headerTitle}</div>}
            {children}
        </div>
    );
}
