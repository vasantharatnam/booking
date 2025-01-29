const express = require('express');
const router = express.Router();
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const { authenticate } = require('../middlewares/authMiddleware');

// Book a seat
router.post('/', authenticate, bookSeat);

// Get booking details
router.get('/:id', authenticate, getBookingDetails);

module.exports = router;
