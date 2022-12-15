const Post = require('../models/post');
const User = require('../models/users');

module.exports.home = function (req, res) {
    // res.end('<h1>Express up for codeial from controller ');

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    Post.find({}).populate('user')
        .populate(
            {
                path: 'comments',
                populate: {
                    path: 'user'
                }
            }
        )

        .exec(function (err, posts) {
            User.find({}, function (err, users) {
                return res.render('home', {
                    title: "Codeial | Home",
                    posts: posts,
                    user_list:users
                });
            });
        });

    //old
    //    return res.render('home',{
    //         title : 'Home'
    //     })
}