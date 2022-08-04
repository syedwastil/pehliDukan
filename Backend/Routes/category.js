const express = require("express");
const router = express.Router();
const { create,categoryById,readSingle,readAll, deleteCategory,updateCategory} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {userById}=require('../controllers/user')

router.get("/category/:categoryId",readSingle)
router.get("/categories",readAll)
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, deleteCategory);
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, updateCategory);
router.param("categoryId",categoryById)
router.param("userId",userById)

module.exports=router
