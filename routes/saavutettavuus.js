const express = require('express');
const router = express.Router();

const saavutettavuusController = require('../controllers/saavutettavuus.js');

router.get('/saavutettavuus', saavutettavuusController.home);

module.exports = router;