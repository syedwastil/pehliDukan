const express=require('express');
const {signUp,signIn,signOut,requireSignin} =require('../Controllers/auth');
const {userSignupValidation}=require('../validator/index');
const router=express.Router();

//Signup routes
router.post('/signup',userSignupValidation,signUp)

//login route
router.post('/signin',signIn)

//sign out route
router.get('/signout',signOut);

//test route
router.get('/test',requireSignin,(req,res)=>{
    res.send("Hellow Hellow testing");
});

module.exports=router;