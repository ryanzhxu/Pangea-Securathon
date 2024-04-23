const mongoose = require("mongoose");
const { Schema } = require("mongoose");

module.exports = mongoose.model(
  "Patient",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      birthdate: {
        type: Date,
        required: false,
        default: null,
      },
      email: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
        required: false,
        default: "",
      },
      physicianId: {
        type: Schema.Types.ObjectId,
        ref: "Physician",
        required: true,
      },
    },
    {
      collection: "patients",
    }
  )
);
