const express = require('express');
const authController = require('../controllers/authController');
const reportController = require('../controllers/reportController');
const router = express.Router();

router.use(authController.protect);

router.post('/create', reportController.store);

module.exports = router;
