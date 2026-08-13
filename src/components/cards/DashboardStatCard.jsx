import React from 'react';
import './DashboardStatCard.css';

export const DashboardStatCard = ({ title, count, icon: Icon, color = 'blue', active, onClick }) => {
  return (
    <div
      className={`stat-card stat-card-${color} ${active ? 'stat-card-active' : ''}`}
      onClick={onClick}
    >
      <div className="stat-card-header">
        <div className="stat-icon-container">
          <Icon size={22} />
        </div>
        <span className="stat-card-title">{title}</span>
      </div>
      <div className="stat-card-body">
        <h2 className="stat-count">{count}</h2>
        <span className="stat-subtitle">Click to filter table</span>
      </div>
    </div>
  );
};
