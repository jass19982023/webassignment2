/* //Assignment: Assignment 2 Express Portfolio – Authentication 
// Laura Amangeldiyeva - student id: 301167661 
// Date: 2022/02/15 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our Contacts Model
let Contacts = require('../models/contacts');

module.exports.displayContactsList = (req, res, next) => {
    Contacts.find((err,contactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {

            res.render('contacts/list', {title: 'Business Contacts', ContactsList: contactsList, displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.displayUpdatePage= (req, res, next) => {
    let id = req.params.id;

    Contacts.findById(id, (err, contactToUpdate) =>{
        if(err)
            {
                console.log(err);
                res.end(err);
            }
        else
            {
                //show the edit view
                res.render('contacts/update', {title: 'Update Contact', contacts: contactToUpdate, displayName: req.user ? req.user.displayName : ''})
            }

    });
}

module.exports.processUpdatePage= (req, res, next) => {
    let id = req.params.id;

    let updateContacts = Contacts({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });
    Contacts.updateOne({_id: id}, updateContacts, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contacts list
            res.redirect('/contacts-list');
        }

    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contacts.remove({_id: id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/contacts-list');
        }

    });
}
