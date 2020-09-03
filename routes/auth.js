const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../utils/middleware/auth');

// Validators
const { runValidation } = require('../utils/middleware/validators');
const {
  userSignInValidator,
  userSignInProviderValidator,
  userSignUpValidator
} = require('../utils/middleware/validators/auth');

// Sign in route
router.post(
  '/signin',
  userSignInValidator,
  runValidation,
  authController.signIn
);

// Sign in with Facebook and Google
router.post(
  '/signin-provider',
  userSignInProviderValidator,
  runValidation,
  authController.signInProvider
);

// Sign up route
router.post(
  '/signup',
  userSignUpValidator,
  runValidation,
  authController.signUp
);

// Get auth user
router.post('/', authController.authenticatedUser);

// Sign Out
// Auth to verify if user signed In
router.post('/signout', auth, authController.signOut);

module.exports = router;
