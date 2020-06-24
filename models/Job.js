const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
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
});

module.exports = mongoose.model('Job', JobSchema);
