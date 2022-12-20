const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');


//Authenthication using passport.js
passport.use(new LocalStrategy(
    {
        usernameField: 'email', // need to additn to code on passport.js local as we need to tell them email is used as usernmfld;
        passReqToCallback: true // need to ccess req to set flash msg
    },
    function (req,email, password, done) {
        //find user and establish identity
        // find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                req.flash('error', err);
                return done(err);
            }

            if (!user || user.password != password) {
                req.flash('error', 'Invalid Username/password');
                return done(null, false);
            }

            return done(null, user);
        });

    }
));

// serializing the user to decide which key to be stored in cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserializing user from key in cookie
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) { console.log('error in finding id --->passport'); return done(err); }

        return done(null, user);  // null becasuse no err and user beacuse user is found
    });
});

// CHECK IF USER IS authenthicated
passport.checkAuthenthication =function(req,res,next){
//if user is signed in then pass on req to to next(controllers function)
 if(req.isAuthenticated() ) {
    return next();
 };

 // if user not signedin
 return res.redirect('/users/signin');
}

passport.setAuthenticatedUser=function(req, res, next){
 if(req.isAuthenticated()){
    // req.user contains current signed in user from session cookie and we are just sending it to locals for views
    res.locals.user=req.user
 }
 next();
}


module.exports = passport;