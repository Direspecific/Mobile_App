import React from "react";
import "../../styles/RightPanel.css"

const APP_ITEMS = [
  { label: "Calendar",     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: "Tasks",        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
  { label: "Message",      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { label: "File Manager", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> },
  { label: "Support",      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2h-1l-4 4-4-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
];

const QUICK_ACTIONS = [
  { label: "Register New Voter" },
  { label: "Edit Profile" },
];

const RightPanel: React.FC = () => (
  <aside className="right-panel">
    {/* App section */}
    <div className="right-panel__section">
      <div className="right-panel__section-header">
        <span className="right-panel__section-title">App</span>
        <button className="right-panel__grid-btn" aria-label="Toggle app grid">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        </button>
      </div>
      <div className="right-panel__app-list">
        {APP_ITEMS.map((item) => (
          <button key={item.label} className="right-panel__app-item">
            <span className="right-panel__app-icon">{item.icon}</span>
            <span className="right-panel__app-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>

    <div className="right-panel__spacer" />

    {/* Quick Actions */}
    <div className="right-panel__section">
      <span className="right-panel__section-title">Quick Action</span>
      <div className="right-panel__actions-list">
        {QUICK_ACTIONS.map((action) => (
          <button key={action.label} className="right-panel__action-btn">
            {action.label}
          </button>
        ))}
      </div>
    </div>
  </aside>
);

export default RightPanel;