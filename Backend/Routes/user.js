const express=require('express');
const {userById,read,update}=require('../Controllers/user')
const {requireSignin,isAuth,isAdmin} =require('../Controllers/auth');
const router=express.Router();


router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
   res.json({
      user:req.profile
   })

});
router.get("/user/:userId",requireSignin,isAuth,read);
router.put("/user/:userId",requireSignin,isAuth,update);
router.param("userId",userById);

module.exports=router;requireSignin