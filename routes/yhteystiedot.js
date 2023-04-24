const express = require('express');
const router = express.Router();

const yhteysController = require('../controllers/yhteystiedot.js');

router.get('/yhteystiedot', yhteysController.home);

module.exports = router;