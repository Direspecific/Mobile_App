import React from "react";
import "../styles/LogoPanel.css"
import logo from "../assets/logo.png"

const LogoPanel: React.FC = () => {
  return (
    <div className="logo-panel" aria-label="Application Logo">
      <div className="logo-inner">
        {/* Replace this SVG/content with your actual logo */}
        <img className="logo-icon" viewBox="0 0 80 80" fill="none" src={logo} aria-hidden="true" style={{width: '240px', height:'auto'}} />
          <circle cx="40" cy="40" r="36" stroke="#5b6dcd" strokeWidth="3" opacity="0.35" />
          <path d="M24 40 L38 54 L58 28" stroke="#5b6dcd" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <span className="logo-label">Change starts here..</span>
      </div>
    </div>
  );
};

export default LogoPanel;
