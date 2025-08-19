const express = require("express");
const healthRoute = require("./health-route");

const v1Routes = express.Router();

v1Routes.use("/health", healthRoute);

module.exports = v1Routes;
