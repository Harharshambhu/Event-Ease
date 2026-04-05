import React, { useState, useEffect } from 'react';
import './forms.css';
import Phase1FormBuilder  from './Phase1FormBuilder';
import Phase2Distribution from './Phase2Distribution';
import Phase3Responses    from './Phase3Responses';
import Phase4Exports      from './Phase4Exports';
import { EVENT } from './data';

const TABS = [
    { id: 'builder',      label: 'Form Builder'   },
    { id: 'distribution', label: 'Distribution'   },
    { id: 'responses',    label: 'Responses'       },
    { id: 'exports',      label: 'Exports'         },
];

export default function FormsModule({ initialTab, onBack }) {
    const [activeTab, setActiveTab] = useState(initialTab || 'builder');
    const [toast,     setToast]     = useState('');

    useEffect(() => {
        if (initialTab) setActiveTab(initialTab);
    }, [initialTab]);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    const renderTab = () => {
        switch (activeTab) {
            case 'builder':      return <Phase1FormBuilder  showToast={showToast} />;
            case 'distribution': return <Phase2Distribution showToast={showToast} />;
            case 'responses':    return <Phase3Responses    showToast={showToast} />;
            case 'exports':      return <Phase4Exports      showToast={showToast} />;
            default:             return null;
        }
    };

    return (
        <div className="forms-module">

            {/* Header */}
            <div className="forms-module__header">
                {onBack && (
                    <button className="forms-module__back" onClick={onBack}>← Dashboard</button>
                )}
                <div className="forms-module__header-icon">◈</div>
                <div>
                    <div className="forms-module__title">Forms</div>
                    <div className="forms-module__subtitle">{EVENT.name}</div>
                </div>
            </div>

            {/* Tab Nav */}
            <div className="forms-tabs">
                {TABS.map(t => (
                    <button
                        key={t.id}
                        className={`forms-tabs__item ${activeTab === t.id ? 'forms-tabs__item--active' : ''}`}
                        onClick={() => setActiveTab(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {renderTab()}

            {/* Toast */}
            {toast && <div className="forms-toast">{toast}</div>}
        </div>
    );
}
