const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function (req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user.accountHolder')
        .populate({
            path: 'comments',
            populate: {
                path: 'user.accountHolder'
            }
        });
    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
      
        // if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            // if (req.xhr) {
            //     req.flash('success', 'Post deleted');

            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted"
            //     });
            // }
            return res.json(200,{
                message:"Post and releated comments deleted"
            });

            // req.flash('success', 'Post deleted');
            // return res.redirect('back');


        // } else {
            // req.flash('error', 'You cant delete this post ');
            // return res.redirect('back');
        // }
    } catch (err) {
        // req.flash('error', 'Error in deleting post ');
        // return res.redirect('back');
        return res.json(500,{
            message:"Internal server error"
        });
    }


}