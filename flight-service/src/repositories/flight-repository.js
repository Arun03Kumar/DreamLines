const CrudRepositoryGeneral = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");

class FlightRepository extends CrudRepositoryGeneral {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sortFilter) {
    const response = await Flight.findAll({
      where: filter,
      order: sortFilter,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplane_details",
        },
        {
          model: Airport,
          required: true,
          as: "departure_airport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departure_airport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrival_airport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrival_airport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;
