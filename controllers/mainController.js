const express = require('express');
const router = express.Router();
const Goal = require("../models/goals");
const Staff = require("../models/staff");
const passport = require("passport")
const bcrypt = require('bcrypt')

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


exports.createStaff = function(req, res ) { 
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        
        if (err) {
            return res.json({
                error: err
            })
        }
        const sta = new Staff({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            isManager: req.body.isManager ==='on' ? true : false,
            isStaff: req.body.isStaff ==='on' ? true : false
        });
        sta.save((err, data) => {
            if(!err) {
                // res.send(data);
                res.redirect('/staff/login')
            } else {
                res.redirect('/staff/register')
            //    console.log(err);
            }
        });
    })


}


exports.updateStaff = (req, res) => { 
    const sta = {
        name: req.body.name,
        email: req.body.email,
        // password: hashedPass,
        // isManager: req.body.isManager,
        // isStaff: req.body.isStaff,
    };
    Staff.findByIdAndUpdate(req.params.id, { $set: sta }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Staff Updated Successfully', updateStaff: data})
        } else {
            console.log(err);
        }
    });
}
    


exports.login = function(req, res) {
    res.render("login", {
    'title': 'Sign in'
    });
    }


exports.post_login = (req, res, next) => {

    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/login',
        failureFlash : true,
    })(req,res,next);

}



exports.logout = function(req, res, next) {
    req.logout((err) =>{
        if(err) {
            return next(err);
        }
    });
    req.flash('success_msg','Now logged out');
    res.redirect('/login');
}

exports.dashboard = async(req, res) =>{
    res.render("dashboard", {
    'title': 'dashboard',
    staff: req.staff
    
    });
     
}

exports.addGoal = function(req, res) {
    
    res.render('create', {
        'heading' : 'Add',
       
    });
}

exports.createGoal = async (req, res ) => { 
    const goa = new Goal({
        goal: req.body.goal,
        category: req.body.category,
        started: req.body.started,

    });
    goa.save((err, data) => {
         if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Goal Added Successfully', addGoal: data})
         } else {
           console.log(err);
        }
    });



}


exports.updateGoal = function(req, res) { 
    const goa = {
        goal: req.body.goal,
        category: req.body.category,
        started: req.body.started,
    };
    Goal.findByIdAndUpdate(req.params.id, { $set: goa }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Goal Updated Successfully', updateGoal: data})
        } else {
            console.log(err);
        }
    });
}

exports.deleteGoal = function(req, res) {
    Goal.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Goal deleted successfully', deleteGoal: data})
        } else {
            console.log(err);
        }
    });

}
    




