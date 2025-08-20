const express = require("express");
const { BookingController } = require("../../controllers");
const bookingRoute = express.Router();

bookingRoute.post("/", BookingController.createBooking);

module.exports = bookingRoute;
