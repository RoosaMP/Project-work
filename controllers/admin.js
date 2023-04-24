const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();

const home = (req,res) => {
    res.render('admin');
}

module.exports = {
    home
};