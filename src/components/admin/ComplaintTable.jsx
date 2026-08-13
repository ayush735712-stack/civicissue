import React from 'react';
import { Eye, Edit3, UserCheck, Calendar, MapPin } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import { DEPARTMENTS, STATUSES } from '../../data/mockComplaints';
import { Button } from '../common/Button';
import './ComplaintTable.css';

export const ComplaintTable = ({
  complaints = [],
  onViewDetails,
  onUpdateStatus,
  onAssignDepartment
}) => {
  if (complaints.length === 0) {
    return (
      <div className="table-empty-state">
        <p className="empty-title">No complaints match your filters.</p>
        <p className="empty-subtitle">Try adjusting your category, status, or search query.</p>
      </div>
    );
  }

  return (
    <div className="complaint-table-container">
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned Department</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((item) => (
              <tr key={item.id} className="table-row">
                <td className="cell-id">
                  <span className="id-badge">{item.id}</span>
                </td>
                <td className="cell-title">
                  <div className="title-with-thumb">
                    <img src={item.image} alt={item.title} className="cell-thumb" />
                    <div className="title-text-group">
                      <strong className="title-text">{item.title}</strong>
                      <span className="location-subtext">
                        <MapPin size={11} /> {item.location}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="cell-category">
                  <span className="cat-pill">{item.category}</span>
                </td>
                <td className="cell-priority">
                  <StatusBadge priority={item.priority} />
                </td>
                <td className="cell-status">
                  <select
                    className="table-status-select"
                    value={item.status}
                    onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                  >
                    {STATUSES.filter(s => s !== 'All').map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </td>
                <td className="cell-dept">
                  <select
                    className="table-dept-select"
                    value={item.department || 'Unassigned'}
                    onChange={(e) => onAssignDepartment(item.id, e.target.value)}
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </td>
                <td className="cell-date">
                  <span className="date-text">{formatDate(item.date)}</span>
                </td>
                <td className="cell-actions text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Eye}
                    onClick={() => onViewDetails(item)}
                    title="View Details"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
