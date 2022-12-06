const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const mustache = require('mustache-express');

require('./config/passport')(passport)

const dotenv = require("dotenv");

const connectDB = require('./config/db');

// Load Config
dotenv.config({path: './config/config.env'})

connectDB();

const app = express();

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.message = req.flash('message');
  next();
})


app.use(express.static(__dirname + '/public'));


app.listen(8000, () => {
    console.log("Server started on port 8000");
  });

//Routes
app.use('/', require('./routes/mainRoute'));
app.use('/staff', require('./routes/staff'));