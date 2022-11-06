const mongoose = require ("mongoose");

const Staff = mongoose.model('Staff', {
    name: {
        type:String,
        required:true
    }, 
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    isManager: {
        type:Boolean,
        required:false
    },
    isStaff: {
        type:Boolean,
        required:false
    }
    
});


module.exports = {Staff}