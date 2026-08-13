import express from 'express';
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateStatus,
  assignDepartment,
  deleteComplaint,
  uploadImage
} from '../controllers/complaintController.js';
import {
  validateCreateComplaint,
  validateUpdateStatus,
  validateAssignDepartment
} from '../middleware/validationMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// File upload endpoint
router.post('/upload', upload.single('image'), uploadImage);

// Complaints CRUD Endpoints
router.route('/')
  .post(validateCreateComplaint, createComplaint)
  .get(getComplaints);

router.route('/:complaintId')
  .get(getComplaintById)
  .delete(deleteComplaint);

router.patch('/:complaintId/status', validateUpdateStatus, updateStatus);
router.patch('/:complaintId/department', validateAssignDepartment, assignDepartment);

export default router;
