const express = require('express');
const router = express.Router();


const { Goal } = require('../models/goals');


// list all goals
const listGoals = (req, res) => {
    Goal.find({}, (err, data) => {
    if(!err) {
        res.send(data);
    } else {
        console.log(err);
    }
});
}


//Create Goal

const createGoal = (req, res ) => { 
    const goa = new Goal({
        goal: req.body.goal,
        completed: req.body.completed
    });
    goa.save((err, data) => {
         if(!err) {
             res.send(data);
            res.status(200).json({code: 200, message: 'Goal Added Successfully', addGoal: data})
         } else {
           console.log(err);
        }
    });

}



//update staff
const updateGoal = (req, res) => { 
    const goa = {
        goal: req.body.goal,
        completed: req.body.completed,
    };
    Goal.findByIdAndUpdate(req.params.id, { $set: goa }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Goal Updated Successfully', updateGoal: data})
        } else {
            console.log(err);
        }
    });
}



//delete Goal

const deleteGoal = (req, res) => {
    Goal.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Goal deleted successfully', deleteGoal: data})
        } else {
            console.log(err);
        }
    });

}

module.exports ={ 
listGoals
,createGoal
,updateGoal
,deleteGoal
}

// //list all goals
// router.get('/goals', (req, res) => {
//     Goal.find({}, (err, data) => {
//         if(!err) {
//             res.send(data);
//         } else {
//             console.log(err);
//         }
//     });
// });



// //add new goal
// router.post('/goals/add', (req, res) => {
//     const goa = new Goal({
//         goal: req.body.goal,
//         completed: req.body.completed
//     });
//     goa.save((err, data) => {
//          if(!err) {
//              res.send(data);
//             res.status(200).json({code: 200, message: 'Goal Added Successfully', addGoal: data})
//          } else {
//            console.log(err);
//         }
//     });
// });


// //update goal
// router.patch('/goals/update/:id', (req, res) => {

//     const goa = {
//         goal: req.body.goal,
//         completed: req.body.completed,
//     };
//     Goal.findByIdAndUpdate(req.params.id, { $set: goa }, { new: true }, (err, data) => {
//         if(!err) {
//             res.status(200).json({code: 200, message: 'Goal Updated Successfully', updateGoal: data})
//         } else {
//             console.log(err);
//         }
//     });
// });


// // Delete goal
// router.delete('/goals/:id', (req, res) => {

//     Goal.findByIdAndRemove(req.params.id, (err, data) => {
//         if(!err) {
//             // res.send(data);
//             res.status(200).json({code: 200, message: 'Goal deleted successfully', deleteGoal: data})
//         } else {
//             console.log(err);
//         }
//     });
// });


// module.exports = router;