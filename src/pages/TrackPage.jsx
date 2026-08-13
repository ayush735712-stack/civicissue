import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Building2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useComplaints } from '../hooks/useComplaints';
import { StatusTimeline } from '../components/common/StatusTimeline';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { formatDate } from '../utils/formatters';
import './TrackPage.css';

export const TrackPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { complaints, getComplaintById } = useComplaints();

  const [inputQuery, setInputQuery] = useState(searchParams.get('id') || '');
  const [searchedId, setSearchedId] = useState(searchParams.get('id') || '');
  const [activeComplaint, setActiveComplaint] = useState(null);

  // Sync state on URL query param change or search submit
  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setInputQuery(idFromUrl);
      setSearchedId(idFromUrl);
      const found = getComplaintById(idFromUrl);
      setActiveComplaint(found || null);
    } else if (complaints.length > 0) {
      // Default to first complaint if no ID specified
      setActiveComplaint(complaints[0]);
      setSearchedId(complaints[0].id);
      setInputQuery(complaints[0].id);
    }
  }, [searchParams, complaints]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    setSearchedId(inputQuery.trim());
    setSearchParams({ id: inputQuery.trim() });
    const found = getComplaintById(inputQuery.trim());
    setActiveComplaint(found || null);
  };

  const sampleIds = complaints.slice(0, 4).map(c => c.id);

  return (
    <div className="track-page animate-fade-in">
      <div className="container page-container">
        {/* Track Search Hero */}
        <div className="track-search-section text-center">
          <h1 className="page-title">Track Complaint Status</h1>
          <p className="page-subtitle">
            Enter your 10-character Tracking ID (e.g. <code>CF-2026-1001</code>) to view real-time department updates.
          </p>

          <form className="track-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-bar-inner">
              <Search size={20} className="bar-search-icon" />
              <input
                type="text"
                className="bar-input"
                placeholder="Enter Complaint ID (e.g. CF-2026-1001)"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
              />
              <Button type="submit" variant="primary" size="md">
                Search Complaint
              </Button>
            </div>
          </form>

          {/* Quick sample chips */}
          <div className="sample-chips">
            <span className="chips-label">Try sample IDs:</span>
            {sampleIds.map((id) => (
              <button
                key={id}
                type="button"
                className="chip-btn"
                onClick={() => {
                  setInputQuery(id);
                  setSearchedId(id);
                  setSearchParams({ id });
                  setActiveComplaint(getComplaintById(id));
                }}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Search Result */}
        {activeComplaint ? (
          <div className="track-result-card animate-fade-in">
            {/* Header info */}
            <div className="result-header">
              <div className="header-left">
                <div className="result-id-group">
                  <span className="result-id">{activeComplaint.id}</span>
                  <StatusBadge status={activeComplaint.status} />
                  <StatusBadge priority={activeComplaint.priority} />
                </div>
                <h2 className="result-title">{activeComplaint.title}</h2>
              </div>
              <span className="result-cat-pill">{activeComplaint.category}</span>
            </div>

            {/* Main Visual Status Timeline */}
            <StatusTimeline
              currentStatus={activeComplaint.status}
              timelineLogs={activeComplaint.timeline}
            />

            {/* Grid details */}
            <div className="result-grid">
              <div className="result-image-column">
                <img src={activeComplaint.image} alt={activeComplaint.title} className="result-image" />
              </div>

              <div className="result-info-column">
                <h4 className="info-heading">Issue Summary</h4>
                <p className="result-description">{activeComplaint.description}</p>

                <div className="info-meta-list">
                  <div className="info-meta-item">
                    <MapPin size={16} className="meta-icon" />
                    <div>
                      <span className="meta-label">Location Address</span>
                      <strong className="meta-value">{activeComplaint.location}</strong>
                    </div>
                  </div>

                  <div className="info-meta-item">
                    <Calendar size={16} className="meta-icon" />
                    <div>
                      <span className="meta-label">Submission Date</span>
                      <strong className="meta-value">{formatDate(activeComplaint.date)}</strong>
                    </div>
                  </div>

                  <div className="info-meta-item">
                    <Building2 size={16} className="meta-icon" />
                    <div>
                      <span className="meta-label">Assigned Department</span>
                      <strong className="meta-value">{activeComplaint.department || 'Unassigned'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="not-found-card">
            <AlertCircle size={44} className="not-found-icon" />
            <h3>No Complaint Found for "{searchedId}"</h3>
            <p>Please double-check the tracking ID or select one of the sample IDs above.</p>
          </div>
        )}
      </div>
    </div>
  );
};
