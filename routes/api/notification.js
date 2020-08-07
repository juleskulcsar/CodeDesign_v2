const express = require('express');
const advancedResults = require('../../middleware/advancedResults');
const { protect } = require('../../middleware/auth');
const Notification = require('../../models/Notification');
const {
    getNotificationsByUser,
    oldNotifications
} = require('../../controllers/notification');

const router = express.Router();

router.get('/:id', protect, getNotificationsByUser);
router.put('/:id', protect, oldNotifications);

module.exports = router;