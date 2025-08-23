const axios = require("axios");
const db = require("../models");
const { ServerConfig } = require("../config");
const BookingRepository = require("../repositories/booking-repository");
const { BOOKING_STATUS } = require("../utils");
const { sendMessage } = require("../config/queue-config");
const { BOOKED, CANCELED } = BOOKING_STATUS;
// console.log(BOOKING_STATUS, BOOKED);

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

async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction
    );

    if (bookingDetails.status === CANCELED) {
      throw new Error("Booking is expired");
    }

    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();

    if (currentTime - bookingTime > 15 * 60 * 1000) {
      await cancelBooking(data.bookingId);
      throw new Error("Booking expired");
    }

    if (bookingDetails.totalCost != data.totalCost) {
      throw new Error("Total cost mismatch");
    }

    if (bookingDetails.userId != data.userId) {
      throw new Error("User ID mismatch");
    }

    const response = await bookingRepository.update(
      data.bookingId,
      { status: BOOKED },
      transaction
    );

    const bookingDetailsUpdated = await bookingRepository.get(
      data.bookingId,
      transaction
    );
    await sendMessage("TICKET_NOTIFICATION_QUEUE", {
      subject: "Your DreamLines Flight Ticket",
      // recipientEmail: bookingDetailsUpdated.userEmail, // Ensure you have this data
      userId: bookingDetailsUpdated.userId,
      bookingId: bookingDetailsUpdated.id,
      // flightDetails: bookingDetailsUpdated.flightDetails,
      ticketNumber: bookingDetailsUpdated.id + "-" + Date.now(),
      // boardingTime: bookingDetailsUpdated.flightDetails.departureTime,
      // seatNumber: bookingDetailsUpdated.seatNumbers || "To be assigned",
    });

    await transaction.commit();
    console.log("Payment successful:", response);
    return response;
  } catch (err) {
    console.error("Error making payment:", err);
    await transaction.rollback();
    throw new Error(err.message);
  }
}

async function cancelBooking(bookingId) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(bookingId, transaction);
    if (bookingDetails.status === CANCELED) {
      await transaction.commit();
      return true;
    }
    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE_URL}/${bookingDetails.flightId}/update-seats`,
      {
        seats: bookingDetails.noOfSeats,
      }
    );
    await bookingRepository.update(
      bookingId,
      { status: CANCELED },
      transaction
    );
    await transaction.commit();
    return true;
  } catch (error) {
    console.error("Error canceling booking:", error);
    await transaction.rollback();
    throw new Error(error.message);
  }
}

module.exports = {
  createBooking,
  makePayment,
};
