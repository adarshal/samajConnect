const mongoose = require('mongoose');

const FriendshipSchema = new mongoose.Schema({
    ///who sent friend request
    from_user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    to_user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
},
    {
        timestamps: true // to know when post was created when was updated
    }

);

const Friendship = mongoose.model('Friendship', FriendshipSchema);
module.exports = Friendship;