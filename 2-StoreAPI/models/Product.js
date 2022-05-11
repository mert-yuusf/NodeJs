const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'product title is required'],
        maxlength: [500, 'max length is 255'],
    },
    description: {
        type: String,
        maxlength: [1500, 'max length is 500']
    },
    price: {
        type: Number,
        min: [0, 'min price is 0'],
    },
    inventory: {
        type: Number,
        min: [0, 'min price is 0'],
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    company: {
        type: String,
        required: [true, 'company name is required'],
        enum: {
            values: ['ikea', "apple", "amazon", "ebay"],
            message: "{VALUE} is not supported"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Product', ProductSchema);