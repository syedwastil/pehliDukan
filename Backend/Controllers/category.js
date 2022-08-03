const Category=require('../model/category');
const {errorHandler}=require('../helper/errorHandler')

exports.create=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        res.status(200).json({data});
    })
}   