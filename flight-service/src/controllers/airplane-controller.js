const { error } = require("winston");
const { AirplaneRepository } = require("../repositories");
const { AirplaneService } = require("../services");

const { StatusCodes } = require("http-status-codes");

const airplaneService = new AirplaneService(new AirplaneRepository());

async function createAirplane(req, res) {
  try {
    console.log(req.body);
    const airplane = await airplaneService.createAirplane(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created an airplane",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: "Something went wrong while creating an airplane",
        data: null,
        error: error,
      });
  }
}

module.exports = {
  createAirplane,
};
