import React from 'react';
import { LOCKED_COUNTS, VENDOR, INVOICE } from './data';

function TaxIcon({ ok }) {
    return (
        <span className={`cat-tax-icon cat-tax-icon--${ok ? 'ok' : 'no'}`}>
            {ok ? '✓' : '✗'}
        </span>
    );
}

export default function Phase3FinalCountLock({ bufferPercent, setBufferPercent, uploadState, setUploadState, showToast }) {
    const varianceClass = INVOICE.variance < 0 ? 'cat-amount-value--green' : 'cat-amount-value--amber';
    const varianceSign  = INVOICE.variance < 0 ? '−' : '+';
    const varianceLabel = INVOICE.variance < 0 ? 'Savings' : 'Extra Cost';

    const handleUpload = () => {
        setUploadState('success');
        showToast('Invoice uploaded successfully.');
    };
    const finalPrep = Math.ceil(LOCKED_COUNTS.total + (LOCKED_COUNTS.total * bufferPercent / 100));
    const bufferQty = finalPrep - LOCKED_COUNTS.total;

    const handleBufferChange = (e) => {
        const val = Math.min(25, Math.max(0, Number(e.target.value)));
        setBufferPercent(val);
    };

    return (
        <div className="cat-layout--full">
        <div className="cat-layout--split">

            {/* ── LEFT: Main Content ── */}
            <div>
                {/* Locked Quantity Grid */}
                <div className="cat-count-grid">
                    <div className="cat-count-box">
                        <div className="cat-count-box__label">Vegetarian</div>
                        <div className="cat-count-box__value">{LOCKED_COUNTS.veg}</div>
                    </div>
                    <div className="cat-count-box">
                        <div className="cat-count-box__label">Non-Veg</div>
                        <div className="cat-count-box__value">{LOCKED_COUNTS.nonVeg}</div>
                    </div>
                    <div className="cat-count-box">
                        <div className="cat-count-box__label">Jain</div>
                        <div className="cat-count-box__value">{LOCKED_COUNTS.jain}</div>
                    </div>
                    <div className="cat-count-box cat-count-box--total">
                        <div className="cat-count-box__label">Total Locked</div>
                        <div className="cat-count-box__value">{LOCKED_COUNTS.total}</div>
                    </div>
                </div>

                {/* Buffer Calculator */}
                <div className="cat-buffer-calc">
                    <div className="cat-buffer-calc__title">Buffer Calculator</div>
                    <div className="cat-buffer-steps">

                        <div className="cat-buffer-step">
                            <div className="cat-buffer-step__label">Locked Count</div>
                            <div className="cat-buffer-step__box">
                                <div className="cat-buffer-step__value">{LOCKED_COUNTS.total}</div>
                            </div>
                        </div>

                        <span className="cat-buffer-arrow">→</span>

                        <div className="cat-buffer-input-wrap">
                            <div className="cat-buffer-input-label">Buffer %</div>
                            <div className="cat-buffer-input-field">
                                <input
                                    type="number"
                                    className="cat-buffer-input"
                                    value={bufferPercent}
                                    min={0}
                                    max={25}
                                    onChange={handleBufferChange}
                                />
                                <span className="cat-buffer-input-suffix">%</span>
                            </div>
                            <div style={{ fontSize: 10, color: '#bbb', marginTop: 4, textAlign: 'center' }}>0–25</div>
                        </div>

                        <span className="cat-buffer-arrow">=</span>

                        <div className="cat-buffer-step">
                            <div className="cat-buffer-step__label">Buffer Qty</div>
                            <div className="cat-buffer-step__box">
                                <div className="cat-buffer-step__value" style={{ color: '#f39c12' }}>+{bufferQty}</div>
                            </div>
                        </div>

                        <span className="cat-buffer-arrow">→</span>

                        <div className="cat-buffer-step cat-buffer-step--final">
                            <div className="cat-buffer-step__label">Final Prep</div>
                            <div className="cat-buffer-step__box">
                                <div className="cat-buffer-step__value">{finalPrep}</div>
                            </div>
                        </div>

                    </div>

                    <div className="cat-lock-status">
                        <span>Locked on <span className="cat-lock-status__date">{LOCKED_COUNTS.lockedDate}</span></span>
                        <span className="cat-lock-status__until"> · Editable until 48 hrs before event ({LOCKED_COUNTS.editableUntil})</span>
                    </div>
                </div>

                {/* Export Actions */}
                <div className="cat-export-row">
                    <button
                        className="cat-btn cat-btn--primary"
                        onClick={() => showToast('Handoff sheet export initiated.')}
                    >
                        ⎙ Export Handoff Sheet (PDF)
                    </button>
                    <button
                        className="cat-btn cat-btn--secondary"
                        onClick={() => showToast('CSV exported successfully.')}
                    >
                        Export CSV
                    </button>
                </div>
            </div>

            {/* ── RIGHT: Vendor Contact ── */}
            <div>
                <div className="cat-card">
                    <div className="cat-card__header">
                        <span className="cat-card__title">Vendor Contact</span>
                    </div>
                    <div className="cat-vendor-card">
                        <div className="cat-vendor-name">{VENDOR.name}</div>
                        <div className="cat-vendor-row">
                            <span className="cat-vendor-row__icon">⊕</span>
                            <span className="cat-vendor-row__val">{VENDOR.contact}</span>
                        </div>
                        <div className="cat-vendor-row">
                            <span className="cat-vendor-row__icon">◷</span>
                            <span className="cat-vendor-row__val">{VENDOR.phone}</span>
                        </div>
                        <div className="cat-vendor-row">
                            <span className="cat-vendor-row__icon">◯</span>
                            <span className="cat-vendor-row__val">{VENDOR.email}</span>
                        </div>
                        <div className="cat-vendor-actions">
                            <a
                                href={`https://wa.me/${VENDOR.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="cat-btn cat-btn--whatsapp"
                                style={{ justifyContent: 'center' }}
                            >
                                ◎ Send on WhatsApp
                            </a>
                            <button
                                className="cat-btn cat-btn--secondary"
                                onClick={() => { navigator.clipboard?.writeText(VENDOR.email); showToast('Email copied to clipboard.'); }}
                                style={{ justifyContent: 'center' }}
                            >
                                Copy Email
                            </button>
                        </div>
                    </div>
                </div>

                <div className="cat-card" style={{ background: '#f0f7ff', borderColor: '#bbdefb' }}>
                    <div className="cat-card__body">
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#0d47a1', marginBottom: 4 }}>
                            ◎ Final Count to Send
                        </div>
                        <div style={{ fontSize: 28, fontWeight: 800, color: '#1A365D' }}>{finalPrep} meals</div>
                        <div style={{ fontSize: 11, color: '#555', marginTop: 4 }}>
                            {LOCKED_COUNTS.total} locked + {bufferQty} buffer ({bufferPercent}%)
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* ── Invoice Tracking (merged) ── */}
            <div className="cat-layout--split" style={{ alignItems: 'stretch' }}>

                {/* LEFT: invoice upload + amounts + tax + payment */}
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
                    <div className="cat-card" style={{ marginBottom: 0 }}>
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

                </div>

                {/* RIGHT: dietary sync + invoice summary + payment status */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
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

                    {/* Payment Status — pinned to bottom, base aligns with Tax Documentation */}
                    <div className="cat-card" style={{ marginTop: 'auto', marginBottom: 0 }}>
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

            </div>

        </div>
    );
}
