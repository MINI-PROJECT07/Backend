const mongoose = require("mongoose")
const { add } = require("nodemon/lib/rules")
const { Schema } = mongoose

const BloodDonorSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        default: "",
    },
    age: {
        type: Number,
        default: 18
    },
    permanantLocation: {
        latitude: {
            type: Schema.Types.Decimal128,
            default: 0
        },
        longitude: {
            type: Schema.Types.Decimal128,
            default: 0
        }
    },
    address: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    }
})

const BloodDonor = mongoose.model("bloodDonor", BloodDonorSchema)
module.exports = {BloodDonor}