const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Post = require('../models/post.js');

const home = async (req,res) => {
        const posts = await Post.find().limit(1).sort({$natural: -1});
        res.render('index', {
        pagetitle: "Tervetuloa KiekkoHAMKin virallisille fanisivuille",
        posts});
    }

module.exports = {
    home
};