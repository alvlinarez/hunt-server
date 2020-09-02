const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController');
const auth = require('../utils/middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, './public/uploads/images');
  },
  filename: (req, file, next) => {
    next(null, file.fieldname);
  }
});

const upload = multer({
  //dest: `${path.join(__dirname, '../uploads/images')}`
  storage
});

router.post('/', auth, upload.single('image'), uploadController.uploadImage);

module.exports = router;
