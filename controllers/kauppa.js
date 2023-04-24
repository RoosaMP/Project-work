const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();

const home = (req,res) => {
    res.render('kauppa',
    {
        pagetitle : "Fanikauppa"
    });
}

module.exports = {
    home
};