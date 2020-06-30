const express = require('express');
const s3 = require('../../middleware/s3');
const fileUpload = require('../../middleware/file-upload.js');

const {
  getMyProfile,
  createProfile,
  uploadProfilePhoto,
  getAllProfiles,
  getProfileById,
  deleteProfile,
  getUserRepos
} = require('../../controllers/profile');

const advancedResults = require('../../middleware/advancedResults');
const Profile = require('../../models/Profile');

const router = express.Router();

const { protect } = require('../../middleware/auth');

router.get('/me', protect, getMyProfile);
router.post('/', protect, createProfile);
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
  advancedResults(Profile, 'posts jobs'),
  getAllProfiles
);
router.get('/user/:user_id', protect, getProfileById);
router.delete('/', protect, deleteProfile);
router.get('/github/:username', protect, getUserRepos);

module.exports = router;
