const express = require("express");
const router = express.Router();
const { createUser,loginUser,getUserInfo, updateUser,getUserInfoHospital} = require("../Controllers/userControllers");
const {createUserValidator,loginUserValidator} = require("../Validators/userValidators");
const {fetchUser} = require("../Middlewares/fetchUser");
const fetchHospital = require("../Middlewares/fetchHospital");

router.post("/createUser",createUserValidator,createUser);
router.post("/login",loginUserValidator,loginUser);
router.get("/getUserInfo",fetchUser,getUserInfo);
router.get("/getUserInfoHospital",fetchHospital,getUserInfoHospital);
router.put("/updateUser",fetchUser,updateUser)

module.exports = router;