import React from "react";
import "../../styles/GrowthChart.css"

const MONTHS = ["MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR"];
const NEW_USERS  = [5, 6, 7, 8, 10, 15, 28, 55, 70, 82, 90, 100];
const PRED_VOTERS = [8, 9, 10, 12, 18, 30, 48, 55, 60, 68, 80, 95];

const W = 600, H = 180, PAD = { top: 12, right: 16, bottom: 28, left: 32 };
const chartW = W - PAD.left - PAD.right;
const chartH = H - PAD.top - PAD.bottom;
const MAX_VAL = 110;

function toPoints(data: number[]) {
  return data.map((v, i) => {
    const x = PAD.left + (i / (data.length - 1)) * chartW;
    const y = PAD.top + chartH - (v / MAX_VAL) * chartH;
    return `${x},${y}`;
  }).join(" ");
}

function toAreaPath(data: number[]) {
  const points = data.map((v, i) => {
    const x = PAD.left + (i / (data.length - 1)) * chartW;
    const y = PAD.top + chartH - (v / MAX_VAL) * chartH;
    return [x, y];
  });
  const lineD = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const lastX = points[points.length - 1][0];
  const baseY = PAD.top + chartH;
  return `${lineD} L${lastX},${baseY} L${PAD.left},${baseY} Z`;
}

const GRID_LINES = [20, 40, 60, 80, 100];

const GrowthChart: React.FC = () => (
  <div className="growth-chart">
    <div className="growth-chart__header">
      <span className="growth-chart__title">Monthly User Growth</span>
      <div className="growth-chart__legend">
        <span className="growth-chart__legend-item growth-chart__legend-item--blue">
          <span className="growth-chart__legend-dot growth-chart__legend-dot--blue" />
          New Users
        </span>
        <span className="growth-chart__legend-item growth-chart__legend-item--pink">
          <span className="growth-chart__legend-dot growth-chart__legend-dot--pink" />
          Predicted Voters
        </span>
      </div>
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} className="growth-chart__svg" preserveAspectRatio="xMidYMid meet" aria-label="Monthly User Growth Chart">
      <defs>
        <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b6dcd" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#5b6dcd" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="votersGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e66fa3" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#e66fa3" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {GRID_LINES.map(v => {
        const y = PAD.top + chartH - (v / MAX_VAL) * chartH;
        return (
          <g key={v}>
            <line x1={PAD.left} y1={y} x2={PAD.left + chartW} y2={y} stroke="#c5cae9" strokeWidth="0.6" strokeDasharray="3,4" />
            <text x={PAD.left - 5} y={y + 4} fontSize="8" fill="#9099be" textAnchor="end">{v}</text>
          </g>
        );
      })}

      {/* Area fills */}
      <path d={toAreaPath(PRED_VOTERS)} fill="url(#votersGrad)" />
      <path d={toAreaPath(NEW_USERS)} fill="url(#usersGrad)" />

      {/* Lines */}
      <polyline points={toPoints(PRED_VOTERS)} fill="none" stroke="#e66fa3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={toPoints(NEW_USERS)} fill="none" stroke="#5b6dcd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* X axis labels */}
      {MONTHS.map((m, i) => {
        const x = PAD.left + (i / (MONTHS.length - 1)) * chartW;
        return <text key={m} x={x} y={H - 4} fontSize="8" fill="#9099be" textAnchor="middle">{m}</text>;
      })}

      {/* Dots at endpoints */}
      {[NEW_USERS, PRED_VOTERS].map((data, di) => {
        const last = data.length - 1;
        const x = PAD.left + chartW;
        const y = PAD.top + chartH - (data[last] / MAX_VAL) * chartH;
        const color = di === 0 ? "#5b6dcd" : "#e66fa3";
        return <circle key={di} cx={x} cy={y} r="3.5" fill={color} stroke="#fff" strokeWidth="1.5" />;
      })}
    </svg>
  </div>
);

export default GrowthChart;