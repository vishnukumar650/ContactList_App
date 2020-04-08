const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String, //data type
        required: true  //marking the field as mandatory
    },
    phone: {
        type: String,
        required: true
    }
});

//modeling the Contact to ContactSchema
const Contact = mongoose.model('Contact',contactSchema);

//exporting the Conact
module.exports = Contact;
