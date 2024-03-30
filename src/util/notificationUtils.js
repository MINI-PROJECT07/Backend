const NotificationH = require("../Models/NotificationH");
const { getNearestHospitals } = require("./accidentUtils");

const sendNotificationToNearestHospital = async (accident) => {
    const hospitals = await getNearestHospitals({
        latitude: accident.latitude,
        longitude: accident.longitude,
    });

    for (let i = 0; i < hospitals.length; i++) {
        const notification = new NotificationH({
            hospital: hospitals[i]._id,
            accident: accident._id,
            status: "pending",
        });
        const res = await notification.save();
    }
};

module.exports = { sendNotificationToNearestHospital };
