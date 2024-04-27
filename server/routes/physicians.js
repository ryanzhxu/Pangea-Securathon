var express = require('express');
var app = express();
var { StatusCodes } = require('http-status-codes');
const { default: mongoose } = require('mongoose');
const Physician = require('../models/physician');
const Patient = require('../models/patient');
const authFlow = require('./helper/authflowSwitcher');

app.get('/physicians', async (req, resp) => {
  const physicians = await Physician.find({});

  try {
    resp.status(StatusCodes.OK).send(physicians);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

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
