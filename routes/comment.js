const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../utils/middleware/auth');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const {
  updateCommentValidator
} = require('../utils/middleware/validators/comment');

router.put(
  '/:commentId',
  auth,
  updateCommentValidator,
  runValidation,
  commentController.updateComment
);

module.exports = router;
