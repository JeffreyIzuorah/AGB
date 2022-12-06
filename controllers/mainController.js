const express = require('express');
const router = express.Router();
const Goal = require("../models/goals");
const Staff = require("../models/staff");
const passport = require("passport")
const bcrypt = require('bcrypt')

const homePage = (req, res) => {
    res.render("index", {
    'title': 'AGB Wellness'
    });
    }

const about = (req, res) => {
    res.render("about", {
    });
    }

const register = (req, res) =>{
    res.render("register", {
    'title': 'Register'
    });
    }

const createStaff = (req, res ) => { 
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
                res.redirect('/staff/login')
            } else {
                res.redirect('/staff/register')
            }
        });
    })
}

const staffPage = async(req, res) =>{
    
    const allStaff = await Staff.find().lean();
    if (req.user.isManager ) {
        res.render("staff", {
            'title' : 'Manage Staff',
            'staff' : allStaff
        });  
    } else {
        res.status(403);
        res.render("403");

    }  
}

 const addStaffPage = async(req, res) =>{
    res.render("addStaff", {
        'title' : 'Manage Staff',
    });
}

const addStaff = async(req, res) =>{
    bcrypt.hash('password', 10, function(err, hashedPass) {
    const staff = new Staff({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        isStaff: true
    });
    staff.save((err, data) => {
        if(!err) {
            res.redirect('/manageStaff')
        } else {
            res.redirect('/addStaff')
           console.log(err);
        }
    });
})
}


const deleteStaff = async (req, res) => {
    try {
        await Staff.deleteOne({ _id: req.params.id });
        req.flash('message', 'Staff has been successfully removed!'); 
        res.redirect('/manageStaff');
    } catch(err) {
        console.log(err);
    }

}


const listStaff =  (req, res) => {
    Staff.find({}, (err, data) => {
    if(!err) {
        res.send(data);
    } else {
        console.log(err);
    }
});
}


const login = (req, res) => {
    res.render("login", {
    'title': 'Sign in',
    'alertSuccess' : res.locals.success_msg,
    'alertErrorMsg' : res.locals.error_msg,
    'alertError' : res.locals.error
    });
    }


const post_login = (req, res, next) => {

    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/staff/login',
        failureFlash : true,
    })(req,res,next);

}


const logout = (req, res, next) => {
    req.logout((err) =>{
        if(err) {
            return next(err);
        }
    });
    res.redirect('/staff/login');
}

const dashboard = async(req, res) =>{
    const goal = await Goal.find({ staff: req.user.id.toString() }).lean();
    const staff = req.user.name
    res.render("dashboard", {
    'title': 'dashboard',
    staff: staff,
    'goals': goal,
    'alert' : res.locals.message,
    });
     
}

const addGoal = (req, res) => {   
    res.render('create', {
        'title' : 'Create a Goal',
        staff: req.user.name,
        goal: req.body.goal,
        category: req.body.category,
        started: req.body.started  
    });
}

const createGoal = async (req, res ) => { 
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
    }
}



const editGoal = async (req, res) => {
    try {
        const goal = await Goal.findOne({ _id: req.params.id });
        res.render('edit', {
            'title' : 'Edit your Goal',
            staff: req.user.name,
            goal
        })
    } catch(err) {
        console.log(err);
    }
}

const completeGoal = async(req, res) => {
    try {
        let goal = await Goal.findById(req.params.id);
       let result = await Goal.findOneAndUpdate({ _id: req.params.id }, { completed: !goal.completed}, {
            new: true,
            runValidators: true
    });
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
    }

}


const updateGoal = async(req, res) => { 
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
    }
}


const deleteGoal = async (req, res) => {
    try {
        await Goal.deleteOne({ _id: req.params.id });
        req.flash('message', 'Goal has been successfully removed!'); 
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
    }

}


module.exports = {
    homePage,
    about,
    register,
    createStaff,
    staffPage,
    addStaffPage,
    addStaff,
    deleteStaff,
    listStaff,
    login,
    post_login,
    logout,
    dashboard,
    addGoal,
    createGoal,
    editGoal,
    completeGoal,
    updateGoal,
    deleteGoal

}



