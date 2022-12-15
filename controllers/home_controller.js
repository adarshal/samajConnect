const Post = require('../models/post');
const User = require('../models/users');

module.exports.home = async function (req, res) {

    try {
        // populate the user of each post
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            user_list: users
        });

    } catch (err) {
        console.log('error in showing home page', err)
    }


    // populate the user of each post using exec old 1.1 Now use=ing asyc await
    // Post.find({}).populate('user')
    //     .populate(
    //         {
    //             path: 'comments',
    //             populate: {
    //                 path: 'user'
    //             }
    //         }
    //     )

    //     .exec(function (err, posts) {
    //         User.find({}, function (err, users) {
    //             return res.render('home', {
    //                 title: "Codeial | Home",
    //                 posts: posts,
    //                 user_list:users
    //             });
    //         });
    //     });

    //old
    //    return res.render('home',{
    //         title : 'Home'
    //     })
}