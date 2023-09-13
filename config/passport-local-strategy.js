const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const { request } = require('express');


//auth using passport
passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, function (request,email, password, done) {

    //find a user and establish the identity
    User.findOne({ email: email }).then(function (user) {
        if (!user || user.password != password) {
            request.flash('error','Invalid Username/Password!');
            return done(null, false);
        }
        return done(null, user);
    }).catch(function (error) {
        request.flash('error',error);
        return done(null, false);
    })

}))

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
})


//de-serializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        return done(null, user);
    }).catch(function (error) {
        console.log("Error in finding the user --> Passport Deser");
        return done(error);
    })
})



//check if the user is authenticated
passport.checkAuth = function (request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    return response.redirect('/users/sign-in');
}

passport.setAuthUser = function (request, response, next) {
    if (request.isAuthenticated()) {
        response.locals.user = request.user;
    }
    next();
}

//is the user signed in?
passport.checkSignedIn = function (request, response, next) {
    if (request.isAuthenticated()) {
        return response.redirect('/users/profile');
    }
    next();
}

module.exports = passport;
