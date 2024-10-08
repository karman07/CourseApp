const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    content: [{ type: String, required: true }] 
});

module.exports = mongoose.model('Training', trainingSchema);
