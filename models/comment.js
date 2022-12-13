const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    // comment belongs to user
    user :{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
            },
    post :{
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Post'
                    }
  },{
    timestamps: true 
  }
  
  );

  const Comment=mongoose.model('Comment',CommentSchema);
//This is coolection, collection contain docs,docs contains fields like name,date. collectn name start capital
module.exports =Comment;