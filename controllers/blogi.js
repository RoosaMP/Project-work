const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();

const home = (req,res) => {
    res.render('blogi',
    {
        pagetitle : "Urheilublogi"
    });
}

module.exports = {
    home
};