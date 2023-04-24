const express = require('express');
const router = express.Router();

const kauppaController = require('../controllers/kauppa.js');

router.get('/kauppa', kauppaController.home);

module.exports = router;