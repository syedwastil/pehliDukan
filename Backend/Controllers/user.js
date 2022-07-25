//const mongoose=require('mongoose');
const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const { errorHandler } = require("../helper/errorHandler");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '6h' })
  }

exports.signUp = async (req, res) => {
  //const {name,password,email}=req.body;
  console.log("req.body", req.body);

  try {
    const user = await User.signup(req.body);
    user.salt = undefined;
    user.hashed_password = undefined;
    //const token = createToken(user._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: errorHandler(err) });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await User.signin(req.body);
    // create a token
    const token = createToken(user._id);
    //destructure user
    const {_id,name,email,role}=user;
    res.status(200).json({ token ,user:{_id,name,email,role}});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
