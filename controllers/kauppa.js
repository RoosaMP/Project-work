const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Product = require('../models/shop.js');

const home = async (req,res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('kauppa',
    {
        pagetitle : "KiekkoHAMKin fanituotekauppa",
        products
    });
}

module.exports = {
    home
};