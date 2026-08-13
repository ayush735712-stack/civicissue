import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  AlertCircle,
  Clock,
  CheckCircle2,
  ListFilter,
  MapPin,
  Building2,
  RefreshCw
} from 'lucide-react';
import { useComplaints } from '../hooks/useComplaints';
import { DashboardStatCard } from '../components/cards/DashboardStatCard';
import { ComplaintTable } from '../components/admin/ComplaintTable';
import { FilterBar } from '../components/forms/FilterBar';
import { MapView } from '../components/map/MapView';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';
import { StatusTimeline } from '../components/common/StatusTimeline';
import { Button } from '../components/common/Button';
import { formatDate } from '../utils/formatters';
import './AdminPage.css';

export const AdminPage = () => {
  const { complaints, updateStatus, assignDepartment, resetToMockData } = useComplaints();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'map'

  // Calculate Stat Metrics
  const metrics = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(
      (c) => c.status === 'Reported' || c.status === 'Pending'
    ).length;
    const inProgress = complaints.filter(
      (c) => c.status === 'In Progress' || c.status === 'Assigned'
    ).length;
    const resolved = complaints.filter((c) => c.status === 'Resolved').length;

    return { total, pending, inProgress, resolved };
  }, [complaints]);

  // Filter complaints
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
    <div className="admin-page animate-fade-in">
      <div className="container page-container">
        {/* Admin Header */}
        <div className="admin-header">
          <div>
            <div className="admin-pill">
              <Building2 size={14} />
              <span>Municipal Operations Center</span>
            </div>
            <h1 className="page-title">Civic Management Dashboard</h1>
            <p className="page-subtitle">
              Monitor, assign, update, and resolve reported public infrastructure issues across municipal sectors.
            </p>
          </div>

          <div className="admin-header-actions">
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={resetToMockData}
              title="Reset state to original seed dataset"
            >
              Reset Seed Data
            </Button>
          </div>
        </div>

        {/* Metric Stat Cards Row */}
        <div className="stat-cards-grid">
          <DashboardStatCard
            title="Total Complaints"
            count={metrics.total}
            icon={LayoutDashboard}
            color="blue"
            active={statusFilter === 'All'}
            onClick={() => setStatusFilter('All')}
          />
          <DashboardStatCard
            title="Pending Reports"
            count={metrics.pending}
            icon={AlertCircle}
            color="red"
            active={statusFilter === 'Reported'}
            onClick={() => setStatusFilter('Reported')}
          />
          <DashboardStatCard
            title="In Progress / Assigned"
            count={metrics.inProgress}
            icon={Clock}
            color="amber"
            active={statusFilter === 'In Progress'}
            onClick={() => setStatusFilter('In Progress')}
          />
          <DashboardStatCard
            title="Resolved Issues"
            count={metrics.resolved}
            icon={CheckCircle2}
            color="emerald"
            active={statusFilter === 'Resolved'}
            onClick={() => setStatusFilter('Resolved')}
          />
        </div>

        {/* Filter Controls Bar */}
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

        {/* View Switcher Tabs */}
        <div className="view-toggle-bar">
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'toggle-active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <ListFilter size={16} />
              <span>Complaints Data Table ({filteredComplaints.length})</span>
            </button>
            <button
              className={`toggle-btn ${viewMode === 'map' ? 'toggle-active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <MapPin size={16} />
              <span>Geospatial Map Distribution</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {viewMode === 'table' ? (
          <ComplaintTable
            complaints={filteredComplaints}
            onViewDetails={(item) => setSelectedComplaint(item)}
            onUpdateStatus={(id, newStatus) => updateStatus(id, newStatus)}
            onAssignDepartment={(id, dept) => assignDepartment(id, dept)}
          />
        ) : (
          <div className="admin-map-wrapper">
            <MapView
              complaints={filteredComplaints}
              selectedComplaint={selectedComplaint}
              onSelectComplaint={(item) => setSelectedComplaint(item)}
              onViewDetails={(item) => setSelectedComplaint(item)}
            />
          </div>
        )}
      </div>

      {/* Admin Complaint Details Modal */}
      <Modal
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title={`Admin Issue Management - ${selectedComplaint?.id}`}
        maxWidth="720px"
      >
        {selectedComplaint && (
          <div className="admin-modal-content">
            <div className="modal-top-section">
              <img src={selectedComplaint.image} alt={selectedComplaint.title} className="admin-modal-img" />
              <div className="admin-modal-meta">
                <div className="modal-badge-group">
                  <StatusBadge status={selectedComplaint.status} />
                  <StatusBadge priority={selectedComplaint.priority} />
                  <span className="cat-tag">{selectedComplaint.category}</span>
                </div>
                <h3 className="modal-issue-title">{selectedComplaint.title}</h3>
                <p className="modal-issue-desc">{selectedComplaint.description}</p>
                <div className="modal-meta-pills">
                  <span><strong>Location:</strong> {selectedComplaint.location}</span>
                  <span><strong>Date:</strong> {formatDate(selectedComplaint.date)}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Controls in Modal */}
            <div className="admin-actions-box">
              <h4 className="actions-box-title">Manage & Update Status</h4>
              <div className="actions-grid">
                <div className="action-control">
                  <label>Update Status:</label>
                  <select
                    value={selectedComplaint.status}
                    onChange={(e) => {
                      updateStatus(selectedComplaint.id, e.target.value);
                      setSelectedComplaint({
                        ...selectedComplaint,
                        status: e.target.value
                      });
                    }}
                  >
                    <option value="Reported">Reported</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div className="action-control">
                  <label>Assign Department:</label>
                  <select
                    value={selectedComplaint.department || 'Unassigned'}
                    onChange={(e) => {
                      assignDepartment(selectedComplaint.id, e.target.value);
                      setSelectedComplaint({
                        ...selectedComplaint,
                        department: e.target.value
                      });
                    }}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Roads & Transport">Roads & Transport</option>
                    <option value="Sanitation & Waste">Sanitation & Waste</option>
                    <option value="Electrical Works">Electrical Works</option>
                    <option value="Water & Sewerage">Water & Sewerage</option>
                    <option value="Drainage Maintenance">Drainage Maintenance</option>
                    <option value="Public Infrastructure">Public Infrastructure</option>
                    <option value="Parks & Urban Forestry">Parks & Urban Forestry</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <StatusTimeline
              currentStatus={selectedComplaint.status}
              timelineLogs={selectedComplaint.timeline}
            />

            <div className="admin-modal-footer">
              <Button variant="secondary" onClick={() => setSelectedComplaint(null)}>
                Close Modal
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
