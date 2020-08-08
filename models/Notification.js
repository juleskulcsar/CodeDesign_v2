const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        notifications: {
            notificationItems: [
                {
                    profile: {
                        name: {
                            type: String
                        },
                        photo: {
                            type: String
                        },
                        userId: {
                            type: mongoose.Types.ObjectId
                        }
                    },
                    notificationType: {
                        type: String
                    },
                    notificationStatus: {
                        type: String
                    },
                    post: {
                        id: {
                            type: String
                        },
                        title: {
                            type: String
                        }
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ],
            countNew: {
                type: Number
            },
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


module.exports = mongoose.model('Notification', NotificationSchema);
