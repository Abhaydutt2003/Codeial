const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//auth using passport
passport.use(new LocalStrategy({username:'email'},function(email,password,done){

    //find a user and establish the identity
    User.findOne({email:email}).then(function(user){
        if(!user || user.password != password){
            console.log("Invalid Username/Password!");
            return done(null,false);
        }
        return done(null,user);
    }).catch(function(error){
        console.log("Error in finding the user --> Passport");
        return done(null,false);
    })

}))

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})


//de-serializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        return done(null,user);
    }).catch(function(error){
        console.log("Error in finding the user --> Passport Deser");
        return done(error);
    })
})
