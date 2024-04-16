const express = require("express");
const router = express.Router();

const {
    createAccident,
    getAccidents,
    getAccidentsNearest,
    getAccidentInfo,
    updateAccident,
    resolveAccident,
    takeAccident,
    getAccidentsNearestAuto,
} = require("../Controllers/accidentController");

const {createAccidentValidator} = require("../Validators/accidentValidator");
const {fetchUser} = require("../Middlewares/fetchUser");
const fetchHospital = require("../Middlewares/fetchHospital");

router.post("/createAccident", fetchUser,createAccidentValidator, createAccident);
router.post("/getAccidents", getAccidents);
router.post("/getAccidentsNearest", getAccidentsNearest);
router.get("/getAccidentsNearestAuto",fetchHospital, getAccidentsNearestAuto);
router.post("/getAccidentInfo", fetchHospital, getAccidentInfo);
router.put("/updateAccident", fetchHospital, updateAccident);
router.put("/takeAccident", fetchHospital, takeAccident);
router.put("/resolveAccident", fetchHospital, resolveAccident);

module.exports = router;
