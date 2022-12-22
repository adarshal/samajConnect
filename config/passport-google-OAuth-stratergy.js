const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User = require('../models/users');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:'147970174162-l5deg81ijm67nbn3o8svdjjqgo6daeql.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
//callback fun
function(accessToken, refreshToken,profile,done){ // refreshToken  special kind of token that can be used to obtain a renewed access token
      // find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('Error in aoauth strtegy', err);
            return;
        }
        console.log(profile);
        if(user){
             // if found, set this user as req.user
                return done(null,user);
        }else{//not found need to signup user
            User.create({
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'), //we need to crete pwd for new user
                accountHolder: profile.displayName
                },function (err, user) {
                    if (err) { console.log('error in creating user google strategy-passport', err); return; }
                    return done(null,user);
                }
            )
        }
    }); // google sends array of email
}

) )

module.exports = passport;
