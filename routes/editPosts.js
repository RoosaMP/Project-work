const express = require('express');
const router = express.Router();
const editPostsController = require('../controllers/editPosts.js');

router.get('/posts/:id/edit', editPostsController.edit_post);
router.post('/posts/:id', editPostsController.update_post);

module.exports = router;