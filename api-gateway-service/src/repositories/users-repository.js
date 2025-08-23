const CrudRepositoryGeneral = require("./crud-repository");

const { User } = require("../models");

class UsersRepository extends CrudRepositoryGeneral {
  constructor() {
    super(User);
  }
}

module.exports = UsersRepository;
