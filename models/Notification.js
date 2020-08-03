const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        notifications: {
            new: [
                {
                    profile: {
                        name: {
                            type: String
                        },
                        photo: {
                            type: String
                        }
                    },
                    notificationType: {
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
            old: []
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
