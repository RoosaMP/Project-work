const express = require('express');
const router = express.Router();
const adminKauppaController = require('../controllers/adminKauppa.js');
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

router.get('/adminkauppa', adminKauppaController.home);
router.post('/addproduct', upload.single('image'), adminKauppaController.create_product);
router.delete('/products/:id', adminKauppaController.delete_product);

module.exports = router;