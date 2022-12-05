const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');


//Authenthication using passport.js
passport.use(new LocalStrategy(
    {
        usernameField: 'email' // need to additn to code on passport.js local as we need to tell them email is used as usernmfld;
    },
    function (email, password, done) {
        //find user and establish identity
        // find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
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

module.exports = passport;