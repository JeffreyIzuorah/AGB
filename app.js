const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const passport = require("passport")
const flash = require('express-flash')
const session = require('express-session')

require('./config/passport')(passport)

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(flash())
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


const dotenv = require("dotenv");


const connectDB = require('./config/db');
// Load Config
dotenv.config({path: './config/config.env'})

connectDB();



//Routes
app.use('/', require('./routes/mainRoute'));
app.use('/staff', require('./routes/staff'));
// app.use('/goals', require('./routes/goals'));


app.use(express.static(__dirname + '/public'));



app.listen(8000, () => {
    console.log("Server started on port 8000");
  });