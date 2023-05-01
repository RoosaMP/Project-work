const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

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

const logout = (req, res) => { //Uloskirjautumistoiminto
    res.cookie('jwt', '', { maxAge: 1}) //Cookieta ei saa poistettua, mutta laitetaan se tyhjäksi ja session aika minimiin
    res.redirect('/'); //Ohjataan etusivulle
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
            const auth = bcrypt.compare(password, adminInfo.password)//Verrataan syötettyä salasanaa kryptattuun salasanaan
            {
                if (auth)
                {
                    const maxAge = 3 * 60 * 60; //Cookie sesson aika (3 tuntia).
                    const webToken = process.env.WEBTOKEN; //Haetaan webtoken env-tiedostosta
                    const token = jwt.sign( //Luodaan token mikä sisältää käyttäjän id:n, käyttäjänimen, tokenin ja iän
                        { id: adminInfo._id },
                        webToken,
                    {
                        expiresIn : maxAge,
                    }
                    );
                    res.cookie('jwt', token, { //Luodaan cookie kirjautumista varten
                        httpOnly: true, //Cookie ei näy frontendissä
                        maxAge: maxAge * 1000, //Cookie session-aika. 3 tuntia.
                    });
                    res.redirect('/admin') //Ohjataan salasanan tunnistuksen ja cookien luomisen jälkeen admin-sivulle
                }
                else
                {
                res.render('login', //Jos salasana ei täsmää palataan login-sivulle
                { 
                    pagetitle : "Login to adminpage",
                    errormessage : "Login error: wrong password"
                });
                }
            }
         }
    }
    catch (err) {
        return next(err);
        
}
}


module.exports = {
    home,
    logout,
    checkLogin
}