const express = require("express");
const { healthController } = require("../../controllers");
const healthRoute = express.Router();

healthRoute.get("/", healthController.check);

module.exports = healthRoute;
