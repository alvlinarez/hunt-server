const fs = require('fs');
const path = require('path');

exports.uploadImage = (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(401).json({
      error: 'Please upload a file'
    });
  }
  const { id: userId } = req.user;
  const { path: tempPath, originalname } = file;
  const date = Date.now();
  if (!fs.existsSync(`public/uploads/images/${userId}`)) {
    try {
      fs.mkdirSync(`public/uploads/images/${userId}`, {
        recursive: true
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Error at uploading file' });
    }
  }
  const targetPath = `public/uploads/images/${userId}/${date}-${originalname}`;
  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error at uploading file' });
    }
  });
  res.status(200).json({ message: 'Image uploaded', path: targetPath });
};
