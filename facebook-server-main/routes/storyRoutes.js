const express = require('express');
const storyController = require('../controllers/storyController');
const authController = require('../controllers/authController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const router = express.Router();
router.use(authController.protect);
router.post(
  '/upload',
  uploadMiddleware.single('image'),
  storyController.uploadStory
);

router.get('/getAllStories', storyController.getAllStories);
// router.get('/getStoryDetail', storyController.getStoryDetail);
module.exports = router;
