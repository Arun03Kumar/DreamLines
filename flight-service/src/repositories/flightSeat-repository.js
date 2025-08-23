const { Flight, Seat, FlightSeat, sequelize } = require("../models");
const { Op } = require("sequelize");

class FlightSeatRepository {
  async initInventoryForFlight(flightId) {
    const flight = await Flight.findByPk(flightId);
    // console.log("Initializing inventory for flight:", flight, fli);
    if (!flight) throw new Error("Flight not found");

    // Get all seats for the airplane of this flight
    const seats = await Seat.findAll({
      where: { airplaneId: flight.airplaneId },
      attributes: ["id"],
    });
    console.log(`Found ${seats.length} seats for airplane`, seats);

    // Bulk create inventory (ignore duplicates)
    const rows = seats.map((s) => ({
      flightId,
      seatId: s.id,
      status: "AVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    if (rows.length === 0) return 0;

    // Upsert-like: ignore existing unique (flightId, seatId)
    await FlightSeat.bulkCreate(rows, { ignoreDuplicates: true });
    return rows.length;
  }

  async getSeatStatuses(flightId) {
    return FlightSeat.findAll({
      where: { flightId },
      include: [{ model: Seat, attributes: ["row", "col", "seatType"] }],
      order: [
        [Seat, "row", "ASC"],
        [Seat, "col", "ASC"],
      ],
    });
  }

  async assignRandomSeats(flightId, count, bookingId, transaction) {
    const assigned = [];

    for (let i = 0; i < count; i++) {
      const seat = await FlightSeat.findOne({
        where: { flightId, status: "AVAILABLE" },
        order: sequelize.random(),
        lock: transaction.LOCK.UPDATE,
        skipLocked: true,
        transaction,
      });

      if (!seat) break;

      await seat.update({ status: "BOOKED", bookingId }, { transaction });
      assigned.push(seat);
    }

    return assigned;
  }

  async releaseSeatsForBooking(flightId, bookingId, transaction) {
    await FlightSeat.update(
      { status: "AVAILABLE", bookingId: null, holdExpiresAt: null },
      {
        where: { flightId, bookingId, status: { [Op.ne]: "BOOKED" } },
        transaction,
      }
    );
  }
}

module.exports = FlightSeatRepository;
