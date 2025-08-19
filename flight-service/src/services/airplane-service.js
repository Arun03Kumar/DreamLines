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
      throw new Error("Error creating airplane");
    }
  }
}

module.exports = AirplaneService;
