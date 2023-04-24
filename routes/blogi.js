const express = require('express');
const router = express.Router();

const blogiController = require('../controllers/blogi.js');

router.get('/blogi', blogiController.home);

module.exports = router;