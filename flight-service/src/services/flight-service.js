const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors");
const { Op } = require("sequelize");

class FlightService {
  constructor(flightRepository) {
    this.flightRepository = flightRepository;
  }

  async createFlight(flightData) {
    return this.flightRepository.create(flightData);
  }

  async getAllFlights(query) {
    let customFilter = {};
    if (query.trips) {
      const [departureAirportId, arrivalAirportId] = query.trips.split("-");

      customFilter.departureAirportId = departureAirportId;
      customFilter.arrivalAirportId = arrivalAirportId;
    }

    if (query.price) {
      const [minPrice, maxPrice] = query.price.split("-");
      customFilter.price = {
        [Op.between]: [minPrice, maxPrice === undefined ? 20000 : maxPrice],
      };
    }

    if (query.travellers) {
      customFilter.totalSeats = {
        [Op.gte]: query.travellers,
      };
    }

    if (query.tripDate) {
      customFilter.departureTime = {
        [Op.between]: [
          query.tripDate + " 00:00:00",
          query.tripDate + " 23:59:59",
        ],
      };
    }

    try {
      const flights = await this.flightRepository.getAllFlights(customFilter);
      return flights;
    } catch (error) {
      console.error("Error fetching flights:", error);
      throw new AppError(
        "Cannot fetch data of all the flights",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = FlightService;
