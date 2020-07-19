const express = require('express');
const { check, validationResult } = require('express-validator');
const s3 = require('../../middleware/s3');
const fileUpload = require('../../middleware/file-upload.js');

const {
  getMyProfile,
  createProfile,
  uploadProfilePhoto,
  getAllProfiles,
  getProfileById,
  deleteProfile,
  getUserRepos,
  getAllMyPosts
} = require('../../controllers/profile');

const advancedResults = require('../../middleware/advancedResults');
const Profile = require('../../models/Profile');

const router = express.Router();

const { protect } = require('../../middleware/auth');

router.get('/me', protect, getMyProfile);
router.post(
  '/',
  protect,
  [
    check('specialties', 'specialties are required')
      .not()
      .isEmpty(),
    check('skills', 'skills are required')
      .not()
      .isEmpty(),
    check('location', 'location is equired')
      .not()
      .isEmpty()
  ],
  createProfile
);
router.post(
  '/profilephoto',
  protect,
  fileUpload.single('file'),
  s3.upload,
  uploadProfilePhoto
);
router.get(
  '/',
  protect,
  advancedResults(Profile, 'posts jobs user'),
  getAllProfiles
);
router.get('/user/:user_id', protect, getProfileById);
router.delete('/', protect, deleteProfile);
router.get('/github/:username', protect, getUserRepos);

module.exports = router;
