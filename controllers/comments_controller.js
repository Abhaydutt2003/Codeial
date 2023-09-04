const comment = require('../models/comment');
const post = require('../models/post');

module.exports.create = function (request, response) {
    post.findById(request.body.post).then(function (post) {
        comment.create({
            content: request.body.content,
            post: request.body.post,
            user: request.user._id
        }).then(function (comment) {
            post.comments.push(comment);
            post.save();
            response.redirect('/');
        }).catch(function (error) {
            console.log(error);
            return;
        })
    }).catch(function (error) {
        console.log(error);
        return;
    })
}