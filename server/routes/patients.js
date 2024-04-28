var express = require('express');
var app = express();
var { StatusCodes } = require('http-status-codes');
const { default: mongoose } = require('mongoose');
const Patient = require('../models/patient');
const PatientHealthData = require('../models/patientHealthData');
const PatientsSubscriptions = require('../models/patientsSubscriptions');

// GET all patients
app.get('/patients', async (req, resp) => {
  try {
    resp.status(StatusCodes.OK).send(await Patient.find({}));
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

// GET a patient by its ID
// GET /patients/123?isOverviewPage=true - returns patient data as long with their subscription detail for consume in overview page
app.get('/patients/:_patientId', async (req, resp) => {
  const patientId = req.params._patientId;
  const isOverviewPage = req.query.isOverviewPage === 'true';

  try {
    const foundPatient = await Patient.findById(patientId);

    if (foundPatient) {
      if (!isOverviewPage) {
        resp.status(StatusCodes.OK).json(foundPatient);
      }

      const foundPatientSubscription = await PatientsSubscriptions.findOne({ patientId });

      if (foundPatientSubscription) {
        const patientData = foundPatient.toObject();

        resp.status(StatusCodes.OK).json({
          ...foundPatient.toObject(),
          ...foundPatientSubscription.toObject(),
          ...{ age: Math.abs(new Date(new Date().getTime() - new Date(patientData.birthdate).getTime()).getUTCFullYear() - 1970).toString() },
        });
      }
    } else {
      resp.status(StatusCodes.BAD_REQUEST).json({ error: `Patient with id ${req.params._patientId} does not exist` });
    }
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});


// GET all health data being sent by a patient by its ID
app.get('/patients/:_patientId/patientHealthData', async (req, resp) => {
  const patientId = req.params._patientId;

  if (!mongoose.isValidObjectId(patientId)) {
    return resp.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid patientId format.' });
  }

  try {
    const healthData = await PatientHealthData.find({ patientId });

    if (healthData.length === 0) {
      return resp
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `No health data found for patient with ID ${patientId}.` });
    }

    return resp.status(StatusCodes.OK).json(healthData);
  } catch (e) {
    return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

// GET the subscription detail of a patient by its ID
app.get('/patients/:_patientId/patientsSubscriptions', async (req, resp) => {
  const patientId = req.params._patientId;

  if (!mongoose.isValidObjectId(patientId)) {
    return resp.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid patientId format.' });
  }

  try {
    if (!(await Patient.findById(patientId))) {
      return resp.status(StatusCodes.BAD_REQUEST).json({ error: `Patient with ID ${patientId} does not exist.` });
    }

    return resp.status(StatusCodes.OK).json(await PatientsSubscriptions.find({ patientId }));
  } catch (e) {
    return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

// Add a patient
app.post('/patients', async (req, resp) => {
  if (!req.body.name) {
    resp.status(StatusCodes.BAD_REQUEST).send({ message: 'Patient must have a name.' });
    return;
  }

  const newPatient = new Patient(req.body);

  try {
    await newPatient.save();
    resp.status(StatusCodes.CREATED).send(newPatient);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

module.exports = app;
