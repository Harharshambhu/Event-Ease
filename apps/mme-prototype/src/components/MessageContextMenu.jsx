import React, { useEffect, useRef } from 'react';

const ACTIONS = [
    { id: 'reply',   icon: '◯', label: 'Reply' },
    { id: 'react',   icon: '○', label: 'React' },
    { id: 'forward', icon: '▷', label: 'Forward' },
    { id: 'pin',     icon: '⊞', label: 'Pin Message' },
];

export default function MessageContextMenu({ isOpen, x, y, onClose }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            className="msg-context-menu"
            style={{ left: x, top: y }}
        >
            {ACTIONS.map((action) => (
                <button
                    key={action.id}
                    className="msg-context-menu__item"
                    onClick={onClose}
                >
                    <span className="msg-context-menu__icon">{action.icon}</span>
                    {action.label}
                </button>
            ))}
        </div>
    );
}
