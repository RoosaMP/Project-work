const express = require('express');
const router = express.Router();

const adminController = require('../controllers/login.js');

router.get('/login', adminController.home);

module.exports = router;