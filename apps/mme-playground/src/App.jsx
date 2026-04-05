import React, { useState } from 'react';
import CredentialsModule from './modules/credentials/CredentialsModule';
import GuestListsModule from './modules/guestlists/GuestListsModule';
import GuestListsDashboardWidget from './modules/guestlists/GuestListsDashboardWidget';
import CredentialsDashboardWidget from './modules/credentials/CredentialsDashboardWidget';
import CateringModule from './modules/catering/CateringModule';
import CateringDashboardWidget from './modules/catering/CateringDashboardWidget';
import AssetsModule from './modules/assets/AssetsModule';
import AssetsDashboardWidget from './modules/assets/AssetsDashboardWidget';
import FormsModule from './modules/forms/FormsModule';
import FormsDashboardWidget from './modules/forms/FormsDashboardWidget';
import './modules/credentials/credentials.css';
import './modules/guestlists/guestlists.css';
import './modules/catering/catering.css';
import './modules/assets/assets.css';
import './modules/forms/forms.css';
import './App.css';

export default function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventName, setSelectedEventName] = useState(null);
  const [cateringInitialTab, setCateringInitialTab] = useState(null);
  const [assetsInitialTab, setAssetsInitialTab] = useState(null);
  const [formsInitialTab, setFormsInitialTab]   = useState(null);

  const handleBack = () => {
    setActiveModule(null);
    setSelectedEventId(null);
    setSelectedEventName(null);
    setCateringInitialTab(null);
    setAssetsInitialTab(null);
    setFormsInitialTab(null);
  };

  if (activeModule === 'guestlist') {
    return (
      <GuestListsModule
        eventId={selectedEventId}
        eventName={selectedEventName}
        onBack={handleBack}
      />
    );
  }

  if (activeModule === 'credentials') {
    return <CredentialsModule onBack={handleBack} />;
  }

  if (activeModule === 'catering') {
    return (
      <CateringModule
        initialTab={cateringInitialTab}
        onBack={handleBack}
      />
    );
  }

  if (activeModule === 'assets') {
    return (
      <AssetsModule
        initialTab={assetsInitialTab}
        onBack={handleBack}
      />
    );
  }

  if (activeModule === 'forms') {
    return (
      <FormsModule
        initialTab={formsInitialTab}
        onBack={handleBack}
      />
    );
  }

  // ── Playground Dashboard ──
  return (
    <div className="pg-dashboard">
      <div className="pg-dashboard__header">
        <div className="pg-dashboard__header-left">
          <div className="pg-dashboard__avatar">M</div>
          <div>
            <div className="pg-dashboard__title">MmE Agency Workspace</div>
            <div className="pg-dashboard__sub">Employee Dashboard — Playground</div>
          </div>
        </div>
      </div>

      <div className="pg-dashboard__widgets">

        {/* Credentials Widget — Guest Lists widget slotted below Live Attendance */}
        <div className="pg-widget-wrap">
          <CredentialsDashboardWidget
            onNavigate={() => setActiveModule('credentials')}
            sidebarExtra={
              <GuestListsDashboardWidget
                onSelectEvent={(eventId, eventName) => {
                  setSelectedEventId(eventId);
                  setSelectedEventName(eventName);
                  setActiveModule('guestlist');
                }}
              />
            }
          />
        </div>

        {/* Catering Widget */}
        <div className="pg-widget-wrap">
          <CateringDashboardWidget
            onNavigate={(tab) => {
              setCateringInitialTab(tab);
              setActiveModule('catering');
            }}
          />
        </div>

        {/* Assets + Forms side by side */}
        <div className="pg-widget-row">
          <div className="pg-widget-row__assets">
            <AssetsDashboardWidget
              onNavigate={(tab) => {
                setAssetsInitialTab(tab);
                setActiveModule('assets');
              }}
            />
          </div>
          <div className="pg-widget-row__forms">
            <FormsDashboardWidget
              onNavigate={(tab) => {
                setFormsInitialTab(tab);
                setActiveModule('forms');
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
