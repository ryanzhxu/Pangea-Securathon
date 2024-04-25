var express = require('express');
var app = express();
var { StatusCodes } = require('http-status-codes');
const { default: mongoose } = require('mongoose');
const Physician = require('../models/physician');
const Patient = require('../models/patient');

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
  if (!req.body.name) {
    resp.status(StatusCodes.BAD_REQUEST).send({ message: 'Physician must have a name.' });
    return;
  }

  const newPhysician = new Physician(req.body);

  try {
    await newPhysician.save();
    resp.status(StatusCodes.CREATED).send(newPhysician);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

module.exports = app;
