const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors");

class AirplaneService {
  constructor(airplaneRepository) {
    this.airplaneRepository = airplaneRepository;
  }

  async createAirplane(data) {
    try {
      console.log("from serivce layer", data);
      const airplane = await this.airplaneRepository.create(data);
      return airplane;
    } catch (error) {
      throw new AppError(
        "Error creating airplane",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAirplaneById(id) {
    try {
      const airplane = await this.airplaneRepository.get(id);
      if (!airplane) {
        throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
      }
      return airplane;
    } catch (error) {
      throw new AppError("Error fetching airplane", StatusCodes.NOT_FOUND);
    }
  }

  async getAllAirplanes() {
    try {
      const airplanes = await this.airplaneRepository.getAll();
      return airplanes;
    } catch (error) {
      throw new AppError(
        "Error fetching airplanes",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async destroyAirplane(id) {
    try {
      const airplane = await this.airplaneRepository.destroy(id);
      if (!airplane) {
        throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
      }
      return airplane;
    } catch (error) {
      throw new AppError(
        "Error deleting airplane",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateAirplane(id, data) {
    try {
      const updated = await this.airplaneRepository.update(id, data);
      if (!updated) {
        throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
      }
      return updated;
    } catch (error) {
      throw new AppError(
        "Error updating airplane",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = AirplaneService;
