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
  const { name, birthdate, email, physicianId } = req.body;

  if (!name) {
    resp
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Patient must have a name." });
    return;
  }

  const newPatient = new patientModel({
    name,
    birthdate,
    email,
    physicianId,
  });

  try {
    await newPatient.save();
    resp.status(StatusCodes.CREATED).send(newPatient);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

module.exports = app;
