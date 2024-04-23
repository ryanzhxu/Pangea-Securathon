const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Physician",
  new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    patientIds: [mongoose.Schema.Types.ObjectId],
  })
);
