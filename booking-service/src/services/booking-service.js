const axios = require("axios");
const db = require("../models");
const { ServerConfig } = require("../config");

async function createBooking(data) {
  try {
    const result = await db.sequelize.transaction(async (transaction) => {
      const flight = await axios.get(
        `${ServerConfig.FLIGHT_SERVICE_URL}/${data.flightId}`
      );
      if (flight.data.data.totalSeats < data.noOfSeats) {
        throw { message: "Not enough seats available" };
      }
      return true;
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
