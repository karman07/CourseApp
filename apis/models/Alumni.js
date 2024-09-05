const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: String,
  package: Number,
  company: String,
});

module.exports = mongoose.model('Alumni', alumniSchema);
