import React from "react";
import "../../styles/ActivityLog.css";

export type ActivityStatus = "Pending" | "Approved" | "Updated" | "Rejected";

export interface ActivityItem {
  id: number;
  name: string;
  initials: string;
  action: string;
  date: string;
  status: ActivityStatus;
  avatarColor: string;
}

const ACTIVITY_DATA: ActivityItem[] = [
  { id: 1, name: "BINI Maloi",  initials: "BM", action: "Submitted voter registration", date: "Jan 23, 5 mins ago", status: "Pending",  avatarColor: "#7b8de0" },
  { id: 2, name: "BINI Sheena", initials: "BS", action: "Updated the documents",        date: "Jan 23, 4 hrs ago", status: "Approved", avatarColor: "#5b6dcd" },
  { id: 3, name: "BINI Colet",  initials: "BC", action: "Renewed voter",                date: "Jan 22, 1 day ago", status: "Updated",  avatarColor: "#9b8de0" },
  { id: 4, name: "BINI Jhoanna",initials: "BJ", action: "Submitted new registration",   date: "Jan 22, 2 days ago",status: "Rejected", avatarColor: "#c084fc" },
];

const STATUS_CLASS: Record<ActivityStatus, string> = {
  Pending:  "activity-log__badge--pending",
  Approved: "activity-log__badge--approved",
  Updated:  "activity-log__badge--updated",
  Rejected: "activity-log__badge--rejected",
};

const ActivityLog: React.FC = () => (
  <div className="activity-log">
    <div className="activity-log__header">
      <span className="activity-log__title">Recent Activity Log</span>
    </div>
    <table className="activity-log__table" aria-label="Recent Activity Log">
      <thead>
        <tr>
          <th className="activity-log__th">User</th>
          <th className="activity-log__th">Action</th>
          <th className="activity-log__th">Date</th>
          <th className="activity-log__th">Status</th>
        </tr>
      </thead>
      <tbody>
        {ACTIVITY_DATA.map((item, idx) => (
          <tr
            key={item.id}
            className="activity-log__row"
            style={{ animationDelay: `${0.05 * idx}s` }}
          >
            <td className="activity-log__td activity-log__user-cell">
              <div
                className="activity-log__avatar"
                style={{ background: item.avatarColor }}
                aria-hidden="true"
              >
                {item.initials}
              </div>
              <span className="activity-log__name">{item.name}</span>
            </td>
            <td className="activity-log__td activity-log__action">{item.action}</td>
            <td className="activity-log__td activity-log__date">{item.date}</td>
            <td className="activity-log__td">
              <span className={`activity-log__badge ${STATUS_CLASS[item.status]}`}>
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ActivityLog;