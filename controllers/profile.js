const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');
const Job = require('../models/Job');
const Notification = require('../models/Notification');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const advancedResults = require('../middleware/advancedResults');

// @route       GET api/profile/me
// @description Get current user profile
// @access      Private
exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.user.id
  }).populate('User', ['registeras']);

  if (!profile) {
    return next(new ErrorResponse('Oopsy daisy: no profile found', 400));
  }

  const posts = await Post.find({
    user: req.user.id
  });
  const jobs = await Job.find({
    user: req.user.id
  });
  profile.posts = posts;
  profile.jobs = jobs;

  res.json(profile);
});

// @route       POST api/profile
// @description Create or update a user profile
// @access      Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    displayName,
    registeredAs,
    profilePhoto,
    website,
    location,
    bio,
    specialties,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  //build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (displayName) profileFields.displayName = displayName;
  if (registeredAs) profileFields.registeredAs = registeredAs;
  if (profilePhoto) profileFields.profilePhoto = profilePhoto;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (specialties) profileFields.specialties = specialties;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  //build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  let profile = await Profile.findOne({ user: req.user.id });
  let user = await User.findById(req.user.id).select('-password');

  if (profile) {
    if (!profile.location) {
      return next(new ErrorResponse('location is missing', 400));
    } else if (!profile.specialties) {
      return next(new ErrorResponse('select at least one specialty', 400));
    } else if (profile.skills.length === 0) {
      return next(new ErrorResponse('add at least one skill', 400));
    }
    //update profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    return res.json(profile);
  }

  //create profile
  profile = new Profile(profileFields);

  if (!profile.location) {
    return next(new ErrorResponse('location is missing', 400));
  } else if (!profile.specialties) {
    return next(new ErrorResponse('select at least one specialty', 400));
  } else if (!profile.skills) {
    return next(new ErrorResponse('add at least one skill', 400));
  }

  await profile.save();
  res.json(profile);
});

// @route       POST api/profile/profilephoto
// @description Upload a user photo
// @access      Private

exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  const url = process.env.s3Url + req.file.filename;
  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(new ErrorResponse('Oopsy daisy: no profile found', 400));
  }
  if (profile) {
    //update profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { profilePhoto: url },
      { new: true }
    );
    return res.json(profile);
  }
  await profile.save();
});

// @route       GET api/profile
// @description get all profiles
// @access      Public
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @route       GET api/profile/user/:user_id
// @description get profile by user ID
// @access      Public
exports.getProfileById = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.params.user_id
  }).populate('user', ['registeras']);

  if (!profile) {
    return next(new ErrorResponse('Oopsy daisy: no profile found', 400));
  }

  const posts = await Post.find({
    user: req.params.user_id
  });
  const jobs = await Job.find({
    user: req.params.user_id
  });

  profile.posts = posts;
  profile.jobs = jobs;

  res.json(profile);
});

// @route       DELETE api/profile
// @description Delete profile, user, posts
// @access      Private
exports.deleteProfile = asyncHandler(async (req, res) => {
  // try {
  //remove users posts
  await Post.deleteMany({ user: req.user.id });
  //remove profile
  await Profile.findOneAndRemove({ user: req.user.id });
  //remove notifications
  await Notification.findOneAndRemove({ user: req.user.id });
  //remove user
  await User.findOneAndRemove({ _id: req.user.id });
  res.json({ msg: 'User deleted' });
});

// @route       GET api/profile/github/:username
// @description Get user repos from github
// @access      Public

exports.getUserRepos = asyncHandler(async (req, res) => {
  const options = {
    uri: `https://api.github.com/users/${
      req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
    method: 'GET',
    headers: { 'user-agent': 'node.js' }
  };

  request(options, (error, response, body) => {
    if (error) console.log(error);

    if (response.statusCode !== 200) {
      return res
        .status(400)
        .json({ msg: 'Oopsy daisy: no Github profile found' });
    }

    res.json(JSON.parse(body));
  });
});
