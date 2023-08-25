module.exports.profile = function(request,response){
    //return response.end('<h1>some user profile</h1>');
    
    response.render('user_profile',{
        title:'profile page'
    });
}