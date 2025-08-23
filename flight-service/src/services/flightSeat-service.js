const db = require("../models");
const FlightSeatRepository = require("../repositories/flightSeat-repository");

class FlightSeatService {
  constructor(repo = new FlightSeatRepository()) {
    this.repo = repo;
  }

  async registerSeatsToFlight(flightId) {
    return this.repo.initInventoryForFlight(flightId);
  }

  async getSeats(flightId) {
    return this.repo.getSeatStatuses(flightId);
  }

  async assignRandomSeats(flightId, count, bookingId) {
    return db.sequelize.transaction(async (transaction) => {
      const assigned = await this.repo.assignRandomSeats(
        flightId,
        count,
        bookingId,
        transaction
      );
      if (assigned.length < count) {
        throw new Error("Not enough seats available");
      }
      return assigned;
    });
  }
}

module.exports = FlightSeatService;
