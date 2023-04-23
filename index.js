const express = require('express'); //require express
const exphbs = require('express-handlebars'); //require express-handlebars
const app = express();

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index',
    {
        pagetitle : "Etusivu"
    });
})

app.get('/news', (req, res) => {
    res.render('news',
    {
        pagetitle: "Uutiset"
    });
})


app.get('/entertainment', (req, res) => {
    res.render('entertainment',
    {
        pagetitle: "Viihde"
    });
})


app.get('/sport', (req, res) => {
    res.render('sport',
    {
        pagetitle: "Urheilu"
    });
})

const PORT = process.env.PORT || 3000; //listen port 3000
app.listen(PORT, () => console.log(`Listening port ${PORT}`)); 