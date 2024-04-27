var express = require('express');
var app = express();
var { StatusCodes } = require('http-status-codes');
const { default: mongoose } = require('mongoose');
const PatientHealthData = require('../models/patientHealthData');

app.get('/patientHealthData', async (req, resp) => {
  try {
    resp.status(StatusCodes.OK).send(await PatientHealthData.find({}));
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

app.get('/patientHealthData/:_patientHealthDataId', async (req, resp) => {
  try {
    const foundRecord = await PatientHealthData.findById(req.params._patientHealthDataId);

    if (foundRecord) {
      resp.status(StatusCodes.OK).json(foundRecord);
    } else {
      resp
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `PatientHealthData with id ${req.params._patientHealthDataId} does not exist` });
    }
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

app.post('/patientHealthData', async (req, resp) => {
  const patientId = req.body.patientId;
  const physicianId = req.body.physicianId;

  if (!patientId || !physicianId) {
    return resp.status(StatusCodes.BAD_REQUEST).send({ message: 'Either Patient ID or Physician ID is missing.' });
  }

  if (!mongoose.isValidObjectId(patientId)) {
    return resp.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid patientId format.' });
  }

  if (!mongoose.isValidObjectId(physicianId)) {
    return resp.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid physicianId format.' });
  }

  const newRecord = new PatientHealthData(req.body);

  try {
    await newRecord.save();
    resp.status(StatusCodes.CREATED).send(newRecord);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

module.exports = app;
