const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'content can not be null!'],
        trim: true,
        maxlength: [255, 'content length must be less then 255 char']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);