import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import './ComplaintCard.css';

export const ComplaintCard = ({ complaint, isSelected, onClick }) => {
  const { id, title, category, priority, status, location, date, image } = complaint;

  return (
    <div
      className={`complaint-card ${isSelected ? 'complaint-card-active' : ''}`}
      onClick={onClick}
    >
      <div className="complaint-card-thumbnail">
        <img src={image} alt={title} />
      </div>

      <div className="complaint-card-details">
        <div className="complaint-card-top">
          <span className="complaint-id">{id}</span>
          <StatusBadge status={status} />
        </div>

        <h4 className="complaint-card-title">{title}</h4>

        <div className="complaint-card-meta">
          <span className="meta-item">
            <MapPin size={12} /> {location}
          </span>
          <span className="meta-item">
            <Calendar size={12} /> {formatDate(date)}
          </span>
        </div>

        <div className="complaint-card-bottom">
          <span className="category-pill">{category}</span>
          <StatusBadge priority={priority} />
        </div>
      </div>
    </div>
  );
};
