const patientModel = require("../models/patient");
var express = require("express");
var app = express();
var { StatusCodes } = require("http-status-codes");

app.get("/patients", async (req, resp) => {
  const patients = await patientModel.find({});

  try {
    resp.status(StatusCodes.OK).send(patients);
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

  const newPatient = new patientModel(req.body);

  try {
    await newPatient.save();
    resp.status(StatusCodes.CREATED).send(newPatient);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

module.exports = app;
