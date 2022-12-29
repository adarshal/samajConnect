const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
        user :{
        type: mongoose.SchemaTypes.ObjectId
        },
        //this defines objectid of liked post
        likeable: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        refpath: 'onModel' //as we currntly dont know like is where on comment or post
        },
        //this field is used for defining type of liked object since this is dynamic ref
        onModel: {
            type: String,
            required: true,
            enum: ['Post', 'Comment'] // it can vbe post or comment. if enum not defined we can use like anywgere as we only want like to e used by post or comment we added enum 
                }
} ,
{
    timestamps: true // to know when like was created when was updated
  }
);

const Like=mongoose.model('Like',LikeSchema);
module.exports =Like;