const express = require("express");
const healthRoute = require("./health-route");
const airplaneRoute = require("./airplane-route");
const cityRoute = require("./city-route");
const airportRoute = require("./airport-route");

const v1Routes = express.Router();

v1Routes.use("/health", healthRoute);
v1Routes.use("/airplanes", airplaneRoute);
v1Routes.use("/cities", cityRoute);
v1Routes.use("/airports", airportRoute);

module.exports = v1Routes;
