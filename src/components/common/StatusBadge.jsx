import React from 'react';
import { AlertCircle, Clock, CheckCircle2, UserCheck } from 'lucide-react';
import './StatusBadge.css';

export const StatusBadge = ({ status, priority }) => {
  if (priority) {
    const pClass = priority.toLowerCase();
    return (
      <span className={`priority-badge priority-${pClass}`}>
        <span className="priority-dot" />
        {priority}
      </span>
    );
  }

  const getStatusIcon = (s) => {
    switch (s) {
      case 'Reported':
        return <AlertCircle size={14} />;
      case 'Assigned':
        return <UserCheck size={14} />;
      case 'In Progress':
        return <Clock size={14} />;
      case 'Resolved':
        return <CheckCircle2 size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  const sClass = (status || 'reported').toLowerCase().replace(' ', '-');

  return (
    <span className={`status-badge badge-status-${sClass}`}>
      {getStatusIcon(status)}
      <span>{status}</span>
    </span>
  );
};
