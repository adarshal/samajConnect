const nodemailer= require('../config/nodemailer');
//  this is another way of exporting a method
exports.newComment = (comment) => { //this fun takes comment as input
        //console.log('inside newComment mailer',comment);
        let htmlString= nodemailer.renderTemplate(comment, '/comments/new_comment.ejs')
        nodemailer.transporter.sendMail({ // check doc copied from there
            from: 'samajConnect@gmail.com', // sender address
            to: comment.user.email, // list of receivers
            subject: "New comment published ✔", // Subject line
            text: "Hello world?", // plain text body
            html: htmlString, // html body
          }, function(err,info){
            if(err){console.log('Error in sending mail/newComment',err); return}
            //console.log('Mail sent for new comment',info);
            return;
          });
}