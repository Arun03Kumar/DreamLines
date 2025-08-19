const { City } = require("../models");
const CrudRepositoryGeneral = require("./crud-repository");

class CityRepository extends CrudRepositoryGeneral {
  constructor() {
    super(City);
  }
}

module.exports = CityRepository;
