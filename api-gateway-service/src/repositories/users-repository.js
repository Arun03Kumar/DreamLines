const CrudRepositoryGeneral = require("./crud-repository");

const { User } = require("../models");

class UsersRepository extends CrudRepositoryGeneral {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}

module.exports = UsersRepository;
