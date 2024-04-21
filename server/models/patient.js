const mongoose = require("mongoose");

module.exports = mongoose.model("Patient", new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    birthdate: Date,
    email: String,
    physicianId: mongoose.Schema.Types.ObjectId,
}));
