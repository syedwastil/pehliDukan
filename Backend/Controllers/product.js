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
                err:"Image could not be uploaded"
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
    console.log(id)
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