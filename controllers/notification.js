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

// @route    PUT api/notification/oldnotifications
// @desc     Update notifications from new to old after checking them
// @access   Private
exports.oldNotifications = asyncHandler(async (req, res, next) => {
    let notifications = await Notification.findOne({ user: req.user.id })

    const oldNotifications = [...notifications.newNotifications, ...notifications.oldNotifications];
    notifications.newNotifications.length = 0;
    const newNotifications = notifications.newNotifications;

    notifications = await Notification.findOneandUpdate(
        { newNotifications: newNotifications },
        { oldNotifications: oldNotifications },
        { new: true }
    )

    console.log('notifications in oldNotif controller: ', notifications)

    res.json(notifications)
})