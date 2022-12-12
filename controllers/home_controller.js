const Post = require('../models/post');

module.exports.home=function(req,res){
    // res.end('<h1>Express up for codeial from controller ');

            // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })

    //old
//    return res.render('home',{
//         title : 'Home'
//     })
}