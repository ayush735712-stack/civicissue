import Complaint from '../models/Complaint.js';

/**
 * Generate a unique complaint tracking ID in format CF-YYYY-XXXX
 */
export const generateUniqueComplaintId = async () => {
  const year = new Date().getFullYear();
  let isUnique = false;
  let complaintId = '';
  let attempts = 0;

  while (!isUnique && attempts < 20) {
    attempts++;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    complaintId = `CF-${year}-${randomNum}`;
    
    // Check if ID already exists in MongoDB database
    const existing = await Complaint.findOne({ complaintId });
    if (!existing) {
      isUnique = true;
    }
  }

  if (!isUnique) {
    complaintId = `CF-${year}-${Date.now().toString().slice(-4)}`;
  }

  return complaintId;
};
