const express=require("express");
const router=express.Router();

const {getCategoryById}=require("../controllers/category");

router.param("categoryId",getCategoryById);



module.exports=router;