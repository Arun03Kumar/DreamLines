const { Airplane } = require("../models");
const CrudRepositoryGeneral = require("./crud-repository");

class AirplaneRepository extends CrudRepositoryGeneral {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
