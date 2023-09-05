const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (request, response) {
    Post.create({
        content: request.body.content,
        user: request.user._id
    }).then(function (Post) {
        return response.redirect('back');
    }).catch(function (error) {
        console.log("Error in creating the post ");
        return;
    })
}

//deleting a post
module.exports.destroy = function (request, response) {
    Post.findById(request.params.id).then(function (post) {
        //.id means converting the object id into String
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: request.params.id }).then().catch(function (error) {
                console.log(error);
                return response.redirect('back');
            })
        }
    }).catch(function (error) {
        console.log(error);
        return response.redirect('back');
    })
}