const mongoose= require('mongoose');
const env=require('./environment')

// connect to the database
main().catch(err => console.log(err)); //from documentation geting started
async function main() {
  // await mongoose.connect('mongodb://localhost/codeial_dev_db'); //removed for using env
  await mongoose.connect(`mongodb://localhost/${env.db}`); //used backtick instead of quotes
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

mongoose.connect(`mongodb://localhost/${env.db}`).catch(function (reason) {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});
module.exports=db;