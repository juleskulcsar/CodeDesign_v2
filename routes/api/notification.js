const express = require('express');
const advancedResults = require('../../middleware/advancedResults');
const { protect } = require('../../middleware/auth');
const Notification = require('../../models/Notification');
const {
    getNotificationsByUser,
    resetCount
} = require('../../controllers/notification');

const router = express.Router();

router.get('/:id', protect, getNotificationsByUser);
router.put('/:id', protect, resetCount);

module.exports = router;