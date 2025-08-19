class FlightService {
  constructor(flightRepository) {
    this.flightRepository = flightRepository;
  }

  async createFlight(flightData) {
    return this.flightRepository.create(flightData);
  }
}

module.exports = FlightService;
