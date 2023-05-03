const express = require('express'); //require express
const mongoose = require('mongoose');
const exphbs = require('express-handlebars'); //require express-handlebars
const app = express(); //require express
require('dotenv').config();
const routes = require('./routes');
const methodOverride = require('method-override');
const moment = require('moment');
const bcrypt = require("bcryptjs"); //require bcryptjs for crypted passwords
const cookieParser = require('cookie-parser'); //require cookie-parser for setting cookies and sessions for admin-login
const { adminAuth } = require('./middleware/authMiddleware'); //Haetaan authentikointiin tehty middleware

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main', //setting up main.handlebars as default layout
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        moment: (date) => {
            return moment(date).format('DD.MM.YYYY');
        },
        base64: (buffer) => {
            return buffer.toString('base64');
        }
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use(methodOverride('_method'));
app.use(cookieParser());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use('', require('./routes/index.js'));
app.use('', require('./routes/blogi.js'));
app.use('', require('./routes/kauppa.js'));
app.use('', require('./routes/yhteystiedot.js'));
app.use('', require('./routes/saavutettavuus.js'));
app.use('', require('./routes/login.js'));
app.use('', require('./routes/adminKauppa.js'));
app.use('', adminAuth, require('./routes/admin.js')); //Admin-sivu vaatii adminauthentikoinnin


const PORT = process.env.PORT || 3000; //listen port 3000
app.listen(PORT, () => console.log(`Listening port ${PORT}`)); 