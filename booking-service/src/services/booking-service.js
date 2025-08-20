const axios = require("axios");
const db = require("../models");
const { ServerConfig } = require("../config");

async function createBooking(data) {
  try {
    const result = await db.sequelize.transaction(async (transaction) => {
      const flight = await axios.get(
        `${ServerConfig.FLIGHT_SERVICE_URL}/${data.flightId}`
      );
      return true;
    });
    // return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Booking creation failed");
  }
}

module.exports = {
  createBooking,
};
