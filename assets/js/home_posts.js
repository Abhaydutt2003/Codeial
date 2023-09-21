{
    //TODO  ajax to already present posts

    //method to submit form data for new post using ajax
    let createPost = function () {
        let newPostForm = $('#post-form');
        newPostForm.submit(function (event) {
            event.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDOM(data.data.post);
                    new Noty({
                        theme:'relax',
                        text:data.flashMessage,
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                    $('#post-list-container>ul').prepend(newPost);
                    //deletePost($(` .delete-post-button`, newPost));
                    deletePost($(` .delete-post-button`));
                }, error: function (error) {
                    new Noty({
                        theme:'relax',
                        text:"Error in creating post!!",
                        type:'error',
                        layout:'topRight',
                        timeout:1500
                    }).show();
                    console.log(error.responseText);
                }
            })

        });
    }

    //method to create an object in dom
    let newPostDOM = function (post) {
        return $(`<li id = "post-${post._id}">
        <p>
                <small>
                    <a  class = "delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                </small>
            ${post.content}
            <br>
            <small>
            ${post.userName} 
            </small>
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comment..."
                        required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
    
                    <div class="post-comments-list">
                        <ul id="post-comment-${post._id}">

                        </ul>
                    </div>
    </li>`)
    }

    //method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    //TODO add noty
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error, responseText);
                }
            })
        })
    }

    //method to submit new comment data using ajax
    let createComment = function(){
        let newCommentForm = $('#comment-form');
        newCommentForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newCommentForm.serialize(),
                success:function(data){
                    let newComment = newCommentDOM(data.data.comm);
                    let postId = data.data.postId;
                    $(`#post-comment-${postId}`).prepend(newComment);
                },error: function (error){
                    console.log(error.responseText);
                }
            })
        })
    }

    //method to create a comment on dom
    let newCommentDOM = function(comment){
        return $(`<small>
        <a href="/comments/destroy/${comment._id}">Delete Comm</a>
        </small>
        <p>
        ${comment.content}
        <br>
        <small>
        ${comment.userName}
        </small>
        </p>`)
    }

    createPost();
    createComment();
}