const express = require("express");
const router = express.Router();

const { getUserById, getUser,updateUser,userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");


//this middleware is gonna look for this id and pupulate req.profile using getUserById method
router.param("userId", getUserById);
router.get("/user/:userId",isSignedIn, isAuthenticated,  getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
router.put("/orders/user/:userId",isSignedIn,isAuthenticated, userPurchaseList);

module.exports = router;
