import React from 'react';
import { WIDGET_STATS } from './data';

export default function AssetsDashboardWidget({ onNavigate }) {
    return (
        <div className="ast-dw">

            {/* Header */}
            <div className="ast-dw__header">
                <span className="ast-dw__header-title">
                    <span className="ast-dw__header-icon">▣</span>
                    Assets
                </span>
                <button className="ast-dw__view-btn" onClick={() => onNavigate('asset-setup')}>
                    [View Full Module]
                </button>
            </div>

            {/* Three boxes — stacked vertically */}
            <div className="ast-dw__boxes">
                <div className="ast-dw__box" onClick={() => onNavigate('asset-setup')}>
                    <div className="ast-dw__box-left">
                        <div className="ast-dw__box-title">Config</div>
                        <div className="ast-dw__box-value">{WIDGET_STATS.assetTypes} Types</div>
                    </div>
                    <div className="ast-dw__box-status ast-dw__box-status--ok">✓ Complete</div>
                </div>
                <div className="ast-dw__box" onClick={() => onNavigate('asset-setup')}>
                    <div className="ast-dw__box-left">
                        <div className="ast-dw__box-title">Requests</div>
                        <div className="ast-dw__box-value">{WIDGET_STATS.pendingRequests} Pending</div>
                    </div>
                    <div className="ast-dw__box-status ast-dw__box-status--warn">△ Review</div>
                </div>
                <div className="ast-dw__box" onClick={() => onNavigate('distribution')}>
                    <div className="ast-dw__box-left">
                        <div className="ast-dw__box-title">Billback</div>
                        <div className="ast-dw__box-value">{WIDGET_STATS.billbackDisplay}</div>
                    </div>
                    <div className="ast-dw__box-status ast-dw__box-status--pending">◎ Pending</div>
                </div>
            </div>

        </div>
    );
}
