const nodemailer = require("nodemailer");
const ejs=require('ejs');
const path=require('path');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'samajConnect@gmail.com', // generated ethereal user
      pass: 'fypjitnptpckxude', // generated ethereal password
    },
  });


  // we want html file temp to send
  let renderTemplate=(data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('Error in rendering mail template',err); return;};
            mailHTML=template
        }
    );
    return mailHTML;
  }

  module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
  }