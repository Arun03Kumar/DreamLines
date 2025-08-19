const express = require("express");
const { cityController } = require("../../controllers");
const cityRoute = express.Router();

cityRoute.get("/", cityController.getAllCities);
cityRoute.get("/:id", cityController.getCityById);
cityRoute.post("/", cityController.createCity);
cityRoute.put("/:id", cityController.updateCity);
cityRoute.delete("/:id", cityController.deleteCity);

module.exports = cityRoute;
