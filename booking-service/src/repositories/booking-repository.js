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
}

module.exports = BookingRepository;
