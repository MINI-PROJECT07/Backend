const { BloodDonor } = require("../Models/BloodDonor.js");
const { validationResult } = require("express-validator");
const { getDistance } = require("../util/getDistance.js");

const createBloodDonor = async (req, res) => {
    try {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ success: success });
        }

        const { name, phoneNo, bloodGroup, age, permanantLocation, address } = req.body;
        const user = req.user.id;

        const newBloodDonor = new BloodDonor({
            user,
            name,
            phoneNo,
            bloodGroup,
            age,
            permanantLocation,
            address,
        })
        await newBloodDonor.save();
        success = true;
        res.status(200).json({ success: success,message:"",error:"" });
    } catch (error) {
        res.status(500).json({ success: false, error: error, message: "Internal Server Error"});
        console.error("Create Blood Donor Error", error);
    }
};

const getBloodDonors = async (req, res) => {
    try {
        const bloodDonors = await BloodDonor.find();
        res.status(200).json(bloodDonors);
    } catch (error) {
        res.status(500).json({ error: error });
        console.error("Get Blood Donors Error", error);
    }
}

const getBloodDonorsNearest = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const bloodDonors = await BloodDonor.find({
            permanantLocation:{
                latitude: { $gte: latitude - 0.45, $lte: latitude + 0.45 },
                longitude: { $gte: longitude - 0.45, $lte: longitude + 0.45 },
            }
        },{_id:0, __v:0});

        res.status(200).json(bloodDonors);
    } catch (error) {
        res.status(500).json({ error: error });
        console.error("Get Blood Donors Nearest Error", error);
    }
}

const getBloodDonorInfo = async (req, res) => {
    try {
        const { id } = req.body;
        const bloodDonor = await BloodDonor.findById(id);
        res.status(200).json(bloodDonor);
    } catch (error) {
        res.status(500).json({ error: error });
        console.error("Get Blood Donor Info Error", error);
    }
}

const updateBloodDonor = async (req, res) => {
    try {
        const { id, name, phoneNo, bloodGroup, age, permanantLocation, address } = req.body;
        const bloodDonor = await BloodDonor.findById(id);
        if(name) bloodDonor.name = name;
        if(phoneNo) bloodDonor.phoneNo = phoneNo;
        if(bloodGroup) bloodDonor.bloodGroup = bloodGroup;
        if(age) bloodDonor.age = age;
        if(permanantLocation) bloodDonor.permanantLocation = permanantLocation;
        if(address) bloodDonor.address = address;

        await bloodDonor.save();
        res.status(200).json({ message: "Blood Donor Updated Successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
        console.error("Update Blood Donor Error", error);
    
    }
}

const deleteBloodDonor = async (req, res) => {
    try {
        const { id } = req.body;
        await BloodDonor.findByIdAndDelete(id);
        res.status(200).json({ message: "Blood Donor Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
        console.error("Delete Blood Donor Error", error);
    }
}
module.exports = { createBloodDonor, getBloodDonors, getBloodDonorsNearest, getBloodDonorInfo, updateBloodDonor, deleteBloodDonor};