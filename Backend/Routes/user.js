const express=require('express');
const {userById}=require('../Controllers/user')
const {requireSignin,isAuth,isAdmin} =require('../Controllers/auth');
const router=express.Router();


router.get('/secret/:userId',requireSignin,isAuth,(req,res)=>{
   res.json({
      user:req.profile
   })

});
router.param("userId",userById);

module.exports=router;requireSignin