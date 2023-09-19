const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (request, response) {
    Post.create({
        content: request.body.content,
        user: request.user._id
    }).then(function (Post) {
        if(request.xhr){
            return response.status(200).json({
                data:{
                    post:Post
                },
                message:"Post created!"
            })
        }
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
        if (post.user == request.user.id) {
            // post.remove();
            Post.deleteOne(post).then(function(){
                console.log("Deleted the post");
            }).catch(function(){
                console.log("Error in deleting the post");
                return response.redirect('back');
            }); 


            Comment.deleteMany({ post: request.params.id }).then().catch(function (error) {
                console.log(error);
            })
            if(request.xhr){
                return response.status(200).json({
                    data:{
                        post_id:request.params.id
                    },
                    message:'AJAX post deletion'
                })
            }
            return response.redirect("back");
        }
    }).catch(function (error) {
        console.log(error);
        return response.redirect('back');
    })
}