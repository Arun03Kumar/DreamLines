const express = require("express");
const healthRoute = require("./health-route");
const airplaneRoute = require("./airplane-route");
const cityRoute = require("./city-route");

const v1Routes = express.Router();

// console.log("Setting up v1 routes");
v1Routes.use("/health", healthRoute);
v1Routes.use("/airplanes", airplaneRoute);
v1Routes.use("/cities", cityRoute);

module.exports = v1Routes;
