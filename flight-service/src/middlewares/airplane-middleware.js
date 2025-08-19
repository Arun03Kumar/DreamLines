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

// For PUT: require all fields (example: modelNumber, capacity)
function validatePutRequest(req, res, next) {
  if (!req.body.modelNumber || !req.body.capacity) {
    errorResponse.message = "Invalid data for full update (PUT)";
    errorResponse.error = {
      explanation: "Both modelNumber and capacity are required for PUT request",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
}

function validatePatchRequest(req, res, next) {
  if (!req.body.modelNumber && !req.body.capacity) {
    errorResponse.message = "Invalid data for partial update (PATCH)";
    errorResponse.error = {
      explanation:
        "At least one of modelNumber or capacity must be provided for PATCH request",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validatePutRequest,
  validatePatchRequest,
};
