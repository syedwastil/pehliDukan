const express=require('express');
const {signUp,signIn,signOut} =require('../Controllers/user');
const {userSignupValidation}=require('../validator/index');
const router=express.Router();

//Signup routes
router.post('/signup',userSignupValidation,signUp)

//login route
router.post('/signin',signIn)

//sign out route
router.get('/signout',signOut);

module.exports=router;