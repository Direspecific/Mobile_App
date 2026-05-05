import React from "react";
import "../../styles/StatsCard.css";

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
  chart?: React.ReactNode;
  wide?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, trendUp, subtitle, chart, wide }) => {
  return (
    <div className={`stats-card${wide ? " stats-card--wide" : ""}`}>
      <div className="stats-card__body">
        <div className="stats-card__info">
          <p className="stats-card__title">{title}</p>
          <p className="stats-card__value">{value}</p>
          {trend && (
            <p className={`stats-card__trend${trendUp ? " stats-card__trend--up" : " stats-card__trend--down"}`}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
          {subtitle && <p className="stats-card__subtitle">{subtitle}</p>}
        </div>
        {chart && <div className="stats-card__chart">{chart}</div>}
      </div>
    </div>
  );
};

export default StatsCard;