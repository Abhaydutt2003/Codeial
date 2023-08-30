const User = require('../models/user');

module.exports.profile = function(request,response){
    if(request.cookies.user_id){
        User.findById(request.cookies.user_id).then(function(user){
            return response.render('user_profile',{
                title:"User profile",
                user:user
            });
        }).catch(function(){
            return response.redirect('/user/sign-in');
        })
    }else{
        response.redirect('/users/sign-in')
    }
}


module.exports.signUp = function(request,response){
    return response.render('user_sign_up',{
        title:"Codeial | SIGN UP",
    })
}

module.exports.signIn = function(request,response){
    return response.render('user_sign_in',{
        title:"Codeial | SIGN IN",
    })
}

//get the sign up data
module.exports.create = function(request,response){
    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }

    User.findOne({email:request.body.email}).then(function(user){

        if(!user){
            User.create(request.body).then(function(result){
                console.log(result);
                return response.redirect('/users/sign-in');
            }).catch(function(error){
                console.log("Error in creating the User");
                return;
            })
        }else{
            return response.redirect('back');
        }

    }).catch(function(error){
        console.log("Error in finding the user");

    })
}

//sign in and create the user session
module.exports.createSession = function(request,response){
    User.findOne({email:request.body.email}).then(function(user){
        
        if(user){
            if(user.password != request.body.password){
                return response.redirect('back');
            }else{
                response.cookie('user_id',user.id);
                return response.redirect('/users/profile');
            }
        }else{
            return response.redirect('back');
        }



    }).catch(function(error){
        console.log("Error in signing in the user");
    })    
}

//signing out the user
// module.exports.signOut = function(request,response){
//     if(request.cookies.user_id){
//         let removing = response.cookies.remove({
//             name:"user_id"
//         });
//     }else{
//         return response.redirect('users/sign-in');
//     }
// }