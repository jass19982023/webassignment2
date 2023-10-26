/* //Assignment: Assignment 2 Express Portfolio – Authentication 
// Laura Amangeldiyeva - student id: 301167661 
// Date: 2022/02/15 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactsController = require('../controllers/contacts');

//help with guarding 
function requireAuth(req, res, next)
{
    //to check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//Read Operation 
router.get('/', requireAuth, contactsController.displayContactsList);

//UPDATE Operation 
router.get('/update/:id', requireAuth, contactsController.displayUpdatePage);

//UPDATE Operation 
router.post('/update/:id', requireAuth, contactsController.processUpdatePage);
//DELETE Operation 
router.get('/delete/:id', requireAuth, contactsController.performDelete);

module.exports = router;