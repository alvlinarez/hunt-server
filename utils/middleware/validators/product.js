const { check } = require('express-validator');

exports.createProductValidator = [
  check('name').not().isEmpty().withMessage('Name is required.'),
  check('description').not().isEmpty().withMessage('Description is required.'),
  check('company').not().isEmpty().withMessage('Company is required.'),
  check('url')
    .not()
    .isEmpty()
    .withMessage('url is required.')
    .isURL()
    .withMessage('url must be URL type'),
  check('urlImage')
    .not()
    .isEmpty()
    .withMessage('urlImage is required.')
    .isURL()
    .withMessage('urlImage must be URL type')
];

exports.updateProductValidator = [
  check('name').not().isEmpty().withMessage('Name is required.'),
  check('description').not().isEmpty().withMessage('Description is required.'),
  check('company').not().isEmpty().withMessage('Company is required.'),
  check('url')
    .not()
    .isEmpty()
    .withMessage('url is required.')
    .isURL()
    .withMessage('url must be URL type'),
  check('urlImage')
    .not()
    .isEmpty()
    .withMessage('urlImage is required.')
    .isURL()
    .withMessage('urlImage must be URL type'),
  check('votes')
    .not()
    .isEmpty()
    .withMessage('votes is required.')
    .isNumeric()
    .withMessage('votes must be number')
];
