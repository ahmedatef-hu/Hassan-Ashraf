const express = require('express');
const router = express.Router();
const branchService = require('../services/branchService');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/branches - Get all branches
router.get('/',
  asyncHandler(async (req, res) => {
    const branches = await branchService.getAllBranches();
    
    res.json({
      success: true,
      data: branches,
      count: branches.length
    });
  })
);

// GET /api/branches/:id - Get branch by ID
router.get('/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const branch = await branchService.getBranchById(id);
    
    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    res.json({
      success: true,
      data: branch
    });
  })
);

// GET /api/branches/:id/schedule - Get branch schedule
router.get('/:id/schedule',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const schedule = await branchService.getBranchSchedule(id);
    
    res.json({
      success: true,
      data: schedule
    });
  })
);

module.exports = router;