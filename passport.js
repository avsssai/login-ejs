const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField:'email',passwordField:'password'},(email,password,done)=>{
        //matching the user.
        User.findOne({email:email})
            .then(user=>{
                if(!user){
                    return done(null,false,{message:'User not registered.'});
                }
                //Matching passwords.
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err){
                        throw err;
                    }
                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done(null,false,{message:'The Password entered is wrong, please check your password.'});
                    }
    
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }));

    //Serializing and deserializing users.
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
      
}
