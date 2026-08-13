import axios from 'axios';

/**
 * CivicFix Axios API Client Configuration
 * Connected to Node.js / Express REST API backend.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('civicfix_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error Response:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// API Service Methods
export const complaintsApi = {
  // Check API Health
  getHealth: () => api.get('/health'),

  // Get Complaints List with optional filters
  getComplaints: (params) => api.get('/complaints', { params }),

  // Get single complaint by tracking ID (e.g. CF-2026-1001)
  getComplaintById: (complaintId) => api.get(`/complaints/${encodeURIComponent(complaintId)}`),

  // Submit a new complaint
  createComplaint: (data) => api.post('/complaints', data),

  // Upload image file
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/complaints/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // Update complaint status
  updateStatus: (complaintId, status, note = '') =>
    api.patch(`/complaints/${encodeURIComponent(complaintId)}/status`, { status, note }),

  // Assign department
  assignDepartment: (complaintId, department, note = '') =>
    api.patch(`/complaints/${encodeURIComponent(complaintId)}/department`, { department, note }),

  // Delete complaint
  deleteComplaint: (complaintId) =>
    api.delete(`/complaints/${encodeURIComponent(complaintId)}`)
};

export default api;
