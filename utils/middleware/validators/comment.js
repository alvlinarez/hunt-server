const { check } = require('express-validator');

exports.updateCommentValidator = [
  check('message').not().isEmpty().withMessage('Message is required.'),
  check('userId').not().isEmpty().withMessage('userId is required.')
];
