const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    },
    title: {
      type: String,
      required: [true, 'Please add a job title']
    },
    description: {
      type: String,
      required: [true, 'Please add a job description']
    },
    jobType: {
      type: String,
      required: [true, 'Please select a job type']
    },
    location: {
      type: String,
      required: [true, 'Please add a job location']
    },
    jobField: {
      type: String,
      required: [true, 'Please select a job field']
    },
    name: {
      type: String
    },
    avatar: {
      type: String
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

// JobSchema.virtual('userprofile', {
//   ref: 'Profile',
//   localField: '_id',
//   foreignField: 'profile',
//   justOne: false
// });

module.exports = mongoose.model('Job', JobSchema);
