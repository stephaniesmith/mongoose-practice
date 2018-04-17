const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    description: String,
    type: String,
    address: {
        street: String,
        city: String,
        zip: String,
        state: String
    },
    size: Number,
    isHip: Boolean,
    keywords: [String]
});

module.exports = mongoose.model('Comapny', schema);