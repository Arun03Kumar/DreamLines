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

function validateUpdateSeats(req, res, next) {
  const { seats, dec } = req.body;
  const flightId = req.params.id;

  if (flightId === undefined || flightId === null || flightId === "") {
    errorResponse.message = "Invalid flight ID";
    errorResponse.error = {
      explanation: "Missing or invalid field: flightId",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  if (seats === undefined || seats === null || seats === "") {
    errorResponse.message = "Invalid seats";
    errorResponse.error = {
      explanation: "Missing or invalid field: seats",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  // if (dec === undefined || dec === null || dec === "") {
  //   errorResponse.message = "Invalid decrement flag";
  //   errorResponse.error = {
  //     explanation: "Missing or invalid field: dec",
  //   };
  //   return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  // }

  next();
}

module.exports = { validateFlightRequest, validateUpdateSeats };
