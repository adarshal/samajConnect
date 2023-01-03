const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');


const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;


// connect to db
const db=require('./config/mongoose');

// used for session cookie
const session= require('express-session');
const passport = require('passport');
const passportLocal= require('./config/passport-local-stratergy');
const passportJWT= require('./config/passport-jwt-stratergy');
const passportGoogle= require('./config/passport-google-OAuth-stratergy');
const MongoStore=require('connect-mongo')(session); //new mongostore dont require input session so downgraded from version 4 to 3
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware= require('./config/middleware');

const path=require('path');



//socket.io 
// const http = require('http');
// const chatServer = http.createServer(app);
// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


//using layouts !! it should be before routes
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);

// extract style and scripts from sub pages into the layout //it puts style inside head and script at end where <%- style or script tag is used
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

console.log('Here............',process.env.CODEIAL_ASSETS_PATH)
// static files access 
// app.use(express.static('assets')); //removed insted using path from env file
app.use(express.static(env.asset_path));
// make the uploads path available for browser
app.use('/uploads',express.static(__dirname+'/uploads'));


console.log(env.morgan.mode,env.morgan.options)
app.use(logger(env.morgan.mode, env.morgan.options));

// app.use(sassMiddleware({
//     src: path.join(__dirname,env.asset_path,'scss'),
//      dest: path.join(__dirname,env.asset_path,'css'),
//      debug: true, // we want to show error on terminal /for prod turn this off
//      outputStyle: 'extended', //want sigle lines seperated
//      prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
 
// }))

app.use(express.urlencoded());  // need for parsing it is middleware
app.use(cookieParser()); 


//ejs set up view engine 
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store is used store cookie in db
app.use(session(
    {
    name: 'codeial',
    //TODO change secret before deploy in prod
    secret: env.session_cookie_key,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: (1000 * 60 * 100) // it stores in ms this is 1000 min.
     },
     store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session()); // paspport also have session function
app.use(passport.setAuthenticatedUser) // checks whether session cookies present
app.use(flash()); //flash should be after session creation
app.use(customMware.setFlash); 


//uses router this router need to be used after passport so rotes can use paaport
app.use('/', require('./routes')); // /router.index.js can also used bu ir directly fect index so used it


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in starting server : ${err}`);
    }
    console.log(`Server started and running on ${port}`);
})