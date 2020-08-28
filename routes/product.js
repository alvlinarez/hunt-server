const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../utils/middleware/auth');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const {
  createProductValidator,
  updateProductValidator
} = require('../utils/middleware/validators/product');

router.get('/', auth, productController.getProducts);

router.get('/:productId', auth, productController.getProduct);

router.post(
  '/',
  auth,
  createProductValidator,
  runValidation,
  productController.createProduct
);

router.put(
  '/:productId',
  auth,
  updateProductValidator,
  runValidation,
  productController.updateProduct
);

router.put(
  '/:productId/addComment',
  auth,
  updateProductValidator,
  runValidation,
  productController.addCommentToProduct
);

router.delete(
  '/:productId/removeComment',
  auth,
  updateProductValidator,
  runValidation,
  productController.removeCommentFromProduct
);

router.put('/:productId/vote', auth, productController.voteProduct);

router.put('/:productId/unvote', auth, productController.unvoteProduct);

router.delete('/:productId', auth, productController.deleteProduct);

module.exports = router;
