/* //Assignment: Assignment 2 Express Portfolio – Authentication 
// Laura Amangeldiyeva - student id: 301167661 
// Date: 2022/02/15 */
var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require("passport");

//to create the user model instance
let userModel = require('../models/user');
let User = userModel.User; 

module.exports.displayHomePage = (req, res, next) => {
  res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : ''});
}
module.exports.displayAboutPage = (req, res, next) => {
  res.render('index', { title: 'About Me', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
  res.render('index', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
  res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) =>  {
  res.render('contact', { title: 'Contact Me', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
  // to check if user is logged in
  if(!req.user)
  {
    res.render('auth/login',
    {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : ''
    })
  }
  else
  {
    return res.redirect('/');

  }

}

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local",
  (err,user,info) => {
    //server error
    if(err)
    {
      return next(err);
    }
    //if there is an user login error
    if(!user)
    {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      if(err)
      {
        return next (err);
      }
      return res.redirect('/contacts-list');
    });
  })(req,res,next);
}

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}
