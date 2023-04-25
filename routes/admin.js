const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.js');

router.get('/admin', adminController.home);

router.post('/addpost', adminController.create_post);

module.exports = router;