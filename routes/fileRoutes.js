const express = require('express');
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileController');
const ensureAuthenticated = require('../middleware/auth');

const upload = multer({
  dest: path.join(__dirname, '../../uploads'),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const router = express.Router();

router.use(ensureAuthenticated);

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/:id', fileController.getFileDetails);
router.get('/:id/download', fileController.downloadFile);

module.exports = router;