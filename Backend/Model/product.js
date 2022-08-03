const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const {ObjectId}=Schema;

const productSchema=new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        required:true,
        maxlength:2000
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32
    },
    category:{
        type:ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type:Number
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean,
        required:false
    }

},{timestamps:true});

module.exports=mongoose.model("Product",productSchema)