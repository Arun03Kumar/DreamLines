const CrudRepositoryGeneral = require("./crud-repository");
const { Flight } = require("../models");

class FlightRepository extends CrudRepositoryGeneral {
  constructor() {
    super(Flight);
  }
}

module.exports = FlightRepository;
