const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const PORT = 3250;
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

require('./passport')(passport);

const db = mongoose.connect('mongodb://localhost:27017/ejs-login',{useNewUrlParser:true})
                        .then(()=>{
                            console.log('connected to the database.');
                        })
                        .catch((err)=>console.log(err) );

const app = express();
//Body Parser
app.use(express.urlencoded({extended:false}));
//EJS
app.use(expressLayouts);
//session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))
  //flash middleware.
app.use(flash());
//global vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();

})
 //passport middleware.
 app.use(passport.initialize());
 app.use(passport.session());app.set('view engine','ejs');
//Routes
var router = require('./routes/index');
var userRoute = require('./routes/users');
app.use('/',router);
app.use('/users',userRoute);

app.listen(PORT,    ()=>{
    console.log('Connected to the Port ' + PORT);
})

