const express = require('express'); //require express
const mongoose = require('mongoose');
const exphbs = require('express-handlebars'); //require express-handlebars
const app = express(); //require express
require('dotenv').config();
const routes = require('./routes');

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main', //setting up main.handlebars as default layout
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use('', require('./routes/index.js'));
app.use('', require('./routes/blogi.js'));
app.use('', require('./routes/kauppa.js'));
app.use('', require('./routes/yhteystiedot.js'));
app.use('', require('./routes/saavutettavuus.js'));
app.use('', require('./routes/admin.js'));

const PORT = process.env.PORT || 3000; //listen port 3000
app.listen(PORT, () => console.log(`Listening port ${PORT}`)); 