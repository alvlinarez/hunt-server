const { check } = require('express-validator');

exports.createAndUpdateProductValidator = [
  check('name').not().isEmpty().withMessage('Name is required.'),
  check('description').not().isEmpty().withMessage('Description is required.'),
  check('company').not().isEmpty().withMessage('Company is required.'),
  check('url')
    .not()
    .isEmpty()
    .withMessage('url is required.')
    .isURL()
    .withMessage('url must be URL type'),
  check('urlImage').not().isEmpty().withMessage('urlImage is required.')
];
