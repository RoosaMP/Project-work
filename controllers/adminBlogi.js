const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const Joi = require('joi');

const app = express();

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
 mongoose.connect(dbURI);
const Post = require('../models/post.js');

//Postauksen lisäämiseen validaatio
// const postSchema = Joi.object({
//     title: Joi.string().required(),
//     context:Joi.string().required()
// });


// admin home sivun näkymä
const home = async (req,res) => {
        const posts = await Post.find({}); // haetaan kaikki julkaisut Post tietokannasta
        res.render('adminblogi', {
            pagetitle: "Admin-sivu",
            posts
        });
}

// lisätään uusi julkaisu
const create_post = (req,res,next) => {
    const post =  new Post({
        title: req.body.title,
        context: req.body.context,
        post_date: new Date()
    });
    // Lisätään kuva jos tiedosto on syötetty
    if (req.file) {
        post.img = {
            data: fs.readFileSync(path.join(__dirname,'../public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        };
    }

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

module.exports = {
    home,
    create_post,
    delete_post
}