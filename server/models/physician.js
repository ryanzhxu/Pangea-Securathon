const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Physician',
  new mongoose.Schema({
    pangeaId: {
      type: String,
      unique: true,
      required: true,
    },
    name: String,
    email: String,
    phone: String,
    patientIds: [mongoose.Schema.Types.ObjectId],
  })
);
