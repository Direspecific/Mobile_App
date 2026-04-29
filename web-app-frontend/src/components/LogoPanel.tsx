import React from "react";
import "../styles/LogoPanel.css"

const LogoPanel: React.FC = () => {
  return (
    <div className="logo-panel" aria-label="Application Logo">
      <div className="logo-inner">
        {/* Replace this SVG/content with your actual logo */}
        <svg className="logo-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="40" cy="40" r="36" stroke="#5b6dcd" strokeWidth="3" opacity="0.35" />
          <path d="M24 40 L38 54 L58 28" stroke="#5b6dcd" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="logo-label">LOGO HERE</span>
      </div>
    </div>
  );
};

export default LogoPanel;
