const Joi = require('joi');

// Validation schemas
const schemas = {
  // Patient validation
  patient: Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 255 characters',
      'any.required': 'Name is required'
    }),
    phone: Joi.string().pattern(/^[\+\d][\d\s\-\(\)]{7,20}$/).required().messages({
      'string.pattern.base': 'Please provide a valid phone number',
      'any.required': 'Phone number is required'
    }),
    email: Joi.string().email().optional().allow('').messages({
      'string.email': 'Please provide a valid email address'
    })
  }),

  // Booking validation
  booking: Joi.object({
    patient_name: Joi.string().min(2).max(255).required(),
    patient_phone: Joi.string().pattern(/^[\+\d][\d\s\-\(\)]{7,20}$/).required(),
    service_name: Joi.string().required(),
    branch_name: Joi.string().required(),
    appointment_date: Joi.string().required().messages({
      'any.required': 'Appointment date is required'
    }),
    notes: Joi.string().max(1000).optional().allow('')
  }),

  // Booking status update
  bookingStatus: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled').required()
  }),

  // Search validation
  search: Joi.object({
    phone: Joi.string().pattern(/^[\+\d][\d\s\-\(\)]{7,20}$/).optional(),
    name: Joi.string().min(2).max(255).optional()
  }).or('phone', 'name').messages({
    'object.missing': 'Either phone or name must be provided'
  })
};

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    req.validatedData = value;
    next();
  };
};

// Query validation middleware
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Query validation failed',
        errors
      });
    }

    req.validatedQuery = value;
    next();
  };
};

module.exports = {
  schemas,
  validate,
  validateQuery
};