const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/statistical', adminController.statistical);
router.get('/users', adminController.indexUser);
router.post('/users/:userId', adminController.actionUser);
router.get('/posts', adminController.indexPost);
router.get('/posts/:postId', adminController.getPost);
router.post('/posts/:postId', adminController.actionPost);
router.delete('/posts/:postId', adminController.deletePost);
router.get('/report', adminController.indexReport);

module.exports = router;
