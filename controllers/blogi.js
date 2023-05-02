const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Post = require('../models/post.js');

const home = async (req,res) => {
    const posts = await Post.find().sort({ _id: -1});
    res.render('blogi',
    {
        pagetitle : "Urheilublogi",
        posts
    });
}

module.exports = {
    home
};