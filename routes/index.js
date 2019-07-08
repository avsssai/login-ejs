const express  =require('express');

const router = express.Router();
const { ensureAuthenticated } = require('../auth');


//welcome page
router.get('/',(req,res)=>{
    res.send('Can see!');
}) 
//dashboard page
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{name:req.user.name});
})


module.exports = router;
