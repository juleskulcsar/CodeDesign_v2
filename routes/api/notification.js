const express = require('express');
const advancedResults = require('../../middleware/advancedResults');
const { protect } = require('../../middleware/auth');
const Notification = require('../../models/Notification');
const {
    getNotificationsByUser
} = require('../../controllers/notification');

const router = express.Router();

router.get('/mynotifications', protect, getNotificationsByUser);

module.exports = router;