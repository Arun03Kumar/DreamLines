const express = require("express");
const { BookingController } = require("../../controllers");
const bookingRoute = express.Router();

bookingRoute.post("/", BookingController.createBooking);
bookingRoute.post("/payment", BookingController.makePayment);

module.exports = bookingRoute;
