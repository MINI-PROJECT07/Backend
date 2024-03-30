const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationhSchema = new Schema({
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
    },
    accident: {
        type: Schema.Types.ObjectId,
        ref: "Accident",
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});


const NotificationH = mongoose.model("NotificationH", notificationhSchema);
module.exports = NotificationH;