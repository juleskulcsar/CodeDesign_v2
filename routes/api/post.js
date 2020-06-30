const express = require('express');
const s3 = require('../../middleware/s3');
const fileUpload = require('../../middleware/file-upload');
const advancedResults = require('../../middleware/advancedResults');
const { protect } = require('../../middleware/auth');
const Post = require('../../models/Post');

const {
  uploadPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  postComment,
  deletePostComment
} = require('../../controllers/post');

const router = express.Router();

router.post(
  '/post-upload',
  protect,
  fileUpload.single('file'),
  s3.upload,
  uploadPost
);
router.get('/', protect, advancedResults(Post), getAllPosts);
router.get('/:id', protect, getPostById);
router.delete('/:id', protect, deletePost);
router.put('/like/:id', protect, likePost);
router.put('/unlike/:id', protect, unlikePost);
router.put('/save/:id', protect, savePost);
router.put('/unsave/:id', protect, unsavePost);
router.post('/comment/:id', protect, postComment);
router.delete('/comment/:id/:comment_id', protect, deletePostComment);

module.exports = router;
