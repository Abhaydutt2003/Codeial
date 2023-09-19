const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (request, response) {
    Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec().then(function (posts) {
            User.find({})
                .then(function (users) {
                    return response.render('home', {
                        title: "Codeial | Home",
                        posts: posts,
                        all_users: users
                    })
                })
                .catch(function (error) {
                    console.log('error');
                    return;
                })
        }).catch(function (error) {
            console.log("Error in finding the user || home.controller", error);
            return;
        })
}