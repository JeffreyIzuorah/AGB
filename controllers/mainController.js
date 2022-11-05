const express = require('express');
const router = express.Router();

exports.homePage = function(req, res) {
    res.render("index", {
    'title': 'AGB Wellness'
    });
    }

exports.register = function(req, res) {
    res.render("register", {
    'title': 'Register'
    });
    }


exports.login = function(req, res) {
    res.render("login", {
    'title': 'Sign in'
    });
    }