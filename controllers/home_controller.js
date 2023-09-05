const Post = require('../models/post');

module.exports.home = function (request, response) {
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec().then(function (posts) {
            return response.render('home', {
                title: "Codeial | Home",
                posts: posts
            })
        }).catch(function (error) {
            console.log("Error in finding the user || home.controller");
            return;
        })
}