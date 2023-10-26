/* //Assignment: Assignment 2 Express Portfolio – Authentication 
// Laura Amangeldiyeva - student id: 301167661 
// Date: 2022/02/15 */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//database 
let mongoose = require('mongoose');
let DB = require('./db');

//connecting mongoose to the DB URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open',()=>{

console.log('Connected to MongoDB...');

});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contacts');

let app = express();

//engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//Express Session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave:false
}));

//initialize Flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//passport user configuration

//to create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

//to implement a user authentication Strategy
passport.use(User.createStrategy());

//to serialize and deserialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts-list', contactsRouter);

//404 error and error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error',{ title: 'Error',});
});

module.exports = app;
