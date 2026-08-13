import express from 'express';

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    API Health check endpoint
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CivicFix API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;
