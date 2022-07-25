const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxLength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:32
    },
    hashed_password:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        trim:true,
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }
},{timestamps:true});

userSchema.statics.signup=async function({name,email,password}){
    const salt=await bcrypt.genSalt(10);
    console.log("salt :",salt);
    const hash=await bcrypt.hash(password,salt);
    console.log("pwd",hash)
    const user=await this.create({name,email,salt:salt,hashed_password:hash})
    console.log("user created")
    return user;
}
userSchema.statics.signin=async function({email,password}){
    if (!email || !password) {
        res.status(405).json({err:'All fields must be filled'})
      }
    const user=await this.findOne({email})
        if(!user){
            res.status(400).json({err:"User not exist. Please Signup"})
        }
        console.log("user Found");
    const match = await bcrypt.compare(password, user.hashed_password)
        if (!match) {
            res.status(400).json({err:"Incorrect password"})
        }
        console.log("Matched")
        return user;
    
}

module.exports=mongoose.model('User',userSchema)