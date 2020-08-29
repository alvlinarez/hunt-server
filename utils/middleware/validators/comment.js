const { check } = require('express-validator');

exports.updateCommentValidator = [
  check('message').not().isEmpty().withMessage('Message is required.')
];
