const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();


const home = async (req,res) => {
        res.render('admin', {
        pagetitle: "Admin-etusivu",
    });
    }

module.exports = {
    home
};