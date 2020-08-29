const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController');
const auth = require('../utils/middleware/auth');

const upload = multer({
  dest: `${path.join(__dirname, '../uploads/images')}`
});

router.post('/', auth, upload.single('product'), uploadController.uploadImage);

module.exports = router;
