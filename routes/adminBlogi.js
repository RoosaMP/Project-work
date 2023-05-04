const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminBlogi.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage});

router.get('/adminblogi', adminController.home);
router.post('/addpost', upload.single('image'), adminController.create_post);
router.delete('/posts/:id', adminController.delete_post);
//router.get('/posts/:id/edit', adminController.edit_post);
//router.post('/posts/:id', adminController.update_post);

module.exports = router;