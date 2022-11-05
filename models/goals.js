const mongoose = require ("mongoose");

const Goal = mongoose.model('Goal', {
    goal: {
        type:String,
        required:true
    }, 
    completed: {
        type:Boolean,
        required:true
    }
});


module.exports = {Goal}