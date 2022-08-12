const formidable=require('formidable')
const _=require('lodash')
const fs=require('fs')
const Product=require('../model/Product');
const {errorHandler}=require('../helper/errorHandler')

exports.readSingle=(req,res)=>{
    req.product.photo=undefined;
    return res.json(req.product)
}

exports.create=(req,res)=>{
    const form=new formidable.IncomingForm();
    form.keepExtensions=true
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.status(400).json({
                error:"Image could not be uploaded"
            })
        }

        //check for all fields
        const {name,description,price,category,quantity,shipping}=fields;
        if(!name || !description || !price || !category || !quantity ||!shipping){
           return res.status(400).json({error:"All fields are required"})
        }
        let product=new Product(fields);
        console.log(files)
        if(files.photo){// use photo or image as per sender
            //console.log(files)  //for debuggung with file names

            //check for size
            if(files.photo.size>1000000){
                return res.status(400).json({error:"Phot must be les than 1 Mb"})
            }
            product.photo.data=fs.readFileSync(files.photo.filepath)
            product.photo.contentType=files.photo.mimetype
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.status(200).json(result)
        })
    })
}
exports.updateProduct=(req,res)=>{
    const form=new formidable.IncomingForm();
    form.keepExtensions=true
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.status(400).json({
                err:"Image could not be uploaded"
            })
        }

        //check for all fields
        const {name,description,price,category,quantity,shipping}=fields;
        if(!name || !description || !price || !category || !quantity ||!shipping){
           return res.status(400).json({error:"All fields are required"})
        }
        let product=req.product
        product=_.extend(product,fields)
        console.log(files)
        if(files.photo){// use photo or image as per sender
            //console.log(files)  //for debuggung with file names

            //check for size
            if(files.photo.size>1000000){
                return res.status(400).json({error:"Phot must be les than 1 Mb"})
            }
            product.photo.data=fs.readFileSync(files.photo.filepath)
            product.photo.contentType=files.photo.mimetype
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.status(200).json(result)
        })
    })
}

exports.deleteProduct=async (req,res)=>{
    let product=req.product;
    product.remove()
        .then(()=>{
            return res.status(200).json({msg:"Product deleted successfuly."})
        }).catch(err=>{
            return res.status(400).json({
                error:errorHandler(err)
            })
        })
}


exports.productById=async (req,res,next,id)=>{
   // console.log(id)
    Product.findById(id)
        .then((product)=>{
            //console.log(product)
            req.product=product;
            next();
        }).catch((err)=>{
            console.log(err);
            res.status(400).json({error:"Product not found"})
        }) 
}

/*
sell/arrival/top viewed
by sell=products?sortBy=sold=sold&order=desc&limit=4
br arrival=products?sortBy=createdAt&order=desc&limit=4
*/

exports.list=(req,res)=>{
    let order=req.query.order ? req.query.order:'asc';
    let sortBy=req.query.sortBy ? req.query.sortBy:'_id';
    let limit=req.query.limit ? parseInt(req.query.limit):6;

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy,order]])
        .limit(limit)
        .exec((err,products)=>{
            if(err){
                return res.status(400).json({error:'Product nt found'})
            }else{
                res.status(200).send(products)
            }
        })
}

exports.listRelated=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit):6;
    Product.find({_id:{$ne:req.product},category:req.product.category})
        .limit(limit)
        .populate('category','_id name')
        .exec((err,products)=>{
            if(err){
                return res.status(400).json({error:'Product not found'})
            }else{
                res.status(200).send(products)
            }
        })
}

exports.listCategories=(req,res)=>{
    Product.distinct("category",{},(err,Categories)=>{
        if(err){
            return res.status(400).json({error:'Categories not found'})
        }else{
            res.status(200).send(Categories)
        }
    })
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.productPhoto=(req,res,next)=>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    else{
        console.log("no data found")
    }
    next();
}