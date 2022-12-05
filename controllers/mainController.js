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

exports.about = function(req, res) {
    res.render("about", {
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

exports.staffPage = async(req, res) =>{
    
    const allStaff = await Staff.find().lean();
    if (req.user.isManager ) {
        res.render("staff", {
            'title' : 'Manage Staff',
            'staff' : allStaff
        });  
    } else {
        res.render("dashboard");

    }
    
}

exports.addStaffPage = async(req, res) =>{
    res.render("addStaff", {
        'title' : 'Manage Staff',
    });
}

exports.addStaff = async(req, res) =>{
    const staff = new Staff({
        name: req.body.name,
        email: req.body.email,
    });
    staff.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.redirect('/manageStaff')
        } else {
            res.redirect('/addStaff')
           console.log(err);
        }
    });
}


exports.deleteStaff = async (req, res) => {
    try {
        await Staff.deleteOne({ _id: req.params.id });
        req.flash('message', 'Staff has been successfully removed!'); 
        res.redirect('/manageStaff');
    } catch(err) {
        console.log(err);
        res.render('500');
    }

}


exports.listStaff = function (req, res) {
    Staff.find({}, (err, data) => {
    if(!err) {
        res.send(data);
    } else {
        console.log(err);
    }
});
}


exports.login = function(req, res) {
    res.render("login", {
    'title': 'Sign in',
    'alert1' : res.locals.success_msg,
    'alert2' : res.locals.error_msg,
    'alert3' : res.locals.error
    });
    }


exports.post_login = (req, res, next) => {

    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/staff/login',
        failureFlash : true,
    })(req,res,next);

}


exports.logout = function(req, res, next) {
    req.logout((err) =>{
        if(err) {
            return next(err);
        }
    });
    req.flash('success_msg','You are now logged out');
    res.redirect('/staff/login');
}

exports.dashboard = async(req, res) =>{
    const goal = await Goal.find({ staff: req.user.id.toString() }).lean();
    const staff = req.user.name
    res.render("dashboard", {
    'title': 'dashboard',
    staff: staff,
    'goals': goal,
    'alert' : res.locals.message,

    
    });
     
}

exports.addGoal = function(req, res) {
    
    res.render('create', {
        'title' : 'Create a Goal',
        staff: req.user.name,
        goal: req.body.goal,
        category: req.body.category,
        started: req.body.started

       
    });
}

exports.createGoal = async (req, res ) => { 
    if(!req.body.goal) {
        res.status(400).send("Goal required");
        return;
    }
    if(!req.body.category) {
        res.status(400).send("Category required");
        return;
    }
    if(!req.body.started) {
        res.status(400).send("Date required");
        return;
    }

    try {
        req.body.staff = req.user.id;
        await Goal.create(req.body);
        req.flash('message', 'Your goal has been added'); 
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        res.render('500');
    }
}



exports.editGoal = async (req, res) => {
    try {
        const goal = await Goal.findOne({ _id: req.params.id });
        res.render('edit', {
            'title' : 'Edit your Goal',
            staff: req.user.name,
            goal
        })
    } catch(err) {
        console.log(err);
        res.render('500');
    }
}


exports.completeGoal = async(req, res) => {
    try {
        let goal = await Goal.findById(req.params.id);
       let result = await Goal.findOneAndUpdate({ _id: req.params.id }, { completed: !goal.completed}, {
            new: true,
            runValidators: true
    });
     console.log('goalball', result)
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        res.render('500');
    }

}


exports.updateGoal = async(req, res) => { 
    try {
        let goal = await Goal.findById(req.params.id);

        goal = await Goal.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
    });
    req.flash('message', 'Your goal has been successfully updated!'); 
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        res.render('500');
    }
}


exports.deleteGoal = async (req, res) => {
    try {
        await Goal.deleteOne({ _id: req.params.id });
        req.flash('message', 'Goal has been successfully removed!'); 
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        res.render('500');
    }

}


    




