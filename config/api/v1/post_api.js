const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.destroy = async(request,response)=>{
    try{
        let post = await Post.findById(request.params.id);

        Post.deleteOne(post).then(function(){
            console.log('DELETE THE POST');
        }).catch(function(){
            console.log('Life is hard');
        })

        await Comment.deleteMany({post:request.params.id});
        return response.status(200).json({
            message:'Post Deleted Success'
        })
    }catch(error){
        console.log(error);
        return response.status(500).json({
            message:error
        });
    }
}

module.exports.index = async (request, response) => {

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });




    return response.status(200).json({
        message: 'List of posts',
        posts: posts
    })
}

