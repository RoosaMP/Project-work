const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Post = require('../models/post.js');



const home = (req,res) => {
    res.render('admin');
}

const create_post = function(req,res,next) {
    const post = new Post({
        title: req.body.title,
        context: req.body.context
    });

    post.save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = {
    home,
    create_post
}