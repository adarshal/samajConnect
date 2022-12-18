
{
    //Method to send form data using Ajax of Post
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
                    let newAjaxPost = addPost(data.data.post, data.data.accountHolder); // as wecan see in console data(complete hash) has data field in which post data is there
                        console.log(newAjaxPost);
                    
                    $('#posts-list-container>ul').prepend(newAjaxPost);
                    $('#post-add-text').val('');
                    deletePost($(' .delete-post-button', newAjaxPost)); //del-post -button class inside newAjxPost also space before class name.to call delpost with link
                    // req.flash('success', 'Post created')
                    // notyfun('success', 'Post created');
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            });
        })
    }

    // Method to create post in DOM

    let addPost = function (post, accountHolder) {
        console.log(post, accountHolder);
        
        return $(`<li id="post-${post._id}">
        <p>
            
            <small>
                <a class="delete-post-button"  href="/posts/destroy/${post._id}">X</a>
            </small>
           
            ${post.content}
            <br>
            <small>
            ${accountHolder}
            </small>
        </p>
        <div class="post-comments">
            
                <form action="/comments/create" method="POST" id="new-comment-form">
                    <input type="text" name="content" placeholder="Type Here to add comment..." id="comment-add-text" required>
                    <input type="hidden" name="post" value="${post._id}" >
                    <input type="submit" value="Add Comment">
                </form>
   
    
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
                </ul>
            </div>
        </div>
        
    </li>`)
    }


    // Method to delete post in DOM

    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }

    createPost();
}