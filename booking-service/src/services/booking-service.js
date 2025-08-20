const axios = require("axios");
const db = require("../models");
const { ServerConfig } = require("../config");
const BookingRepository = require("../repositories/booking-repository");

const bookingRepository = new BookingRepository();

async function createBooking(data) {
  try {
    const result = await db.sequelize.transaction(async (transaction) => {
      const flight = await axios.get(
        `${ServerConfig.FLIGHT_SERVICE_URL}/${data.flightId}`
      );
      if (flight.data.data.totalSeats < data.noOfSeats) {
        throw { message: "Not enough seats available" };
      }
      const totalBillingAmount = data.noOfSeats * flight.data.data.price;
      const bookingPayload = { ...data, totalCost: totalBillingAmount };
      const booking = await bookingRepository.createBooking(
        bookingPayload,
        transaction
      );

      const response = await axios.patch(
        `${ServerConfig.FLIGHT_SERVICE_URL}/${data.flightId}/update-seats`,
        {
          seats: data.noOfSeats,
          dec: true,
        }
      );
      return booking;
    });
    // return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error(error.message);
  }
}

module.exports = {
  createBooking,
};
