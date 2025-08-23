const express = require("express");
const { flightSeatController } = require("../../controllers");
const flightSeatRoute = express.Router();

flightSeatRoute.post("/:id/register", flightSeatController.registerSeats);
flightSeatRoute.get("/:id", flightSeatController.getFlightSeats);
flightSeatRoute.post(
  "/:id/assign-seats",
  flightSeatController.assignRandomSeats
);

module.exports = flightSeatRoute;
