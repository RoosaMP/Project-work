const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const webTokenSecret = "7b73853bbf076a6cd9fb3e89b5c3b67fccc6f5d819cbae42d7996ea9ec73b7be7d0f00"

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
                if (result)
                {
                    const maxAge = 3 * 60 * 60; //Luodaan token. Pitää saada vielä toimimaan
                    const token = jwt.sign(
                        { id: adminInfo._id, username },
                        webTokenSecret,
                    {
                        expiresIn : maxAge,
                    }
                    );
                    console.log(token);
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000,
                    });
                    

                    res.redirect('/admin') //Jos on sama niin mennään admin-sivulle
                }
                else
                {
                res.render('login', //Jos salasana ei täsmää palataan login-sivulle
                { 
                    pagetitle : "Login to adminpage",
                    errormessage : "Login error: wrong password"
                });
                }
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