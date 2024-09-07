const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    name: String,
    price: {
        type: Number,
        required: true 
    },
    description: String,
    image: String,
    type: {
        type: Number,
        required: true 
    }
});

module.exports = mongoose.model('Training', trainingSchema);
