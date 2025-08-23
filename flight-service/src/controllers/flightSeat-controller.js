const { FlightSeatService } = require("../services");
const { successResponse, errorResponse } = require("../utils");
const { StatusCodes } = require("http-status-codes");

const flightSeatService = new FlightSeatService();

async function registerSeats(req, res) {
  try {
    const flightId = Number(req.params.id);
    const created = await flightSeatService.registerSeatsToFlight(flightId);
    successResponse.data = { created };
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message || "Failed to register seats";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

async function getFlightSeats(req, res) {
  try {
    const flightId = Number(req.params.id);
    const seats = await flightSeatService.getSeats(flightId);
    successResponse.data = seats;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message || "Failed to fetch seats";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

// Assign random seats after successful booking
async function assignRandomSeats(req, res) {
  try {
    const flightId = Number(req.params.id);
    const { count = 1, bookingId } = req.body;
    const assigned = await flightSeatService.assignRandomSeats(
      flightId,
      Number(count),
      Number(bookingId)
    );
    successResponse.data = assigned;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message || "Failed to assign seats";
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}

module.exports = {
  registerSeats,
  getFlightSeats,
  assignRandomSeats,
};
