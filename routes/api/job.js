const express = require('express');
const advancedResults = require('../../middleware/advancedResults');
const { protect } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Job = require('../../models/Job');

const {
  addJob,
  getAllJobs,
  getJobById,
  deleteJob
} = require('../../controllers/job');

const router = express.Router();

router.post(
  '/',
  [
    protect,
    [
      check('title', 'job title is required')
        .not()
        .isEmpty(),
      check('description', 'job description is required')
        .not()
        .isEmpty(),
      check('jobType', 'job type is required')
        .not()
        .isEmpty(),
      check('location', 'job location is required')
        .not()
        .isEmpty()
    ]
  ],
  addJob
);
router.get('/', protect, advancedResults(Job, 'profile'), getAllJobs);
router.get('/:id', protect, getJobById);
router.delete('/:id', protect, deleteJob);

module.exports = router;
