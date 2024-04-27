const mongoose = require('mongoose');
const { Schema } = require('mongoose');

module.exports = mongoose.model(
  'PatientHealthData',
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
      healthData: {
        heartRate: {
          type: Number,
          required: false,
        },
        bloodPressure: {
          systolic: {
            type: Number,
            required: false,
          },
          diastolic: {
            type: Number,
            required: false,
          },
        },
        bloodGlucose: {
          type: Number,
          required: false,
        },
        SpO2: {
          type: Number,
          required: false,
        },
      },
      notes: {
        type: String,
        default: '',
      },
      time: {
        type: Date,
        required: false,
        default: Date.now,
      },
    },
    {
      collection: 'patientHealthData',
    }
  )
);
