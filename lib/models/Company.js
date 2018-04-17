const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    type: {
        type: String,
        enum: ['profit', 'non-profit']
    },
    address: {
        street: String,
        city: String,
        zip: String,
        state: {
            type: String,
            required: true
        }
    },
    founded: {
        type: Date,
        default: Date.now
    },
    size: {
        type: Number,
        required: true,
        min: 1
    },
    isHip: Boolean,
    keywords: [String]
});

module.exports = mongoose.model('Comapny', schema);