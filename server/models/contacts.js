/* //Assignment: Assignment 2 Express Portfolio – Authentication 
// Laura Amangeldiyeva - student id: 301167661 
// Date: 2022/02/15 */
let mongoose = require ('mongoose');

//creating model class
let contactsModel = mongoose.Schema({
name: String,
number: String,
email: String

},
{

    collection: "contacts"

});

module.exports = mongoose.model('Contacts', contactsModel);