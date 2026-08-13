import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Filter, Layers, ListFilter } from 'lucide-react';
import { useComplaints } from '../hooks/useComplaints';
import { MapView } from '../components/map/MapView';
import { ComplaintCard } from '../components/cards/ComplaintCard';
import { FilterBar } from '../components/forms/FilterBar';
import { Modal } from '../components/common/Modal';
import { StatusTimeline } from '../components/common/StatusTimeline';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { formatDate } from '../utils/formatters';
import './MapPage.css';

export const MapPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { complaints } = useComplaints();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [detailModalComplaint, setDetailModalComplaint] = useState(null);

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      setCategoryFilter(catFromUrl);
    }
  }, [searchParams]);

  // Filter complaints based on active filters
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'All' || c.category.toLowerCase().includes(categoryFilter.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || c.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesPriority =
        priorityFilter === 'All' || c.priority.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [complaints, searchQuery, categoryFilter, statusFilter, priorityFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div className="map-page animate-fade-in">
      <div className="container page-container">
        <div className="map-page-header">
          <div>
            <h1 className="page-title">City Issues Map Explorer</h1>
            <p className="page-subtitle">
              Geospatial view of crowdsourced civic issues across the metropolitan area.
            </p>
          </div>
          <span className="live-counter-pill">
            <span className="pulse-dot" /> Showing {filteredComplaints.length} of {complaints.length} Issues
          </span>
        </div>

        {/* Global Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          onResetFilters={handleResetFilters}
        />

        {/* Split View Layout */}
        <div className="map-split-layout">
          {/* Map Column */}
          <div className="map-column">
            <MapView
              complaints={filteredComplaints}
              selectedComplaint={selectedComplaint}
              onSelectComplaint={(c) => setSelectedComplaint(c)}
              onViewDetails={(c) => setDetailModalComplaint(c)}
            />
          </div>

          {/* Sidebar List Column */}
          <div className="sidebar-column">
            <div className="sidebar-header">
              <h3 className="sidebar-title">Complaints List</h3>
              <span className="count-tag">{filteredComplaints.length}</span>
            </div>

            <div className="sidebar-scroll-list">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((item) => (
                  <ComplaintCard
                    key={item.id}
                    complaint={item}
                    isSelected={selectedComplaint?.id === item.id}
                    onClick={() => setSelectedComplaint(item)}
                  />
                ))
              ) : (
                <div className="empty-list-notice">
                  <p>No complaints match the selected criteria.</p>
                  <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!detailModalComplaint}
        onClose={() => setDetailModalComplaint(null)}
        title={`Complaint Details - ${detailModalComplaint?.id}`}
        maxWidth="680px"
      >
        {detailModalComplaint && (
          <div className="issue-modal-detail">
            <img
              src={detailModalComplaint.image}
              alt={detailModalComplaint.title}
              className="modal-issue-img"
            />

            <div className="modal-header-badges">
              <StatusBadge status={detailModalComplaint.status} />
              <StatusBadge priority={detailModalComplaint.priority} />
              <span className="modal-cat-tag">{detailModalComplaint.category}</span>
            </div>

            <h2 className="modal-issue-title">{detailModalComplaint.title}</h2>
            <p className="modal-issue-desc">{detailModalComplaint.description}</p>

            <div className="modal-meta-row">
              <div>
                <strong>Location:</strong> {detailModalComplaint.location}
              </div>
              <div>
                <strong>Reported Date:</strong> {formatDate(detailModalComplaint.date)}
              </div>
              <div>
                <strong>Department:</strong> {detailModalComplaint.department || 'Unassigned'}
              </div>
            </div>

            <StatusTimeline
              currentStatus={detailModalComplaint.status}
              timelineLogs={detailModalComplaint.timeline}
            />

            <div className="modal-footer-actions">
              <Button variant="secondary" onClick={() => setDetailModalComplaint(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  const id = detailModalComplaint.id;
                  setDetailModalComplaint(null);
                  navigate(`/track?id=${id}`);
                }}
              >
                Track Full Status
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
