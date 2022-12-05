// const express = require('express');
// const router = express.Router();

// const staff = require("../models/staff");
// const Goal = require('../models/goals');
// const { getStaff } = require('./staffController');


// // list all goals
// const listGoals = (req, res) => {
//     Goal.find({}, (err, data) => {
//     if(!err) {
//         res.send(data);
//     } else {
//         console.log(err);
//     }
// });
// }


// //Create Goal

// const addGoal = (req, res) => {
    
//     res.render('create', {
//         'heading' : 'Add',
       
//     });
// }

// const createGoal = async (req, res ) => { 
//     const goa = new Goal({
//         goal: req.body.goal,
//         category: req.body.category,
//         started: req.body.started,

//     });
//     goa.save((err, data) => {
//          if(!err) {
//             // res.send(data);
//             res.status(200).json({code: 200, message: 'Goal Added Successfully', addGoal: data})
//          } else {
//            console.log(err);
//         }
//     });



// }



// //update goal
// const updateGoal = (req, res) => { 
//     const goa = {
//         goal: req.body.goal,
//         category: req.body.category,
//         started: req.body.started,
//     };
//     Goal.findByIdAndUpdate(req.params.id, { $set: goa }, { new: true }, (err, data) => {
//         if(!err) {
//             res.status(200).json({code: 200, message: 'Goal Updated Successfully', updateGoal: data})
//         } else {
//             console.log(err);
//         }
//     });
// }



// //delete Goal

// const deleteGoal = (req, res) => {
//     Goal.findByIdAndRemove(req.params.id, (err, data) => {
//         if(!err) {
//             // res.send(data);
//             res.status(200).json({code: 200, message: 'Goal deleted successfully', deleteGoal: data})
//         } else {
//             console.log(err);
//         }
//     });

// }

// module.exports ={ 
// listGoals
// ,addGoal
// ,createGoal
// ,updateGoal
// ,deleteGoal
// }
