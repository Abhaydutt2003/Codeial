const express = require('express');
const router = express.Router();

const Post = require('../models/post');

module.exports.create = function(request,response){
    Post.create({
        content:request.body.content,
        user:request.user._id
    }).then(function(Post){
        return response.redirect('back');
    }).catch(function(error){
        console.log("Error in creating the post ");
        return;
    })
}