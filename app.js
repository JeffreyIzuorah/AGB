const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');


const dotenv = require("dotenv");


const connectDB = require('./config/db');
// Load Config
dotenv.config({path: './config/config.env'})

connectDB();



//Routes
app.use('/', require('./routes/mainRoute'));
app.use('/staff', require('./routes/staff'));
app.use('/goals', require('./routes/goals'));


app.listen(8000, () => {
    console.log("Server started on port 8000");
  });