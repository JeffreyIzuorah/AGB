const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require("passport")
const main = require("../controllers/mainController")


const Staff = require('../models/staff');


//Get all staff


const listStaff = (req, res) => {
        Staff.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
}


//Create staff

// const createStaff = (req, res ) => { 
//     bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        
//         if (err) {
//             return res.json({
//                 error: err
//             })
//         }
//         const sta = new Staff({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPass,
//             isManager: req.body.isManager ==='on' ? true : false,
//             isStaff: req.body.isStaff ==='on' ? true : false
//         });
//         sta.save((err, data) => {
//             if(!err) {
//                 // res.send(data);
//                 res.redirect('/login')
//                 // res.status(200).json({code: 200, message: 'Staff Added Successfully', addStaff: data})
//             } else {
//                 res.redirect('/redirect')
//             //    console.log(err);
//             }
//         });
//     })


// }

// const login = (req, res, next) => {

//     passport.authenticate('local',{
//         successRedirect : '/dashboard',
//         failureRedirect : '/login',
//         failureFlash : true,
//     })(req,res,next);

// }

// const logout = function(req, res) {
//     req.logout();
//     req.flash('success_msg','Now logged out');
//     res.redirect('/login');
// }




//update staff
const updateStaff = (req, res) => { 
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


//Find one staff

const getStaff = (req, res) => {
    Staff.findById(req.params.id, (err, data) => {
                if(!err) {
                    res.send(data);
                } else {
                   console.log(err);
                }
            });
}


//delete staff

const deleteStaff = (req, res) => {
        Staff.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Staff deleted successfully', deleteStaff: data})
        } else {
            console.log(err);
        }
    });

}

// module.exports ={ 
//     listStaff
//     ,login
//     ,logout
//     ,createStaff
//     ,updateStaff
//     ,getStaff
//     ,deleteStaff
// }