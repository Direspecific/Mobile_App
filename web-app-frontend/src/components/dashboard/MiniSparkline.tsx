import React from "react";


const DATA = [10, 15, 12, 25, 20, 35, 30, 48, 42, 60, 55, 78];

const MiniSparkline: React.FC = () => {
  const w = 110, h = 56, pad = 4;
  const min = Math.min(...DATA);
  const max = Math.max(...DATA);
  const range = max - min || 1;

  const points = DATA.map((v, i) => ({
    x: pad + (i / (DATA.length - 1)) * (w - pad * 2),
    y: h - pad - ((v - min) / range) * (h - pad * 2)
  }));

  const ptsString = points.map(p => `${p.x},${p.y}`).join(" ");
  
  // Create the line path
  const linePath = `M ${ptsString}`;
  
  // Create the area path by extending the line path to the bottom corners
  const firstX = points[0].x;
  const lastX = points[points.length - 1].x;
  const baseline = h - pad;
  const areaPath = `${linePath} L ${lastX},${baseline} L ${firstX},${baseline} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b6dcd" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#5b6dcd" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkGrad)" />
      <polyline points={ptsString} fill="none" stroke="#5b6dcd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default MiniSparkline;