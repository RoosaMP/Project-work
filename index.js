const express = require('express'); //require express
const exphbs = require('express-handlebars'); //require express-handlebars
const app = express(); //require express

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main' //setting up main.handlebars as default layout
}));

app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index',
    {
        pagetitle : "Etusivu"
    });
})

app.get('/blogi', (req, res) => {
    res.render('blogi',
    {
        pagetitle: "Blogi"
    });
})

app.get('/kauppa', (req, res) => {
    res.render('kauppa',
    {
        pagetitle: "Faniverkkokauppa"
    });
})

app.get('/yhteystiedot', (req, res) => {
    res.render('yhteystiedot',
    {
        pagetitle: "yhteystiedot"
    });
})

app.get('/admin', (req, res) => {
    res.render('admin',
    {
        pagetitle : "Admin"
    });
})

const PORT = process.env.PORT || 3000; //listen port 3000
app.listen(PORT, () => console.log(`Listening port ${PORT}`)); 