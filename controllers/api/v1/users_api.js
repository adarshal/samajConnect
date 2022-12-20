const User = require('../../../models/users');
const jwt =require('jsonwebtoken');


module.exports.loginCreateSession = async function (req, res) {
    try {
        let user =await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){ // if user not found or pwd incorrect
            return res.json(422,{
                message:"Invalid username or password"
            });
        }
        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '1000000'}) // codeial is secret key
            }
        })

    } catch (error) {
        console.log('error in cret session jwt',err);
        return res.json(500,{
            message:"Internal server error"
        });
    }
    req.flash('success', 'login successfull')
    return res.redirect('/');
}