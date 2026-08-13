import { body, validationResult } from 'express-validator';

// Result handler helper middleware
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Complaint creation validation rules
export const validateCreateComplaint = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Issue title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location address is required'),
  body('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isNumeric()
    .withMessage('Latitude must be a valid number'),
  body('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isNumeric()
    .withMessage('Longitude must be a valid number'),
  handleValidationErrors
];

// Status update validation rules
export const validateUpdateStatus = [
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Reported', 'Assigned', 'In Progress', 'Resolved'])
    .withMessage('Invalid status value. Allowed: Reported, Assigned, In Progress, Resolved'),
  handleValidationErrors
];

// Department assignment validation rules
export const validateAssignDepartment = [
  body('department')
    .trim()
    .notEmpty()
    .withMessage('Department name is required'),
  handleValidationErrors
];
