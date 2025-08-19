const CrudRepositoryGeneral = require("./crud-repository");
const { Airport } = require("../models");

class AirportRepository extends CrudRepositoryGeneral {
  constructor() {
    super(Airport);
  }
}

module.exports = AirportRepository;
