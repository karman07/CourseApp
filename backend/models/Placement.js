const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  companyName: String,
  companyIcon: String,
});

module.exports = mongoose.model('Placement', placementSchema);
