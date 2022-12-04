module.exports.signup=function(req,res){
    // res.end('<h1>Express up for codeial from controller ');

   return res.render('signup',{
        title : 'Sign Up to codeial'
    })
}