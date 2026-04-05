import React from 'react';

export function ChannelRow({ prefixIcon, name, locked, tagText, showArrow, onClick, isActive, className = "channel-row", children, elementModifier = "__" }) {
    return (
        <div className={`${className} ${isActive ? `${className}--active` : ''}`.trim()} onClick={onClick}>
            {prefixIcon && <span className={`${className}${elementModifier}prefix`}>{prefixIcon}</span>}
            <span className={`${className}${elementModifier}name`}>
                {name}
                {locked && <span className={`${className}${elementModifier}lock`}> ⊡</span>}
            </span>
            {tagText && <span className={`${className}${elementModifier}tag`}>{tagText}</span>}
            {children}
            {showArrow && <span className={`${className}${elementModifier}arrow`}>›</span>}
        </div>
    );
}
