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

exports.post_login_middleware = (req, res, next) => {

    passport.authenticate('local',{
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
    res.redirect('/staff/login');
}

exports.dashboard = async(req, res) =>{
    const goal = await Goal.find({ staff: req.user.id.toString() }).lean();
    const staff = req.user.name
    res.render("dashboard", {
    'title': 'dashboard',
    staff: staff,
    'goals': goal

    
    });
     
}

exports.addGoal = function(req, res) {
    
    res.render('create', {
        'heading' : 'Add',
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
        req.flash('message', 'Goal added'); 
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
            'heading' : 'Edit',
            staff: req.user.name,
            goal
        })
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

exports.mark_complete = async (req, res) => {

    try {
        
        await Goal.updateOne({ _id: req.params.id }, {status: 'Complete'});
        req.flash('message', 'Well done!'); 
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


    




