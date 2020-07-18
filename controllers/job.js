const Job = require('../models/Job');
const Profile = require('../models/Profile');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { check, validationResult } = require('express-validator');

// @route    POST api/job
// @desc     Add a job
// @access   Private
exports.addJob = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  console.log('errors: ', errors.errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findById(req.user.id).select('-password');
  let profile = await Profile.findOne({ user: req.user.id });

  const newJob = new Job({
    title: req.body.title,
    description: req.body.description,
    jobType: req.body.jobType,
    location: req.body.location,
    jobField: req.body.jobField,
    name: user.name,
    avatar: profile.profilePhoto,
    user: req.user.id,
    profile: profile._id
  });

  const job = await newJob.save();
  res.json(job);
});

// @route    GET api/job
// @desc     Get all jobs
// @access   Private
exports.getAllJobs = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);

});

// @route    GET api/job/:id
// @desc     Get job by ID
// @access   Private
exports.getJobById = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id).populate('profile', [
    'profilePhoto',
    'displayName',
    'location',
    'website'
  ]);

  // Check for ObjectId format and job
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !job) {
    return next(new ErrorResponse(`Oopsy daisy: job not found`, 404));
  }

  res.json(job);
});

// @route    DELETE api/job/:id
// @desc     Delete a job
// @access   Private
exports.deleteJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  // Check for ObjectId format and post
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !job) {
    return next(new ErrorResponse(`Oopsy daisy: job not found`, 404));
  }
  // Check user
  if (job.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `Oopsy daisy: you're not authorized to perform this action`,
        401
      )
    );
  }

  await job.remove();
  res.json({ msg: 'Job removed' });
});
