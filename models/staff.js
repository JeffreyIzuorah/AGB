const mongoose = require ("mongoose");

const StaffSchema  = new mongoose.Schema({
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

const Staff= mongoose.model('Staff',StaffSchema);

module.exports = Staff;