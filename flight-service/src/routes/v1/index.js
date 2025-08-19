const express = require("express");
const healthRoute = require("./health-route");
const airplaneRoute = require("./airplane-route");

const v1Routes = express.Router();

v1Routes.use("/health", healthRoute);
v1Routes.use("/airplanes", airplaneRoute);

module.exports = v1Routes;
