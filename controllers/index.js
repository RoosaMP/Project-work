const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Post = require('../models/post.js');

const home = async (req,res) => {
    try {
        const posts = await Post.find({});
        res.render('index', { posts });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

module.exports = {
    home
};