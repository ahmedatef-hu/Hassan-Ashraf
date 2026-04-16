const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');
const { validate, validateQuery, schemas } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// POST /api/bookings - Create a new booking
router.post('/',
  validate(schemas.booking),
  asyncHandler(async (req, res) => {
    const booking = await bookingService.createBooking(req.validatedData);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  })
);

// GET /api/bookings - Search bookings by phone or name
router.get('/',
  asyncHandler(async (req, res) => {
    const { phone, name } = req.query;
    
    if (!phone && !name) {
      return res.status(400).json({
        success: false,
        message: 'Either phone or name parameter is required'
      });
    }

    let bookings = [];
    
    if (phone) {
      bookings = await bookingService.getBookingsByPhone(phone);
    } else if (name) {
      bookings = await bookingService.getBookingsByName(name);
    }
    
    res.json({
      success: true,
      data: bookings,
      count: bookings.length
    });
  })
);

// GET /api/bookings/all - Get all bookings (admin endpoint)
router.get('/all',
  asyncHandler(async (req, res) => {
    // Parse array parameters - Express may receive them as single value or array
    let statuses = req.query['statuses[]'];
    let days = req.query['days[]'];
    
    // Ensure they are arrays
    if (statuses && !Array.isArray(statuses)) {
      statuses = [statuses];
    }
    if (days && !Array.isArray(days)) {
      days = [days];
    }

    const filters = {
      status: req.query.status,
      statuses: statuses,
      branch_id: req.query.branch_id,
      day: req.query.day,
      days: days,
      date_from: req.query.date_from,
      date_to: req.query.date_to
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    const bookings = await bookingService.getAllBookings(filters);
    
    res.json({
      success: true,
      data: bookings,
      count: bookings.length
    });
  })
);

// GET /api/bookings/slots/:branchId - Get booked slots for a branch
router.get('/slots/:branchId',
  asyncHandler(async (req, res) => {
    const { branchId } = req.params;
    const { start_date, end_date } = req.query;
    
    if (!start_date || !end_date) {
      return res.status(400).json({
        success: false,
        message: 'start_date and end_date parameters are required'
      });
    }

    const bookedSlots = await bookingService.getBookedSlots(branchId, start_date, end_date);
    
    res.json({
      success: true,
      data: bookedSlots,
      count: bookedSlots.length
    });
  })
);

// PATCH /api/bookings/:id/cancel - Cancel a booking
router.patch('/:id/cancel',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { cancelled_by } = req.body; // Get who cancelled it from request body
    const booking = await bookingService.cancelBooking(id, cancelled_by || 'patient');
    
    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  })
);

// PATCH /api/bookings/:id/status - Update booking status
router.patch('/:id/status',
  validate(schemas.bookingStatus),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.validatedData;
    
    const booking = await bookingService.updateBookingStatus(id, status);
    
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  })
);

module.exports = router;