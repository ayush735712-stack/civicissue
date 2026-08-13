import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  PlusCircle,
  Search,
  MapPin,
  CheckCircle2,
  Clock,
  Building2,
  ArrowRight,
  Sparkles,
  Layers,
  Wrench,
  Droplets,
  Lightbulb,
  Trash2
} from 'lucide-react';
import { useComplaints } from '../hooks/useComplaints';
import { Button } from '../components/common/Button';
import { IssueCard } from '../components/cards/IssueCard';
import { Modal } from '../components/common/Modal';
import { StatusTimeline } from '../components/common/StatusTimeline';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatDate } from '../utils/formatters';
import './HomePage.css';

export const HomePage = () => {
  const navigate = useNavigate();
  const { complaints } = useComplaints();
  const [selectedIssue, setSelectedIssue] = useState(null);

  const categories = [
    { name: 'Potholes & Roads', count: '480+ Fixed', icon: Wrench, color: '#2563eb' },
    { name: 'Garbage & Waste', count: '620+ Cleaned', icon: Trash2, color: '#10b981' },
    { name: 'Streetlights', count: '310+ Restored', icon: Lightbulb, color: '#f59e0b' },
    { name: 'Water Pipe Leaks', count: '290+ Repaired', icon: Droplets, color: '#0284c7' },
    { name: 'Drainage & Sewage', count: '410+ Unclogged', icon: Layers, color: '#8b5cf6' },
    { name: 'Infrastructure', count: '150+ Upgraded', icon: Building2, color: '#ec4899' }
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill">
              <Sparkles size={14} />
              <span>Next-Gen Citizen Civic Engagement</span>
            </div>

            <h1 className="hero-title">
              Report Civic Issues. <br />
              <span className="gradient-text">Transform Your City.</span>
            </h1>

            <p className="hero-description">
              CivicFix empowers residents to report potholes, streetlights, garbage spills, and water leaks directly to city departments. Track resolution progress transparently in real-time.
            </p>

            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                icon={PlusCircle}
                onClick={() => navigate('/report')}
              >
                Report an Issue
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={Search}
                onClick={() => navigate('/track')}
              >
                Track Complaint
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="hero-metrics">
              <div className="metric-item">
                <strong>2,450+</strong>
                <span>Issues Resolved</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <strong>92%</strong>
                <span>Satisfaction Rate</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <strong>&lt;48 Hours</strong>
                <span>Avg Response Time</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="hero-visual">
            <div className="hero-glass-card">
              <div className="card-live-header">
                <span className="pulse-dot" />
                <span className="live-text">Live Platform Activity</span>
              </div>
              {complaints.length > 0 && (
                <div className="hero-sample-report">
                  <img src={complaints[0].image} alt="Featured Issue" className="hero-sample-img" />
                  <div className="hero-sample-info">
                    <div className="sample-badges">
                      <StatusBadge status={complaints[0].status} />
                      <span className="sample-id">{complaints[0].id}</span>
                    </div>
                    <h4>{complaints[0].title}</h4>
                    <p><MapPin size={12} /> {complaints[0].location}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Seamless Workflow</span>
            <h2 className="section-title">How CivicFix Works in 3 Simple Steps</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon-box">
                <MapPin size={24} />
              </div>
              <h3>Snap & Pin Location</h3>
              <p>Take a photo, describe the issue, and pin the exact GPS location on our interactive map.</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon-box">
                <Building2 size={24} />
              </div>
              <h3>Automatic Dispatch</h3>
              <p>Our smart system routes the complaint directly to the relevant municipal field unit.</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon-box">
                <CheckCircle2 size={24} />
              </div>
              <h3>Track & Verify Fix</h3>
              <p>Receive step-by-step timeline notifications until the issue is officially resolved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-subtitle">Categories</span>
              <h2 className="section-title">What Civic Issues Can You Report?</h2>
            </div>
            <Button variant="ghost" icon={ArrowRight} onClick={() => navigate('/map')}>
              Explore Map View
            </Button>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={idx}
                  className="category-card"
                  onClick={() => navigate(`/map?category=${encodeURIComponent(cat.name.split(' ')[0])}`)}
                >
                  <div className="cat-icon-wrapper" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                    <CatIcon size={24} />
                  </div>
                  <h3 className="cat-title">{cat.name}</h3>
                  <span className="cat-count">{cat.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Community Reports */}
      <section className="recent-reports-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-subtitle">Community Action</span>
              <h2 className="section-title">Recent Citizen Reports</h2>
            </div>
            <Button variant="outline" icon={Search} onClick={() => navigate('/track')}>
              View All Complaints
            </Button>
          </div>

          <div className="issues-grid">
            {complaints.slice(0, 6).map((item) => (
              <IssueCard
                key={item.id}
                complaint={item}
                onClick={() => setSelectedIssue(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail View Modal */}
      <Modal
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        title={`Complaint Details - ${selectedIssue?.id}`}
        maxWidth="680px"
      >
        {selectedIssue && (
          <div className="issue-modal-detail">
            <img src={selectedIssue.image} alt={selectedIssue.title} className="modal-issue-img" />

            <div className="modal-header-badges">
              <StatusBadge status={selectedIssue.status} />
              <StatusBadge priority={selectedIssue.priority} />
              <span className="modal-cat-tag">{selectedIssue.category}</span>
            </div>

            <h2 className="modal-issue-title">{selectedIssue.title}</h2>
            <p className="modal-issue-desc">{selectedIssue.description}</p>

            <div className="modal-meta-row">
              <div>
                <strong>Location:</strong> {selectedIssue.location}
              </div>
              <div>
                <strong>Reported Date:</strong> {formatDate(selectedIssue.date)}
              </div>
              <div>
                <strong>Department:</strong> {selectedIssue.department || 'Unassigned'}
              </div>
            </div>

            <StatusTimeline
              currentStatus={selectedIssue.status}
              timelineLogs={selectedIssue.timeline}
            />

            <div className="modal-footer-actions">
              <Button variant="secondary" onClick={() => setSelectedIssue(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  const id = selectedIssue.id;
                  setSelectedIssue(null);
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
