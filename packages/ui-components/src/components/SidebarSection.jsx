import React from 'react';

export function SidebarSection({ title, badge, children, style }) {
    return (
        <div className="sidebar__section" style={style}>
            <div className="sidebar__section-header">
                <span>{title}</span>
                {badge && <span className="sidebar__section-badge">{badge}</span>}
            </div>
            {children}
        </div>
    );
}
