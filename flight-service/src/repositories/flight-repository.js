const CrudRepositoryGeneral = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");

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

  async updateRemainingSeats(flightId, seats, dec = true) {
    const transaction = await db.sequelize.transaction();
    try {
      const flight = await Flight.findByPk(flightId);
      await db.sequelize.query(addRowLockOnFlights(flightId));
      if (dec) {
        const response = await flight.decrement(
          "totalSeats",
          {
            by: seats,
          },
          { transaction }
        );
        await transaction.commit();
        return response;
      } else {
        const response = await flight.increment(
          "totalSeats",
          {
            by: seats,
          },
          { transaction }
        );
        return response;
      }
    } catch (err) {
      console.error("Error updating remaining seats:", err);
      await transaction.rollback();
      throw new Error("Failed to update remaining seats");
    }
  }
}

module.exports = FlightRepository;
