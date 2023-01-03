const fs=require('fs');
const path=require('path');
const rfs = require('rotating-file-stream');

const logDirectory=path.join(__dirname,'../production_logs'); //here where we store logs
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)  //seefist file exitsor not ,if not cretae

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});


const development={
    name: 'development',
    asset_path: '/assets' ,// /assets not ./
    session_cookie_key:'keyboard cat',
    db:'codeial_dev_db' ,//to use inmoongose db addres
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'samajConnect@gmail.com', // generated ethereal user
          pass: 'fypjitnptpckxude', // generated ethereal password
        },
      },
    google_client_ID:'147970174162-l5deg81ijm67nbn3o8svdjjqgo6daeql.apps.googleusercontent.com',
    google_client_Secret:'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',
    google_callbackURL: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options: {stream:accessLogStream}
    }
}

const production={
    name: 'production',
    asset_path: process.env.CODEIAL_ASSETS_PATH ,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB ,
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.CODEIAL_SMTP_USER, 
          pass: process.env.CODEIAL_SMTP_PASSWORD, 
        },
      },
    google_client_ID:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CODEIAL_GOOGLLE_CALLBACKURL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options: {stream:accessLogStream}
    }
}

module.exports= development; //changed to below code ,change to dev>prod or revrse from process env
// module.exports=eval(process.env.CODEIAL_ENVIRORNMENT)==undefined ? development:eval(process.env.CODEIAL_ENVIRORNMENT);
// to run it in production mode change something in packeg.json
 // in env.js file you can use NODE_ENV(as used in packg.json) insted of process.env.CODEIAL_ENVIRORNMENT both works