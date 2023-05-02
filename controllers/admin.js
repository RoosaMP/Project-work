const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const webTokenSecret = "7b73853bbf076a6cd9fb3e89b5c3b67fccc6f5d819cbae42d7996ea9ec73b7be7d0f00";

const app = express();

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Post = require('../models/post.js');

// admin home sivun näkymä
const home = async (req,res) => {
    try {
        const posts = await Post.find({}); // haetaan kaikki julkaisut Post tietokannasta
        res.render('admin', { posts });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

// lisätään uusi julkaisu
const create_post = (req,res,next) => {
    const post = new Post({
        title: req.body.title,
        context: req.body.context,
        post_date: new Date()
    });

    post.save()
    .then(() => {
      res.redirect('/admin');
    })
    .catch((err) => {
      return next(err);
    });
};

// poistetaan julkaisu
const delete_post = async (req,res) => {
    try {
        const postId = req.params.id;
        await Post.findByIdAndDelete(postId)
            .then(result => {
                res.redirect('/admin');
            })
    }
    catch(err) {
        console.log(err)
    };
};

// etsitään muokattava julkaisu
const edit_post = async (req,res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        res.render('edit-posts', { post });
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
    home,
    create_post,
    delete_post,
    edit_post,
    update_post
}