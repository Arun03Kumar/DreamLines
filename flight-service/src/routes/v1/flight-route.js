const express = require("express");
const { flightController } = require("../../controllers");
const { validateFlightRequest } = require("../../middlewares");
const flightRoute = express.Router();

flightRoute.post("/", validateFlightRequest, flightController.createFlight);

module.exports = flightRoute;
