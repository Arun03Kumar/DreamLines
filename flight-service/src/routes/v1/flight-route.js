const express = require("express");
const { flightController } = require("../../controllers");
const { validateFlightRequest } = require("../../middlewares");
const flightRoute = express.Router();

flightRoute.post("/", validateFlightRequest, flightController.createFlight);
flightRoute.get("/", flightController.getAllFlights);
flightRoute.get("/:id", flightController.getFlightById);

module.exports = flightRoute;
