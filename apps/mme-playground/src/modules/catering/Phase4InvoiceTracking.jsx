import React from 'react';
import { INVOICE } from './data';

function TaxIcon({ ok }) {
    return (
        <span className={`cat-tax-icon cat-tax-icon--${ok ? 'ok' : 'no'}`}>
            {ok ? '✓' : '✗'}
        </span>
    );
}

export default function Phase4InvoiceTracking({ uploadState, setUploadState, showToast }) {
    const varianceClass = INVOICE.variance < 0 ? 'cat-amount-value--green' : 'cat-amount-value--amber';
    const varianceSign  = INVOICE.variance < 0 ? '−' : '+';
    const varianceLabel = INVOICE.variance < 0 ? 'Savings' : 'Extra Cost';

    const handleUpload = () => {
        setUploadState('success');
        showToast('Invoice uploaded successfully.');
    };

    return (
        <div className="cat-layout--split">

            {/* ── LEFT: Main Content ── */}
            <div>

                {/* Invoice Upload */}
                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Invoice Upload</span>
                    </div>
                    <div className="cat-card__body">
                        {(INVOICE.uploaded || uploadState === 'success') ? (
                            <div className="cat-invoice-file">
                                <span className="cat-invoice-file__icon">◻</span>
                                <span className="cat-invoice-file__name">{INVOICE.fileName}</span>
                                <button
                                    className="cat-invoice-file__replace"
                                    onClick={() => { setUploadState('idle'); showToast('Upload another file to replace.'); }}
                                >
                                    Replace
                                </button>
                            </div>
                        ) : (
                            <div className="cat-invoice-upload" onClick={handleUpload}>
                                <div className="cat-invoice-upload__icon">⊡</div>
                                <div className="cat-invoice-upload__text">Drag & drop invoice here, or click to upload</div>
                                <div className="cat-invoice-upload__sub">PDF · Single file only</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Amount Breakdown */}
                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Amount Breakdown</span>
                    </div>
                    <div className="cat-amount-block">
                        <div className="cat-amount-row">
                            <span className="cat-amount-label">Quoted Amount</span>
                            <span className="cat-amount-value">₹{INVOICE.quoted.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="cat-amount-row">
                            <span className="cat-amount-label">Invoiced Amount</span>
                            <span className="cat-amount-value cat-amount-value--main">₹{INVOICE.amount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="cat-amount-row">
                            <span className="cat-amount-label">Variance ({varianceLabel})</span>
                            <span className={`cat-amount-value ${varianceClass}`}>
                                {varianceSign}₹{Math.abs(INVOICE.variance).toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tax Checklist */}
                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Tax Documentation</span>
                    </div>
                    <div className="cat-tax-list">
                        <div className="cat-tax-item">
                            <TaxIcon ok={INVOICE.taxDocs.mushak} />
                            <span>Mushak-6.3 Certificate</span>
                        </div>
                        <div className="cat-tax-item">
                            <TaxIcon ok={INVOICE.taxDocs.tds} />
                            <span>TDS Deducted at Source</span>
                        </div>
                        <div className="cat-tax-item">
                            <TaxIcon ok={INVOICE.taxDocs.vat} />
                            <span>VAT Invoice Received</span>
                        </div>
                    </div>
                </div>

                {/* Payment Status */}
                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Payment Status</span>
                    </div>
                    <div className="cat-card__body" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span className={`cat-pill cat-pill--${INVOICE.paymentStatus.toLowerCase()}`}>
                            {INVOICE.paymentStatus}
                        </span>
                        <span style={{ fontSize: 12, color: '#888' }}>
                            {INVOICE.paymentStatus === 'Processed'
                                ? 'Payment processed — awaiting bank confirmation.'
                                : 'Payment not yet initiated.'}
                        </span>
                    </div>
                </div>

            </div>

            {/* ── RIGHT: Sidebar ── */}
            <div>
                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Dietary Sync Status</span>
                    </div>
                    <div className="cat-card__body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div className="cat-sync-status cat-sync-status--ok">
                            <span className="cat-sync-status__icon">✓</span>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: 2 }}>Dietary Data Synced</div>
                                <div style={{ fontSize: 11, opacity: 0.8 }}>437 entries across 312 guests + companions</div>
                            </div>
                        </div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 4, lineHeight: 1.5 }}>
                            Dietary data is automatically shared with the Catering vendor export. No manual action required.
                        </div>
                    </div>
                </div>

                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Invoice Summary</span>
                    </div>
                    <div className="cat-card__body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#888' }}>Invoice Received</span>
                            <span style={{ fontWeight: 600, color: '#27AE60' }}>✓ Yes</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#888' }}>Tax Docs Complete</span>
                            <span style={{ fontWeight: 600, color: '#27AE60' }}>✓ 3/3</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#888' }}>Variance</span>
                            <span style={{ fontWeight: 600, color: INVOICE.variance >= 0 ? '#F39C12' : '#27AE60' }}>
                                {varianceSign}₹{Math.abs(INVOICE.variance).toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#888' }}>Payment</span>
                            <span style={{ fontWeight: 600, color: '#1A365D' }}>{INVOICE.paymentStatus}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
