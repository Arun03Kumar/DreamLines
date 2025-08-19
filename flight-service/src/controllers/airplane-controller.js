const { error } = require("winston");
const { AirplaneRepository } = require("../repositories");
const { AirplaneService } = require("../services");

const { StatusCodes } = require("http-status-codes");
const { successResponse, errorResponse } = require("../utils");

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

async function getAirplaneById(req, res) {
  try {
    const airplane = await airplaneService.getAirplaneById(req.params.id);
    successResponse.data = airplane;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
  }
}

async function getAllAirplanes(req, res) {
  try {
    const airplanes = await airplaneService.getAllAirplanes();
    successResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function deleteAirplane(req, res) {
  try {
    const airplane = await airplaneService.destroyAirplane(req.params.id);
    successResponse.data = airplane;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
  }
}

async function updateAirplane(req, res) {
  try {
    const updated = await airplaneService.updateAirplane(
      req.params.id,
      req.body
    );
    successResponse.data = updated;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplaneById,
  getAllAirplanes,
  updateAirplane,
  deleteAirplane,
};
