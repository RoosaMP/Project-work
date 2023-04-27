const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Post = require('../models/post.js');



const home = async (req,res) => {
    try {
        const posts = await Post.find({});
        res.render('admin', { posts });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

const create_post = (req,res,next) => {

    const post = new Post({
        title: req.body.title,
        context: req.body.context
    });

    post.save()
    .then(() => {
      res.redirect('/admin');
    })
    .catch((err) => {
      return next(err);
    });
};

const delete_post = async (req,res) => {
    try {
        const postId = req.params.id;
        console.log(postId)
        await Post.findByIdAndDelete(postId)
            .then(post => {
                res.redirect('/admin');
            })
    }
    catch(err) {
        console.log(err)
    };
};

module.exports = {
    home,
    create_post,
    delete_post
}