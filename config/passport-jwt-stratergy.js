const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User = require('../models/users');

let opts = {
 jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
 secretOrKey : 'codeial'
};

passport.use(new JWTStrategy(opts, function(jwtpayload, done) {
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
        User.findById(jwtpayload._id, function(err, user) {
        if (err) {
            console.log("err in find jwtstrat",err);
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;
