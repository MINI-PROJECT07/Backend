const express = require("express");
const router = express.Router();

const { createHospital, loginHospital, getHospitalInfo ,getHospitals,getHospitalNearest, updateHospital} = require("../Controllers/hospitalControllers");
const { createHospitalValidator, loginHospitalValidator, getHospitalNearestValidator } = require("../Validators/hospitalValidators");
const fetchHospital = require("../Middlewares/fetchHospital");
const {fetchUser} = require("../Middlewares/fetchUser")

router.post("/createHospital", createHospitalValidator, createHospital);
router.post("/loginHospital", loginHospitalValidator, loginHospital);
router.post("/getHospitalInfo",fetchHospital,getHospitalInfo);
router.get("/getHospitals",fetchUser, getHospitals)
router.post("/getHospitalNearest",getHospitalNearestValidator,getHospitalNearest);
router.put("/updateHospital",fetchHospital,updateHospital);


module.exports = router;