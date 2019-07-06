const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const PORT = 3250;
 

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
app.set('view engine','ejs');
//Routes
var router = require('./routes/index');
var userRoute = require('./routes/users');
app.use('/',router);
app.use('/users',userRoute);

app.listen(PORT,    ()=>{
    console.log('Connected to the Port ' + PORT);
})

