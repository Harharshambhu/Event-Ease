import React from 'react';
import VendorPortalPage from './components/VendorPortalPage';

export default function App() {
    return <VendorPortalPage onBackToAgency={() => window.alert('Navigate to Agency Workspace separately')} />;
}
