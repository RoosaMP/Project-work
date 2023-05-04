const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Post = require('../models/post.js');

const edit_post = async (req,res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        res.render('editPosts', { post });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// päivitetään julkaisuun uudet tiedot
const update_post = async (req,res) => {
    try {
        const postId = req.params.id;
        const { title, context } = req.body;
        const post = await Post.findByIdAndUpdate(postId, { title, context }, {new: true});
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    edit_post,
    update_post
}