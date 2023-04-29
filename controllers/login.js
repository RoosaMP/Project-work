const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
mongoose.connect(dbURI);
const user = require('../models/user.js');

const home = async (req, res) => {
    try {
        res.render('login', 
        { 
            pagetitle : "Login"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
} 

const checkLogin = (req,res,next) => {
    try {
        const checkUser = new user({
            username: req.body.username,
            password: req.body.password
        });
        console.log(checkUser);
        const realUser = user.find({ id:'644d7d7ee990440467d4546e'}); //korjaa tähän, että hakee käyttäjät
        console.log(realUser);

    }
    catch (err) {
        console.log(err);
        
}
}


module.exports = {
    home,
    checkLogin
}