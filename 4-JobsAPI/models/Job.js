const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'company name is required'],
        maxlength: 255
    },
    position: {
        type: String,
        required: [true, 'position name is required'],
        maxlength: 255
    },
    status: {
        type: String,
        required: [true, 'position name is required'],
        maxlength: 255,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true });


module.exports = mongoose.model('Job', JobSchema);