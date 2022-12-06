const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const Staff = require('../models/staff')


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField : 'email'},(email,password,done)=> {
                Staff.findOne({email : email})
                .then((staff)=>{
                 if(!staff) {
                     return done(null,false,{message : 'Email not registered'});
                 }
                 bcrypt.compare(password,staff.password,(err,isMatch)=>{
                     if(err) throw err;

                     if(isMatch) {
                         return done(null,staff);
                     } else {
                         return done(null,false,{message : 'Password incorrect'});
                     }
                 })
                })
                .catch((err)=> {console.log(err)})
        })   
    )
    passport.serializeUser(function(staff, done) {
        done(null, staff.id);
      });
      
      passport.deserializeUser(function(id, done) {
        Staff.findById(id, function(err, staff) {
          done(err, staff);
        });
      }); 
}; 