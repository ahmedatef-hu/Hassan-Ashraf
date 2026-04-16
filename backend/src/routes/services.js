const express = require('express');
const router = express.Router();
const serviceService = require('../services/serviceService');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/services - Get all services
router.get('/',
  asyncHandler(async (req, res) => {
    const services = await serviceService.getAllServices();
    
    res.json({
      success: true,
      data: services,
      count: services.length
    });
  })
);

// GET /api/services/grouped - Get services grouped by category
router.get('/grouped',
  asyncHandler(async (req, res) => {
    const groupedServices = await serviceService.getServicesGroupedByCategory();
    
    res.json({
      success: true,
      data: groupedServices
    });
  })
);

// GET /api/services/category/:category - Get services by category
router.get('/category/:category',
  asyncHandler(async (req, res) => {
    const { category } = req.params;
    const services = await serviceService.getServicesByCategory(category);
    
    res.json({
      success: true,
      data: services,
      count: services.length
    });
  })
);

// GET /api/services/:id - Get service by ID
router.get('/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const service = await serviceService.getServiceById(id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  })
);

module.exports = router;