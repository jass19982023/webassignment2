/* //Assignment: Assignment 2 Express Portfolio – Authentication 
// Laura Amangeldiyeva - student id: 301167661 
// Date: 2022/02/15 */
var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');
//all about home page 
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

router.get('/about', indexController.displayAboutPage);
//all about services page 
router.get('/projects', indexController.displayProjectsPage);

router.get('/services', indexController.displayServicesPage);

//all about contact me page 
router.get('/contact', indexController.displayContactPage);

//all about login page 
router.get('/login', indexController.displayLoginPage);

router.post('/login', indexController.processLoginPage);

//all about logout 
router.get('/logout', indexController.performLogout);



module.exports = router;
