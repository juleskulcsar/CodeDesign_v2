const Post = require('../models/Post');
const asyncHandler = require('../middleware/async');

// @route    GET api/saves/:postID
// @desc     Get saves by postID
// @access   Private
exports.getSavesByPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('profile');
    res.json(post.saves);
});
