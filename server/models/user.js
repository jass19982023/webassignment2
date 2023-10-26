/* //Assignment: Assignment 2 Express Portfolio – Authentication 
// Laura Amangeldiyeva - student id: 301167661 
// Date: 2022/02/15 */

//require modules for the model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            required: "You need to add username"
        },

       email:
       {
           type: String,
           default: "",
            trim: true,
            required: "You need to add email adress"

       },
       displayName:
       {
           type: String,
           default: "",
            trim: true,
            required: "You need to add name"

       },
       created:
       {
           type: Date,
           default: Date.now,

       },
       update:
       {
           type: Date,
           default: Date.now,

       }


    },

    {
        collection: "users"

    }
);

//different options for users 

let options = ({missingPasswordError: 'Oops! Something is wrong with your password.'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);
