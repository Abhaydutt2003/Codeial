const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Rick Astley'
}


passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {

    User.findById(jwtPayLoad._id).then(function (user) {
        if (user) {
            return done(null, true);
        } else {
            return done(null, true);
        }
    }).catch(function (error) {
        console.log("%%%%%passport jwt error", error);
        return;
    })

}));

module.exports = passport;