import React from 'react';

export function SectionHeader({ icon, prefix, title, description, stats }) {
    return (
        <div className="card__section-header">
            {icon && <div className="card__section-icon">{icon}</div>}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {prefix && <span style={{ fontSize: 9, fontWeight: 700, color: 'hsl(var(--muted-foreground))', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{prefix}</span>}
                    <span className="card__section-title">{title}</span>
                </div>
                {description && (
                    <div className="card__section-desc">
                        {description}
                    </div>
                )}
            </div>
            {stats && (
                <div className="card__section-stats">
                    {stats}
                </div>
            )}
        </div>
    );
}
