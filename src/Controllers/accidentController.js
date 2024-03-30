const { validationResult } = require("express-validator");
const { Accident } = require("../Models/Accident.js");
const { Hospital } = require("../Models/Hospital.js");
const { NotificationH } = require("../Models/NotificationH.js");
const { User } = require("../Models/User.js");
const { getDistance } = require("../util/getDistance.js");
const { sendNotificationToNearestHospital } = require("../util/notificationUtils.js");

const createAccident = async (req, res) => {
    try{
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ success: success,error:"",message:"Validation Error"});
        }

        const {latitude,longitude,description,location} = req.body;

        let {time} = req.body;
        if(!time){
            time = Date.now();
        }
        const user = req.user.id;
        const newAccident = new Accident({
            user,
            location,
            latitude,
            longitude,
            time,
            description,
        });
        await newAccident.save();
        await sendNotificationToNearestHospital(newAccident);
        success = true;
        res.status(200).json({ success: success, error:"",message:"Accident Created Successfully"});
    }catch(error){
        console.error("Create Accident Error", error);
        res.status(500).send({ error: "Some internal server error ocurred", success: false,message:""});
    }
}

const getAccidents = (req, res) => {
    res.send("getAccidents");
}

const getAccidentsNearest = (req, res) => {
    res.send("getAccidentsNearest");
}

const getAccidentInfo = (req, res) => {
    res.send("getAccidentInfo");
}

const takeAccident = (req, res) => {
    res.send("takeAccident");
}

const updateAccident = (req, res) => {
    res.send("updateAccident");
}

const resolveAccident = (req, res) => {
    res.send("resolveAccident");
}

module.exports = {
    createAccident,
    getAccidents,
    getAccidentsNearest,
    getAccidentInfo,
    updateAccident,
    resolveAccident,
    takeAccident,
}