const mongoose = require('mongoose');

var User = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
    // password2:{type:String,required:true}
})

module.exports = mongoose.model('User',User);