const { error } = require("winston");
const { AirplaneRepository } = require("../repositories");
const { AirplaneService } = require("../services");

const { StatusCodes } = require("http-status-codes");
const { successResponse } = require("../utils");

const airplaneService = new AirplaneService(new AirplaneRepository());

async function createAirplane(req, res) {
  try {
    const airplane = await airplaneService.createAirplane(req.body);
    successResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  createAirplane,
};
