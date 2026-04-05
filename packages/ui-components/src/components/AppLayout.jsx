import React from 'react';

export function AppLayout({ topNav, sidebar, children }) {
    return (
        <div className="app-layout">
            {topNav}
            <div className="app-body">
                {sidebar}
                {children}
            </div>
        </div>
    );
}
