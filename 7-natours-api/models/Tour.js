const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a tour name"],
        maxlength: [255, "Max length is 255 chars"]
    },
    duration: {
        type: Number,
        required: [true, "Please provide a duration value"],
        min: 1,
        max: 50
    },
    maxGroupSize: {
        type: Number,
        required: [true, "Please provide a duration value"],
        min: 1,
        max: 50
    },
    price: {
        type: Number,
        required: [true, "Please provide a price value"],
        min: 1
    },
    difficulty: {
        type: String,
        required: [true, "Please provide a difficultly value"],
        enum: {
            values: ["easy", "medium", "difficult"],
            message: "{VALUE} is not supported"
        }
    },
    summary: {
        type: String,
        maxlength: [500, "Max length of summary is 500 char"],
        required: [true, "Please provide a summary value"],
    },
    description: {
        type: String,
        maxlength: [1500, "Max length of summary is 500 char"],
        required: [true, "Please provide a summary value"]
    },
    imageCover: {
        type: String,
        default: "cover.png"
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Tour",TourSchema);