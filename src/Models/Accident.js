const mongoose = require("mongoose");
const { Schema } = mongoose;

const accidentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    latitude: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    longitude: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isTaken:{
        type: Boolean,
        default: false,
        required: true,
    },
    takenBy: {
        type: Schema.Types.ObjectId,
        ref: "hospital",
        default: null,
    },
    isResolved: {
        type: Boolean,
        default: false,
        required: true,
    },
    resolvedBy: {
        type: Schema.Types.ObjectId,
        ref: "hospital",
        default: null,
    },
    resolvedTime: {
        type: Date,
        default: null,
    },
    resolvedDescription: {
        type: String,
        default: "",
    },

});


const Accident = mongoose.model("Accident", accidentSchema);
module.exports = {Accident};