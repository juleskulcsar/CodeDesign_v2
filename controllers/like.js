const Post = require('../models/Post');
const asyncHandler = require('../middleware/async');

// @route    GET api/likes/:postID
// @desc     Get likes by postID
// @access   Private
exports.getLikesByPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('profile');
    res.json(post.likes);
});
