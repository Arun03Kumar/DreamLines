class AirportService {
  constructor(airportRepository) {
    this.airportRepository = airportRepository;
  }

  async createAirport(data) {
    return this.airportRepository.create(data);
  }

  async getAllAirports() {
    return this.airportRepository.getAll();
  }

  async getAirportById(id) {
    return this.airportRepository.get(id);
  }

  async updateAirport(id, data) {
    return this.airportRepository.update(id, data);
  }

  async deleteAirport(id) {
    return this.airportRepository.destroy(id);
  }
}

module.exports = AirportService;
