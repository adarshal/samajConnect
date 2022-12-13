const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user :{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
            },
    // include the array of ids of all comments in this post schema itself
  comments: [
    {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
] } ,
  {
    timestamps: true // to know when post was created when was updated
  }
  
  );

  const Post=mongoose.model('Post',PostSchema);
module.exports =Post;