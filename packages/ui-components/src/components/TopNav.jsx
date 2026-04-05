import React from 'react';

export function TopNav({ className = 'topnav', logoBox, searchBox, navActions }) {
    return (
        <div className={className}>
            {logoBox}
            {searchBox}
            {navActions}
        </div>
    );
}
