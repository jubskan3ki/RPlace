const mongoose = require('mongoose');

const PixelSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    color: {
        type: String, 
        required: true,
    },
    username: {
        type: String,
        default: 'Anonyme'
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

const Pixel = mongoose.model('Pixel', PixelSchema);

module.exports = Pixel;
