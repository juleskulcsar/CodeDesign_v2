const crypto = require('crypto');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

// @route       POST api/auth
// @description Authenticate user and get token
// @access      Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('please provide an email and password', 400));
  }

  // try {
  //see if user exists
  const user = await User.findOne({ email: email }).select('+password');
  if (!user) {
    return next(
      new ErrorResponse('please provide a valid email and password', 401)
    );
  }

  //match password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(
      new ErrorResponse('please provide a valid email and password', 401)
    );
  }
  sendTokenResponse(user, 200, res);
  // } catch (err) {
  //   console.log(err.message);
  //   res.status(500).send('server error');
  // }
});

// @route       POST api/auth/register
// @description Register user
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, registeras, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return next(
        new ErrorResponse('A user with this email address already exists', 400)
      );
    }
    // new User() method just creates a User instance. Does not save the user
    user = new User({
      name,
      email,
      registeras,
      password
    });

    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route       GET api/auth/logout
// @description Logout user
// @access      Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expres: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

//@route          POST /api/auth/me
//@description    get current user
//@access         public
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

//@route        PUT /api/v1/auth/updatedetails
//@description  update user details
//@access       private
exports.updateUserDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

//@route        PUT api/auth/updatepassword
//@description  update pass
//@access       public
exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  //check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    next(new ErrorResponse('password is incorrect'), 401);
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);

  //   res.status(200).json({
  //     success: true,
  //     data: user
  //   });
});

//@route         POST api/auth/forgotpassword
//@description   forgot pass
//@access        public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    next(new ErrorResponse('No user with that email'), 404);
  }

  //get reset token
  const resetToken = user.getResetPasswordToken();
  console.log('reset Token is: ', resetToken);

  await user.save({ validateBeforeSave: false });

  //create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) requested the reset of a password. 
    Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message: message
    });

    res.status(200).json({
      success: true,
      data: 'email sent'
    });
  } catch (error) {
    console.log(error);
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('email could not be sent'), 500);
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

//@route          PUT api/auth/resetpassword/:resettoken
//@description    reset pass
//@access         public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('invalid token'), 400);
  }

  //set new pass
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);

  res.status(200).json({
    success: true,
    data: user
  });
});

//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token: token });
};
