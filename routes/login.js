const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.js');

router.get('/login', loginController.home);
router.post('/login_check', loginController.checkLogin);

module.exports = router;