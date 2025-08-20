const express = require("express");
const { flightController } = require("../../controllers");
const {
  validateFlightRequest,
  validateUpdateSeats,
} = require("../../middlewares");
const flightRoute = express.Router();

flightRoute.post("/", validateFlightRequest, flightController.createFlight);
flightRoute.get("/", flightController.getAllFlights);
flightRoute.get("/:id", flightController.getFlightById);
flightRoute.patch(
  "/:id/update-seats",
  validateUpdateSeats,
  flightController.updateSeats
);

module.exports = flightRoute;
