const { Logger } = require("../config");

class CrudRepositoryGeneral {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      console.log("from repository layer", data);
      const response = await this.model.create(data);
      return response;
    } catch (err) {
      Logger.error("Error creating record:", err);
      throw err;
    }
  }

  async destroy(id) {
    try {
      const response = await this.model.destroy({ where: { id } });
      return response;
    } catch (err) {
      Logger.error("Error deleting record:", err);
      throw err;
    }
  }

  async get(id) {
    try {
      const response = await this.model.findByPk(id);
      return response;
    } catch (err) {
      Logger.error("Error fetching record:", err);
      throw err;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (err) {
      Logger.error("Error fetching all records:", err);
      throw err;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, { where: { id } });
      return response;
    } catch (err) {
      Logger.error("Error updating record:", err);
      throw err;
    }
  }
}

module.exports = CrudRepositoryGeneral;
