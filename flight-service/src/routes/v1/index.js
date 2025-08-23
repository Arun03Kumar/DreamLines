const express = require("express");
const healthRoute = require("./health-route");
const airplaneRoute = require("./airplane-route");
const cityRoute = require("./city-route");
const airportRoute = require("./airport-route");
const flightRoute = require("./flight-route");
const flightSeatRoute = require("./flightSeat-route");

const v1Routes = express.Router();

v1Routes.use("/health", healthRoute);
v1Routes.use("/airplanes", airplaneRoute);
v1Routes.use("/cities", cityRoute);
v1Routes.use("/airports", airportRoute);
v1Routes.use("/flights", flightRoute);
v1Routes.use("/flight-seats", flightSeatRoute);

module.exports = v1Routes;
