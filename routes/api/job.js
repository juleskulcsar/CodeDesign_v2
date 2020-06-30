const express = require('express');
const advancedResults = require('../../middleware/advancedResults');
const { protect } = require('../../middleware/auth');
const Job = require('../../models/Job');

const {
  addJob,
  getAllJobs,
  getJobById,
  deleteJob
} = require('../../controllers/job');

const router = express.Router();

router.post('/', protect, addJob);
router.get('/', protect, advancedResults(Job, 'profile'), getAllJobs);
router.get('/:id', protect, getJobById);
router.delete('/:id', protect, deleteJob);

module.exports = router;
