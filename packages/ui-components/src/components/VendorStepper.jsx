import React from 'react';

export function VendorStepper({ steps }) {
    return (
        <div className="vendor-lifecycle">
            {steps.map((step) => (
                <div
                    key={step.key}
                    className={`vendor-lifecycle__step ${step.status === 'active' ? 'vendor-lifecycle__step--active' : ''} ${step.status === 'completed' ? 'vendor-lifecycle__step--completed' : ''}`}
                >
                    <div className="vendor-lifecycle__icon">{step.icon}</div>
                    <div className="vendor-lifecycle__label">{step.label}</div>
                </div>
            ))}
        </div>
    );
}
