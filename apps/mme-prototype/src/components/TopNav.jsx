import React, { useState } from 'react';
import { TopNav as TopNavContainer } from '@mme/ui-components';
import NotificationsDropdown from './NotificationsDropdown';
import SettingsDropdown from './SettingsDropdown';

export default function TopNav({ activePage, setActivePage, theme, setTheme }) {
    const [notifOpen,    setNotifOpen]    = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const navItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'events',   label: 'Events' },
        { id: 'dms',      label: 'DMs' },
    ];

    const toggleSettings = () => {
        setSettingsOpen(v => !v);
        setNotifOpen(false);
    };

    const toggleNotif = () => {
        setNotifOpen(v => !v);
        setSettingsOpen(false);
    };

    return (
        <TopNavContainer
            className="topnav"
            logoBox={
                <div className="topnav__logo">
                    <div className="topnav__logo-icon">M</div>
                    <span>MmE WORKSPACE</span>
                </div>
            }
            searchBox={
                <div className="topnav__search">
                    <div className="topnav__search-wrapper">
                        <span className="topnav__search-icon">○</span>
                        <input type="text" placeholder="Search channels, events, people, pages..." readOnly />
                    </div>
                </div>
            }
            navActions={
                <>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`topnav__nav-item ${activePage === item.id ? 'topnav__nav-item--active' : ''}`}
                            onClick={() => setActivePage(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}

                    {/* Bell */}
                    <div className="topnav__bell-wrap">
                        <div
                            className={`topnav__bell ${notifOpen ? 'topnav__bell--active' : ''}`}
                            onClick={toggleNotif}
                        >
                            <svg className="topnav__bell-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                            </svg>
                            <span className="topnav__bell-badge">3</span>
                        </div>
                        <NotificationsDropdown
                            isOpen={notifOpen}
                            onClose={() => setNotifOpen(false)}
                        />
                    </div>

                    {/* Settings */}
                    <div className="topnav__settings-wrap">
                        <button
                            className={`topnav__settings-btn ${settingsOpen ? 'topnav__settings-btn--active' : ''}`}
                            onClick={toggleSettings}
                            title="Settings"
                        >
                            ⚙
                        </button>
                        <SettingsDropdown
                            isOpen={settingsOpen}
                            onClose={() => setSettingsOpen(false)}
                            theme={theme}
                            setTheme={setTheme}
                        />
                    </div>
                </>
            }
        />
    );
}
