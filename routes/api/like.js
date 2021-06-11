const express = require('express');
const advancedResults = require('../../middleware/advancedResults');
const { protect } = require('../../middleware/auth');
const Notification = require('../../models/Notification');
const { getLikesByPost } = require('../../controllers/like');

const router = express.Router();

router.get('/:id', protect, getLikesByPost);

module.exports = router;
