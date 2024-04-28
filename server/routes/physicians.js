var express = require('express');
var app = express();
var { StatusCodes } = require('http-status-codes');
const { default: mongoose } = require('mongoose');
const Physician = require('../models/physician');
const Patient = require('../models/patient');
const PatientsSubscriptions = require('../models/patientsSubscriptions');
const authFlow = require('./helper/authflowSwitcher');

// GET all physicians
app.get('/physicians', async (req, resp) => {
  const physicians = await Physician.find({});

  try {
    resp.status(StatusCodes.OK).send(physicians);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

// GET a physician by its ID
app.get('/physicians/:_physicianId', async (req, resp) => {
  try {
    const foundPhysician = await Physician.findById(req.params._physicianId);

    if (foundPhysician) {
      resp.status(StatusCodes.OK).json(foundPhysician);
    } else {
      resp
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `Physician with id ${req.params._physicianId} does not exist` });
    }
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

// GET all patients associated with a physician by their ID
app.get('/physicians/:_physicianId/patients', async (req, resp) => {
  const physicianId = req.params._physicianId;

  if (!mongoose.isValidObjectId(physicianId)) {
    return resp.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid physicianId format.' });
  }

  try {
    if (!(await Physician.findById(physicianId))) {
      return resp.status(StatusCodes.BAD_REQUEST).json({ error: `Physician with ID ${physicianId} does not exist.` });
    }

    return resp.status(StatusCodes.OK).json(await Patient.find({ physicianId }));
  } catch (e) {
    return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

// GET all patient's subscriptions with a physician by their ID
app.get('/physicians/:_physicianId/patientsSubscriptions', async (req, resp) => {
  const physicianId = req.params._physicianId;

  if (!mongoose.isValidObjectId(physicianId)) {
    return resp.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid physicianId format.' });
  }

  try {
    if (!(await Physician.findById(physicianId))) {
      return resp.status(StatusCodes.BAD_REQUEST).json({ error: `Physician with ID ${physicianId} does not exist.` });
    }

    return resp.status(StatusCodes.OK).json(await PatientsSubscriptions.find({ physicianId }));
  } catch (e) {
    return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

// Add a physician
app.post('/physicians', async (req, resp) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
    resp.status(StatusCodes.BAD_REQUEST).send({ message: 'Please provide all required fields' });
    return;
  }
  console.log('starting');
  const result = await authFlow('SIGN_UP', req.body);
  if (result.status == 'success') {
    try {
      const newPhysician = new Physician({
        pangeaId: result.user.id, // Manually provided unique ID
        name: result.user.first_name + ' ' + result.user.last_name,
        email: result.user.email,
        phone: req.body.phone,
        patientIds: [],
      });
      await newPhysician.save();
      resp.status(StatusCodes.CREATED).send(result);
    } catch (e) {
      resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
  } else {
    resp.json({
      status: 'unknow error',
    });
  }
});

module.exports = app;
