const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();

const post = require('../models/post.js');

const home = (req,res) => {
    res.render('admin');
}

/*exports.addPost = (req,res) => {
    const myPost = new post(req.body);
    myPost.save()
        .then(item => {
            res.send("Post saved to database");
        })
        .catch(err => {
            res.status(400).send("error");
        });
};*/

module.exports = {
    home,
};