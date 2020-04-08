
//importing the required libraries and assigning a port number to a constant variable 
const express = require('express');
const path = require('path');
const port = 3000;

//importing mongoose and contact model
const db = require('./config/mongoose');  
const Contact = require('./models/contact');

//assigning express to a constant variable named app
const app = express();

/*setting the view engine as ejs - and telling where to look for views - (__dirname refers to the current directory)  
urlencoded is used since url's can't take spaces, so they need to be encoded,  Eg: "Vishnu Kumar"  ----> Vishnu%20Kumar
Reference for url encoding - https://www.degraeve.com/reference/urlencoding.php

setting the app to look or search at the assets folder for any static file.

*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


//json Array
var contactList = [
    {
        name: "Vishnu",
        phone: "9908971155"
    },
    {
        name: "Virat Kohli",
        phone: "9456545678"
    },
    {
        name: "Ravindra Jadeja",
        phone: "9345357654"
    }
]

//default, home or initial route
app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })
  
})

//this route gets executed when you click on Add button
app.post('/create-contact', function(req, res){
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })
  

});

//app always listens on this port number, assigned to the port variable at the top 
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


//route to delete a contact, gets executed when you get 

app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');  //rediretcs back to the previous page
    })
   
});
