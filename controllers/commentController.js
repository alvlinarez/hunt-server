const Comment = require('../models/Comment');

exports.updateComment = async (req, res) => {
  const commentId = req.params.commentId;
  const { message } = req.body;
  const { id: userId } = req.user;
  if (!commentId) {
    return res.status(401).json({
      error: 'commentId is required'
    });
  }

  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, creator: userId },
      { message },
      { new: true }
    );
    if (!comment) {
      return res.status(401).json({
        error: 'Comment not found.'
      });
    }
    return res.status(200).json({
      comment
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Internal server error.'
    });
  }
};
