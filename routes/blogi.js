const express = require('express');
const router = express.Router();

router.get('/blogi/', (req, res) => {
    res.render('blogi',
    {
        pagetitle: "Blogi"
    });
})

module.exports = router;
