import React from 'react';
import { MapPin, Calendar, Building2, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import './IssueCard.css';

export const IssueCard = ({ complaint, onClick }) => {
  const { id, title, description, category, priority, status, location, date, department, image } = complaint;

  return (
    <div className="issue-card" onClick={onClick}>
      <div className="issue-card-image-wrapper">
        <img src={image} alt={title} className="issue-card-image" loading="lazy" />
        <div className="issue-card-badges">
          <StatusBadge status={status} />
          <StatusBadge priority={priority} />
        </div>
        <span className="issue-category-tag">{category}</span>
      </div>

      <div className="issue-card-content">
        <div className="issue-card-header">
          <span className="issue-id">{id}</span>
          <span className="issue-date">
            <Calendar size={12} /> {formatDate(date)}
          </span>
        </div>

        <h3 className="issue-card-title">{title}</h3>
        <p className="issue-card-desc">{description}</p>

        <div className="issue-card-footer">
          <div className="issue-location">
            <MapPin size={14} className="location-icon" />
            <span>{location}</span>
          </div>

          <div className="issue-dept">
            <Building2 size={13} />
            <span>{department || 'Unassigned'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
