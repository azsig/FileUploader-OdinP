const express = require('express');
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileControllers');
const upload = require('../middleware/multerCloudinary'); // Use multer with Cloudinary
const ensureAuthenticated = require('../middleware/auth');


const router = express.Router();

//router.use(ensureAuthenticated);

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/:id', fileController.getFileDetails);
router.get('/:id/download', fileController.downloadFile);

module.exports = router;