const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  register,
  login,
  loadUser,
  getMe,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updateUserPassword,
  logout
} = require('../../controllers/auth');

const router = express.Router();

const { protect } = require('../../middleware/auth');

router.post('/register', register);
router.post(
  '/',
  [
    check('email', 'Please add a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);
router.get('/', protect, loadUser);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/updatepassword', protect, updateUserPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/updatedetails', protect, updateUserDetails);

module.exports = router;
