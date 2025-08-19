const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    errorResponse.message = "Something went wrong while creating airplane";
    errorResponse.error = {
      explanation: "Model number is not found in the incoming request",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
