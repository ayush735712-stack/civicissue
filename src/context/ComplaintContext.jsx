import React, { createContext, useState, useEffect, useCallback } from 'react';
import { complaintsApi } from '../services/api';
import { INITIAL_COMPLAINTS } from '../data/mockComplaints';

export const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Normalize complaint objects from backend Mongo (_id -> id, complaintId mapping)
  const normalizeComplaint = (c) => ({
    id: c.complaintId || c.id || `CF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    title: c.title,
    description: c.description,
    category: c.category,
    priority: c.priority,
    status: c.status,
    location: c.location,
    latitude: Number(c.latitude),
    longitude: Number(c.longitude),
    date: c.createdAt || c.date || new Date().toISOString(),
    department: c.department || 'Unassigned',
    image: c.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
    timeline: c.timeline || []
  });

  // Fetch complaints from backend REST API
  const fetchComplaints = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await complaintsApi.getComplaints(filters);
      if (response && response.success && Array.isArray(response.data)) {
        const normalized = response.data.map(normalizeComplaint);
        setComplaints(normalized);
        setIsBackendConnected(true);
      }
    } catch (err) {
      console.warn('Backend API connection offline/connecting. Using seed dataset:', err);
      setIsBackendConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // Submit new complaint to backend POST /api/complaints
  const addComplaint = async (data) => {
    try {
      const response = await complaintsApi.createComplaint(data);
      if (response && response.success && response.data) {
        const created = normalizeComplaint(response.data);
        setComplaints((prev) => [created, ...prev]);
        return created;
      }
    } catch (err) {
      console.error('API Post failed, saving in memory state:', err);
    }

    // Fallback in-memory creation if API call fails
    const generatedId = `CF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    const fallbackObj = {
      id: generatedId,
      title: data.title,
      description: data.description,
      category: data.category || 'Other',
      priority: data.priority || 'Medium',
      status: 'Reported',
      location: data.location,
      latitude: Number(data.latitude) || 37.7749,
      longitude: Number(data.longitude) || -122.4194,
      date: now,
      department: 'Unassigned',
      image: data.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
      timeline: [{ status: 'Reported', date: now, note: 'Complaint registered.' }]
    };

    setComplaints((prev) => [fallbackObj, ...prev]);
    return fallbackObj;
  };

  // Update complaint status PATCH /api/complaints/:id/status
  const updateStatus = async (id, newStatus, note = '') => {
    // Optimistic UI update
    const now = new Date().toISOString();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id.toLowerCase() === id.toLowerCase()) {
          return {
            ...c,
            status: newStatus,
            timeline: [...(c.timeline || []), { status: newStatus, date: now, note: note || `Status updated to ${newStatus}.` }]
          };
        }
        return c;
      })
    );

    try {
      await complaintsApi.updateStatus(id, newStatus, note);
    } catch (err) {
      console.error('API Status update error:', err);
    }
  };

  // Assign department PATCH /api/complaints/:id/department
  const assignDepartment = async (id, department, note = '') => {
    // Optimistic UI update
    const now = new Date().toISOString();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id.toLowerCase() === id.toLowerCase()) {
          const updatedStatus = c.status === 'Reported' ? 'Assigned' : c.status;
          return {
            ...c,
            department,
            status: updatedStatus,
            timeline: [...(c.timeline || []), { status: updatedStatus, date: now, note: note || `Assigned to ${department}.` }]
          };
        }
        return c;
      })
    );

    try {
      await complaintsApi.assignDepartment(id, department, note);
    } catch (err) {
      console.error('API Department assignment error:', err);
    }
  };

  // Delete complaint DELETE /api/complaints/:id
  const deleteComplaint = async (id) => {
    setComplaints((prev) => prev.filter((c) => c.id.toLowerCase() !== id.toLowerCase()));

    try {
      await complaintsApi.deleteComplaint(id);
    } catch (err) {
      console.error('API Delete error:', err);
    }
  };

  // Lookup complaint by tracking ID
  const getComplaintById = (id) => {
    if (!id) return null;
    return complaints.find(
      (c) => c.id.trim().toLowerCase() === id.trim().toLowerCase()
    );
  };

  // Reset data helper
  const resetToMockData = () => {
    fetchComplaints();
  };

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        loading,
        error,
        isBackendConnected,
        fetchComplaints,
        addComplaint,
        updateStatus,
        assignDepartment,
        deleteComplaint,
        getComplaintById,
        resetToMockData
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};
