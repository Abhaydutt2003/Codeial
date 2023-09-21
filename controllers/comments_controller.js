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
            if(request.xhr){
                console.log('Hello from comments');
                return response.status(200).json({
                    data:{
                        comm:comment,
                        postId:request.body.post
                    },
                    message:"Comment Created"
                })
            }
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

module.exports.destroyComment = function (request, response) {
    comment.findById(request.params.id)
        .then(function (comm) {
            if (comm.user == request.user.id) {
                //delete the comment from all places
                post.findByIdAndUpdate(comm.post, { $pull: { comments: request.params.id } }).then()
                    .catch(function (error) {
                        console.log(error);
                    })
                comment.deleteOne(comm).then(function () {
                    console.log("deleted comment");
                }).catch(function () {
                    console.log("error in deleting comment");
                    return response.redirect('back');
                });
                return response.redirect('back');
            } else {
                console.log("HelloWo");
                return response.redirect('back');
            }
        }).catch(function (error) {
            console.log("Here error 1");
            console.log(error);
            return response.redirect('back');
        })
}