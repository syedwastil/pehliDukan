const Category=require('../model/category');
const {errorHandler}=require('../helper/errorHandler')

exports.readSingle=(req,res)=>{
    return res.json(req.category) 
}

exports.create=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.status(200).json({data});
    })
}   

exports.readAll=async (req,res)=>{
    Category.find()
    .then((categories)=>{
        return res.status(200).json(categories)
    }).catch(err=>{
        return res.status(400).json({error:errorHandler(err)});
    });
}

exports.deleteCategory=async (req,res)=>{
    let category=req.category;
    category.remove()
        .then(()=>{
            return res.status(200).json({msg:"Category deleted successfully"});
        }).catch(err=>{
            return res.status(400).json({error:errorHandler(err)});
        })
}

exports.updateCategory=async (req,res)=>{
    const category=req.category;
    category.name=req.body.name; 
    category.save()
    .then((category)=>{
        res.status(200).json(category)
    }).catch(err=>{
        res.status(400).json({error:errorHandler(err)})
    })
}




exports.categoryById=async (req,res,next,id)=>{
    Category.findById(id)
    .then((category)=>{
        req.category=category;
        next();
    }).catch(err=>{
        return res.status(400).json({error:"Category not found"})
    })
}