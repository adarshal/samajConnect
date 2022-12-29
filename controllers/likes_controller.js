const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');




module.exports.toggleLike = async function(req, res){
    try{

        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;


        if (req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }


        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if a like already exists then delete it
        if (existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;

        }else{
            // else make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.json(200, {
            message: "Request successful!",
            data: {
                deleted: deleted
            }
        })


    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}





module.exports.toggleLikemine = async function (req, res) {
    try {

        // likes/toggle/?id=abcd/&type=post
        let likeable;
        let deleted=false;
        if(req.query.type== 'Post'){
            likeable= await Post.findById(req.query.id).populate('likes');
        }else{
            likeable= await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exits
        let exitstingLike= await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });
        
        //if like already present delete it
        if(exitstingLike){
            likeable.likes.pull(exitstingLike._id);  //delete likeable gives post/comment which is alredy populate with likes so we remove current lik
            likeable.save();
            exitstingLike.remove();
            deleted=true;
        }else{ // create it
            let newLike= Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            
            // now as new like creted we need to push it to comment/post , for this we already created likeable varible which we can use
            likeable.likes.push(newLike._id); // i think we also can use newLike also
            likeable.save();
            console.log('ger in like toggle');
        }

        return res.status(200).json({
            data:{
                deleted: deleted
            },
            message: 'Like toggled',
            });


    } catch (error) {
        req.flash('error', "error in Like");
        console.log('error in like toggle',error);
        return res.json(500,{
            message:"Internal server error"
        });
    }
}
