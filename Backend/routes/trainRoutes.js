const express = require('express');
const router = express.Router();
const { addTrain, getSeatAvailability } = require('../controllers/trainController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeAdmin } = require('../middlewares/adminMiddleware');

// Add a new train (Admin only)
router.post('/', authenticate, authorizeAdmin, addTrain);

// Get seat availability (Public or Authenticated)
router.get('/availability', authenticate, getSeatAvailability);

module.exports = router;
