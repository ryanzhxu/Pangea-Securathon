const physicianModel = require("../models/physician");
var express = require("express");
var app = express();
var { StatusCodes } = require("http-status-codes");

app.get("/physicians", async (req, resp) => {
  const physicians = await physicianModel.find({});

  try {
    resp.status(StatusCodes.OK).send(physicians);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

app.post("/physicians", async (req, resp) => {
  if (!req.body.name) {
    resp
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Physician must have a name." });
    return;
  }

  const newPhysician = new physicianModel(req.body);

  try {
    await newPhysician.save();
    resp.status(StatusCodes.CREATED).send(newPhysician);
  } catch (e) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

module.exports = app;
