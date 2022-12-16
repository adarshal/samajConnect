
{
    //Method to send form data using Ajax
    let createPost = function () {
        let newForm = $('#new-post-form');
        newForm.submit(function (e) {
            e.preventDefault();

            let actionUrl = newForm.attr('action');

            $.ajax({
                type: "POST",
                url: actionUrl,
                data: newForm.serialize(), // serializes the form's elements.
                success: function (data) {
                    // console.log(data); // show response 
                    let newAjaxPost=addPost(data.data.post); // as wecan see in console data(complete hash) has data field in which post data is there
                    $('#posts-list-container>ul').prepend(newAjaxPost);
                    $('#post-add-text').val('');
                    deletePost($(' .delete-post-button', newAjaxPost)); //del-post -button class inside newAjxPost also space before class name.to call delpost with link
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            });
        })
    }

    // Method to create post in DOM

    let addPost = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
            
            <small>
                <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
            </small>
           
            ${ post.content }
            <br>
            <small>
            ${ post.user.name }
            </small>
        </p>
        <div class="post-comments">
            
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${ post._id }" >
                    <input type="submit" value="Add Comment">
                </form>
   
    
            <div class="post-comments-list">
                <ul id="post-comments-${ post._id }">
                    
                </ul>
            </div>
        </div>
        
    </li>`)
}


    // Method to delete post in DOM

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            console.log('inside aj del');
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log("inside aha")
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    createPost();


}