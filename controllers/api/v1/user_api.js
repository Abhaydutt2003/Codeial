const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = function(request,response){
    User.findOne({
        email:request.body.email
    }).then(function(user){
        if(!user || user.password != request.body.password){
            return response.status(422).json({
                message:"Invalid username or Password"
            })
        }else{
            return response.status(200).json({
                message:'Sign in successful,here is the token, keep it safe',
                data:{
                    token:jwt.sign(user.toJSON(),'Rick Astley',{expiresIn:'10000'})
                }
            })

        }
    }).catch(function(error){
        console.log('******',error);
        return response.status(500).json({
            message:'Internal Server Error'
        });
    })
}