const User = require('../models/user');

module.exports.profile = function (request, response) {
    // //return response.end('<h1>some user profile</h1>');

    // response.render('user_profile', {
    //     title: 'profile page'
    // });
    User.findById(request.params.id).then(function(u){
        return response.render('user_profile',{
            title:'Profile Page',
            profile_user:u
        })
    })
    .catch(function(){

    })
}


module.exports.signUp = function (request, response) {
    return response.render('user_sign_up', {
        title: "Codeial | SIGN UP",
    })
}

module.exports.signIn = function (request, response) {
    return response.render('user_sign_in', {
        title: "Codeial | SIGN IN",
    })
}

//get the sign up data
module.exports.create = function (request, response) {
    if (request.body.password != request.body.confirm_password) {
        return response.redirect('back');
    }

    User.findOne({ email: request.body.email }).then(function (user) {

        if (!user) {
            User.create(request.body).then(function (result) {
                console.log(result);
                return response.redirect('/users/sign-in');
            }).catch(function (error) {
                console.log("Error in creating the User");
                return;
            })
        } else {
            return response.redirect('back');
        }

    }).catch(function (error) {
        console.log("Error in finding the user");

    })
}

//sign in and create the user session
module.exports.createSession = function (request, response) {
    return response.redirect('/');
}

//sign out the user
module.exports.destroySession = function (request, response, next) {
    request.logout(function (error) {
        if (error) {
            return next(error);
        }
        return response.redirect('/users/sign-in');
    });
}