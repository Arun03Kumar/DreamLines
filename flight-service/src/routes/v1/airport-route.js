const express = require("express");
const { airportController } = require("../../controllers");
const { validateCreateRequestAirport } = require("../../middlewares");
const airportRoute = express.Router();

airportRoute.get("/", airportController.getAllAirports);
airportRoute.get("/:id", airportController.getAirportById);
airportRoute.post(
  "/",
  validateCreateRequestAirport,
  airportController.createAirport
);
airportRoute.put("/:id", airportController.updateAirport);
airportRoute.delete("/:id", airportController.deleteAirport);

module.exports = airportRoute;
