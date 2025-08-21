const { Booking } = require("../models");
const CrudRepositoryGeneral = require("./crud-repository");

class BookingRepository extends CrudRepositoryGeneral {
  constructor() {
    super(Booking);
  }

  async createBooking(data, transaction) {
    const response = await Booking.create(data, { transaction });
    return response;
  }

  async get(data, transaction) {
    const response = await Booking.findByPk(data, { transaction });
    if (!response) {
      throw new Error("Booking not found");
    }
    return response;
  }

  async update(id, data, transaction) {
    console.log("Updating booking:", id, data);
    const response = await Booking.update(
      data,
      {
        where: { id },
      },
      { transaction }
    );
    if (!response) {
      throw new Error("Booking not found");
    }
    return response;
  }
}

module.exports = BookingRepository;
