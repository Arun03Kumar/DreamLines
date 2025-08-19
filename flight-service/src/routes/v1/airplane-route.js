const express = require("express");
const { airplaneController } = require("../../controllers");
const { validateCreateRequest } = require("../../middlewares");

const airplaneRoute = express.Router();

airplaneRoute.get("/", airplaneController.getAllAirplanes);
airplaneRoute.get("/:id", airplaneController.getAirplaneById);

airplaneRoute.post(
  "/",
  validateCreateRequest,
  airplaneController.createAirplane
);

airplaneRoute.delete("/:id", airplaneController.deleteAirplane);
airplaneRoute.put(
  "/:id",
  validatePutRequest,
  airplaneController.updateAirplane
);
airplaneRoute.patch(
  "/:id",
  validatePatchRequest,
  airplaneController.updateAirplane
);

module.exports = airplaneRoute;
