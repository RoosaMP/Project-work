const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Shop = require('../models/shop.js');

// admin kauppa home sivun näkymä
const home = async (req,res) => {
        const products = await Shop.find({}); // haetaan kaikki julkaisut Post tietokannasta
        res.render('adminkauppa', {
            pagetitle: "Verkkokaupan adminsivu",
            products
        });
}

// lisätään uusi tuote
const create_product = (req,res,next) => {
    const product =  new Shop({
        product: req.body.product,
        price: req.body.price,
        description: req.body.description,
        size: req.body.size
    });
    // Lisätään kuva jos tiedosto on syötetty
    if (req.file) {
        post.img = {
            data: fs.readFileSync(path.join(__dirname,'../public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        };
    }

    post.save()
    .then(() => {
        res.redirect('/adminkauppa');
    })
    .catch((err) => {
        return next(err);
    });

};

// poistetaan tuote
const delete_product = async (req,res) => {
    try {
        const productId = req.params.id;
        await Shop.findByIdAndDelete(productId)
            .then(result => {
                res.redirect('/adminkauppa');
            })
    }
    catch(err) {
        console.log(err)
    };
};

module.exports = {
    home,
    create_product,
    delete_product
}