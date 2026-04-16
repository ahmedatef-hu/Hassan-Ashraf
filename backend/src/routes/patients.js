const express = require('express');
const router = express.Router();
const patientService = require('../services/patientService');
const { validate, validateQuery, schemas } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// POST /api/patients - Create or get patient
router.post('/', 
  validate(schemas.patient),
  asyncHandler(async (req, res) => {
    const patient = await patientService.createOrGetPatient(req.validatedData);
    
    res.status(201).json({
      success: true,
      message: 'Patient created/updated successfully',
      data: patient
    });
  })
);

// GET /api/patients/:phone - Get patient by phone
router.get('/:phone',
  asyncHandler(async (req, res) => {
    const { phone } = req.params;
    
    // Basic phone validation
    if (!phone || phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number'
      });
    }

    const patient = await patientService.getPatientByPhone(phone);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      data: patient
    });
  })
);

// GET /api/patients/search - Search patients
router.get('/search',
  validateQuery(schemas.search),
  asyncHandler(async (req, res) => {
    const patients = await patientService.searchPatients(req.validatedQuery);
    
    res.json({
      success: true,
      data: patients,
      count: patients.length
    });
  })
);

module.exports = router;