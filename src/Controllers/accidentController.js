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

const getAccidents = async (req, res) => {
    try{
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ success: success,error:"",message:"Validation Error"});
        }

        const accidents = await Accident.find()
        return res.send({accidents:accidents,success:true,error:""})
    }
    catch(error){
        console.error("Get Accident Error", error);
        res.status(500).send({ error: "Some internal server error ocurred", success: false,message:""});
    }
}

const getAccidentsNearest = async (req, res) => {
    try{
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ success: success,error:"",message:"Validation Error"});
        }

        const {latitude,longitude} = req.body;
        const accidents = await Accident.find();
        let nearestAccidents = [];
        for(let i=0;i<accidents.length;i++){
            let accident = accidents[i];
            let distance = getDistance(latitude,longitude,accident.latitude,accident.longitude);
            if(distance<50){
                nearestAccidents.push(accident);
            }
        }
        return res.send({accidents:nearestAccidents,success:true,error:""})
    }catch(error){
        console.error("Get Nearest Accident Error", error);
        res.status(500).send({ error: "Some internal server error ocurred", success: false,message:""});
    }
}

const getAccidentInfo = (req, res) => {
    try{
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ success: success,error:"",message:"Validation Error"});
        }

        const {id} = req.body;
        const accident = Accident.findById(id);
        return res.send({accident:accident,success:true,error:""})
    }catch(error){
        console.error("Get Accident Info Error", error);
        res.status(500).send({ error: "Some internal server error ocurred", success: false,message:""});
    }
}

const takeAccident = (req, res) => {
    try{
        res.send("takeAccident");
    }catch(error){
        console.error("Take Accident Error", error);
        res.status(500).send({ error: "Some internal server error ocurred", success: false,message:""});
    }
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