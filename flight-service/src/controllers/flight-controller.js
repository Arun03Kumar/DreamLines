const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { FlightService } = require("../services");
const { successResponse, errorResponse } = require("../utils");

const flightService = new FlightService(new FlightRepository());

async function createFlight(req, res) {
  try {
    const flightData = req.body;
    const newFlight = await flightService.createFlight(flightData);
    successResponse.data = newFlight;
    res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    console.error("Error creating flight:", error);
    errorResponse.error = "Failed to create flight";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getAllFlights(req, res) {
  try {
    const query = req.query;
    console.log("Fetching flights with query:", query);
    const flights = await flightService.getAllFlights(query);
    successResponse.data = flights;
    res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    console.error("Error fetching flights:", error);
    errorResponse.error = "Failed to fetch flights";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getFlightById(req, res) {
  try {
    const flightId = req.params.id;
    const flight = await flightService.getFlightById(flightId);
    successResponse.data = flight;
    res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    console.error("Error fetching flight:", error);
    errorResponse.error = "Failed to fetch flight";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlightById,
};
