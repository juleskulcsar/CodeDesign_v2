const Notification = require('../models/Notification');
const Profile = require('../models/Profile');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { check, validationResult } = require('express-validator');

// @route    GET api/notification/mynotifications
// @desc     Get notifications by logged in user
// @access   Private
exports.getNotificationsByUser = asyncHandler(async (req, res, next) => {
    const notifications = await Notification.findOne({ user: req.user.id });

    res.json(notifications);
});