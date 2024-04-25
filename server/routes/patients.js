const Patient = require("../models/patient");
var express = require("express");
var app = express();
var { StatusCodes } = require("http-status-codes");

app.get("/patients", async (req, resp) => {
  try {
    resp.status(StatusCodes.OK).send(await Patient.find({}));
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

app.get("/patients/:_patientId", async (req, resp) => {
  try {
    const foundPatient = await Patient.findById(req.params._patientId);

    if (foundPatient) {
      resp.status(StatusCodes.OK).json(foundPatient);
    } else {
      resp.status(StatusCodes.BAD_REQUEST).json({ error: `Patient with id ${req.params._patientId} does not exist` });
    }
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

app.post("/patients", async (req, resp) => {
  if (!req.body.name) {
    resp
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Patient must have a name." });
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
