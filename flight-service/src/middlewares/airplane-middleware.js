const { StatusCodes } = require("http-status-codes");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Model number is required",
      data: null,
      error: {
        explanation: "Model number is not found in the incoming request",
      },
    });
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
