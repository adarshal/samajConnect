module.exports.home=function(req,res){
    // res.end('<h1>Express up for codeial from controller ');

   return res.render('home',{
        title : 'Home'
    })
}