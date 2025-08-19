const express = require("express");
const { airportController } = require("../../controllers");
const airportRoute = express.Router();

airportRoute.get("/", airportController.getAllAirports);
airportRoute.get("/:id", airportController.getAirportById);
airportRoute.post("/", airportController.createAirport);
airportRoute.put("/:id", airportController.updateAirport);
airportRoute.delete("/:id", airportController.deleteAirport);

module.exports = airportRoute;
