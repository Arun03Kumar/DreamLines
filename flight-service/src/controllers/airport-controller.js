const { AirportRepository } = require("../repositories");
const { AirportService } = require("../services");
const { successResponse, errorResponse } = require("../utils");

const airportService = new AirportService(new AirportRepository());

async function createAirport(req, res) {
  try {
    const airport = await airportService.createAirport(req.body);
    successResponse.data = airport;
    res.status(201).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    res.status(500).json(errorResponse);
  }
}

async function getAirportById(req, res) {
  try {
    const airport = await airportService.getAirportById(req.params.id);
    successResponse.data = airport;
    res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    res.status(500).json(errorResponse);
  }
}

async function getAllAirports(req, res) {
  try {
    const airports = await airportService.getAllAirports();
    successResponse.data = airports;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(500).json(errorResponse);
  }
}

async function deleteAirport(req, res) {
  try {
    await airportService.deleteAirport(req.params.id);
    successResponse.message = "Airport deleted successfully";
    res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    res.status(500).json(errorResponse);
  }
}

async function updateAirport(req, res) {
  try {
    const airport = await airportService.updateAirport(req.params.id, req.body);
    successResponse.data = airport;
    res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    res.status(500).json(errorResponse);
  }
}

module.exports = {
  createAirport,
  getAirportById,
  getAllAirports,
  deleteAirport,
  updateAirport,
};
