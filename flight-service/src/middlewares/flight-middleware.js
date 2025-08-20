// Example: src/middlewares/flight-middleware.js

const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils");

function validateFlightRequest(req, res, next) {
  const requiredFields = [
    "flightNumber",
    "airplaneId",
    "departureAirportId",
    "arrivalAirportId",
    "arrivalTime",
    "departureTime",
    "price",
    "boardingGate",
    "totalSeats",
  ];

  const missingFields = requiredFields.filter(
    (field) =>
      req.body[field] === undefined ||
      req.body[field] === null ||
      req.body[field] === ""
  );

  if (missingFields.length > 0) {
    errorResponse.message = "Invalid flight data";
    errorResponse.error = {
      explanation: `Missing or invalid fields: ${missingFields.join(", ")}`,
    };
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  next();
}

module.exports = { validateFlightRequest };
