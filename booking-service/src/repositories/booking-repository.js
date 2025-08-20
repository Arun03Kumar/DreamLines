const { Booking } = require("../models");

class BookingRepository extends CrudRepositoryGeneral {
  constructor() {
    super(Booking);
  }
}

module.exports = BookingRepository;
