{
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
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(` .delete-post-button`, newPost));
                }, error: function (error) {
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
            ${post.user.name} 
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
    let deletePost = function(deleteLink){
        console.log('My life is ruined');
        $(deleteLink).click(function(event){
            event.preventDefault();
            console.log('My day is ruined');
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log('And my diss is umes');
                    $(`#post-${data.data.post_id}`).remove();
                },error:function(error){
                    console.log(error,responseText);
                }
            })
        })
    }






    createPost();
}