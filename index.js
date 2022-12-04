const express = require('express');
const app = express();
const port = 8000;

const cookieParser=require('cookie-parser');

// connect to db
const db=require('./config/mongoose');

//using layouts !! it should be before routes
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);

// extract style and scripts from sub pages into the layout //it puts style inside head and script at end where <%- style or script tag is used
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// static files access 
app.use(express.static('assets'));

app.use(express.urlencoded());  // need for parsing it is middleware
app.use(cookieParser()); 

//uses router
app.use('/', require('./routes')); // /router.index.js can also used bu ir directly fect index so used it

//ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in starting server : ${err}`);
    }
    console.log(`Server started and running on ${port}`);
})