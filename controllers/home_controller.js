module.exports.home = function(request,response){
    //return response.end('<h1>Express is up for codeial</h1>');

    return response.render('home',{
        title:'home'
    });
}