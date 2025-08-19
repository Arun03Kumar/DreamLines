const express = require("express");
const { airplaneController } = require("../../controllers");
const { validateCreateRequest } = require("../../middlewares");

const airplaneRoute = express.Router();

airplaneRoute.post(
  "/",
  validateCreateRequest,
  airplaneController.createAirplane
);

module.exports = airplaneRoute;
