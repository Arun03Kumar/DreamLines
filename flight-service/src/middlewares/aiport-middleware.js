const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors");
const { errorResponse } = require("../utils");

function validateCreateRequestAirport(req, res, next) {
  if (!req.body.name) {
    errorResponse.message = "Something went wrong while creating airport";
    errorResponse.error = new AppError(
      "Name not found in the incoming request",
      StatusCodes.BAD_REQUEST
    );
  }

  if (!req.body.code) {
    errorResponse.message = "Something went wrong while creating airport";
    errorResponse.error = new AppError(
      "Code not found in the incoming request",
      StatusCodes.BAD_REQUEST
    );
  }

  if (!req.body.cityId) {
    errorResponse.message = "Something went wrong while creating airport";
    errorResponse.error = new AppError(
      "City ID not found in the incoming request",
      StatusCodes.BAD_REQUEST
    );
  }

  next();
}

module.exports = {
  validateCreateRequestAirport,
};
