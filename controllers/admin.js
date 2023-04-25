const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Post = require('../models/post.js');

const home = (req,res) => {
    res.render('admin');
}

const addPost = async (req,res) => {
    const { title, article } = req.body;
    try 
    {
        const post = new Post({
            title: title,
            article: article
        });
        await post.save();
        res.redirect('/');
    }
    catch (error) {
        console.log(error);
        res.status(400).send('Error');
    }
};

module.exports = {
    home,
    addPost
};