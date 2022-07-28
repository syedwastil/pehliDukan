const User=require('../Model/user')
exports.userById=async(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            res.status(400).json({error:"User not found"})
        }else{
            req.profile=user;
        }
        next();
    })

}