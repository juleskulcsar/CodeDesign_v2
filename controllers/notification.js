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
exports.oldNotifications = asyncHandler(async (req, res, next) => {
    let notifications = await Notification.findOne({ user: req.user.id })

    const oldNotifications = [...notifications.notifications.newNotifications, ...notifications.notifications.oldNotifications];
    console.log('oldNotifications in controllers: ', oldNotifications)
    notifications.notifications.newNotifications.length = 0;
    const newNotifications = notifications.notifications.newNotifications;

    notifications = await Notification.findOneAndUpdate(
        {
            notifications: {
                newNotifications: newNotifications,
                oldNotifications: [...oldNotifications],
            },
            new: true
        }


    )

    console.log('notifications in oldNotif controller: ', notifications)

    await notifications.save();
    return res.json(notifications)
})