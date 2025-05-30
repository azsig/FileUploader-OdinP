const express = require('express');
const folderController = require('../controllers/folderController');
const ensureAuthenticated = require('../middleware/auth');
const router = express.Router();

router.use(ensureAuthenticated);

router.post('/', folderController.createFolder);
router.get('/', folderController.getFolders);
router.get('/:id', folderController.getFolder);
router.put('/:id', folderController.updateFolder);
router.delete('/:id', folderController.deleteFolder);

module.exports = router;