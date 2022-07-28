//Require
require('dotenv').config();
const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');

//import routes
const authRoutes=require('./Routes/auth')
const userRoutes=require('./Routes/user')
//variable
const port=process.env.PORT||3001;
const db=process.env.MONGO_URI;
//Express App
const app=express();
//Middle ware
app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser.json());


//Routes Middelware
app.use('/api',userRoutes)
app.use('/api',authRoutes) 

//Database 
mongoose.connect(db,{
   // useNewUrlParser:true,
   // useCreateIndex:true
}).then(()=>{
    console.log("Database Connected!!!");
    app.listen(port);
    console.log('Listening on port :',port); 
})

