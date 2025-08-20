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
    let sortFilter = [];
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

    if (query.sort) {
      const params = query.sort.split(",");
      const sortFilters = params.map((param) => param.split("_"));
      sortFilter = sortFilters;
    }

    try {
      const flights = await this.flightRepository.getAllFlights(
        customFilter,
        sortFilter
      );
      return flights;
    } catch (error) {
      console.error("Error fetching flights:", error);
      throw new AppError(
        "Cannot fetch data of all the flights",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getFlightById(flightId) {
    try {
      const flight = await this.flightRepository.get(flightId);
      if (!flight) {
        throw new AppError("Flight not found", StatusCodes.NOT_FOUND);
      }
      return flight;
    } catch (error) {
      console.error("Error fetching flight:", error);
      throw new AppError(
        "Cannot fetch flight data",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = FlightService;
