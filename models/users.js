const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
            },
     accountHolder:{
        type:String,
        required: true
    }
  },{
    timestamps: true // to know when user was created when was updated
  }
  
  );

  const User=mongoose.model('User',UserSchema);
//This is coolection, collection contain docs,docs contains fields like name,date. collectn name start capital
module.exports =User;