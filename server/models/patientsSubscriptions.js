const mongoose = require('mongoose');
const { Schema } = require('mongoose');

module.exports = mongoose.model(
  'PatientsSubscriptions',
  new mongoose.Schema(
    {
      patientId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Patient',
      },
      physicianId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Physician',
      },
      isScheduledUploads: {
        type: Boolean,
        required: true,
      },
      uploadFrequency: {
        type: String,
        required: false,
      },
      healthMetricsToBeTracked: {
        type: [String],
        required: false,
        default: ['heartRate', 'bloodPressure', 'bloodGlucose', 'SpO2', ''],
      },
      healthConditons: {
        type: String,
        default: '',
      },
    },
    {
      collection: 'patients_subscriptions',
    }
  )
);
