const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { FlightService } = require("../services");
const { successResponse } = require("../utils");

const flightService = new FlightService(new FlightRepository());

async function createFlight(req, res) {
  try {
    const flightData = req.body;
    const newFlight = await flightService.createFlight(flightData);
    successResponse.data = newFlight;
    res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    console.error("Error creating flight:", error);
    successResponse.error = "Failed to create flight";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(successResponse);
  }
}

module.exports = {
  createFlight,
};
