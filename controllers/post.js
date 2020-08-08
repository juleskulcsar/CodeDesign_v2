const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');
const Notification = require('../models/Notification');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @route       POST api/post/post-upload
// @description Upload a post photo
// @access      Private
exports.uploadPost = asyncHandler(async (req, res) => {
  const url = process.env.s3Url + req.file.filename;
  const user = await User.findById(req.user.id).select('-password');
  let profile = await Profile.findOne({ user: req.user.id });

  const technologies = req.body.technologies
    .split(',')
    .map(skill => skill.trim());

  const newPost = new Post({
    postImage: url,
    title: req.body.title,
    description: req.body.description,
    technologies: technologies,
    user: req.user.id,
    avatar: profile.profilePhoto,
    name: user.name,
    profile: profile._id
  });

  const post = await newPost.save();
  res.json(post);
});

// @route    GET api/post
// @desc     Get all posts
// @access   Private
exports.getAllPosts = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults.data);
});

// @route    GET api/post/:id
// @desc     Get post by ID
// @access   Private
exports.getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('profile');

  // Check for ObjectId format and post
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
    return next(new ErrorResponse(`Oopsy daisy: post not found`, 404));
  }
  res.json(post);
});

// @route    DELETE api/post/:id
// @desc     Delete post
// @access   Private
exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  // Check for ObjectId format and post
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
    return next(new ErrorResponse(`Oopsy daisy: post not found`, 404));
  }

  // Check user
  if (post.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `Oopsy daisy: you're not authorized to delete this post`,
        401
      )
    );
  }

  await post.remove();
  res.json({ msg: 'Post removed' });
});

// @route    PUT api/post/like/:id
// @desc     Like a post
// @access   Private
exports.likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('profile', [
    'profilePhoto',
    'displayName'
  ]);

  const profile = await Profile.findOne({ user: req.user.id });
  let notifications = await Notification.findOne({ user: post.user })

  const notificationFields = {};
  notificationFields.user = post.user;
  notificationFields.notifications = {
    notificationItems: [{
      profile: {
        name: profile.displayName,
        photo: profile.ptofilePhoto
      },
      notificationType: 'like',
      notificationStatus: 'newNotification',
      post: {
        id: post.id,
        title: post.title,
      }
    }],
    countNew: 1
  };

  if (notifications === null) {
    notifications = new Notification(notificationFields)
  } else {
    notifications.notifications.notificationItems.unshift({
      notificationType: 'like',
      notificationStatus: 'newNotification',
      post: { id: post._id, title: post.title },
      profile: { name: profile.displayName, photo: profile.profilePhoto, userId: profile.user }
    }),
      notifications.notifications.countNew = notifications.notifications.countNew + 1;
  }

  // Check if the post has already been liked
  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length !== 0
  ) {
    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
  }

  post.likes.unshift({ user: req.user.id });
  await post.save();
  await notifications.save();
  res.json(post.likes);
});

// @route    PUT api/post/unlike/:id
// @desc     Unlike a portfolio
// @access   Private
exports.unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('profile', [
    'profilePhoto',
    'displayName'
  ]);

  // Check if the post has already been liked
  if (
    post.likes.filter(like => like.user.toString() === req.user.id).length > 0
  ) {
    //Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
  }

  await post.save();
  res.json(post.likes);
});

// @route    PUT api/post/save/:id
// @desc     Save a post
// @access   Private
exports.savePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('profile', [
    'profilePhoto',
    'displayName'
  ]);
  const profile = await Profile.findOne({ user: req.user.id });
  let notifications = await Notification.findOne({ user: post.user })

  const notificationFields = {};
  notificationFields.user = post.user;
  notificationFields.notifications = {
    notificationItems: [{
      profile: {
        name: profile.displayName,
        photo: profile.ptofilePhoto
      },
      notificationType: 'save',
      notificationStatus: 'newNotification',
      post: {
        id: post.id,
        title: post.title,
      }
    }]
  };

  if (notifications === null) {
    notifications = new Notification(notificationFields)
  } else {
    notifications.notifications.notificationItems.unshift({
      notificationType: 'save',
      notificationStatus: 'newNotification',
      post: { id: post._id, title: post.title },
      profile: { name: profile.displayName, photo: profile.profilePhoto }
    });
  }
  // Check if the post has already been saved
  if (
    post.saves.filter(save => save.user.toString() === req.user.id).length !== 0
  ) {
    const removeIndex = post.saves
      .map(save => save.user.toString())
      .indexOf(req.user.id);
    post.saves.splice(removeIndex, 1);
  }

  post.saves.unshift({ user: req.user.id });

  await post.save();
  await notifications.save();
  res.json(post.saves);
});

// @route    PUT api/post/unsave/:id
// @desc     Unsave a portfolio
// @access   Private
exports.unsavePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('profile', [
    'profilePhoto',
    'displayName'
  ]);

  // Check if the post has already been saved
  if (
    post.saves.filter(save => save.user.toString() === req.user.id).length > 0
  ) {
    const removeIndex = post.saves
      .map(save => save.user.toString())
      .indexOf(req.user.id);
    post.saves.splice(removeIndex, 1);
  }

  await post.save();
  res.json(post.saves);
});

// @route    POST api/post/comment/:id
// @desc     Comment on a post
// @access   Private
exports.postComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('profile', [
    'profilePhoto',
    'displayName'
  ]);
  const profile = await Profile.findOne({ user: req.user.id });
  let notifications = await Notification.findOne({ user: post.user })

  const notificationFields = {};
  notificationFields.user = post.user;
  notificationFields.notifications = {
    notificationItems: [{
      profile: {
        name: profile.displayName,
        photo: profile.ptofilePhoto
      },
      notificationType: 'comment',
      notificationStatus: 'newNotification',
      post: {
        id: post.id,
        title: post.title,
      }
    }]
  };

  if (notifications === null) {
    notifications = new Notification(notificationFields)
  } else {
    notifications.notifications.notificationItems.unshift({
      notificationType: 'comment',
      notificationStatus: 'newNotification',
      post: { id: post._id, title: post.title },
      profile: { name: profile.displayName, photo: profile.profilePhoto }
    });
  }

  const newComment = {
    text: req.body.text,
    name: profile.name,
    avatar: profile.profilePhoto,
    user: req.user.id,
    profile: profile
  };

  post.comments.unshift(newComment);

  await post.save();
  await notifications.save();
  res.json(post.comments);
});

// @route    DELETE api/post/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
exports.deletePostComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('profile', [
    'profilePhoto',
    'displayName'
  ]);

  // Pull out comment
  const comment = post.comments.find(
    comment => comment.id === req.params.comment_id
  );

  // Make sure comment exists
  if (!comment) {
    return next(new ErrorResponse(`Oopsy daisy: comment does not exists`, 404));
  }

  // Check user
  if (comment.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `Oopsy daisy: you're not authorized to delete this comment`,
        401
      )
    );
  }

  // Get remove index
  const removeIndex = post.comments
    .map(comment => comment.id)
    .indexOf(req.params.comment_id);

  post.comments.splice(removeIndex, 1);

  await post.save();
  await notifications.save();
  res.json(post.comments);
});
