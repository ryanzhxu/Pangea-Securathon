var express = require('express');
var app = express();
var { StatusCodes } = require('http-status-codes');
const { default: mongoose } = require('mongoose');
const Physician = require('../models/physician');
const Patient = require('../models/patient');
const PatientsSubscriptions = require('../models/patientsSubscriptions');

// GET all patients' subscriptions data
app.get('/patientsSubscriptions', async (req, resp) => {
  try {
    const subscriptions = await PatientsSubscriptions.find({});
    resp.status(StatusCodes.OK).json(subscriptions);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
});

// GET a patient's subscription data by patientSubscriptionId
app.get('/patientsSubscriptions/:_patientSubscriptionId', async (req, resp) => {
  try {
    const foundRecord = await PatientsSubscriptions.findById(req.params._patientSubscriptionId);

    if (foundRecord) {
      resp.status(StatusCodes.OK).json(foundRecord);
    } else {
      resp
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `PatientSubscription with id ${req.params._patientSubscriptionId} does not exist` });
    }
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
});

// Add a patient subscription
app.post('/patientsSubscriptions', async (req, resp) => {
  if (await isSubscriptionRequestValid(req, resp)) {
    return;
  }

  const newSubscription = new PatientsSubscriptions(req.body);

  try {
    await newSubscription.save();
    resp.status(StatusCodes.CREATED).json(newSubscription);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
});

// This helper method checks whether a patient's subscription can be added
const isSubscriptionRequestValid = async (req, resp) => {
  const { patientId, physicianId, isScheduledUploads, uploadFrequency } = req.body;

  if (!patientId || !physicianId) {
    resp.status(StatusCodes.BAD_REQUEST).json({ message: 'Either Patient ID or Physician ID is missing.' });
    return true;
  }

  if (!mongoose.isValidObjectId(patientId) || !mongoose.isValidObjectId(physicianId)) {
    resp.status(StatusCodes.BAD_REQUEST).json({ error: 'Either Patient ID or Physician ID is invalid.' });
    return true;
  }

  if (await PatientsSubscriptions.findOne({ patientId })) {
    resp.status(StatusCodes.BAD_REQUEST).json({ error: `Patient ${patientId} has already set up scheduled uploads.` });
    return true;
  }

  if (!(await Patient.findById(patientId)) || !(await Physician.findById(physicianId))) {
    resp.status(StatusCodes.BAD_REQUEST).json({ error: `Either Patient or Physician does not exist.` });
    return true;
  }

  if (isScheduledUploads && !uploadFrequency) {
    resp.status(StatusCodes.BAD_REQUEST).json({ message: 'Frequency must be set in order to schedule uploads.' });
    return true;
  }

  return false;
};

module.exports = app;
