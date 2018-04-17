const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    type: String,
    address: {
        street: String,
        city: String,
        zip: String,
        state: {
            type: String,
            required: true
        }
    },
    founded: Date,
    size: {
        type: Number,
        required: true
    },
    isHip: Boolean,
    keywords: [String]
});

module.exports = mongoose.model('Comapny', schema);