import React from "react";
import "../../styles/UpcomingElection.css";

const ELECTION = {
  name: "National General Election",
  date: "May 12, 2026",
  daysLeft: 10,
  registered: 98420,
  target: 121456,
};

const UpcomingElection: React.FC = () => {
  const pct = Math.round((ELECTION.registered / ELECTION.target) * 100);

  return (
    <div className="upcoming-election">
      <p className="upcoming-election__label">Upcoming Election</p>
      <p className="upcoming-election__name">{ELECTION.name}</p>
      <p className="upcoming-election__date">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {ELECTION.date}
        <span className="upcoming-election__days-badge">{ELECTION.daysLeft}d left</span>
      </p>
      <div className="upcoming-election__progress-wrap">
        <div className="upcoming-election__progress-labels">
          <span className="upcoming-election__progress-text">Voter Registration</span>
          <span className="upcoming-election__progress-pct">{pct}%</span>
        </div>
        <div className="upcoming-election__progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="upcoming-election__progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="upcoming-election__progress-sub">
          {ELECTION.registered.toLocaleString()} / {ELECTION.target.toLocaleString()} registered
        </p>
      </div>
    </div>
  );
};

export default UpcomingElection;