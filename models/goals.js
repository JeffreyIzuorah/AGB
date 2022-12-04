const mongoose = require ("mongoose");

const GoalSchema = new mongoose.Schema({
    staff: {
        type: String,
    },
    goal: {
        type:String,
        // required:true
    }, 
    category: {
        type:String,
        // required:true
    },
    started: {
        type:Date,
        // required:true
    }
});


module.exports = mongoose.model('Goal', GoalSchema);