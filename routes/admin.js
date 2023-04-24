const express = require('express');
const router = express.Router();

const app = express();

const adminController = require('../controllers/admin.js');

router.get('/admin', adminController.home);

//app.post('/addpost', adminController.addPost);

module.exports = router;