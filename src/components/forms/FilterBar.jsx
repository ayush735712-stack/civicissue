import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES, STATUSES, PRIORITIES } from '../../data/mockComplaints';
import { Button } from '../common/Button';
import './FilterBar.css';

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  onResetFilters
}) => {
  return (
    <div className="filter-bar-container">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search complaints by ID, title, or location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Dropdown Filters */}
      <div className="filter-dropdowns">
        <div className="filter-group">
          <label htmlFor="filter-cat">Category</label>
          <select
            id="filter-cat"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {statusFilter !== undefined && (
          <div className="filter-group">
            <label htmlFor="filter-status">Status</label>
            <select
              id="filter-status"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        )}

        {priorityFilter !== undefined && (
          <div className="filter-group">
            <label htmlFor="filter-priority">Priority</label>
            <select
              id="filter-priority"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
            >
              {PRIORITIES.map((pr) => (
                <option key={pr} value={pr}>{pr}</option>
              ))}
            </select>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          icon={RotateCcw}
          onClick={onResetFilters}
          title="Reset all filters"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
