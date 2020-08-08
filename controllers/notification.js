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

    console.log('wtf is this: ', notifications)

    res.json(notifications);
});

// @route    PUT api/notification/mynotifications
// @desc     Update notifications from new to old after checking them
// @access   Private
exports.resetCount = asyncHandler(async (req, res, next) => {

    notifications = await Notification.findOneAndUpdate(
        { user: req.user.id },
        { $set: { 'notifications.countNew': 0 } },
        { new: true }
    )

    console.log('notifications in oldNotif controller: ', notifications)
    return res.json(notifications)
})