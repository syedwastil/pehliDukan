//const mongoose=require('mongoose');
const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const { errorHandler } = require("../helper/errorHandler");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

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
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  User.findOne({ email }, async (err, user) =>  {
    if (!user || err) {
      return res
        .status(400)
        .json({ error: "User does not exist. Please Signup" });
    }
    const match=await User.signin(user, password);
   console.log(match,typeof(match))
    if (!match) {
      console.log("in false")
      return res.status(401).json({ error: "Email and password do not match" });

    } else {
      console.log("in true")
     
      // create a token
      const token = createToken(user._id);
      //set cookie for session
      res.cookie("t", token, { expire: new Date() + 9999 });
      //destructure user
      const { _id, name, email, role } = user;
      return res.status(200).json({ token, user: { _id, name, email, role } });
    }
  });
};

exports.signOut = async (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Successful" });
};

exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(req.profile._id, "---", req.auth._id);
  if (!user) {
    return res.status(403).json({ err: "Access Denied" });
  }
  console.log("User Authenticated");
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ err: "Admin Resource! Access denied" });
  }
  console.log("User is Admin");
  next();
};
