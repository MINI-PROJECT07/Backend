const { Hospital } = require("../Models/Hospital.js");
const { getDistance } = require("./getDistance");

const getNearestHospitals = async (accidentLocation) => {
    let { latitude, longitude } = accidentLocation;
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    const hospitals = await Hospital.find({
        latitude: { $gte: latitude - 0.45, $lte: latitude + 0.45 },
        longitude: { $gte: longitude - 0.45, $lte: longitude + 0.45 },
    }).select("-password");

    hospitals.sort((a, b) => {
        const aDistance = getDistance(
            a.latitude,
            a.longitude,
            latitude,
            longitude
        );
        const bDistance = getDistance(
            b.latitude,
            b.longitude,
            latitude,
            longitude
        );
        return aDistance - bDistance;
    });

    for (let i = 0; i < hospitals.length; i++) {
        hospitals[i] = {
            ...hospitals[i]._doc,
            distance: getDistance(
                hospitals[i].latitude,
                hospitals[i].longitude,
                latitude,
                longitude
            ),
        };
    }

    return hospitals;
};


module.exports = { getNearestHospitals };
