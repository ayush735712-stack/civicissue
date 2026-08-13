/**
 * Utility functions for CivicFix
 */

// Generate unique tracking ID: CF-YYYY-XXXX
export const generateTrackingId = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CF-${year}-${randomNum}`;
};

// Format ISO date string into readable format
export const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Return CSS class for priority pill
export const getPriorityBadgeClass = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'urgent':
      return 'badge-priority-urgent';
    case 'high':
      return 'badge-priority-high';
    case 'medium':
      return 'badge-priority-medium';
    case 'low':
      return 'badge-priority-low';
    default:
      return 'badge-priority-default';
  }
};

// Return status timeline index (0 to 3)
export const getStatusStepIndex = (status) => {
  switch (status) {
    case 'Reported':
      return 0;
    case 'Assigned':
      return 1;
    case 'In Progress':
      return 2;
    case 'Resolved':
      return 3;
    default:
      return 0;
  }
};
