const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../utils/middleware/auth');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const {
  createAndUpdateProductValidator
} = require('../utils/middleware/validators/product');

router.get('/', auth, productController.getProducts);

router.get('/:productId', auth, productController.getProduct);

router.post(
  '/',
  auth,
  createAndUpdateProductValidator,
  runValidation,
  productController.createProduct
);

router.put(
  '/:productId',
  auth,
  createAndUpdateProductValidator,
  runValidation,
  productController.updateProduct
);

router.put(
  '/:productId/addComment',
  auth,
  productController.addCommentToProduct
);

router.delete(
  '/:productId/removeComment',
  auth,
  productController.removeCommentFromProduct
);

router.put('/:productId/vote', auth, productController.voteProduct);

router.put('/:productId/unvote', auth, productController.unvoteProduct);

router.delete('/:productId', auth, productController.deleteProduct);

module.exports = router;
