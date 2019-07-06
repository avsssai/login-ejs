const express  =require('express');
const User = require('../models/User');
const router = express.Router();
const { check,validationResult } = require('express-validator');

router.get('/login',(req,res)=>{
    res.render('login');
}) 

router.get('/register',(req,res)=>{
    res.render('register');
}) 
router.post('/register',[
    check('name')
        .isLength('3')
        .withMessage('The name must be minimum 3 characters long.'),
        check('email').isEmail().withMessage('Please enter a valid email address'),
        check('email').custom(value=>{
            return User.findOne({email:value})
                .then((user)=>{
                    if(user){
                        return Promise.reject('Email already enrolled.');

                    }
                })
        }),
        check('email').not().isEmpty().withMessage('Enter an email.'),   
            check('password')
                .isLength('6').withMessage('Password too short, min 6 characters required.'),
                check('password2').custom((value,{req})=>{
                    if(value !== req.body.password){
                         throw new Error("Passwords don't match.");
                    }
                    return true;
                })


],(req,res)=>{
    const { name,email,password,password2 } = req.body;
    var user = new User({
        name:name,
        email:email,
        password:password,
        password2:password2
    });
    const errors = validationResult(req);
    if(errors.array().length > 0){
        res.render('register',{errors:errors.errors,
        name:name,email:email});
        // res.status('402').json({errors:errors});
    }else{
        user.save()
            .then(user=>{
                console.log('user saved to database.');
            })
            res.render('login');
    }

})


module.exports = router;
