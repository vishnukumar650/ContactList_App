
//importing the mongoose library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_lists_db');

//get the connection (to check if it is successful)
const db = mongoose.connection;

//displaying an error message on failing to connect to the db
db.on('error',console.error.bind(console,'error connecting to db'));

//if it is up and running, then print the message
db.once('open',function(){
    console.log('Successfully connected to the database');
});