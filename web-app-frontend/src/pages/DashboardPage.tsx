import React from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatsCard from "../components/dashboard/StatsCard";
import MiniSparkline from "../components/dashboard/MiniSparkline";
import UpcomingElection from "../components/dashboard/UpcomingElection";
import GrowthChart from "../components/dashboard/GrowthChart";
import ActivityLog from "../components/dashboard/ActivityLog";
import RightPanel from "../components/dashboard/RightPanel";
import "../styles/DashboardPage.css";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          {/* Welcome */}
          <div className="dashboard-welcome">
            <h1 className="dashboard-welcome__heading">
              Welcome back,{" "}
              <span className="dashboard-welcome__name">{user?.name ?? "Admin"}</span>
            </h1>
            <button className="dashboard-welcome__theme-btn" aria-label="Theme settings">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </button>
          </div>

          {/* Top stat cards row */}
          <div className="dashboard-cards-row">
            <StatsCard
              title="Total Users"
              value="121,456"
              trend="+3.4% this month"
              trendUp={true}
              chart={<MiniSparkline />}
              wide
            />
            <UpcomingElection />
          </div>

          {/* Growth chart */}
          <GrowthChart />

          {/* Activity log */}
          <ActivityLog />
        </div>
      </div>

      <RightPanel />
    </div>
  );
};

export default DashboardPage;