const express = require('express');
const advancedResults = require('../../middleware/advancedResults');
const { protect } = require('../../middleware/auth');
const Notification = require('../../models/Notification');
const { getSavesByPost } = require('../../controllers/save');

const router = express.Router();

router.get('/:id', protect, getSavesByPost);

module.exports = router;
