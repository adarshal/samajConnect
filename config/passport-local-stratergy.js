const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');


//Authenthication using passport.js
passport.use(new LocalStrategy(
    {
        usernameField: email // need to additn to code on passport.js local as we need to tell them email is used as usernmfld;
    },
    function (email, password, done) {
        //find user and establish identity
        User.findOne({ email: email }, function (err, user) {
            if (err) { console.log('error in finding email --->passport'); return done(err); }
            if (!user) { return done(null, false); }
            if (!email.verifyPassword(password)) { console.log('wrong password'); return done(null, false); }
            return done(null, email);
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