const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();

const home = (req,res) => {
    res.render('yhteystiedot',
    {
        pagetitle : "Meidän poppoon yhteystiedot"
    });
}

module.exports = {
    home
};