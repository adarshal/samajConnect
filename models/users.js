const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },
    avatar:{
      type:String
    }
  },{
    timestamps: true // to know when user was created when was updated
  });

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });


// static '/ methods make available publcially to use in other
UserSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar'); // single as only 1 file need tobe uploaded
UserSchema.statics.avatarPath = AVATAR_PATH;

  const User=mongoose.model('User',UserSchema);
//This is coolection, collection contain docs,docs contains fields like name,date. collectn name start capital
module.exports =User;