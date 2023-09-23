const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function (request, response) {
    User.findById(request.params.id).then(function (u) {
        return response.render('user_profile', {
            title: 'Profile Page',
            profile_user: u
        })
    })
        .catch(function () {

        })
}

module.exports.update = function (request, response) {
    if (request.user.id == request.params.id) {
        User.findById(request.params.id).then(function(user){
            User.uploadedAvatar(request,response,function(error){
                if(error){
                    console.log('*******-Multer Error-********',error);
                }
                console.log(request.file);
                user.name = request.body.name;
                user.email = request.body.email;
                if(request.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar = User.avatarPath+'/'+request.file.filename;
                }
                user.save();
                return response.redirect('back');
            })
        }).catch(function(error){
            console.log(error);
            return response.redirect('back');
        })
    } else {
        return response.status(401).send('Unauthorized');
    }
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
    request.flash('success','logged in succeessfully');
    return response.redirect('/');
}

//sign out the user
module.exports.destroySession = function (request, response, next) {
    request.logout(function (error) {
        if (error) {
            return next(error);
        }
        request.flash('success','logged out succeessfully');
        return response.redirect('/users/sign-in');
    });
}