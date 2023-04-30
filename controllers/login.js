const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
mongoose.connect(dbURI);
const User = require('../models/user.js'); //Model - User

const home = async (req, res) => { //Login-sivulle
    try {
        res.render('login', 
        { 
            pagetitle : "Login to adminpage"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
} 

const checkLogin = async (req,res,next) => { //Tarkistetaan login-tiedot
    try {
        const { username, password } = req.body; //Haetaan syötetyt käyttäjänimi ja salasana
        if (!username || !password) { //Testataan onko syötetty käyttäjätunnusta tai salasanaa
            res.status(400).json;
            res.redirect('/login'); //Jos ei ole syötetty heitetään käyttäjä takaisin login-sivulle
        }

        const adminInfo = await User.findOne({ username, password }) //Haetaan tietokannasta löytyykö vastaavia tunnuksia ja salasanaa mitä syötetty
        
        if (!adminInfo) {
            console.log("Login not succesful");
            res.redirect('/login'); //Jos ei ole syötetty heitetään käyttäjä takaisin login-sivulle
        }
        else {
            console.log("Login succesful");
            res.redirect('/admin'); //Jos tunnus ja salasana löytyy tietokannasta heitetään käyttäjä admin-sivulle
        }
    }
    catch (err) {
        return next(err);
        
}
}


module.exports = {
    home,
    checkLogin
}