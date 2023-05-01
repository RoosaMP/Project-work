const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const bcrypt = require("bcryptjs");

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
            res.render('login', //Jos ei ole syötetty heitetään käyttäjä takaisin login-sivulle
            { 
                pagetitle : "Login to adminpage",
                errormessage : "Login error: username or password not given"
            });
        }

        const adminInfo = await User.findOne({ username }) //Haetaan tietokannasta löytyykö vastaavia tunnuksia mitä syötetty
        
        if (!adminInfo) { //Jos tunnusta ei löytynyt palataan login-sivulle
            console.log("Login not succesful");
            res.render('login', 
            { 
                pagetitle : "Login to adminpage",
                errormessage : "Login error: wrong username or password"
            });
            }
        else { //Jos tunnus löytyi ajetaan seuraavaa
            bcrypt.compare(password, adminInfo.password).then(function (result) //Verrataan syötettyä salasanaa kryptattuun salasanaan
            {
                result
                ? res.redirect('/admin') //Jos on sama niin mennään admin-sivulle
                : res.render('login', //Jos salasana ei täsmää palataan login-sivulle
                { 
                    pagetitle : "Login to adminpage",
                    errormessage : "Login error: wrong password"
                });
            })
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