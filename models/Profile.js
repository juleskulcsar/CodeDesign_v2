const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    name: {
      type: String
    },
    profilePhoto: {
      type: String
    },
    displayName: {
      type: String
    },
    website: {
      type: String
    },
    location: {
      type: String
    },
    specialties: {
      type: String,
      required: [true, 'Please select at least one specialty']
    },
    skills: {
      type: [String],
      required: [true, 'Please add at least one skill']
    },
    bio: {
      type: String
    },
    githubusername: {
      type: String
    },
    social: {
      youtube: {
        type: String
      },
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      }
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

// Cascade delete posts when a profile is deleted
ProfileSchema.pre('remove', async function(next) {
  await this.model('post').deleteMany({ profile: this._id });
  await this.model('job').deleteMany({ profile: this._id });
  next();
});

// Reverse populate with virtuals
ProfileSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'profile',
  justOne: false
});

ProfileSchema.virtual('jobs', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'profile',
  justOne: false
});

module.exports = mongoose.model('Profile', ProfileSchema);
