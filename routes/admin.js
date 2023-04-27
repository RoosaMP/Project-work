const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.js');

router.get('/admin', adminController.home);

router.post('/addpost', adminController.create_post);
router.delete('/posts/:id', adminController.delete_post);
router.get('/posts/:id/edit', adminController.edit_post);
router.post('/posts/:id', adminController.update_post);

module.exports = router;