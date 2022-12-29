{
    // Method to create comment in DOM

    //Method to send form data using Ajax of Post
    let createComment = function () {
        let newForm = $('#new-comment-form');
        newForm.submit(function (e) {
            e.preventDefault();

            let actionUrl = newForm.attr('action');

            $.ajax({
                type: "POST",
                url: actionUrl,
                data: newForm.serialize(), // serializes the form's elements.
                success: function (data) {
                    // console.log(data); // show response 
                    let newAjaxComment = addComment(data.data.comment, data.data.accountHolder);
                    console.log(newAjaxComment);
                    $('#post-comments-list>ul').append(newAjaxComment);
                    $('#comment-add-text').val('');
                    deletePost($(' .delete-comment-button', newAjaxComment));
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            });
        })
    }

    // Method to create comment in DOM
    let addComment = function (comment, accountHolder) {
        console.log(comment, accountHolder);
        return $(`<li id="comment-${comment._id}">
                <p>
                    ${comment.content}
                        <br>
                        <small>
                        ${accountHolder}
                        </small>
                        
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                    0 Likes
                                </a>
                            
                            </small>

            </small>
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment.id}">X Delete comment</a>
                            </small>
                </p>
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
                    $(`#comment-${data.data.comment_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }

    createComment();
}