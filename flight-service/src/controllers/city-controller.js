const { CityRepository } = require("../repositories");
const { CityService } = require("../services/");
const { successResponse, errorResponse } = require("../utils");

const cityService = new CityService(new CityRepository());

async function createCity(req, res) {
  try {
    const city = await cityService.createCity(req.body);
    successResponse.data = city;
    res.status(201).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    res.status(500).json(errorResponse);
  }
}

async function getCityById(req, res) {
  try {
    const city = await cityService.getCityById(req.params.id);
    successResponse.data = city;
    res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    res.status(500).json(errorResponse);
  }
}

async function getAllCities(req, res) {
  try {
    const cities = await cityService.getAllCities();
    successResponse.data = cities;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(500).json(errorResponse);
  }
}

async function deleteCity(req, res) {
  try {
    await cityService.deleteCity(req.params.id);
    successResponse.message = "City deleted successfully";
    res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    res.status(500).json(errorResponse);
  }
}

async function updateCity(req, res) {
  try {
    const city = await cityService.updateCity(req.params.id, req.body);
    successResponse.data = city;
    res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    res.status(500).json(errorResponse);
  }
}

module.exports = {
  createCity,
  getCityById,
  getAllCities,
  deleteCity,
  updateCity,
};
